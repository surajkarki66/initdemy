# initdemy-authentication-PENN-Stack

This is a boilerplate of authentication system for initdemy which is a online education marketplace which is built using Express.js in backend and Next.js in frontend.

---

## Table of Contents

1. [Installation](#1-installation)

---

### 1. Installation

### A) Locally

1. Clone the repo

#### i. Client

2. Open terminal or command prompt in project root directory and change directory to client directory

```bash
   cd client
```

3. Install all the dependencies.

```bash
   npm install
```

4. Build the nextjs project.

```bash
   npm run build
```

5. Run the project

```bash
   npm start
```

Client side of the app is running on development mode on [http://localhost:3000](http://localhost:3000)

#### ii. Server

6. Open terminal or command prompt in project root directory and change directory to server directory

```bash
   cd server
```

7. Install pnpm package in your local computer

```bash
   npm install -g pnpm
```

8. Install all the dependencies.

```bash
   pnpm install
```

9. create .env file in current directory. See example below.

```
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   HOST=localhost
   PORT=5000

   JWT_SECRET=<Enter strong jwt secret string>
   JWT_EXPIRES=7d
   JWT_EXPIRES_IN_MILSEC=60480000
   JWT_EXPIRES_FOR_EMAIL_ACTIVATION=1h
   JWT_SECRET_FOR_EMAIL_ACTIVATION=<Enter strong jwt secret string>
   JWT_SECRET_FOR_FORGOT_PASSWORD=<Enter strong jwt secret string>
   JWT_EXPIRES_FOR_FORGOT_PASSWORD=1h

   MAILGUN_DOMAIN=<Enter your mailgun domain here>
   MAILGUN_PRIVATE_API_KEY=<Enter your mailgun private api key here>
   EMAIL=<Enter your mailgun registerd email for sending mail>

   CLOUDINARY_CLOUD_NAME=<Enter your cloudinary cloud name>
   CLOUDINARY_API_KEY=<Enter your cloudinary api key>
   CLOUDINARY_API_SECRET=<Enter your cloudinary api secret key>

   DATABASE_URL="postgresql://postgres:postgres@localhost/initdemy?schema=public"
```

10. Setting up and running the database

- Make sure you have postgresql installed locally
- Run `psql postgres` to start psql CLI and create database by running `create database initdemy;` and exit cli with `quit`
- Run `npm run p-mg` for database migration

11. Running the server

- to run the development server, do `npm run dev`
- to run the production server, do `npm run build` and `yarn start` or `npm start`

Server side of the app is running on development mode on [http://localhost:5000](http://localhost:5000)

### B) Using Docker

1. Clone the repo
2. Install [docker](https://docs.docker.com/get-docker/)

#### i. Server

3. Open terminal or command prompt in project root directory and change directory to server directory

```bash
   cd server
```

3. create .env file in current directory. See example below.

```
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   HOST=localhost
   PORT=5000

   JWT_SECRET=<Enter strong jwt secret string>
   JWT_EXPIRES=7d
   JWT_EXPIRES_IN_MILSEC=60480000
   JWT_EXPIRES_FOR_EMAIL_ACTIVATION=1h
   JWT_SECRET_FOR_EMAIL_ACTIVATION=<Enter strong jwt secret string>
   JWT_SECRET_FOR_FORGOT_PASSWORD=<Enter strong jwt secret string>
   JWT_EXPIRES_FOR_FORGOT_PASSWORD=1h

   MAILGUN_DOMAIN=<Enter your mailgun domain here>
   MAILGUN_PRIVATE_API_KEY=<Enter your mailgun private api key here>
   EMAIL=<Enter your mailgun registerd email for sending mail>

   CLOUDINARY_CLOUD_NAME=<Enter your cloudinary cloud name>
   CLOUDINARY_API_KEY=<Enter your cloudinary api key>
   CLOUDINARY_API_SECRET=<Enter your cloudinary api secret key>

   DATABASE_URL="postgresql://postgres:postgres@localhost/initdemy?schema=public"

```

4. create .env.docker file in current directory. See example below.

```
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   HOST=localhost
   PORT=5000

   JWT_SECRET=<Enter strong jwt secret string>
   JWT_EXPIRES=7d
   JWT_EXPIRES_IN_MILSEC=60480000
   JWT_EXPIRES_FOR_EMAIL_ACTIVATION=1h
   JWT_SECRET_FOR_EMAIL_ACTIVATION=<Enter strong jwt secret string>
   JWT_SECRET_FOR_FORGOT_PASSWORD=<Enter strong jwt secret string>
   JWT_EXPIRES_FOR_FORGOT_PASSWORD=1h

   MAILGUN_DOMAIN=<Enter your mailgun domain here>
   MAILGUN_PRIVATE_API_KEY=<Enter your mailgun private api key here>
   EMAIL=<Enter your mailgun registerd email for sending mail>

   CLOUDINARY_CLOUD_NAME=<Enter your cloudinary cloud name>
   CLOUDINARY_API_KEY=<Enter your cloudinary api key>
   CLOUDINARY_API_SECRET=<Enter your cloudinary api secret key>

   DATABASE_URL="postgresql://initdemyUser:password123@postgres/initdemy?schema=public"
```

5. Run the command

```bash
   docker compose up -d
```

Server side of the app is running on development mode on [http://localhost:5000](http://localhost:5000)

#### ii. Client

7. Open terminal or command prompt in project root directory and change directory to client directory

```bash
   cd client
```

8. Run the command

```bash
   docker compose up -d
```

Client side of the app is running on development mode on [http://localhost:3000](http://localhost:3000)
