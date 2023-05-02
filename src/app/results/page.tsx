import Empty from '@/src/components/Empty'
import RecipesGrid from '@/src/components/RecipesGrid'
import { Heading } from '@/src/components/ui/Heading'
import db from '@/src/lib/db'

type Context = {
  searchParams: {
    q: string
  }
}

const Results = async ({ searchParams: { q } }: Context) => {
  const searchTerm = q

  const recipesFound = await db.recipe.findMany({
    where: {
      title: {
        contains: searchTerm,
      },
    },
  })

  if (!recipesFound.length) {
    return (
      <main className="h-fit min-h-screen">
        <Empty />
      </main>
    )
  }

  return (
    <main className="h-fit min-h-screen">
      <RecipesGrid title="Results" recipes={recipesFound} />
    </main>
  )
}

export default Results
