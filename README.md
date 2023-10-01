### Live Link: https://book-catalog-with-prisma-rakib-ahmed01.vercel.app/api/v1

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/3b34f080-6c27-428f-a787-46c78cd50ff5 (Single GET) Include an id that is saved in your database
- api/v1/users/3b34f080-6c27-428f-a787-46c78cd50ff5 (PATCH)
- api/v1/users/3b34f080-6c27-428f-a787-46c78cd50ff5 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/2243e8fb-2017-415b-9df4-aa18fd1e1bba (Single GET) Include an id that is saved in your database
- api/v1/categories/2243e8fb-2017-415b-9df4-aa18fd1e1bba (PATCH)
- api/v1/categories/2243e8fb-2017-415b-9df4-aa18fd1e1bba (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/2243e8fb-2017-415b-9df4-aa18fd1e1bba/category (GET)
- api/v1/books/31c3ed41-b9bf-4b67-9c0a-0aaeabef7822 (GET)
- api/v1/books/31c3ed41-b9bf-4b67-9c0a-0aaeabef7822 (PATCH)
- api/v1/books/31c3ed41-b9bf-4b67-9c0a-0aaeabef7822 (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/ab170aeb-f5d8-41bc-aaed-ff8005b195ea (GET)
