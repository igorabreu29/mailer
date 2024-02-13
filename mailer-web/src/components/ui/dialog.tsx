import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "notfixed notinset-0 notz-50 notbg-black/80 not data-[state=open]:notanimate-in data-[state=closed]:notanimate-out data-[state=closed]:notfade-out-0 data-[state=open]:notfade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "notfixed notleft-[50%] nottop-[50%] notz-50 notgrid notw-full notmax-w-lg nottranslate-x-[-50%] nottranslate-y-[-50%] notgap-4 notborder notbg-background notp-6 notshadow-lg notduration-200 data-[state=open]:notanimate-in data-[state=closed]:notanimate-out data-[state=closed]:notfade-out-0 data-[state=open]:notfade-in-0 data-[state=closed]:notzoom-out-95 data-[state=open]:notzoom-in-95 data-[state=closed]:notslide-out-to-left-1/2 data-[state=closed]:notslide-out-to-top-[48%] data-[state=open]:notslide-in-from-left-1/2 data-[state=open]:notslide-in-from-top-[48%] sm:notrounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="notabsolute notright-4 nottop-4 notrounded-sm notopacity-70 notring-offset-background nottransition-opacity hover:notopacity-100 focus:notoutline-none focus:notring-2 focus:notring-ring focus:notring-offset-2 disabled:notpointer-events-none data-[state=open]:notbg-accent data-[state=open]:nottext-muted-foreground">
        <Cross2Icon className="noth-4 notw-4" />
        <span className="notsr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "notflex notflex-col notspace-y-1.5 nottext-center sm:nottext-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "notflex notflex-col-reverse sm:notflex-row sm:notjustify-end sm:notspace-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "nottext-lg notfont-semibold notleading-none nottracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("nottext-sm nottext-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
