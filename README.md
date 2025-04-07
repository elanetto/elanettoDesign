![image](https://raw.githubusercontent.com/elanetto/images/refs/heads/main/img/readme-images/elanettodesign.png)
Visit deployed project: [elanetto Design](https://elanettodesign.onrender.com/)

# Front End Development - Year 2 - Agency 2

**Task:** Work as a group with sprints and a scrum master to create a project from sracth. We choose to create an online sticker store.

---------

## 🎨 Figma 🎨 
![image](https://raw.githubusercontent.com/elanetto/images/refs/heads/main/img/readme-images/figma-checkout-elanettodesign.png)

Have a look at the design prototype of the website in Figma here: [FIGMA](https://www.figma.com/design/BSJvz3lS6ZuZn2gqsaBSLN/Elanetto-sticker-shop?node-id=0-1&p=f)

---------


## 💬 Tools & Languages 💬
These languages, and Figma, were used:
- HTML
- JavaScript
- Tailwind
- Vite
- React
- TypeScript
- mySQL

### Hey Meta showcase:
![image](https://raw.githubusercontent.com/elanetto/images/refs/heads/main/img/readme-images/elanetto-heymeta-readme.png)

The project was written and made on a MacBook, using [Visual Studio Code](https://code.visualstudio.com/)

---------

## 📂 Site map 📂

All users, logged in or not, can search for stickers and see the product cards.

### Main site
- "/"

### Account
- "/login"
- "/register"
- "/account"

### Shop
- "/"
- "/products"
- "/products/:product_id"
- "/cart"
- "/checkout"
- "/checkout-success"

### Shop by category
- "/category/:product_type"
- "category/:categoryId/:product_type"

### Admin
Admin does not have its own path, but is only unlocked when the role of the user is set to admin.

---------


## 🌤️ API 🌤️
The backend of this project is built using Node.js, Express, and Sequelize (with a MySQL database). The architecture follows the MVC pattern (Model-View-Controller), making the codebase modular and maintainable.

- Models define the database tables and relationships using Sequelize.
- Controllers handle the business logic for each resource (e.g., products, categories, orders).
- Routes map HTTP requests to their corresponding controller actions.
- Authentication is managed with JSON Web Tokens (JWT).
- The API is RESTful, supporting full CRUD operations for resources like stickers, bookmarks, bundles, categories, orders, and more.
- It is deployed using Render, with CORS and middleware configured for security and performance.

---------


# 🌟 Getting Started 🌟
Make sure you have the following installed:

- A web browser (e.g. Chrome)
- A code editor (e.g. Visual Studio Code)
- Node.js and npm (v18+ recommended)

##  🛠️ Installation 🛠️
1. Clone the repository:
```<language>
git clone https://github.com/elanetto/elanettoDesign.git
```

2. Navigate to the project directory:
```<language>
cd elanettoDesign
```

3. Install dependencies:
```<language>
npm install
```
This will install dependencies for both frontend and backend because the project is set up with workspaces. You might need to do this inside both the frontend and backend folders.

4. Start the development server:
```<language>
npm run dev
```

