import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
        link: "text-primary underline-offset-4 hover:underline transition-colors duration-200",
        
        // Premium variants
        gradient: "bg-gradient-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] font-semibold",
        premium: "bg-gradient-hero text-white shadow-glow hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] font-semibold animate-glow",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 shadow-lg",
        
        // Country-specific variants with enhanced styling
        canada: "bg-canada text-white hover:bg-canada/90 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
        germany: "bg-germany text-black hover:bg-germany/90 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
        australia: "bg-australia text-white hover:bg-australia/90 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
        portugal: "bg-portugal text-white hover:bg-portugal/90 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
        usa: "bg-usa text-white hover:bg-usa/90 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
        
        // Professional variants for resume builder
        professional: "bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/30",
        action: "bg-accent text-accent-foreground hover:bg-accent/80 shadow-md hover:shadow-lg",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-md hover:shadow-lg",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg font-semibold",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 [&_svg]:size-3.5",
        "icon-lg": "h-12 w-12 [&_svg]:size-5",
        pill: "h-9 px-6 rounded-full",
        "pill-lg": "h-11 px-8 rounded-full text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
