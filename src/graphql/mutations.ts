import { gql } from '@apollo/client'

export const CREATE_RECIPE = gql`
  mutation Mutation(
    $image: String!
    $title: String!
    $content: String!
    $authorId: String!
    $categoryNames: [String]!
  ) {
    createRecipe(
      image: $image
      title: $title
      content: $content
      authorId: $authorId
      categoryNames: $categoryNames
    ) {
      id
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT(
    $content: String!
    $authorId: String!
    $recipeId: Int!
  ) {
    createComment(content: $content, authorId: $authorId, recipeId: $recipeId) {
      id
      author {
        id
        image
        name
      }
      content
      createdAt
    }
  }
`

export const DELETE_RECIPE = gql`
  mutation DELETE_RECIPE($deleteRecipeId: Int!) {
    deleteRecipe(id: $deleteRecipeId) {
      id
      image
      title
    }
  }
`
