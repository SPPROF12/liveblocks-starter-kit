import { MutableRefObject, useEffect, useMemo, useRef } from "react";

const initialRect = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: () => "",
};

/**
 * Returns a ref containing the results of `getBoundingClientRect` for `ref`
 * Updates on window changes
 */
export function useBoundingClientRectRef(
  ref: MutableRefObject<Element | null>
) {
  const rectRef = useRef<DOMRect>(initialRect);

  const updateRect = () => {
    if (ref.current && ref.current instanceof HTMLElement) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const previousRef = useRef<Element | null>(null);

  useEffect(() => {
    if (previousRef.current !== ref.current) {
      window.addEventListener("resize", updateRect);
      window.addEventListener("orientationchange", updateRect);
      updateRect();

      return () => {
        window.removeEventListener("resize", updateRect);
        window.removeEventListener("orientationchange", updateRect);
      };
    }
  }, [ref]);

  return useMemo(() => rectRef, [ref]);
}

