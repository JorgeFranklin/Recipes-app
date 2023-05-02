import { gql } from '@apollo/client'

export const GET_RECIPE = gql`
  query GET_RECIPE($recipeId: Int!) {
    recipe(id: $recipeId) {
      title
      image
      content
      author {
        id
        name
        image
      }
      comments {
        author {
          id
          name
          image
        }
        content
        createdAt
      }
    }
  }
`

export const GET_RECIPES_BY_CATEGORY = gql`
  query GET_RECIPES_BY_CATEGORY($category: String!) {
    recipesByCategory(category: $category) {
      id
      image
      title
    }
  }
`
