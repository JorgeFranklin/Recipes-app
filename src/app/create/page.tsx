import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route'
import CreateRecipe from '@/src/components/CreateRecipe'
import db from '@/src/lib/db'

const Create = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  const author = await db.user.findFirst({
    where: {
      email: session.user?.email as string,
    },
    select: {
      id: true,
    },
  })

  return (
    <main className="min-h-screen h-fit">
      <CreateRecipe authorId={author!.id} />
    </main>
  )
}

export default Create
