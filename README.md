# Adonis.js Full Stack Application
A full-stack web application for managing and displaying a catalog of products, built for the I311 Advanced Web Solutions Assessment 3. The application uses AdonisJS for backend development, edge.js for server-side templating, SQLite for data storage, and Bootstrap 5.3.3 for responsive styling.
## Project Overview
This application allows users to browse, search, and filter products by name and category.

## Technologies

- AdonisJS 6: Node.js framework for backend development
- edge.js: Server-side templating engine for rendering views
- SQLite: Lightweight database for persistent storage
- Bootstrap 5.3.3: CSS framework for responsive design
- Lucid ORM: Database modeling and querying
- AdonisJS Drive: Secure file upload handling
- Git/GitHub: Version control and collaboration

## Features

Product Listing: Displays products with name, thumbnail image, and category, paginated at 6 items per page.
Product Details: Shows full product information (name, description, price, larger image, category).
Search and Filter: Server-side search by product name and filtering by category, accessible to all users.
Authentication: Login/logout functionality with role-based access control, this feature was attempted but unfortunately, I was unable to get it to work.
CRUD Operations:
Products: Create, update, delete with image uploads.
Categories: Create, update, delete.
Image Uploads: Securely upload product images (jpg/jpeg/png, max 2MB), stored in public/uploads.


## Setup Instructions
Follow these steps to set up and run the application locally:

### Clone the Repository:
git clone https://github.com/hannah-henwood/adonis-full-stack.git
cd adonis-full-stack


### Install Dependencies, such as node_modules:
npm install

### Start the Server:
node ace serve --watch


### Access the Application:

Open http://localhost:3333 in your browser.

## Navigation:
Use the Bootstrap navbar to access Products, Categories, Login/Logout, and CRUD actions.

## Submission Details

GitHub: https://github.com/hannah-henwood/adonis-full-stack
Video: A 6-minute MP4 presentation is provided separately via a Google Drive link, covering introduction, feature demo, technical explanation, and conclusion.
Exclusions: The node_modules folder is not included in the submission zip.

## Notes
- As I was unable to complete the Authentication & Authorisation section, there is no restriction on what the user is able to do, but the application, as it is, serves as a prototype of what could be given the time and resources.
- There is also an issue with the images disappearing when the server reloads.


## Author
Hannah Henwood, I311 Advanced Web Solutions, 2025
