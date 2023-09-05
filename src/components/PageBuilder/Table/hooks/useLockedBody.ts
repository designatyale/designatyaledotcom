/*
 * useLockedBody.ts
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 *
 * https://github.com/algolia/doc-code-samples/blob/master/react-instantsearch/facet-dropdown/src/hooks/useLockedBody.ts
 */
import { useLayoutEffect } from 'react';

export function useLockedBody(locked = false) {
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Get the scrollBar width
    const root = document.getElementById('root');
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);
}
