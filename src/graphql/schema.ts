export const typeDefs = `#graphql
  type User {
    id:        String
    name:      String
    image:     String
    createdAt: String
    recipes:   [Recipe]
    comments:  [Comment]
  }

  type Recipe {
    id:         Int
    image:      String
    title:      String
    content:    String
    author:     User
    authorId:   String
    createdAt:  String
    categories: [Category]
    comments:   [Comment]
  }

  type Comment {
    id:       Int
    content:  String
    author:   User
    authorId: String
    recipe:   Recipe
    recipeId: Int
    createdAt: String
  }

  type Category {
    id:      Int
    name:    String
    recipes: [Recipe]
  }

  type Query {
    recipes:                              [Recipe]
    recipe(id: Int!):                     Recipe
    recipesByCategory(category: String!): [Recipe]
    categories:                           [Category]
    category(name: String!):              Category
    user(id: String!):                    User
  }

  type Mutation {
    createRecipe(image: String!, title: String!, content: String!, authorId: String!, categoryNames: [String]!): Recipe
    createComment(content: String!, authorId: String!, recipeId: Int!): Comment
    createUser(name: String!): User
    deleteRecipe(id: Int!): Recipe
  }
`
