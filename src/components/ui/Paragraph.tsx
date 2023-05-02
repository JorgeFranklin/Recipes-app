import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

const paragraphVariants = cva('text-white', {
  variants: {
    size: {
      small: 'text-xl max-md:text-lg',
      default: 'text-2xl max-md:text-xl',
      large: 'text-3xl max-md:text-2xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type ParagraphProps = {} & HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof paragraphVariants>

const Paragraph = ({ size, children, className, ...props }: ParagraphProps) => {
  return (
    <p className={cn(paragraphVariants({ size, className }))} {...props}>
      {children}
    </p>
  )
}

export { Paragraph, paragraphVariants }
