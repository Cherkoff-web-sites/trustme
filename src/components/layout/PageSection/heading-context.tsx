import * as React from 'react';

type HeadingTag = 'h1' | 'h2';

type HeadingContextValue = {
  getHeadingForId: (id: string) => HeadingTag;
};

const HeadingContext = React.createContext<HeadingContextValue | null>(null);

export function PageSectionHeadingProvider({ children }: { children: React.ReactNode }) {
  const stateRef = React.useRef<{ order: string[]; assigned: Map<string, HeadingTag> }>({
    order: [],
    assigned: new Map(),
  });

  const value = React.useMemo<HeadingContextValue>(() => {
    return {
      getHeadingForId: (id: string) => {
        const existing = stateRef.current.assigned.get(id);
        if (existing) return existing;

        const next: HeadingTag = stateRef.current.order.length === 0 ? 'h1' : 'h2';
        stateRef.current.order.push(id);
        stateRef.current.assigned.set(id, next);
        return next;
      },
    };
  }, []);

  return <HeadingContext.Provider value={value}>{children}</HeadingContext.Provider>;
}

export function useAutoHeading(id: string): HeadingTag {
  const ctx = React.useContext(HeadingContext);
  return ctx ? ctx.getHeadingForId(id) : 'h1';
}

