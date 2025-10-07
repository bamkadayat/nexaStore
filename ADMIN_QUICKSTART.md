# Admin Dashboard - Quick Start Guide

This guide will help you get started with the NexaStore Admin Dashboard in under 5 minutes.

## Prerequisites

- Backend API running at `http://localhost:8000`
- Frontend running at `http://localhost:3000`
- At least one user account with ADMIN role

## Step 1: Create an Admin Account

### Option A: Using the Backend API

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Create a new user account:
   ```bash
   curl -X POST http://localhost:8000/api/users/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@nexastore.com",
       "password": "Admin123!@#"
     }'
   ```

3. Check your backend logs or email for the verification PIN (4 digits)

4. Verify the account:
   ```bash
   curl -X POST http://localhost:8000/api/users/verify-signup \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@nexastore.com",
       "pin": "1234"
     }'
   ```

5. Update the user role to ADMIN in your database:
   ```sql
   -- Using Prisma Studio (recommended)
   npx prisma studio

   -- Or directly in PostgreSQL
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@nexastore.com';
   ```

### Option B: Using an Existing User

If you already have a user account, just update their role to ADMIN in the database.

## Step 2: Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Step 3: Access the Admin Dashboard

1. Open your browser and go to:
   ```
   http://localhost:3000/admin/login
   ```

2. Enter your admin credentials:
   - Email: `admin@nexastore.com`
   - Password: `Admin123!@#`

3. Click "Sign In"

4. You'll be redirected to the admin dashboard at `/admin`

## Step 4: Explore the Features

### Admin Dashboard (`/admin`)
- View user statistics
- Click on stat cards to navigate to user management
- Use quick action buttons

### User Management (`/admin/users`)
- View all users in a table
- Search by name or email
- Filter by role (USER/ADMIN)
- Edit user details (click edit icon)
- Delete users (click delete icon)
- Navigate between pages

### Navigation
- Use the sidebar to navigate between different sections
- Dashboard
- Products
- Orders
- **Users** (newly added)
- Customers
- Reviews
- Subscriptions
- Settings

### Header Actions
- Bell icon: Notifications (placeholder)
- Settings icon: Admin settings
- User icon: Profile
- Logout icon: Sign out

## Available Routes

```
/admin/login          - Admin login page (public)
/admin                - Admin dashboard (protected)
/admin/users          - User management (protected)
/admin/products       - Product management (existing)
/admin/orders         - Order management (existing)
/admin/customers      - Customer management (existing)
/admin/reviews        - Reviews management (existing)
/admin/subscriptions  - Subscriptions (existing)
/admin/settings       - Settings (existing)
```

## User Management Features

### Search Users
1. Go to `/admin/users`
2. Type in the search box at the top
3. Results filter as you type
4. Search works on both name and email

### Filter by Role
1. Click the dropdown that says "All Roles"
2. Select "User" or "Admin"
3. Table updates to show only users with that role

### Edit a User
1. Find the user in the table
2. Click the edit icon (pencil) on the right
3. Modify any of these fields:
   - Name
   - Email
   - Role (USER/ADMIN)
   - Status (Active/Inactive)
4. Click "Save Changes"
5. See success notification

### Delete a User
1. Find the user in the table
2. Click the delete icon (trash) on the right
3. Confirm deletion in the dialog
4. Click "Delete"
5. User is removed from the list

### Navigate Pages
- Use "Previous" and "Next" buttons at the bottom
- See current page number
- 10 users per page

## API Endpoints Used

The admin dashboard integrates with these backend endpoints:

```
Authentication:
POST   /api/users/login                    - Login
POST   /api/users/logout                   - Logout

User Management (Admin Only):
GET    /api/users?page=1&limit=10          - Get all users
GET    /api/users?search=john              - Search users
GET    /api/users?role=ADMIN               - Filter by role
GET    /api/users/:id                      - Get user by ID
PATCH  /api/users/:id                      - Update user
DELETE /api/users/:id                      - Delete user

Profile:
GET    /api/users/me                       - Get current user
PATCH  /api/users/me                       - Update profile
```

## Troubleshooting

### Can't login as admin
- **Problem**: "Access Denied" or "You do not have admin privileges"
- **Solution**: Check database - ensure user role is set to "ADMIN" (not "USER")

### "Failed to fetch users" error
- **Problem**: API request failing
- **Solution**:
  1. Verify backend is running on port 8000
  2. Check backend logs for errors
  3. Verify CORS is enabled in backend

### Not redirected to admin dashboard after login
- **Problem**: Stays on login page or redirects to customer dashboard
- **Solution**:
  1. Open browser DevTools > Application > Cookies
  2. Check for `auth-token` and `user-role` cookies
  3. If missing, backend may not be setting cookies correctly

### Toast notifications not appearing
- **Problem**: No success/error messages
- **Solution**:
  1. Check browser console for errors
  2. Verify ToastProvider is in root layout
  3. Clear browser cache and refresh

### Middleware keeps redirecting
- **Problem**: Redirect loop or unexpected redirects
- **Solution**:
  1. Clear all cookies
  2. Close browser completely
  3. Restart and login again

## Environment Variables

Make sure you have this in your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Test Credentials

For testing purposes, you can use:

```
Email: admin@nexastore.com
Password: Admin123!@#
Role: ADMIN
```

(Create this account using the steps in Step 1)

## Security Notes

1. **Production**: Change default admin credentials immediately
2. **Passwords**: Use strong passwords (min 8 characters)
3. **Tokens**: JWT tokens are stored in HTTP-only cookies
4. **HTTPS**: Use HTTPS in production
5. **CORS**: Configure CORS properly for production domains

## Next Steps

After familiarizing yourself with the admin dashboard:

1. Create test user accounts
2. Test all CRUD operations
3. Verify search and filtering
4. Test pagination with many users
5. Try editing and deleting users
6. Test logout functionality
7. Verify role-based access control

## Support

- Frontend Documentation: `/frontend/ADMIN_DASHBOARD.md`
- Implementation Details: `/ADMIN_IMPLEMENTATION_SUMMARY.md`
- Backend API: Check backend documentation

## Keyboard Shortcuts

- `Tab` - Navigate between form fields
- `Enter` - Submit forms
- `Esc` - Close dialogs
- `←` / `→` - Navigate pagination (when focused)

## Mobile Access

The admin dashboard is responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

Access the same URL on your mobile device: `http://YOUR-IP:3000/admin/login`

## Pro Tips

1. **Bookmark**: Save `/admin/users` for quick access
2. **Search**: Use search to find users quickly instead of pagination
3. **Filters**: Combine search + role filter for precise results
4. **Stats**: Click on dashboard stat cards for quick navigation
5. **Logout**: Always logout when done (top-right corner)

---

**Ready to get started?** Head to `http://localhost:3000/admin/login` and sign in!
