import React, { HTMLAttributes } from 'react'
import { X } from 'lucide-react'

import { Button, buttonVariants } from '@/src/components/ui/Button'
import { Paragraph } from '@/src/components/ui/Paragraph'

export type ErrorProps = {
  message: string
} & HTMLAttributes<HTMLDivElement>

const Error = ({ message, ...props }: ErrorProps) => {
  return (
    <div
      className="fixed flex justify-center max-md:items-center top-0 right-0 bottom-0 left-0 bg-black/50 z-10 pt-10"
      {...props}
    >
      <div className="flex flex-col max-md:w-[80%] gap-4 items-end">
        <Button className="text-white" variant="dangerous">
          <X />
        </Button>
        <div
          className={buttonVariants({
            variant: 'dangerous',
            className: 'h-[150px] hover:filter-none',
          })}
        >
          <Paragraph className="text-center">{message}</Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Error
