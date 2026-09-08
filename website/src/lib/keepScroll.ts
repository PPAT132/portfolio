import { flushSync } from 'react-dom';

const LOCK_MS = 320;

const pinTo = (element: HTMLElement | null, pinnedTop: number, fallbackY: number) => {
  if (element) {
    const delta = element.getBoundingClientRect().top - pinnedTop;

    if (Math.abs(delta) >= 0.5) {
      window.scrollBy(0, delta);
    }

    return;
  }

  if (window.scrollY !== fallbackY) {
    window.scrollTo(0, fallbackY);
  }
};

export const pinScrollDuring = (
  element: HTMLElement | null,
  update: () => void,
) => {
  const pinnedTop = element?.getBoundingClientRect().top ?? 0;
  const fallbackY = window.scrollY;

  flushSync(update);
  pinTo(element, pinnedTop, fallbackY);

  const started = performance.now();
  const tick = (now: number) => {
    pinTo(element, pinnedTop, fallbackY);

    if (now - started < LOCK_MS) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

export const expandRootFrom = (target: EventTarget | null): HTMLElement | null => {
  if (!(target instanceof HTMLElement)) {
    return null;
  }

  return target.closest('[data-expand-pin], [data-expand-root]');
};
