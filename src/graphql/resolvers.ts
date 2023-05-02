import {
  Category,
  PrismaClient,
  Recipe,
  User,
  Comment,
  CategoryName,
} from '@prisma/client'
import { format } from 'date-fns'

export type Context = {
  db: PrismaClient
}

export const resolvers = {
  Query: {
    recipes: async (parent: {}, args: Recipe, context: Context) => {
      const recipes = await context.db.recipe.findMany()

      return recipes
    },

    recipe: async (parent: {}, args: Pick<Recipe, 'id'>, context: Context) => {
      const recipe = await context.db.recipe.findFirst({
        where: {
          id: args.id,
        },
      })

      return recipe
    },

    recipesByCategory: async (
      parent: {},
      args: { category: CategoryName },
      context: Context
    ) => {
      const recipes = await context.db.recipe.findMany({
        where: {
          categories: {
            some: {
              name: args.category,
            },
          },
        },
      })

      return recipes
    },

    categories: async (parent: {}, args: Category, context: Context) => {
      const categories = await context.db.category.findMany()
      return categories
    },

    category: async (parent: {}, args: Category, context: Context) => {
      const category = await context.db.category.findFirst({
        where: {
          name: args.name,
        },
      })

      return category
    },

    user: async (parent: {}, args: Pick<User, 'id'>, context: Context) => {
      const user = await context.db.user.findFirst({
        where: {
          id: args.id,
        },
      })

      return user
    },
  },

  Mutation: {
    createRecipe: async (
      parent: {},
      args: Omit<Recipe, 'id' | 'createdAt'> & {
        categoryNames: CategoryName[]
      },
      context: Context
    ) => {
      const categories = await context.db.category.findMany({
        where: {
          name: { in: args.categoryNames },
        },
      })

      const recipe = await context.db.recipe.create({
        data: {
          image: args.image,
          title: args.title,
          content: args.content,
          author: {
            connect: {
              id: args.authorId,
            },
          },
          categories: {
            connect: categories.map((category) => ({ id: category.id })),
          },
        },
      })

      return recipe
    },

    createComment: async (
      parent: {},
      args: Omit<Comment, 'id' | 'createdAt'>,
      context: Context
    ) => {
      const comment = await context.db.comment.create({
        data: {
          content: args.content,
          author: {
            connect: {
              id: args.authorId,
            },
          },
          recipe: {
            connect: {
              id: args.recipeId,
            },
          },
        },
      })

      return comment
    },

    createUser: async (parent: {}, args: User, context: Context) => {
      const user = await context.db.user.create({
        data: {
          name: args.name,
          image: args.image,
          email: args.email,
        },
      })

      return user
    },

    deleteRecipe: async (
      parent: {},
      args: Pick<Recipe, 'id'>,
      context: Context
    ) => {
      const recipe = await context.db.recipe.delete({
        where: {
          id: args.id,
        },
      })

      return recipe
    },
  },

  Recipe: {
    author: async (parent: Recipe, args: {}, context: Context) => {
      const author = await context.db.user.findFirst({
        where: {
          id: parent.authorId,
        },
      })

      return author
    },

    categories: async (parent: Recipe, args: {}, context: Context) => {
      const categories = await context.db.category.findMany({
        where: {
          recipes: {
            some: {
              id: parent.id,
            },
          },
        },
      })

      return categories
    },

    comments: async (parent: Recipe, args: {}, context: Context) => {
      const comments = await context.db.comment.findMany({
        where: {
          recipeId: parent.id,
        },
      })

      return comments
    },

    createdAt: async (parent: Recipe, args: {}, context: Context) => {
      const { createdAt } = parent
      return format(createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    },
  },

  Comment: {
    author: async (parent: Comment, args: {}, context: Context) => {
      const author = await context.db.user.findFirst({
        where: {
          id: parent.authorId,
        },
      })

      return author
    },

    recipe: async (parent: Comment, args: {}, context: Context) => {
      const recipe = await context.db.recipe.findFirst({
        where: {
          id: parent.recipeId,
        },
      })

      return recipe
    },

    createdAt: async (parent: Recipe, args: {}, context: Context) => {
      const { createdAt } = parent
      return format(createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    },
  },

  Category: {
    recipes: async (parent: Category, args: {}, context: Context) => {
      const recipes = await context.db.recipe.findMany({
        where: {
          categories: {
            some: {
              name: parent.name,
            },
          },
        },
      })

      return recipes
    },
  },

  User: {
    recipes: async (parent: User, args: {}, context: Context) => {
      const recipes = await context.db.recipe.findMany({
        where: {
          authorId: parent.id,
        },
      })

      return recipes
    },

    comments: async (parent: User, args: {}, context: Context) => {
      const comments = await context.db.comment.findMany({
        where: {
          authorId: parent.id,
        },
      })

      return comments
    },

    createdAt: async (parent: User, args: {}, context: Context) => {
      const { createdAt } = parent
      return format(createdAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    },
  },
}
