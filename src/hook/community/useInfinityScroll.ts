import { useCallback, useEffect, useRef } from 'react';

type UseInfiniteScrollOptions = {
  onIntersect: () => void;
  enabled?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useInfiniteScroll<T extends HTMLElement>({
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = '200px',
  threshold = 0,
  once = false,
}: UseInfiniteScrollOptions) {
  const ref = useRef<T | null>(null);
  const calledOnceRef = useRef(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;
      if (once && calledOnceRef.current) return;

      onIntersect();

      if (once) {
        calledOnceRef.current = true;
        observer.unobserve(entry.target);
      }
    },
    [onIntersect, once]
  );

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, root, rootMargin, threshold, handleIntersect]);

  useEffect(() => {
    if (!enabled) calledOnceRef.current = false;
  }, [enabled]);

  return ref;
}
