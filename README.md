# Restaurant API

A RESTful API for managing a restaurant's operations, including tables, orders, and products.

## Features

- **Tables Management**

  - List all tables
  - Track table sessions (opening and closing)
  - Support for multiple tables

- **Products Management**

  - CRUD operations for menu items
  - Product search by name
  - Price management

- **Orders Management**
  - Create new orders
  - List orders by table session
  - Calculate order totals
  - Track order quantities and prices

## Tech Stack

- Node.js
- Express.js
- TypeScript
- SQLite (with Knex.js as query builder)
- Zod for request validation

## Project Structure

```
src/
├── controllers/         # Request handlers
├── database/
│   ├── migrations/     # Database migrations
│   ├── seeds/         # Seed data
│   └── types/         # TypeScript type definitions
├── middlewares/        # Express middlewares
├── routes/            # API routes
└── utils/             # Utility functions
```

## API Endpoints

### Tables

- `GET /tables` - List all tables

### Table Sessions

- `GET /table-sessions` - List all table sessions
- `POST /table-sessions` - Open a new table session
- `PATCH /table-sessions/:id` - Close a table session

### Products

- `GET /products` - List all products (with optional name filter)
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Remove a product

### Orders

- `GET /orders/sessions-table/:table_session_id` - List orders for a table session
- `POST /orders` - Create a new order
- `GET /orders/sessions-table/:table_session_id/total` - Get total for a table session

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run migrations:
   ```bash
   npm run knex -- migrate:latest
   ```
4. Run seeds:
   ```bash
   npm run knex -- seed:run
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

The server will start on port 3333.

## Database Schema

The application uses SQLite with the following main tables:

- `tables`: Stores restaurant tables information
- `tables_sessions`: Tracks table sessions (opening/closing times)
- `products`: Menu items with prices
- `orders`: Customer orders linked to table sessions

## Error Handling

The API includes comprehensive error handling for:

- Validation errors (using Zod)
- Custom application errors
- Database errors
- General server errors

## Development

The project uses TypeScript for type safety and better development experience. Make sure to:

- Follow the existing code structure
- Add proper type definitions
- Use Zod for request validation
- Handle errors appropriately

## License

This project is open source and available under the MIT License.
