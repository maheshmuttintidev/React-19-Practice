import React, { useRef, useState } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const InfiniteScroll = () => {
  const [items, setItems] = useState([1, 1, 1]);
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);

  useInfiniteScroll({
    onLoadMore: () => {
      setLoading(true);
      setItems((prev) => [
        ...prev,
        Math.floor(Math.random() * (1000 - 1 + 1) + 1),
      ]);
      setLoading(false);
    },
    ref: ref,
  });

  const itemsGrid = Array(4)
    .fill(Math.floor(Math.random() * (10 - 1 + 1) + 1))
    .map((_, idx) => {
      return (
        <div
          className="text-teal-800 bg-teal-300 border border-2 border-teal-500 rounded-md w-10 h-10 text-center flex justify-center items-center"
          key={`item-${idx}`}
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}45`,
            // color: `#${Math.floor(Math.random() * 16777215)
            //   .toString(16)
            //   .padStart(6, "0")}`,
          }}
        >
          {Math.floor(Math.random() * _ - 1 + 1) + 1}
        </div>
      );
    });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl text-center font-bold py-3">Infinite Scroll</h1>
      <div className="h-[400px] w-[300px] shadow-lg overflow-y-scroll border border-1 border-slate-300 py-3">
        <div className="flex flex-col gap-3 items-center">
          {items?.map((_, index) => {
            return (
              <div className="flex flex-wrap gap-3" key={`item-${index}`}>
                {itemsGrid}
              </div>
            );
          })}
        </div>
        {loading ? "Loading..." : null}
        <div style={{ height: 200 }} ref={ref} />
      </div>
    </div>
  );
};
