
# YA Online Shop

## Project Overview

YA Online Shop is a web-based e-commerce application built using JavaScript. It allows users to browse and purchase bath bombs, providing a delightful shopping experience with a user-friendly interface and efficient functionality. **Please note that this is not a real webshop and cannot be used for actual purchases.**


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- **Product Browsing**: Users can view a variety of bath bombs.
- **Shopping Cart**: Users can add items to their cart.
- **Responsive Design**: The application is fully responsive.
- **User Authentication**: Users can create an account and log in to their profiles.
- **Checkout Process**: A streamlined checkout process for completing purchases.

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:

   Open a terminal and run the following command:

   ```bash
   git clone https://github.com/CodecoolGlobal/ya-online-shop-javascript-bmkriszti
   ```
2. **Navigate to the project directory**:

```bash
cd ya-online-shop-javascript-bmkriszti
```

``## Open the Project

1. Open the project in your preferred code editor.
2. Open the `index.html` file in a web browser to view the application.

## Docker Setup

If you want to run the project using Docker, follow these steps:

### Build the Docker Image

Navigate to the project directory and run the following command:

```bash
docker build -t ya-online-shop .`` 

### Run the Docker Container

```bash
`docker run -p 8080:80 ya-online-shop` 
```
### Access the Application

Open your web browser and go to [http://localhost:8080](http://localhost:8080) to view the application running in Docker.

## Usage

Once the application is open in the browser, you can browse through the available bath bombs.

1.  Click on a bath bomb to view its details.
2.  Add items to your shopping cart by clicking the "Add to Cart" button.
3.  View your cart to manage your selected items.
4.  Proceed to checkout to complete your purchase.


## Technologies Used

- **HTML**: For structuring the web pages.
- **CSS**: For styling the application.
- **JavaScript**: For implementing the application logic.
- **Node.js**: For the backend server.
- **Express**: For building the API to handle requests.
- **Local Storage**: To store user cart data and preferences.

