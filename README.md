# Trendz — MERN E-Commerce Application

Trendz is a full-stack e-commerce web application built using the **MERN stack**. It provides product browsing, search and filtering, cart management, Stripe-based checkout, order history, authentication, password reset, and role-based admin product management.

---

## Features

### User Authentication

* User registration
* User login
* JWT-based authentication
* Role-based authorization
* User and admin roles
* Protected frontend routes
* Protected backend routes
* Logout functionality
* Password hashing using bcrypt

### Forgot & Reset Password

* Forgot-password functionality
* Six-digit OTP generation
* OTP stored securely as a hash
* OTP expiry validation
* Reset password using email + OTP
* New password hashed before storing

> **Deployment note:** The password-reset email functionality uses Nodemailer with Gmail SMTP and works locally. Some free hosting environments restrict outbound SMTP connections, so email delivery may not work in the deployed demo. The OTP/reset implementation itself remains available and can later be connected to a production transactional email service.

---

## Product Management

Users can:

* Browse available products
* View individual product details
* Search products
* Filter products by category
* Filter products by price range
* View product price
* View rating
* View stock availability

### Admin Product Management

Admin users can:

* Add products
* Edit existing products
* Delete products
* Upload product images
* Manage product information
* Manage price
* Manage category
* Manage rating
* Manage stock

Admin functionality is protected through both frontend role checks and backend authorization.

---

## Image Management

Product images are handled using **Cloudinary**.

The application supports:

* Image upload
* Cloud-hosted product images
* Updating product images
* Removing old Cloudinary images when replacing them
* Removing Cloudinary images when deleting products

---

## Shopping Cart

Authenticated users can:

* Add products to cart
* Prevent duplicate products from being added
* View cart items
* Change item quantities
* Remove items
* View cart totals
* Preserve cart information
* See cart item count in the navbar

The navbar automatically updates when cart contents change.

Out-of-stock products cannot be added to the cart.

Guests attempting to add products to the cart are redirected to the login page.

---

## Payment Integration

Trendz uses **Stripe Checkout** for payment processing.

The checkout flow includes:

1. User adds products to the cart.
2. User proceeds to checkout.
3. Backend creates a Stripe Checkout Session.
4. User is redirected to Stripe.
5. Stripe processes the payment.
6. User is redirected to the success or cancellation page.
7. Order information is stored in MongoDB.

The application handles both:

* Successful payments
* Cancelled/failed payments

---

## Orders

Logged-in users can view their order history.

Each order contains information such as:

* Order ID
* Products
* Product quantities
* Product prices
* Total price
* Payment status
* Payment ID/reference
* Order date

Payment status can indicate:

* Paid
* Failed

Cancelled payment attempts can also be stored appropriately without relying on the same placeholder payment ID for every cancelled transaction.

---

## Search and Filtering

The home page provides product discovery through:

### Search

Products can be searched by product title.

### Category Filter

Users can filter products using available product categories.

### Price Filters

Products can be filtered using price ranges such as:

* Below ₹100
* ₹100 – ₹500
* ₹500 – ₹1000
* Above ₹1000

Multiple filtering conditions can be applied to the product collection.

---

## Loading, Empty and Error States

The UI handles common application states including:

* Product loading state
* Product API failure state
* Empty product state
* Empty search/filter results
* Order loading state
* No orders state
* Product not found state
* 404 page

Failed product requests provide an option to retry the request.

---

## Responsive Design

Trendz is designed for both desktop and mobile devices.

Responsive functionality includes:

* Desktop navigation
* Mobile hamburger navigation
* Responsive product grid
* Responsive product details
* Responsive filters
* Responsive cart
* Responsive order history
* Mobile-friendly authentication pages

The mobile menu also closes when users navigate or interact outside the menu.

---

# Tech Stack

## Frontend

* React
* React Router DOM
* React Hooks
* Tailwind CSS
* React Icons
* Fetch API
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Cloudinary
* Nodemailer
* Stripe
* dotenv
* CORS

## Database

* MongoDB Atlas

## External Services

* Stripe — payment processing
* Cloudinary — product image storage
* Gmail/Nodemailer — development password-reset emails

---

# Authentication Flow

```text
Signup
   ↓
Validate user input
   ↓
Hash password using bcrypt
   ↓
Store user in MongoDB
   ↓
Login
   ↓
Validate email/password
   ↓
Generate JWT
   ↓
Store authentication information
   ↓
Access protected functionality
```

JWT payload contains information used by the application such as:

```text
userId
username
role
```

---

# Authorization

Trendz supports role-based authorization.

Two roles are used:

```text
user
admin
```

Regular users can access shopping functionality.

Admin users receive additional product-management capabilities.

For example:

```text
Admin
  ↓
Add Product
Edit Product
Delete Product
```

Admin-only backend endpoints are protected through authentication and authorization middleware.

Frontend route protection is also used to prevent non-admin users from directly accessing admin pages such as the Add Product page.

> Frontend route protection improves the user experience, while backend authorization provides the actual security boundary.

---

# Forgot Password Flow

```text
User enters email
       ↓
Backend finds user
       ↓
Generate 6-digit OTP
       ↓
Hash OTP using bcrypt
       ↓
Store hashed OTP
       ↓
Store OTP expiry
       ↓
Send OTP through email
       ↓
User submits email + OTP + new password
       ↓
Validate OTP expiry
       ↓
Compare OTP using bcrypt
       ↓
Hash new password
       ↓
Update password
```

The reset flow uses the submitted **email + OTP + expiry validation** directly.

There is no separate OTP verification endpoint or temporary password-reset token.

---

# Cart Flow

```text
Product
   ↓
Add to Cart
   ↓
Check authentication
   ↓
Check stock
   ↓
Check duplicate item
   ↓
Store/update cart
   ↓
Notify navbar
   ↓
Update cart count
```

Custom browser events are used where necessary to synchronize cart changes with the navbar.

Example:

```js
window.dispatchEvent(new Event("cartUpdated"));
```

---

# Payment Flow

```text
Cart
  ↓
Checkout
  ↓
Express Backend
  ↓
Stripe Checkout Session
  ↓
Stripe Payment Page
  ↓
Payment
  ↓
Success / Cancel
  ↓
Order stored
  ↓
Orders Page
```

---

# Cloudinary Flow

When adding a product:

```text
Image
  ↓
Backend upload
  ↓
Cloudinary
  ↓
Image URL + public ID
  ↓
MongoDB Product
```

When updating an image:

```text
Existing Cloudinary image
        ↓
Delete old image
        ↓
Upload new image
        ↓
Update product
```

When deleting a product:

```text
Delete Product
      ↓
Delete Cloudinary asset
      ↓
Delete MongoDB product
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd trendz
```

---

# Backend Setup

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file.

Example:

```env
PORT=3333

MONGO_URI=your_mongodb_connection_string

TOKEN_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

The exact environment-variable names should match those used by the backend source code.

Never commit the `.env` file.

Add it to `.gitignore`:

```text
node_modules
.env
```

---

## Start Backend

Depending on the scripts configured in `package.json`:

```bash
npm run dev
```

or:

```bash
npm start
```

The development backend runs on:

```text
http://localhost:3333
```

unless another port is configured.

---

# Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Open the local Vite URL displayed in the terminal.

---

# API Overview

The project contains REST API routes for areas including:

```text
/api/v1/auth
/api/v1/products
/api/v1/order
```

Major operations include:

### Authentication

```text
POST   Signup
POST   Login
POST   Forgot Password
POST   Reset Password
```

### Products

```text
GET     All Products
GET     Product By ID
POST    Add Product
PUT     Update Product
DELETE  Delete Product
```

### Cart

```text
Save/update authenticated user's cart
```

### Orders

```text
Create/save order
Retrieve user orders
```

### Payments

```text
Create Stripe Checkout Session
Handle checkout result
```

Exact route paths can be checked in the backend route files.

---

# Security Measures

Trendz includes several basic application-security practices:

* Password hashing using bcrypt
* JWT authentication
* Protected API routes
* Role-based authorization
* Admin-only operations
* Environment variables for secrets
* OTP hashing
* OTP expiration
* Server-side user validation
* Server-side product validation
* CORS configuration
* Stripe secret key kept on backend
* Cloudinary credentials kept on backend
* Email credentials kept on backend
* API secrets excluded from Git

Sensitive credentials should never be placed directly in frontend source code.

---

# Error Handling

The application handles several common failure scenarios:

* Invalid login credentials
* Existing user registration
* Missing required fields
* Unauthorized requests
* Forbidden admin operations
* Invalid product IDs
* Product API failures
* Out-of-stock products
* Duplicate cart products
* Stripe payment failures/cancellations
* Invalid password-reset requests
* Incorrect OTP
* Expired OTP
* Email delivery failures

---

# Deployment

The application can use separate hosting for frontend and backend.

Example architecture:

```text
Frontend Hosting
      ↓
React Application
      ↓
Backend Hosting
      ↓
Express REST API
      ↓
MongoDB Atlas
```

Cloudinary and Stripe are external services accessed by the backend.

## Production Email Limitation

The project's original password-reset implementation uses:

```text
Nodemailer
    ↓
Gmail SMTP
```

This works in the local development environment.

However, some free cloud hosting platforms restrict outbound SMTP connections on ports such as `465` and `587`. Because of this, password-reset email delivery may fail on the deployed version even though the same functionality works locally.

A future production version can replace only the email-delivery layer with a transactional email HTTP API without changing the OTP generation, hashing, expiry, or password-reset logic.

---

# Author

**Kesavan Gnanasekaran**

MERN Stack Developer

---
