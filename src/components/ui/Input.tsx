import cn from '@/src/utils/cn'
import { VariantProps } from 'class-variance-authority'
import { InputHTMLAttributes } from 'react'
import { buttonVariants } from './Button'

export type InputProps = {} & InputHTMLAttributes<HTMLInputElement> &
  Omit<VariantProps<typeof buttonVariants>, 'size'>

const Input = ({ variant, size, className, ...props }: InputProps) => {
  return (
    <input className={cn(buttonVariants({ variant, className }))} {...props} />
  )
}

export default Input
