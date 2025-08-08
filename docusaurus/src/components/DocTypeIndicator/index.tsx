import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type DocType = 'tutorial' | 'how-to' | 'reference' | 'explanation';

export interface DocTypeIndicatorProps {
  type: DocType;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  className?: string;
}

const docTypeConfig = {
  tutorial: {
    emoji: '🎓',
    label: 'Tutorial',
    description: 'Learning-oriented',
    color: '#10b981', // emerald-500
    bgColor: '#d1fae5', // emerald-100
  },
  'how-to': {
    emoji: '🔧',
    label: 'How-to Guide',
    description: 'Problem-oriented',
    color: '#f59e0b', // amber-500
    bgColor: '#fef3c7', // amber-100
  },
  reference: {
    emoji: '📖',
    label: 'Reference',
    description: 'Information-oriented',
    color: '#3b82f6', // blue-500
    bgColor: '#dbeafe', // blue-100
  },
  explanation: {
    emoji: '💡',
    label: 'Explanation',
    description: 'Understanding-oriented',
    color: '#8b5cf6', // violet-500
    bgColor: '#ede9fe', // violet-100
  },
};

export default function DocTypeIndicator({
  type,
  size = 'medium',
  showLabel = true,
  className,
}: DocTypeIndicatorProps): JSX.Element {
  const config = docTypeConfig[type];

  return (
    <div
      className={clsx(
        styles.docTypeIndicator,
        styles[`size-${size}`],
        className
      )}
      style={{
        '--doc-type-color': config.color,
        '--doc-type-bg-color': config.bgColor,
      } as React.CSSProperties}
    >
      <span className={styles.emoji} role="img" aria-label={config.label}>
        {config.emoji}
      </span>
      {showLabel && (
        <div className={styles.labelContainer}>
          <span className={styles.label}>{config.label}</span>
          <span className={styles.description}>{config.description}</span>
        </div>
      )}
    </div>
  );
}

export function DocTypeBadge({
  type,
  className,
}: {
  type: DocType;
  className?: string;
}): JSX.Element {
  return (
    <DocTypeIndicator
      type={type}
      size="small"
      showLabel={false}
      className={clsx(styles.badge, className)}
    />
  );
}

export function DocTypeCard({
  type,
  title,
  description,
  href,
  className,
}: {
  type: DocType;
  title: string;
  description: string;
  href: string;
  className?: string;
}): JSX.Element {
  const config = docTypeConfig[type];

  return (
    <a
      href={href}
      className={clsx(styles.docTypeCard, className)}
      style={{
        '--doc-type-color': config.color,
        '--doc-type-bg-color': config.bgColor,
      } as React.CSSProperties}
    >
      <div className={styles.cardHeader}>
        <DocTypeIndicator type={type} size="large" showLabel={false} />
        <div className={styles.cardHeaderText}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.cardTypeLabel}>{config.label}</span>
        </div>
      </div>
      <p className={styles.cardDescription}>{description}</p>
      <div className={styles.cardFooter}>
        <span className={styles.cardOrientation}>{config.description}</span>
        <span className={styles.cardArrow}>→</span>
      </div>
    </a>
  );
}
