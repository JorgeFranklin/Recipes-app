import MoreRecipes from '@/src/components/MoreRecipes'
import RecipeDetail from '@/src/components/RecipeDetail'
import db from '@/src/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'

type Context = {
  params: {
    id: string
  }
}

const Recipe = async ({ params: { id } }: Context) => {
  const session = await getServerSession(authOptions)

  const recipe = await db.recipe.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      image: true,
      title: true,
      content: true,
      author: true,
      categories: {
        select: {
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          author: true,
          content: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!recipe) {
    return
  }

  const relatedRecipes = await db.recipe.findMany({
    take: 6,
    where: {
      categories: {
        some: {
          name: {
            in: recipe.categories.map((category) => category.name),
          },
        },
      },
      id: {
        not: recipe.id,
      },
    },
  })

  return (
    <main>
      <div className="h-full grid grid-cols-2 max-md:grid-cols-1">
        {/* @ts-expect-error Server Component */}
        <RecipeDetail
          recipe={recipe}
          author={recipe.author}
          comments={recipe.comments}
          currentUser={session}
        />

        <MoreRecipes recipes={relatedRecipes} />
      </div>
    </main>
  )
}

export default Recipe
