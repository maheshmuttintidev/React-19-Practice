import { MutableRefObject, useEffect } from "react";

export const useInfiniteScroll = ({
  onLoadMore,
  ref,
}: {
  onLoadMore: () => void;
  ref: MutableRefObject<HTMLElement | null>;
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries?.[0];

        if (entry.isIntersecting) {
          console.log("intersecting");
          onLoadMore();
        }
      },
      { threshold: 1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.current]);
};
