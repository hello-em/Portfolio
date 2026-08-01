/**
 * Self-contained physics canvas for the 404 page.
 * Uses its own Matter.js engine — completely separate from the nav's LetterPhysics.
 */
import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Matter from 'matter-js';

const FONT_SIZE    = 72;  // larger — fills the textarea area MUST MATCH NotFound.tsx
const FONT_FAMILY  = '"KandiLetterBeads", serif';
const PADDING_X    = 2;
const PADDING_Y    = 2;
const GRAVITY      = 1.8;
const RESTITUTION  = 0.15;
const FRICTION     = 0.6;
const FRICTION_AIR = 0.04;
const DENSITY      = 0.003;
const CURSOR_R     = 32;

export interface NotFoundPhysicsHandle {
  spawn: (chars: { char: string; screenX: number; screenY: number }[]) => void;
}

const NotFoundPhysics = forwardRef<NotFoundPhysicsHandle>((_, ref) => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const measureCtx = useRef<CanvasRenderingContext2D | null>(null);
  const mousePos   = useRef({ x: -999, y: -999 });

  // Each 404 page mount gets a fresh engine
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const cursorRef = useRef<Matter.Body | null>(null);
  const lettersRef = useRef<{ body: Matter.Body; char: string }[]>([]);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) { rafRef.current = requestAnimationFrame(loop); return; }

    if (cursorRef.current) {
      Matter.Body.setPosition(cursorRef.current, mousePos.current);
    }

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.font         = `${FONT_SIZE}px ${FONT_FAMILY}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign    = 'center';

    for (const { body, char } of lettersRef.current) {
      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Measure canvas
    const mc = document.createElement('canvas');
    measureCtx.current = mc.getContext('2d');

    // Fresh engine for this page
    const eng = Matter.Engine.create({
      gravity: { x: 0, y: GRAVITY },
      enableSleeping: true,
      positionIterations: 10,
      velocityIterations: 8,
    });
    engineRef.current = eng;
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, eng);

    const buildBounds = (w: number, h: number) => {
      const T = 60;
      const ground = Matter.Bodies.rectangle(w / 2, h + T / 2, w * 3, T, {
        isStatic: true, restitution: RESTITUTION, friction: FRICTION,
      });
      const wallL = Matter.Bodies.rectangle(-T / 2, h / 2, T, h * 3, { isStatic: true });
      const wallR = Matter.Bodies.rectangle(w + T / 2, h / 2, T, h * 3, { isStatic: true });
      Matter.Composite.add(eng.world, [ground, wallL, wallR]);
    };

    // Cursor body
    const cursor = Matter.Bodies.circle(-999, -999, CURSOR_R, {
      isStatic: true, isSensor: false,
      restitution: 0.4, friction: 0.1,
      collisionFilter: { category: 0x0002, mask: 0x0001 },
    });
    cursorRef.current = cursor;
    Matter.Composite.add(eng.world, cursor);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      buildBounds(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Wake sleeping letters near cursor
      for (const { body } of lettersRef.current) {
        const dx = body.position.x - e.clientX;
        const dy = body.position.y - e.clientY;
        if (Math.sqrt(dx * dx + dy * dy) < CURSOR_R * 3) {
          Matter.Sleeping.set(body, false);
        }
      }
    };
    const onMouseLeave = () => { mousePos.current = { x: -999, y: -999 }; };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      // Clean up engine on unmount
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
      runnerRef.current = null;
      cursorRef.current = null;
      lettersRef.current = [];
    };
  }, [loop]);

  // Expose spawn to parent via ref
  useImperativeHandle(ref, () => ({
    spawn(chars) {
      const mCtx = measureCtx.current;
      const eng  = engineRef.current;
      if (!mCtx || !eng) return;

      mCtx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;

      chars.forEach(({ char, screenX, screenY }) => {
        if (char.trim() === '') return;

        const m  = mCtx.measureText(char);
        const gW = (m.actualBoundingBoxLeft + m.actualBoundingBoxRight)    || Math.max(m.width, 20);
        const gH = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) || FONT_SIZE * 0.8;

        const body = Matter.Bodies.rectangle(
          screenX, screenY,
          gW + PADDING_X * 2, gH + PADDING_Y * 2,
          {
            restitution : RESTITUTION,
            friction    : FRICTION,
            frictionAir : FRICTION_AIR,
            density     : DENSITY,
            angle       : (Math.random() - 0.5) * 0.3,
            collisionFilter: { category: 0x0001, mask: 0x0002 | 0x0001 },
          }
        );
        Matter.Composite.add(eng.world, body);
        lettersRef.current.push({ body, char });
      });
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[50]"
      aria-hidden="true"
    />
  );
});

NotFoundPhysics.displayName = 'NotFoundPhysics';
export default NotFoundPhysics;
