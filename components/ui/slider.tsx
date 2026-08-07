"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    orientation={orientation}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      orientation === "vertical" && "h-full flex-col",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className={cn("relative grow overflow-hidden rounded-full bg-white/15", orientation === "vertical" ? "w-1.5 h-full" : "h-1.5 w-full")}>
      <SliderPrimitive.Range className={cn("absolute shadow-[0_0_10px_rgba(168,85,247,0.6)] from-purple-500 to-purple-600", orientation === "vertical" ? "w-full bg-gradient-to-t" : "h-full bg-gradient-to-r")} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.5)] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
