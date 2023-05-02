'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Transition } from '@headlessui/react'

import { Paragraph } from '@/src/components/ui/Paragraph'
import { Button, buttonVariants } from '@/src/components/ui/Button'
import { User } from '@prisma/client'
import Comment from '@/src/components/Comment'
import { useMutation } from '@apollo/client'
import { CREATE_COMMENT } from '@/src/graphql/mutations'
import Error from '@/src/components/Error'

type successfullyCommented = {
  id: number
  author: {
    id: string
    image: string
    name: string
  }
  content: string
  createdAt: string
}

export type CreateCommentProps = {
  user: Pick<User, 'id' | 'name' | 'image'>
  recipeId: number
}

const CreateComment = ({ user, recipeId }: CreateCommentProps) => {
  const [error, setError] = useState('')
  const [comment, setComment] = useState('')
  const [commentOptions, setCommentOptions] = useState(false)
  const [successfullyComments, setSuccessfullyComments] = useState<
    successfullyCommented[]
  >([])

  const commentArea = useRef<any>(null)

  const resizeAndSetComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const clearComment = () => {
    setComment('')
    commentArea.current.style.height = 'auto'
    setCommentOptions(false)
  }

  const onComment = () => {
    setCommentOptions(true)
  }

  const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT)

  const createComment = async () => {
    if (!comment.length) {
      setError('Please write a comment before submitting it.')
      return
    }

    const commentVariables = {
      content: comment,
      authorId: user.id,
      recipeId: recipeId,
    }

    const { data, errors } = await createCommentMutation({
      variables: commentVariables,
    })

    if (!errors) {
      setSuccessfullyComments((prev) => [data.createComment, ...prev])
      clearComment()
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="flex h-full min-w-[44px]">
          <Link href={`/account`}>
            <Image
              src={user.image}
              width={44}
              height={44}
              alt={`${user.name} profile picture.`}
              quality={100}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex flex-col h-full w-full gap-2 max-md:max-w-[80%]">
          <div className="flex gap-2 items-center">
            <Link href={`/account`}>
              <Paragraph size="small" className="font-semibold">
                {user.name}
              </Paragraph>
            </Link>
          </div>
          <div className="flex flex-col">
            <textarea
              ref={commentArea}
              className={buttonVariants({
                className:
                  'rounded-2xl resize-none bg-transparent text-white border-app-light border overflow-y-clip',
              })}
              value={comment}
              onChange={resizeAndSetComment}
              onFocus={onComment}
              placeholder="Comment here!"
            />

            <Transition
              show={commentOptions}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="flex justify-end max-md:justify-center gap-4 mt-4"
            >
              <Button
                variant="dangerous"
                className="rounded-full text-white"
                onClick={clearComment}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full"
                onClick={createComment}
                isLoading={loading}
                iconForLoading={<Loader2 className="animate-spin mr-2" />}
              >
                Send
              </Button>
            </Transition>
          </div>
        </div>
      </div>
      {successfullyComments.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.author}
          content={comment.content}
          date={comment.createdAt}
        />
      ))}
      {!!error && <Error message={error} onClick={() => setError('')} />}
    </>
  )
}

export default CreateComment
