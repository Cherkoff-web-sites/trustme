import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { cardAsideStyles, cardHeaderStyles, cardRootStyles, cardTitleStyles } from './Card.styles';
import { designTokens } from '../design-tokens';

export type CardHeaderVariant = 1 | 2 | 3 | 4 | 5 | 6;
export type CardHeaderStatus = 'success' | 'error' | 'warning';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof cardRootStyles> {
  title?: React.ReactNode;
  aside?: React.ReactNode;
  /**
   * Декор под заголовком карточки (рендерится в одной обёртке с header, чтобы не ломать `gap` контента).
   * Например: декоративная линия / разделитель.
   */
  headerDecor?: React.ReactNode;
  /**
   * Виды заголовка внутри `Card`.
   * 1) flex (title слева, aside справа) + after-линия
   * 2) как 1, но только title (без aside)
   * 3) title по центру
   * 4) flex + статус-кружок 16x16 справа (и опционально aside рядом)
   * 5) "отступствие" заголовка (больше внутреннего пространства)
   * 6) legacy (оставить как было раньше)
   */
  headerVariant?: CardHeaderVariant;
  status?: CardHeaderStatus;
  as?: React.ElementType;
  /** Доп. классы для внутренней колонки (flex + gap по умолчанию из токенов). */
  contentClassName?: string;
}

export function Card({
  title,
  aside,
  headerDecor,
  headerVariant = 6,
  status,
  className,
  contentClassName,
  children,
  variant,
  as: Comp = 'section',
  ...props
}: CardProps) {
  const statusBgClass =
    status === 'success'
      ? designTokens.colors.status.successBg
      : status === 'error'
        ? designTokens.colors.status.errorBg
        : status === 'warning'
          ? designTokens.colors.status.warningBg
          : null;

  const renderTitle = () => {
    if (!title) return null;
    return <h3 className={cardTitleStyles}>{title}</h3>;
  };

  const renderLegacyHeader = () => {
    return title || aside ? (
      <div className={cardHeaderStyles}>
        {title ? <h3 className={cardTitleStyles}>{title}</h3> : <div />}
        {aside ? <span className={cardAsideStyles}>{aside}</span> : null}
      </div>
    ) : null;
  };

  const renderHeaderContent = () => {
    if (headerVariant === 6) return renderLegacyHeader();

    // 1) left title + optional right aside + after-line
    if (headerVariant === 1) {
      if (!title) return null;
      return (
        <div className={cn(cardHeaderStyles, 'relative w-full pb-4')}>
          {renderTitle()}
          {aside ? <span className={cardAsideStyles}>{aside}</span> : null}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-[#FDFEFF]/100"
          />
        </div>
      );
    }

    // 2) like 1, but no aside (only title). after-line сохранён.
    if (headerVariant === 2) {
      if (!title) return null;
      return (
        <div className={cn('relative flex w-full items-center pb-4')}>
          {renderTitle()}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-[#FDFEFF]/100"
          />
        </div>
      );
    }

    // 3) centered title only
    if (headerVariant === 3) {
      if (!title) return null;
      return <div className="flex w-full items-center justify-center">{renderTitle()}</div>;
    }

    // 4) flex wrapper + status dot (16x16) on the right, optional aside next to it
    if (headerVariant === 4) {
      if (!title) return null;
      return (
        <div className="flex w-full items-center justify-between gap-4">
          {renderTitle()}
          <div className="flex items-center gap-3">
            {statusBgClass ? <span className={cn('inline-flex h-4 w-4 rounded-full', statusBgClass)} /> : null}
            {aside ? <span className={cardAsideStyles}>{aside}</span> : null}
          </div>
        </div>
      );
    }

    // 5) add extra padding around header block (space reservation for layouts)
    if (headerVariant === 5) {
      if (!title) return null;
      return (
        <div className={cn(cardHeaderStyles, 'w-full py-2')}>
          {title ? <h3 className={cardTitleStyles}>{title}</h3> : <div />}
          {aside ? <span className={cardAsideStyles}>{aside}</span> : null}
        </div>
      );
    }

    return renderLegacyHeader();
  };

  const renderHeader = () => {
    const headerContent = renderHeaderContent();
    if (!headerContent && !headerDecor) return null;
    return (
      <div className="w-full">
        {headerContent}
        {headerDecor ? <div className="mt-[15px]">{headerDecor}</div> : null}
      </div>
    );
  };

  return (
    <Comp className={cn(cardRootStyles({ variant }), className)} {...props}>
      <div className={cn('flex flex-col', designTokens.spacing.gap.cardInternal, contentClassName)}>
        {renderHeader()}
        {children}
      </div>
    </Comp>
  );
}
