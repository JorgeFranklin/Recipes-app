import Image from 'next/image'

import { Heading } from './ui/Heading'
import Link from 'next/link'
import { Recipe } from '@prisma/client'

export type RecipeCardProps = {
  recipe: Pick<Recipe, 'id' | 'image' | 'title'>
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="w-[300px] rounded-lg transition-all duration-200 hover:scale-95 max-sm:self-end">
      <Link href={`/recipe/${recipe.id}`} className="w-full">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={150}
          quality={100}
          priority
          className="rounded-lg min-w-[300px] min-h-[150px]"
        />
        <Heading className="text-center break-words w-full" size="small">
          {recipe.title.length > 70
            ? recipe.title.slice(0, 67) + '...'
            : recipe.title}
        </Heading>
      </Link>
    </div>
  )
}

export default RecipeCard
