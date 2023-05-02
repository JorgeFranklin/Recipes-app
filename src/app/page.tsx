import RecipesGrid from '@/src/components/RecipesGrid'
import db from '@/src/lib/db'

export default async function Home() {
  const breakFastRecipes = await db.recipe.findMany({
    where: {
      categories: {
        some: {
          name: 'breakfast',
        },
      },
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
    take: 8,
  })

  const lunchRecipes = await db.recipe.findMany({
    where: {
      categories: {
        some: {
          name: 'lunch',
        },
      },
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
    take: 8,
  })

  const saladRecipes = await db.recipe.findMany({
    where: {
      categories: {
        some: {
          name: 'salad',
        },
      },
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
    take: 8,
  })

  const dinnerRecipes = await db.recipe.findMany({
    where: {
      categories: {
        some: {
          name: 'dinner',
        },
      },
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
    take: 8,
  })

  return (
    <main className="min-h-screen h-fit">
      <RecipesGrid title="Breakfast" recipes={breakFastRecipes} />
      <RecipesGrid title="Lunch" recipes={lunchRecipes} />
      <RecipesGrid title="Salad" recipes={saladRecipes} />
      <RecipesGrid title="Dinner" recipes={dinnerRecipes} />
    </main>
  )
}
