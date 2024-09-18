'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { twMerge } from 'tailwind-merge';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={twMerge(
      'relative h-2 w-full overflow-hidden rounded-full bg-orange-600/20',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-orange-600 transition-all"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
