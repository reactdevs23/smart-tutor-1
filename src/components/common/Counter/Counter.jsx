"use client";

import React, { useState, useRef, useEffect } from "react";

const Counter = ({ start, end, durationTime, toFixed }) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(start);
          const diff = Math.abs(end - start);
          const duration = 1000;
          const increment = Math.ceil(diff / (duration / 10));
          let currentCount = start;
          const interval = setInterval(() => {
            currentCount += increment;
            if (currentCount >= end) {
              clearInterval(interval);
              setCount(end);
            } else {
              setCount(currentCount);
            }
          }, durationTime);
          return () => clearInterval(interval);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [start, end, durationTime]);

  // Format count to always have two decimal places
  const formatCount = (number) => {
    if (toFixed !== undefined) {
      return number.toFixed(2); // Ensure two decimal places
    }
    return number.toString();
  };

  return <span ref={ref}>{formatCount(count >= end ? end : count)}</span>;
};

export default Counter;
