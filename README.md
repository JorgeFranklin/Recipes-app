<h1 align="center">
  <img height="150" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript" />
  <img height="150" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS" />
  <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="150" height="150" />
  <img src="https://user-images.githubusercontent.com/25181517/192107856-aa92c8b1-b615-47c3-9141-ed0d29a90239.png" width="150" height="150"/>
  <img src="https://user-images.githubusercontent.com/118635631/236372351-8b73ba9c-b94b-4164-a5ee-a4cd41915e64.png" width="150" height="150"/>
  <img src="https://user-images.githubusercontent.com/118635631/236373783-35b97cd7-95a2-40b9-bb87-62aa558faa48.png" width="150" height="150">
</h1>

# Fullstack recipes app built using TypeScript, Next 13, Next Auth, TailwindCSS, GraphQL, Prisma, Apollo Client, Apollo Server

This is a Full Stack Project built using ***TypeScript, Next 13, Next Auth, Apollo-Client, TailwindCSS*** in frontend and using ***GraphQL, Apollo-Server, Prisma & MySQL*** in backend.

The project is a "social network" of recipes, you can see the profile of other users and also their recipes, you can comment on recipes, create and delete your recipes and also search for recipes.

### **You can take a look at the project** [here](https://recipe-app-portfolio.netlify.app).

# Table of contents

- [Project walk-through](#project-walk-through)

  - [Home](#home)
  
  - [Recipe](#recipe)
  
  - [Create recipe](#create-recipe)
  
  - [Account](#account)
  
  - [Profile](#profile)
  
  - [Search](#search)
  
  - [Results](#results)
  
  - [Discover](#discover)
  
  - [Category](#category)
  
- [Technologies used](#technologies-used)

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

## Account

![image](https://user-images.githubusercontent.com/118635631/236368450-17b1421a-3c4c-4bae-ad2b-e931b5d628f1.png)

This page shows your account and your recipes. You can delete any recipe or log out of your account.

## Profile

![image](https://user-images.githubusercontent.com/118635631/236368897-c59dd4c6-9c38-43a8-9dbf-57a4a21db4a0.png)

This page looks like the account page, but it's actually how a user views the profile of another user. They can see the account and all the recipes of that user.

## Search

![image](https://user-images.githubusercontent.com/118635631/236369300-40af08a4-1048-4310-b8ef-62a8ca6da7af.png)

This component is responsible for taking the typed recipe and passing it to the "results" page.

## Results

![image](https://user-images.githubusercontent.com/118635631/236369750-55f4f4c7-2834-4524-9524-a7e009294323.png)

This page takes the typed recipe from the URL and searches for corresponding recipes to display. It displays all of them, but in this case, only one was found.

## Discover

### closed

![image](https://user-images.githubusercontent.com/118635631/236370286-2bb62c06-75b6-438f-a93c-2d219a10837b.png)

### open

![image](https://user-images.githubusercontent.com/118635631/236370436-8e1559be-afa5-4f2f-9cd3-e729f61bc8bf.png)

"Discover" is a dropdown menu that displays several categories. When you click on one, you will be taken to the "category" page, which will display recipes from the category you chose.

## Category

![image](https://user-images.githubusercontent.com/118635631/236370806-ff3d23e2-7b32-4841-b39b-0ef17244796f.png)

This page retrieves the category from the URL and displays the recipes that match that category.

# Technologies used

I have built this project using the following technologies:

- React
- TypeScript
- NextJS 13
- Next Auth
- TailwindCSS
- Class Variance Authority
- Clsx
- GraphQL
- Apollo Client
- Prisma
- Apollo Server
- Date fns
- NodeJS
