import * as React from "react";

import { cn } from "@/lib/utils";

// Componente Card
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-between align-left bg-white rounded-xl shadow-lg p-6 mt-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-200",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Componente Card Header
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-3", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// Componente Card Title
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-center text-white rounded-md shadow-md font-bold text-2xl p-2 bg-gradient-to-r from-primaryU to-primaryLight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// Componente Card Description
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// Componente Card Content
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// Componente Card Footer
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex justify-center items-center p-1 pt-4 border-t border-gray-200", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
