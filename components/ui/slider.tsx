// 'use client'
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    value: number[]; // Explicitly type the value prop to be received
    onValueChange: (value: number[]) => void; // Ensure onValueChange is typed and expected
    // Add any other props as needed
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <div className="relative">
      <SliderPrimitive.Root
        ref={ref}
        value={value} // Use the value from props
        onValueChange={onValueChange} // Use the onValueChange from props
        className={cn(
          "flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = "Slider";

export { Slider };
