import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface customProgressComponentProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progressBarColor?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  // React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  customProgressComponentProps
>(({ className, value, progressBarColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className,
    )}
    {...props}
  >
    {/* <span>{progressBarColor}</span> */}
    <ProgressPrimitive.Indicator
      // bg-primary
      className={cn("h-full w-full flex-1 transition-all")}
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: progressBarColor,
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
