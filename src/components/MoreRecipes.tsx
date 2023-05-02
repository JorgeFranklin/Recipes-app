import { Recipe } from '@prisma/client'

import RecipeCard from '@/src/components/RecipeCard'
import { Heading } from '@/src/components/ui/Heading'

export type MoreRecipesProps = {
  recipes: Pick<Recipe, 'id' | 'image' | 'title'>[]
}

const MoreRecipes = ({ recipes }: MoreRecipesProps) => {
  return (
    <div className="flex flex-col items-end max-md:flex-row max-md:justify-center flex-wrap gap-8 mb-8">
      <div className="flex flex-col">
        <Heading className="max-md:text-center mb-8">Related recipes</Heading>
        <div className="flex flex-col gap-16">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MoreRecipes
