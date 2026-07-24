import { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';

// ─── Tuneable constants ────────────────────────────────────────────────────────
const FONT_SIZE    = 26; // must match FONT_SIZE in Navbar.tsx
const FONT_FAMILY  = '"KandiLetterBeads", serif';
const PADDING_X    = 1;
const PADDING_Y    = 1;
const GRAVITY      = 1.5;
const RESTITUTION  = 0.12;
const FRICTION     = 0.65;
const FRICTION_AIR = 0.05;
const DENSITY      = 0.004;

// Cursor pusher settings
const CURSOR_RADIUS  = 28;  // px — size of the invisible push circle
const CURSOR_DENSITY = 0.08; // heavy so it pushes letters without being pushed much
// ──────────────────────────────────────────────────────────────────────────────

interface LetterBody { body: Matter.Body; char: string }

// Module-level singletons
let _engine: Matter.Engine | null = null;
let _runner: Matter.Runner | null = null;
let _ground: Matter.Body | null = null;
let _wallL:  Matter.Body | null = null;
let _wallR:  Matter.Body | null = null;
let _cursor: Matter.Body | null = null; // invisible mouse-tracking body
const _letters: LetterBody[] = [];

function getEngine(): Matter.Engine {
  if (!_engine) {
    _engine = Matter.Engine.create({
      gravity: { x: 0, y: GRAVITY },
      enableSleeping: true,
      positionIterations: 10,
      velocityIterations: 8,
    });
    _runner = Matter.Runner.create();
    Matter.Runner.run(_runner, _engine);
  }
  return _engine;
}

function rebuildBounds(vw: number, vh: number) {
  const eng = getEngine();
  const old = [_ground, _wallL, _wallR].filter(Boolean) as Matter.Body[];
  if (old.length) Matter.Composite.remove(eng.world, old);

  const T = 60;
  _ground = Matter.Bodies.rectangle(vw / 2, vh + T / 2, vw * 3, T, {
    isStatic: true, restitution: RESTITUTION, friction: FRICTION, label: 'ground',
  });
  _wallL = Matter.Bodies.rectangle(-T / 2, vh / 2, T, vh * 3, {
    isStatic: true, restitution: RESTITUTION, label: 'wallL',
  });
  _wallR = Matter.Bodies.rectangle(vw + T / 2, vh / 2, T, vh * 3, {
    isStatic: true, restitution: RESTITUTION, label: 'wallR',
  });
  Matter.Composite.add(eng.world, [_ground, _wallL, _wallR]);
}

function getOrCreateCursor(eng: Matter.Engine): Matter.Body {
  if (_cursor) return _cursor;

  // Circular body parked off-screen initially
  _cursor = Matter.Bodies.circle(-500, -500, CURSOR_RADIUS, {
    isStatic   : true,          // static so gravity doesn't pull it down
    isSensor   : false,         // NOT a sensor — needs real collision response
    restitution: 0.4,
    friction   : 0.1,
    density    : CURSOR_DENSITY,
    label      : 'cursor',
    collisionFilter: {
      category: 0x0002,
      mask    : 0x0001,         // only collides with letter bodies
    },
  });
  Matter.Composite.add(eng.world, _cursor);
  return _cursor;
}

export interface SpawnPayload {
  char: string;
  screenX: number;
  screenY: number;
}

interface LetterPhysicsProps {
  registerSpawn: (fn: (letters: SpawnPayload[]) => void) => void;
}

export default function LetterPhysics({ registerSpawn }: LetterPhysicsProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const measureCtx = useRef<CanvasRenderingContext2D | null>(null);
  const mousePos   = useRef<{ x: number; y: number }>({ x: -500, y: -500 });

  // ── Draw loop ──────────────────────────────────────────────────────────────
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) { rafRef.current = requestAnimationFrame(loop); return; }

    // Move cursor body to current mouse position every frame before physics settles
    if (_cursor) {
      Matter.Body.setPosition(_cursor, mousePos.current);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font         = `${FONT_SIZE}px ${FONT_FAMILY}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign    = 'center';

    for (const { body, char } of _letters) {
      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // ── Setup ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mc = document.createElement('canvas');
    measureCtx.current = mc.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      rebuildBounds(window.innerWidth, window.innerHeight);
    };

    resize();
    const eng = getEngine();

    // Create cursor body and assign letter collision category
    getOrCreateCursor(eng);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Wake any sleeping bodies near the cursor so they respond immediately
      if (_engine) {
        for (const { body } of _letters) {
          const dx = body.position.x - e.clientX;
          const dy = body.position.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS * 3) {
            Matter.Sleeping.set(body, false);
          }
        }
      }
    };

    // Park cursor off-screen when mouse leaves
    const onMouseLeave = () => { mousePos.current = { x: -500, y: -500 }; };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);

  // ── Spawn registration ─────────────────────────────────────────────────────
  useEffect(() => {
    registerSpawn((letters: SpawnPayload[]) => {
      const mCtx = measureCtx.current;
      const eng  = _engine;
      if (!mCtx || !eng) return;

      mCtx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;

      letters.forEach(({ char, screenX, screenY }) => {
        if (char.trim() === '') return;

        const m  = mCtx.measureText(char);
        const gW = (m.actualBoundingBoxLeft + m.actualBoundingBoxRight)    || Math.max(m.width, 10);
        const gH = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) || FONT_SIZE * 0.8;

        const bW = gW + PADDING_X * 2;
        const bH = gH + PADDING_Y * 2;

        const body = Matter.Bodies.rectangle(screenX, screenY, bW, bH, {
          restitution : RESTITUTION,
          friction    : FRICTION,
          frictionAir : FRICTION_AIR,
          density     : DENSITY,
          angle       : (Math.random() - 0.5) * 0.2,
          label       : `letter-${char}`,
          // Letter bodies use category 0x0001 so cursor (0x0002) can collide with them
          collisionFilter: { category: 0x0001, mask: 0x0002 | 0x0001 },
        });

        Matter.Composite.add(eng.world, body);
        _letters.push({ body, char });
      });
    });
  }, [registerSpawn]);

  return (
    <canvas
      ref={canvasRef}
      // pointer-events-none keeps clicks passing through to the page
      className="fixed inset-0 pointer-events-none z-[200]"
      aria-hidden="true"
    />
  );
}
