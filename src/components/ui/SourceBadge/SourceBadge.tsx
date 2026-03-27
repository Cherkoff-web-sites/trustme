import { TelegramSmallIcon } from '../../../shared/icons';
import { cn } from '../../../lib/cn';
import { sourceBadgeStyles } from './SourceBadge.styles';
import websiteOnHistorySvg from '../../../assets/icons/website_on_history.svg';

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
        <img
          src={websiteOnHistorySvg}
          alt=""
          aria-hidden
          className={cn('shrink-0', size === 'sm' ? 'h-5 w-5' : 'h-10 w-10')}
        />
      )}
      {label ? <span>{source === 'telegram' ? 'Telegram-бот' : 'Веб-сервис'}</span> : null}
    </span>
  );
}
