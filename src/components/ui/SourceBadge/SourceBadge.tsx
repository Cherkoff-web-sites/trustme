import { TelegramSmallIcon } from '../../../shared/icons';
import { cn } from '../../../lib/cn';
import { sourceBadgeFallbackStyles, sourceBadgeStyles } from './SourceBadge.styles';

export interface SourceBadgeProps {
  source: 'telegram' | 'web';
  label?: boolean;
  size?: 'default' | 'sm';
  className?: string;
}

export function SourceBadge({
  source,
  label = false,
  size = 'default',
  className,
}: SourceBadgeProps) {
  return (
    <span className={cn(sourceBadgeStyles({ size }), className)}>
      {source === 'telegram' ? (
        <TelegramSmallIcon className={size === 'sm' ? 'h-5 w-5' : 'h-10 w-10'} />
      ) : (
        <span className={sourceBadgeFallbackStyles({ size })}>web</span>
      )}
      {label ? <span>{source === 'telegram' ? 'Telegram-бот' : 'Веб-сервис'}</span> : null}
    </span>
  );
}
