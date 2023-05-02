import Image from 'next/image'
import { Heading } from '@/src/components/ui/Heading'

const Empty = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
        src="/empty.png"
        alt="Nothing found."
        width={400}
        height={400}
        priority
        quality={100}
        draggable={false}
      />
      <Heading>Nothing found.</Heading>
    </div>
  )
}

export default Empty
