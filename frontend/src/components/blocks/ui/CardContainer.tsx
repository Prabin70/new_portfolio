"use client";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { cn } from "../../lib/utils";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-20 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

// 1. Define the props that are specifically consumed by CardItem itself.
// This list should NOT include 'ref' because we are handling it differently.
interface CardItemConsumedProps {
  className?: string; // This className is for CardItem itself, then merged.
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  children: React.ReactNode; // Children are always handled by CardItem wrapping `Tag`
}

// 2. Define the full props for CardItem component, handling polymorphism.
export type CardItemProps<T extends React.ElementType = "div"> =
  CardItemConsumedProps & { // All the props CardItem uses directly
    as?: T;
  } & // Merge in the props that the underlying 'Tag' component accepts. // The 'as' prop, specific to CardItem
    // We use `ComponentPropsWithRef<T>` because `Tag` likely accepts a `ref`.
    // Then, we `Omit` any props that `CardItem` consumes directly,
    // and crucially, we also `Omit` the `ref` prop itself from `...rest`
    // because `CardItem` is providing its own `ref={ref}` explicitly.
    Omit<
      React.ComponentPropsWithRef<T>,
      keyof CardItemConsumedProps | "as" | "ref"
    >;

export const CardItem = <T extends React.ElementType = "div">({
  as,
  children,
  className, // CardItem's own className
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  // The `rest` object will contain all other valid props for `Tag`
  // (e.g., onClick, style, id, etc.), *except* for ref, children, as,
  // and our custom transform props, because they are explicitly handled or omitted.
  ...rest
}: CardItemProps<T>) => {
  const Tag = as || "div";
  const ref = useRef<HTMLDivElement>(null); // This is the ref that CardItem manages and passes to Tag

  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    const transformValue = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    ref.current.style.transform = transformValue;
  };

  return (
    <Tag
      ref={ref} // Explicitly pass the internally managed ref
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest} // Spread the remaining props
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};