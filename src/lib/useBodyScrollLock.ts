import { useEffect } from 'react';

let lockCount = 0;
let previousHtmlOverflow = '';
let previousBodyOverflow = '';

function applyLock() {
  if (lockCount === 0) {
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
}

function releaseLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0) return;
  document.documentElement.style.overflow = previousHtmlOverflow;
  document.body.style.overflow = previousBodyOverflow;
}

/**
 * Блокирует прокрутку документа, пока открыто модальное окно / оверлей.
 * Несколько одновременных вызовов (вложенные модалки) учитываются счётчиком.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    applyLock();
    return () => {
      releaseLock();
    };
  }, [locked]);
}
