import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactNode } from 'react'

import cn from '@/src/utils/cn'

const buttonVariants = cva(
  'filter hover:brightness-110 transition-all duration-200 rounded-2xl px-4 py-2 inline-flex justify-center items-center disabled:opacity-75 select-none',
  {
    variants: {
      variant: {
        default: 'bg-app-light',
        safe: 'bg-app-green-light',
        dangerous: 'bg-app-red',
      },
      size: {
        small: 'text-base max-md:text-sm',
        default: 'text-lg max-md:text-base',
        large: 'text-xl max-md:text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonProps = {
  isLoading?: boolean
  iconForLoading?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = ({
  isLoading,
  iconForLoading,
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading && <>{iconForLoading}</>}
      {children}
    </button>
  )
}

export { Button, buttonVariants }
