import clsx from 'clsx';
import { SpanHTMLAttributes } from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps extends SpanHTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function Skeleton(props: SkeletonProps) {
  return <span className={clsx(props.className, styles.skeleton)} {...props} />;
}
