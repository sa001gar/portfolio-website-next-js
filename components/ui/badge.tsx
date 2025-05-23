import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-green/30 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-terminal-green/10 text-terminal-green border border-terminal-green/20",
        secondary: "bg-terminal-black text-terminal-green border border-terminal-green/30",
        destructive: "bg-red-900/20 text-red-400 border border-red-900/30",
        outline: "text-terminal-green border border-terminal-green/30 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
