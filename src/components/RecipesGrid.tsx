import { Recipe } from '@prisma/client'
import RecipeCard from '@/src/components/RecipeCard'
import { Heading } from './ui/Heading'

export type RecipeGridProps = {
  title: string
  recipes: Pick<Recipe, 'id' | 'image' | 'title'>[]
}

const RecipesGrid = ({ title, recipes }: RecipeGridProps) => {
  return (
    <div className="flex mb-24 max-md:block">
      <div className="mx-auto max-sm:w-fit">
        <Heading size="large" className="justify-self-start mb-4">
          {title}
        </Heading>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 grid-rows-none gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipesGrid
