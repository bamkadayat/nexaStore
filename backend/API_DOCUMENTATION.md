# NexaStore Backend API Documentation

Base URL: `http://localhost:8000/api`

## 🔐 Authentication Endpoints

### 1. Signup
Create a new user account.

**Endpoint:** `POST /users/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User created successfully. Please check your email for verification code.",
  "userId": "uuid",
  "email": "user@example.com"
}
```

**Notes:**
- Password must be at least 8 characters
- A 4-digit PIN code will be sent to the email
- PIN expires in 10 minutes

---

### 2. Verify Signup
Verify email with 4-digit PIN code.

**Endpoint:** `POST /users/verify-signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "1234"
}
```

**Response (200):**
```json
{
  "message": "Email verified successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "emailVerified": true
  },
  "token": "jwt_token_here"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid or expired verification code",
  "message": "Your verification code has expired or is invalid. Please request a new code.",
  "canResend": true
}
```

---

### 3. Resend Verification Code
Request a new verification code if expired.

**Endpoint:** `POST /users/resend-verification`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "Verification code has been resent. Please check your email.",
  "email": "user@example.com"
}
```

---

### 4. Login
Login with email and password.

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "emailVerified": true
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**
- `401`: Invalid email or password
- `403`: Account is deactivated OR Email not verified

**Notes:**
- JWT token is set in HTTP-only cookie (7 days expiration)
- Email must be verified before login

---

### 5. Logout
Logout and clear authentication cookie.

**Endpoint:** `POST /users/logout`

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

### 6. Reset Password Request
Request password reset with 4-digit PIN.

**Endpoint:** `POST /users/reset-password/request`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "If a user with this email exists, a verification code has been sent."
}
```

**Notes:**
- Response is same whether user exists or not (security)
- 4-digit PIN sent to email
- PIN expires in 10 minutes

---

### 7. Reset Password
Verify PIN and set new password.

**Endpoint:** `POST /users/reset-password`

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "1234",
  "newPassword": "newPassword123"
}
```

**Response (200):**
```json
{
  "message": "Password reset successfully. You can now login with your new password."
}
```

---

## 👤 User Management Endpoints

### 8. Get Current User
Get authenticated user's profile.

**Endpoint:** `GET /users/me`

**Headers:**
```
Authorization: Bearer <token>
Cookie: token=<jwt_token>
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "emailVerified": true,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastLoginAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 9. Update Current User
Update own profile.

**Endpoint:** `PATCH /users/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "newemail@example.com",
  "password": "newPassword123"
}
```

**Response (200):**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "uuid",
    "email": "newemail@example.com",
    "name": "Jane Doe",
    "role": "USER",
    "emailVerified": false,
    "isActive": true,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Notes:**
- If email is changed, emailVerified is reset to false
- Password is optional

---

## 👨‍💼 Admin Endpoints

### 10. Get All Users (Admin Only)
Get list of all users with pagination.

**Endpoint:** `GET /users?page=1&limit=10&search=john&role=USER`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 10)
- `search` (optional) - Search by email or name
- `role` (optional) - Filter by role (USER, ADMIN)

**Response (200):**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "emailVerified": true,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "lastLoginAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### 11. Get User by ID (Admin Only)
Get specific user details.

**Endpoint:** `GET /users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "emailVerified": true,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "lastLoginAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 12. Update User (Admin Only)
Update any user's information.

**Endpoint:** `PATCH /users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "ADMIN",
  "isActive": false
}
```

**Response (200):**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "uuid",
    "email": "updated@example.com",
    "name": "Updated Name",
    "role": "ADMIN",
    "emailVerified": true,
    "isActive": false,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Notes:**
- Only admins can update `role` and `isActive` fields
- Regular users can only update their own profile

---

### 13. Delete User (Admin Only)
Delete a user account.

**Endpoint:** `DELETE /users/:id`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

**Notes:**
- Cannot delete your own account
- Cascading deletes will remove related data (cart, orders, etc.)

---

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How to Authenticate:

**Option 1: Cookie (Automatic)**
```
Cookie: token=<jwt_token>
```

**Option 2: Authorization Header**
```
Authorization: Bearer <jwt_token>
```

### Token Details:
- Expiration: 7 days
- Contains: userId, email, role
- HTTP-only cookie (secure in production)

---

## ⚠️ Error Responses

All errors follow this format:

```json
{
  "error": "Error message here",
  "details": [] // Optional, for validation errors
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📧 Email Verification

### 4-Digit PIN Code System:
- PIN codes are 4 digits (1000-9999)
- Expiration: 10 minutes
- Purposes: SIGNUP, LOGIN, RESET_PASSWORD
- Old codes are automatically deleted when new ones are generated

### Email Templates:
All verification emails include:
- 4-digit PIN code
- Purpose of verification
- Expiration time (10 minutes)
- Professional HTML formatting

---

## 🚀 Getting Started

### 1. Start the Server
```bash
./start.sh
```

### 2. Test the Health Endpoint
```bash
curl http://localhost:8000/health
```

### 3. Create a User
```bash
curl -X POST http://localhost:8000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test12345","name":"Test User"}'
```

### 4. Verify Email
Check your email for the 4-digit code, then:
```bash
curl -X POST http://localhost:8000/api/users/verify-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","code":"1234"}'
```

### 5. Login
```bash
curl -X POST http://localhost:8000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test12345"}'
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- Passwords are hashed using bcrypt (10 rounds)
- Email addresses are case-insensitive
- Database connection requires SSH tunnel to VM (handled by start.sh)
