import * as React from "react";
import { cn } from "@/lib/utils";

const slideIn = {
  from: {
    transform: 'translateY(-100%)'
  },
  to: {
    transform: 'translateY(0)'
  }
};

const ModalContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalContainer.displayName = "ModalContainer";

const ModalContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-between align-left rounded-xl shadow-lg p-6 border border-gray-200 bg-white",
        className
      )}
      style={{ animation: `${slideIn} 0.3s ease` }}
      {...props}
    >
      {children}
    </div>
  )
);
ModalContent.displayName = "ModalContent";

const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex justify-between items-center border-b-2 border-gray-200 mb-4 pb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalHeader.displayName = "ModalHeader";

const ModalText = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-bold text-xl text-primaryDark", className)}
      {...props}
    />
  )
);
ModalText.displayName = "ModalText";

const ModalButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "text-white text-lg px-6 py-2 rounded-md font-semibold transition-all duration-300",
        disabled ? "bg-strongGray cursor-not-allowed" : "bg-primary hover:shadow-md",
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
);
ModalButton.displayName = "ModalButton";

export { ModalContainer, ModalContent, ModalHeader, ModalText, ModalButton };
