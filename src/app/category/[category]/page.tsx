import RecipesGrid from '@/src/components/RecipesGrid'
import db from '@/src/lib/db'
import { CategoryName } from '@prisma/client'

type Context = {
  params: {
    category: CategoryName
  }
}

const Category = async ({ params: { category } }: Context) => {
  const recipes = await db.recipe.findMany({
    where: {
      categories: {
        some: {
          name: category,
        },
      },
    },
  })

  return (
    <main className="h-fit min-h-screen">
      <RecipesGrid title={`Category ${category}`} recipes={recipes} />
    </main>
  )
}

export default Category
