import Image from 'next/image'

import RecipeInfo from '@/src/components/RecipeInfo'
import { Heading } from '@/src/components/ui/Heading'
import { Paragraph } from '@/src/components/ui/Paragraph'
import db from '@/src/lib/db'
import { buttonVariants } from '@/src/components/ui/Button'
import Link from 'next/link'

type Context = {
  params: {
    userId: string
  }
}

const Profile = async ({ params: { userId } }: Context) => {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  })

  const recipes = await db.recipe.findMany({
    where: {
      author: {
        id: userId,
      },
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
  })

  if (!user) {
    return
  }

  return (
    <main className="min-h-screen h-fit">
      <div className="mx-auto bg-app-light flex flex-col items-center rounded-xl py-4 px-12 max-md:px-2 mb-7">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={user.image as string}
            alt="your profile picture"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Heading className="text-gray-700">{user.name}</Heading>
        </div>
        <hr className="border-gray-700 w-full my-6" />
        <div className="flex flex-col w-full gap-4 max-md:gap-8">
          <Heading className="text-gray-700 max-md:text-center">
            User recipes:
          </Heading>
          {!recipes.length ? (
            <div className="flex gap-4 flex-col items-center">
              <Paragraph className="text-gray-700 text-center">
                This user don&apos;t have recipes.
              </Paragraph>
            </div>
          ) : (
            recipes.map((recipe) => (
              <RecipeInfo
                key={recipe.id}
                recipe={recipe}
                deleteButton={false}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default Profile
