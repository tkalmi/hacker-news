import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver(options) {
  const [node, setNode] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const observerRef = useRef();

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new window.IntersectionObserver(
      ([{ isIntersecting }]) => setIsVisible(isIntersecting),
      options
    );

    const { current: currentObserver } = observerRef;

    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, isVisible];
}
