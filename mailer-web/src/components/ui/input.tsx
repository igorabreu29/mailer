import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "notflex noth-9 notw-full notrounded-md notborder notborder-input notbg-transparent notpx-3 notpy-1 nottext-sm notshadow-sm nottransition-colors file:notborder-0 file:notbg-transparent file:nottext-sm file:notfont-medium placeholder:nottext-muted-foreground focus-visible:notoutline-none focus-visible:notring-1 focus-visible:notring-ring disabled:notcursor-not-allowed disabled:notopacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
