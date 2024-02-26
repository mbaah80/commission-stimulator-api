# Backend README

This project serves as the backend for the commission plan simulator. It provides APIs for managing orders, products, commissions, and calculating total commissions for staff members.

## Features

- **Order Management**: Create, read, update, and delete orders.
- **Product Management**: CRUD operations for products.
- **Commission Calculation**: Calculate total commissions for staff members based on product sales.
- **Database Integration**: Uses MongoDB as the database for storing orders, products, and commissions.
- **RESTful APIs**: Provides RESTful endpoints for interacting with orders, products, and commissions.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/mbaah80/commission-stimulator-api.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the Docker Compose setup:

    ```bash
    docker-compose up
    ```

5. Access the backend APIs at `http://localhost:8000`.

## APIs

### Orders

- **GET /orders**: Fetch all orders.
- **GET /orders/:id**: Fetch a specific order by ID.
- **POST /orders**: Create a new order.
- **PUT /orders/:id**: Update an existing order.
- **DELETE /orders/:id**: Delete an existing order.

### Products

- **GET /products**: Fetch all products.
- **GET /products/:id**: Fetch a specific product by ID.
- **POST /products**: Create a new product.
- **PUT /products/:id**: Update an existing product.
- **DELETE /products/:id**: Delete an existing product.

### Commission

- **POST /commission/calculator**: Calculate total commissions for a staff member.
- **GET /commission**: Fetch all commissions.
- **GET /commission/:id**: Fetch a specific commission by ID.
- **POST /commission**: Create a new commission.
- **PUT /commission/:id**: Update an existing commission.
- **DELETE /commission/:id**: Delete an existing commission.
- **GET /commission/product/:productId**: Fetch all commissions for a specific product.


## Learn More

To learn more about Docker Compose, take a look at the following resources: