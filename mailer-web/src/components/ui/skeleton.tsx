import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("notanimate-pulse notrounded-md notbg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
