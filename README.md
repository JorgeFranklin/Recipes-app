# Fullstack recipes app built using TypeScript, Next 13, Next Auth, TailwindCSS, GraphQL, Prisma, Apollo Client, Apollo Server

This is a Full Stack Project built using ***TypeScript, Next 13, Apollo-Client, TailwindCSS*** in frontend and using ***GraphQL, Apollo-Server, Prisma & MySQL*** in backend.

The project is a "social network" of recipes, you can see the profile of other users and also their recipes, you can comment on recipes, create and delete your recipes and also search for recipes.

***You can take a look at the project*** [here](https://recipe-app-portfolio.netlify.app).

# Table of contents

- [Project walk-through](#project-walk-through)

  - [Home](#home)
  
  - [Recipe](#recipe)
  
  - [Create recipe](#create-recipe)
  
  - [Account](#account)
  
  - [Search](#search)
  
  - [Results](#results)
  
  - [Discover](#discover)
  
- Technologies used

# Project walk-through

## Home

![image](https://user-images.githubusercontent.com/118635631/236364864-56e38219-c92a-455c-9820-3ab1dab91823.png)

On this page we can see 4 categories of recipes "Breakfast", "Lunch", "Salad", "Dinner". A very important component for the application is the "RecipeCard" it is rendered several times on the home page, it is responsible for displaying the title, the recipe image and directing the user to the respective recipe page.

## Recipe

### image 1
![image](https://user-images.githubusercontent.com/118635631/236365794-8e1eb315-3ae0-4347-ad28-9cba1b4819af.png)
### image 2
![image](https://user-images.githubusercontent.com/118635631/236365837-b1bea876-f7d0-42d3-b22c-7b16ffb70c78.png)

This page is where we can see the recipe author and the recipe details, such as the image and how to make it. We can also see the comments that this recipe has received and we can also leave a comment.

## Create recipe

### image 1
![image](https://user-images.githubusercontent.com/118635631/236366713-57b17a38-10c3-42e2-836c-ec028a662435.png)
### image 2
![image](https://user-images.githubusercontent.com/118635631/236366766-eb5c695c-a76a-4d47-89c4-51c03ba3b47f.png)

Here is where you create a recipe. You can only access this page if you are logged in. To create your recipe, you need to first give it a title and then provide the URL of the image you want to appear as the image of your recipe. After that, you write your recipe using markdown language. It needs to be written in this language so that the recipe is displayed in a beautiful HTML format instead of plain text. Finally, you choose which categories your recipe belongs to and create it by clicking on the "create" button.
