import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible && !isMobile) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea';
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => { if (!isMobile) setIsVisible(true); };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brand rounded-full pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-brand rounded-full pointer-events-none z-[9998]"
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.5 : 1,
          borderWidth: isHovering ? '1px' : '0.5px',
        }}
        style={{ x: circleX, y: circleY, translateX: '-50%', translateY: '-50%' }}
        transition={{
          scale: { type: 'spring', damping: 15, stiffness: 200 },
          opacity: { duration: 0.2 },
          borderWidth: { duration: 0.2 },
        }}
      />
    </>
  );
}
