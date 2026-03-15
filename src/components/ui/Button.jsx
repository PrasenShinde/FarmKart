import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-primary/20 text-primary hover:bg-primary/5",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        ghost: "hover:bg-primary/5 text-text-dark hover:text-primary",
        link: "underline-offset-4 hover:underline text-primary",
        glass: "glass text-text-dark hover:bg-white/90",
      },
      size: {
        default: "h-11 py-2 px-5",
        sm: "h-9 px-3 rounded-md",
        lg: "h-14 px-8 rounded-2xl text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, fullWidth, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
