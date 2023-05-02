import { ReactNode } from 'react'

export type ContainerProps = {
  className?: string
  children: ReactNode
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={`px-2 mx-auto max-w-[1440px] ` + className}>{children}</div>
  )
}

export default Container
