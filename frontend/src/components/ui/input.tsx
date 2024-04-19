import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <>
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:ring-0 focus-visible:border-ring",
            error ? "border-destructive focus-visible:border-destructive" : "",
            className
          )}
          ref={ref}
          {...props}
        />

        {error && (
          <div className="gap-2 pointer-events-none inset-y-0 right-0 flex items-center">
            <ExclamationCircleIcon
              className="h-5 w-5 text-destructive"
              aria-hidden="true"
            />

            <p className="text-sm text-destructive">{error.message}</p>
          </div>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
