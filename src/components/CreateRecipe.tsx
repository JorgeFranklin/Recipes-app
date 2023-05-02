'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Remarkable } from 'remarkable'

import { Heading, headingVariants } from '@/src/components/ui/Heading'
import Input from '@/src/components/ui/Input'
import { Button, buttonVariants } from '@/src/components/ui/Button'
import { Paragraph, paragraphVariants } from '@/src/components/ui/Paragraph'
import '@/src/styles/markdown-preview.css'
import Link from 'next/link'
import { CategoryName } from '@prisma/client'
import { useMutation } from '@apollo/client'
import { CREATE_RECIPE } from '@/src/graphql/mutations'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Error from '@/src/components/Error'

const md = new Remarkable()

export type CreateRecipeProps = {
  authorId: string
}

const CreateRecipe = ({ authorId }: CreateRecipeProps) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [html, setHTML] = useState('')
  const [text, setText] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<CategoryName[]>(
    []
  )
  const [formError, setFormError] = useState('')

  const router = useRouter()

  const [createRecipeMutation, { loading }] = useMutation(CREATE_RECIPE)

  const createRecipe = async (e: FormEvent) => {
    e.preventDefault()

    if (!title) {
      setFormError('Please give your recipe a title.')
      return
    }

    if (!image) {
      setFormError('Please insert your recipe image URL.')
      return
    }

    if (!html) {
      setFormError('Please write your recipe.')
      return
    }

    if (!selectedCategories.length) {
      setFormError('Please select a category for your recipe.')
      return
    }

    const createRecipeVariables = {
      title,
      image,
      categoryNames: selectedCategories,
      content: html,
      authorId,
    }

    const {
      data: { createRecipe },
    } = await createRecipeMutation({
      variables: createRecipeVariables,
    })

    router.push(`/recipe/${createRecipe.id}`)
  }

  const handleAddCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const categoryValue = e.target.value as CategoryName
    const isChecked = e.target.checked

    if (isChecked) {
      setSelectedCategories((prev) => [...prev, categoryValue])
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryValue)
      )
    }
  }

  return (
    <form onSubmit={createRecipe} className="flex flex-col gap-8 mb-12">
      <div className="flex flex-col gap-4">
        <label
          className={headingVariants({ className: 'w-fit h-fit' })}
          htmlFor="title"
        >
          Title
        </label>
        <Input
          id="title"
          placeholder="Your recipe title"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          className={headingVariants({ className: 'w-fit h-fit' })}
          htmlFor="image"
        >
          Image url
        </label>
        <Input
          id="image"
          placeholder="https://example.com/image.jpg"
          onChange={(e) => setImage(e.target.value)}
          type="url"
          pattern="https://.*"
        />
      </div>
      <div className="flex max-lg:flex-col gap-4 text-black items-end max-md:items-center">
        <div className="flex flex-col gap-4 w-full">
          <label
            className={headingVariants({ className: 'w-fit h-fit' })}
            htmlFor="mardown"
          >
            Write your recipe
          </label>
          <Paragraph size="small">
            Write in Markdown language learn more{' '}
            <Link
              href="https://www.markdownguide.org/basic-syntax/"
              className="text-blue-300"
              target="_blank"
            >
              here
            </Link>
          </Paragraph>
          <textarea
            id="mardown"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setHTML(md.render(e.target.value))
            }}
            className={buttonVariants({
              className: 'w-full min-h-[500px] placeholder:text-2xl',
            })}
            placeholder="Write here!"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Heading>Preview</Heading>
          <div
            className="rounded-2xl px-4 py-2 bg-app-light w-full max-w-[700px] max-lg:max-w-full h-[500px] break-words overflow-y-auto markdown-preview"
            dangerouslySetInnerHTML={{ __html: md.render(text) }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="categories" className={headingVariants()}>
          Categories:
        </label>
        <div className="grid grid-cols-2 gap-4 max-w-[450px]">
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="breakfast"
              value="breakfast"
              onChange={handleAddCategory}
              id="breakfast"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="breakfast"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Breakfast
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="lunch"
              value="lunch"
              onChange={handleAddCategory}
              id="lunch"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="lunch"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Lunch
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="dinner"
              value="dinner"
              onChange={handleAddCategory}
              id="dinner"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="dinner"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Dinner
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="appetizer"
              value="appetizer"
              onChange={handleAddCategory}
              id="appetizer"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="appetizer"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Appetizer
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="salad"
              value="salad"
              onChange={handleAddCategory}
              id="salad"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="salad"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Salad
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="dessert"
              value="dessert"
              onChange={handleAddCategory}
              id="dessert"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="dessert"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Dessert
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="snack"
              value="snack"
              onChange={handleAddCategory}
              id="snack"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="snack"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Snack
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="soup"
              value="soup"
              onChange={handleAddCategory}
              id="soup"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="soup"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Soup
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="holiday"
              value="holiday"
              onChange={handleAddCategory}
              id="holiday"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="holiday"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Holiday
            </label>
          </div>
          <div className="flex items-center pl-7">
            <input
              type="checkbox"
              name="vegetarian"
              value="vegetarian"
              onChange={handleAddCategory}
              id="vegetarian"
              className="-ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-app-light outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-app-light checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-app-light checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#EBE9D3]"
            />
            <label
              htmlFor="vegetarian"
              className={paragraphVariants({
                size: 'small',
                className: 'pt-1 cursor-pointer',
              })}
            >
              Vegetarian
            </label>
          </div>
        </div>
      </div>
      <div className="flex max-md:justify-center mt-4">
        <Button
          variant="safe"
          size="large"
          type="submit"
          isLoading={loading}
          iconForLoading={<Loader2 className="animate-spin mr-2" />}
        >
          Create
        </Button>
      </div>
      {!!formError && (
        <Error message={formError} onClick={() => setFormError('')} />
      )}
    </form>
  )
}

export default CreateRecipe
