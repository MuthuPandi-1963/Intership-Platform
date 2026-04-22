import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060610] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-600 text-white shadow hover:bg-indigo-500 active:scale-95',
        destructive:
          'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 hover:text-red-300',
        outline:
          'border border-white/10 bg-transparent text-white/80 hover:bg-white/5 hover:text-white hover:border-white/20',
        secondary:
          'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white',
        ghost:
          'text-white/70 hover:bg-white/5 hover:text-white',
        link:
          'text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-300',
        success:
          'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30',
        gradient:
          'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-violet-500 active:scale-95',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
        xl: 'h-14 rounded-xl px-10 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
