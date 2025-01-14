# Casify


### Showcase
Here is a video showcasing how it works


### Tech Stack
* [Turborepo](https://turbo.build/) (for monorepo setup)
* [ExpressJS](https://expressjs.com/) (for backend)
* [Prisma ORM](https://www.prisma.io/) / [PostgreSQL](https://www.postgresql.org/) (for database operations)
* [Next.js](https://nextjs.org/) (for frontend)
* [Cloudinary](https://cloudinary.com/) (for file uploads)
* [Resend](https://resend.com/) (for emails)
* [Zod](https://zod.dev/) (for schema validation)
* [JWT](https://jwt.io/) (for authentication and authorization)


### Running Locally
* Setting up enviroment
As we are using turbo repo, we have to create more than one `.env` file, lets see what are those 

`apps/http/.env`
```env
PORT=5000
JWT_SECRET=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_URL=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET="
RESEND_API_KEY=""
```

`apps/web/env`
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=""
```


`packages/db/.env`
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/casify"
```
