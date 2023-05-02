import { User } from '@prisma/client'
import Image from 'next/image'
import { Paragraph } from '@/src/components/ui/Paragraph'
import Link from 'next/link'
import formatDate from '@/src/utils/formatDate'

export type CommentProps = {
  author: Pick<User, 'id' | 'name' | 'image'>
  content: string
  date: Date | string
}

const Comment = ({ author, content, date }: CommentProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-full min-w-[44px]">
        <Link href={`/profile/${author.id}`}>
          <Image
            src={author.image}
            width={44}
            height={44}
            alt={`${author.name} profile picture.`}
            quality={100}
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="h-full max-w-[80%]">
        <div className="flex gap-2 items-center">
          <Link href={`/profile/${author.id}`}>
            <Paragraph size="small" className="font-semibold">
              {author.name}
            </Paragraph>
          </Link>
          <Paragraph
            size="small"
            className="text-gray-300 text-base pt-[1px] max-sm:text-xs"
          >
            {formatDate(date)}
          </Paragraph>
        </div>
        <Paragraph className="break-words">{content}</Paragraph>
      </div>
    </div>
  )
}

export default Comment
