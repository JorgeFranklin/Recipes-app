import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth'
import { Recipe, User } from '@prisma/client'

import { Heading, headingVariants } from '@/src/components/ui/Heading'
import { Paragraph } from '@/src/components/ui/Paragraph'
import Comment from '@/src/components/Comment'
import CreateComment from '@/src/components/CreateComment'
import db from '@/src/lib/db'
import '@/src/styles/recipe-detail-markdown-view.css'
import FakeCreateComment from '@/src/components/FakeCreateComment'

type CommentType = {
  id: number
  author: User
  content: string
  createdAt: Date
}

export type RecipeDetailProps = {
  recipe: Pick<Recipe, 'image' | 'title' | 'content' | 'id'>
  author: User
  comments: CommentType[]
  currentUser: Session | null
}

const RecipeDetail = async ({
  recipe,
  author,
  comments,
  currentUser,
}: RecipeDetailProps) => {
  const user = await db.user.findFirst({
    where: { email: currentUser?.user?.email as string },
    select: { id: true, image: true, name: true },
  })

  return (
    <div className="mb-5 max-md:mb-0">
      <div className="flex max-xl:justify-center items-center gap-2 mb-7">
        <Link
          href={`/profile/${author.id}`}
          className="flex gap-2 items-center"
        >
          <Image
            src={author.image}
            width={44}
            height={44}
            alt={`${author.name} profile picture.`}
            className="rounded-full"
          />
          <Paragraph className="font-semibold">{author.name}</Paragraph>
        </Link>
      </div>
      <h1
        className={headingVariants({
          size: 'large',
          className: 'max-xl:text-center',
        })}
      >
        {recipe.title}
      </h1>
      <div className="my-8 flex flex-col gap-12 max-md:justify-center">
        <Image
          src={recipe.image}
          width={600}
          height={600}
          alt="cebolinha"
          quality={100}
          priority
          className="rounded-md"
        />
        <div>
          <Heading className="max-xl:text-center mb-12">
            How to make {recipe.title}:
          </Heading>
          <div
            className="break-words max-w-full markdown-view"
            dangerouslySetInnerHTML={{ __html: recipe.content }}
          />
        </div>

        <hr className="border-app-light mb-10" />

        <div className="flex flex-col gap-10">
          {!!currentUser && !!user ? (
            <CreateComment user={user} recipeId={recipe.id} />
          ) : (
            <FakeCreateComment />
          )}

          <div className="flex flex-col gap-10">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                author={comment.author}
                content={comment.content}
                date={comment.createdAt}
              />
            ))}
          </div>
        </div>

        <hr className="border-app-light hidden max-md:block" />
      </div>
    </div>
  )
}

export default RecipeDetail
