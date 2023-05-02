import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

const headingVariants = cva('text-white font-semibold', {
  variants: {
    size: {
      small: 'text-2xl max-md:text-xl',
      default: 'text-3xl max-md:text-2xl',
      large: 'text-4xl max-md:text-3xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type HeadingProps = {} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>

const Heading = ({ size, children, className, ...props }: HeadingProps) => {
  return (
    <h2 className={cn(headingVariants({ size, className }))} {...props}>
      {children}
    </h2>
  )
}

export { Heading, headingVariants }
