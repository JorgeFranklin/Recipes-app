'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2, Trash2Icon } from 'lucide-react'

import { Heading } from '@/src/components/ui/Heading'
import { Button } from '@/src/components/ui/Button'
import { useMutation } from '@apollo/client'
import { DELETE_RECIPE } from '@/src/graphql/mutations'

export type RecipeInfoProps = {
  recipe: {
    id: number
    image: string
    title: string
  }
  deleteButton?: boolean
}

const RecipeInfo = ({ recipe, deleteButton = true }: RecipeInfoProps) => {
  const [success, setSuccess] = useState(false)
  const [deleteRecipeMutation, { loading }] = useMutation(DELETE_RECIPE)

  const deleteRecipe = async () => {
    const { errors } = await deleteRecipeMutation({
      variables: { deleteRecipeId: recipe.id },
    })

    if (!errors) {
      setSuccess(true)
    }
  }

  return (
    <div
      className={`inline-flex gap-4 filter hover:brightness-110 transition-all duration-200 rounded-2xl items-center bg-app-light max-md:flex-col pr-2 ${
        success ? 'hidden' : ''
      }`}
    >
      <Link
        href={`/recipe/${recipe.id}`}
        className="flex w-full items-center gap-4"
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={100}
          height={100}
          className="rounded-2xl"
        />
        <Heading size="small" className="text-black flex-grow">
          {recipe.title.length > 33
            ? recipe.title.slice(0, 30) + '...'
            : recipe.title}
        </Heading>
      </Link>
      {deleteButton && (
        <div className="flex w-full justify-end max-md:justify-center">
          <Button
            variant="dangerous"
            className="text-white"
            onClick={deleteRecipe}
            isLoading={loading}
            iconForLoading={<Loader2 className="animate-spin mr-2" />}
          >
            <Trash2Icon />
          </Button>
        </div>
      )}
    </div>
  )
}

export default RecipeInfo
