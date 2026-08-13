import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

/**
 * Wraps content so it gently fades + slides into view the first time
 * it scrolls into the viewport. Purely visual - never alters content.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.65,
  className,
  once = true,
  amount = 0.2,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  stagger?: number;
  y?: number;
}

/**
 * Same as Reveal, but staggers an array of children (e.g. cards in a grid)
 * so they cascade into view one after another.
 */
export function RevealGroup({
  children,
  className,
  itemClassName,
  stagger = 0.08,
  y = 28,
}: RevealGroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger} y={y} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
