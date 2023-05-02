import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route'
import { Heading } from '@/src/components/ui/Heading'
import RecipeInfo from '@/src/components/RecipeInfo'
import db from '@/src/lib/db'
import SignOutButton from '@/src/components/SignOutButton'
import Link from 'next/link'
import { buttonVariants } from '@/src/components/ui/Button'
import { Paragraph } from '@/src/components/ui/Paragraph'
import { Plus } from 'lucide-react'

const Account = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  const recipes = await db.recipe.findMany({
    where: {
      author: {
        email: session.user!.email as string,
      },
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
  })

  return (
    <main className="min-h-screen h-fit">
      <div className="mx-auto bg-app-light flex flex-col items-center rounded-xl py-4 px-12 max-md:px-2 mb-7">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={session.user!.image as string}
            alt="your profile picture"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Heading className="text-gray-700">{session.user?.name}</Heading>
          <SignOutButton />
        </div>
        <hr className="border-gray-700 w-full my-6" />
        <div className="flex flex-col w-full gap-4 max-md:gap-8">
          <Heading className="text-gray-700 max-md:text-center">
            Your recipes:
          </Heading>
          {!recipes.length ? (
            <div className="flex gap-4 flex-col items-center">
              <Paragraph className="text-gray-700 text-center">
                You don&apos;t have recipes yet create recipes and they appeared
                here.
              </Paragraph>
              <Link
                href="/create"
                className={buttonVariants({ className: 'w-fit' })}
              >
                <Plus className="mr-2" />
                Click here to create your recipes
              </Link>
            </div>
          ) : (
            recipes.map((recipe) => (
              <RecipeInfo key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default Account
