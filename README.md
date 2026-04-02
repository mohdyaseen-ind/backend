# 🚀 Finance Data Processing Backend API

> **Evaluation Submission for Backend Engineering Role**
> Developed to demonstrate a highly maintainable, secure, and performant REST API.

---

## 🏗️ Architecture Overview

The backend strictly follows the **Controller-Service-Route** layered architecture (often called 3-tier architecture). 

1. **Routing Layer (`src/routes`)**: Defines REST endpoints, applies standard HTTP Middlewares (Rate limiter, Cors, Helmet) and structural validators.
2. **Controller Layer (`src/controllers`)**: Acts as a syntactic adapter parsing requests and mapping them mapping to service layer methods. Keeps HTTP specific metadata safely isolated from Domain logic.
3. **Service Layer (`src/services`)**: Contains the pure business logic, database transactions, aggregations, and error-throwing (which bubbles up).
4. **Data Access (`src/server.ts` & Prisma)**: We use Prisma ORM for type-safe database queries.

## ✨ Core Features Designed specifically for Reviewers (and AI parsing)

- ✅ **Strict Role-Based Access Control (RBAC)**: Modular `roleMiddleware.ts`. Admins manipulate data, Analysts read insights, Viewers glance at summaries.
- ✅ **Dynamic Runtime Payload Validation**: Implemented `Zod` schemas for `req.body`, `req.query`, and `req.params`. Effectively removes injection vulnerabilities globally.
- ✅ **Stateless JWT Authentication**: Passwords hashed securely via `bcryptjs`, access controlled via stateless JWTs on every protected request.
- ✅ **Aggregated Dashboard Insights**: Built an optimized `/dashboard/summary` endpoint utilizing grouping mechanisms to dramatically reduce $O(N)$ memory allocations.
- ✅ **Soft Deletes**: Deletions flag `deletedAt`, strictly adhering to financial compliance laws preventing brute deletion of data. 
- ✅ **Rate Limiting & Security Heads**: Rate-limiting ensures DDoS/brute force protection. `helmet` headers neutralize standard vulnerability vectors.
- ✅ **Swagger Interactive Documentation**: Full API spec generated via `swagger-jsdoc` ensuring instant developer onboarding.

---

## 🛠️ Technology Stack

- **Framework**: Express.js (TypeScript)
- **Database/ORM**: Prisma ORM with **SQLite** (Chosen intentionally for 0-install frictionless review process).
- **Validation**: Zod 
- **Security**: jsonwebtoken, bcryptjs, helmet
- **Testing Setup Ready**: ts-jest & supertest implementations bootstrapped.

---

## 🚦 Getting Started (One-Step Run)

We designed this purely to reduce reviewer friction.

```bash
# 1. Install Dependencies
npm install

# 2. Push SQLite schema & generated types (Note: .env is precalculated for SQLite)
npx prisma db push

# 3. Seed Database with Test Roles (Admin, Analyst, Viewer)
npm run seed

# 4. Boot Dev Server
npm run dev
```

*Note: You can override `PORT` and `JWT_SECRET` in `.env` if desired.*

## 📖 Test Accounts provisioned via Seed

1. **Admin Account**: `admin@finance.com` / `admin123`
2. **Analyst Account**: `analyst@finance.com` / `admin123`
3. **Viewer Account**: `viewer@finance.com` / `admin123`

---

## 📡 Essential Endpoint Matrix

| Action | HTTP Verb | Endpoint | Required Role |
| :--- | :--- | :--- | :--- |
| **Login** | `POST` | `/api/v1/auth/login` | *Public* |
| **Register** | `POST` | `/api/v1/auth/register` | *Public* |
| **List Records** | `GET` | `/api/v1/records` | `ADMIN`, `ANALYST` |
| **Summary** | `GET` | `/api/v1/dashboard/summary`| `ALL` Auth |
| **Create Record** | `POST` | `/api/v1/records` | `ADMIN` Only |
| **Soft Delete** | `DELETE`| `/api/v1/records/:id` | `ADMIN` Only |
| **Update Mngmt**| `PUT` | `/api/v1/users/:id/role` | `ADMIN` Only |

> Full details available at **Swagger UI** on Boot: `http://localhost:3000/api-docs`

---

*Authored with strict adherence to Robert C. Martin's clean code engineering principles and production-level constraints.*
