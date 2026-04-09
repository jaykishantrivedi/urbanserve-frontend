# Local Service Management System — Frontend

## Description

This is the frontend of a full-stack Local Service Management System built using React and Vite. It provides the user interface for a platform that connects customers with local service providers such as plumbers, electricians, and home cleaners. The application is divided into three distinct role-based experiences — one for regular users, one for service providers, and one for platform administrators — each with its own set of pages, dashboards, and functionality.

The frontend communicates entirely with the backend REST API using Redux Toolkit Query (RTK Query) for data fetching and caching. Global state is managed through Redux Toolkit with redux-persist to maintain authentication state across page reloads. The UI is styled using Tailwind CSS v4 and enhanced with Framer Motion animations and Lucide React icons.

---

## Tech Stack

The project is built on **React 19** with **Vite 7** as the build tool and development server. Routing is handled by **React Router DOM v7**, which supports nested routes and programmatic navigation.

State management is handled by **Redux Toolkit** combined with **RTK Query** for server state and **redux-persist** for persisting auth state to localStorage. This eliminates the need for Axios by handling all API calls through RTK Query's `createApi` abstraction.

Styling is done with **Tailwind CSS v4** integrated via the official Vite plugin. Animations and transitions are powered by **Framer Motion**. Icons come from both **Lucide React** and **React Icons**. Toast notifications are provided by **React Toastify**. Charts on dashboard pages are rendered using **Recharts**. PDF generation is available through **jsPDF**. Google Sign-In is integrated using the **Firebase** SDK.

Payment UI integration is done with the **Razorpay** checkout script, and image uploads are handled directly through the **Cloudinary** upload API.

---

## Folder Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images, icons, and static media
│   ├── components/
│   │   ├── layout/            # Shared layout wrappers (Navbar, Footer, etc.)
│   │   ├── ui/                # Reusable UI components (buttons, cards, modals)
│   │   └── user/              # User-specific shared components
│   ├── features/              # Feature-specific logic and hooks
│   ├── hooks/                 # Custom React hooks
│   ├── pages/
│   │   ├── auth/              # Login, Signup, OTP verification pages
│   │   ├── shared/            # Pages shared across roles (notifications, etc.)
│   │   ├── user/              # User-facing pages
│   │   ├── provider/          # Provider dashboard and management pages
│   │   ├── admin/             # Admin panel pages
│   │   └── legal/             # Terms, Privacy Policy, About Us pages
│   ├── redux/
│   │   ├── store.js           # Redux store configuration with persist
│   │   ├── authSlice.js       # Auth state (user, token, role)
│   │   ├── citySlice.js       # Selected city state
│   │   ├── baseQuery.js       # RTK Query base configuration with auth headers
│   │   ├── authApi.js         # Auth endpoints (login, signup, OTP, etc.)
│   │   ├── bookingApi.js      # Booking endpoints
│   │   ├── paymentApi.js      # Payment endpoints
│   │   ├── reviewApi.js       # Review endpoints
│   │   ├── serviceApi.js      # Service endpoints
│   │   ├── providerApi.js     # Provider endpoints
│   │   ├── providerServiceApi.js
│   │   ├── serviceRequestApi.js
│   │   ├── providerResponseApi.js
│   │   ├── categoryApi.js
│   │   ├── searchApi.js
│   │   ├── notificationApi.js
│   │   ├── walletApi.js
│   │   ├── userApi.js
│   │   └── adminDashboardApi.js
│   ├── routes/                # Route definitions and protected route wrappers
│   ├── utils/                 # Helper functions and constants
│   ├── App.jsx                # Root component with router setup
│   ├── main.jsx               # App entry point with Redux Provider
│   └── index.css              # Global styles and Tailwind directives
├── index.html
├── vite.config.js
├── package.json
└── .env
```

---

## Installation

Make sure you have Node.js v18 or higher installed. Then follow these steps.

Clone the repository and navigate into the frontend directory. Run `npm install` to install all dependencies. Create a `.env` file in the frontend root with the required environment variables as shown below. Then run `npm run dev` to start the development server. The app will be available at `http://localhost:5173` by default.

Make sure the backend server is running and accessible at the URL configured in the RTK Query base URL, otherwise API calls will fail.

---

## Environment Variables

Create a `.env` file in the `frontend/` root directory with the following variables. In Vite, all client-side environment variables must be prefixed with `VITE_`.

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
VITE_RAZORPAY_KEY=rzp_test_your_razorpay_key_id
```

The backend API base URL is configured directly in `src/redux/baseQuery.js`. Update the `baseUrl` value there to point to your backend server URL. During development this is typically `http://localhost:8080/api`.

---

## Available Scripts

`npm run dev` starts the local development server with hot module replacement.

`npm run build` compiles and bundles the app for production into the `dist/` folder.

`npm run preview` locally previews the production build before deployment.

`npm run lint` runs ESLint across the codebase to check for code quality issues.

---

## API Configuration

All API communication is handled through RTK Query. The base configuration lives in `src/redux/baseQuery.js`, which sets the base URL and attaches the JWT token from the Redux store to every request via the `Authorization` header. It also handles re-authentication using the refresh token endpoint if a request fails with a 401 status.

Each feature has its own API slice created with `createApi`. These slices define endpoints as queries or mutations and are registered in the Redux store. Components consume these hooks directly (e.g., `useGetUserBookingsQuery`, `useCreateReviewMutation`) without needing any additional fetch or Axios setup.

To switch environments, update the `baseUrl` in `baseQuery.js` to point to your staging or production backend URL.

---

## Pages Overview

### Auth Pages

The auth section includes a combined Login and Signup page where users can register with email and password or sign in using Google via Firebase. After signup, users are directed to an OTP verification page where they enter the code sent to their email. Forgot password and reset password flows are also available.

### User Pages

Once logged in as a user, the platform offers a Home page, a service Categories page, a Category Services listing page, a Provider Services browsing page with filtering and search, and a Provider Details page. Users can submit a service request, view provider responses, and book a service. The Bookings page lists all existing bookings with status tracking and OTP-based completion flow. The Payments page shows transaction history. The Reviews page allows users to view and manage the reviews they have written. Users can upgrade their account to become a service provider through the Become a Provider page. A Profile page allows updating personal details, changing passwords, and managing email and phone verification.

### Provider Pages

Providers have access to a dedicated dashboard showing an overview of their activity. The Manage Services page allows adding, editing, and removing the services they offer. The Requests page shows incoming service requests from users. The Bookings page shows all their confirmed bookings with job management controls including setting hours worked, inspection pricing, and OTP verification for job start and completion. The Payments page shows their earnings history and the Wallet page shows their accumulated balance with a transaction log. A Reviews page shows feedback received from customers. Providers also have their own profile management page with availability and service radius settings.

### Admin Pages

The admin panel is a full platform management suite. The Dashboard shows platform-wide KPIs and charts. The Users section allows viewing and managing all registered users. The Providers section includes a list of all providers and a Pending Providers page for approving new applications. Admins can view detailed provider profiles and block or unblock accounts. The Services and Categories sections allow creating, editing, soft-deleting, and restoring service listings with image uploads. The Bookings section provides a full view of all platform bookings with detail pages. The Payments section shows all payment records. The Reviews section lists all reviews across the platform for moderation. Notifications and Settings pages round out the admin experience. Admins also have their own profile management page.

### Legal Pages

Standalone pages for Terms and Conditions, Privacy Policy, and About Us are linked from the footer.

---

## Role-Based Access and Protected Routes

Route protection is implemented using wrapper components in the `src/routes/` directory. After login, the user's role is stored in the Redux auth slice and persisted across sessions. Protected routes check the current user's role before rendering the requested page. If an unauthenticated user tries to access a protected route they are redirected to the login page. If an authenticated user tries to access a route that does not match their role they are redirected to an appropriate fallback page.

---

## Features

The application supports email and password authentication as well as Google Sign-In. Phone number verification via SMS OTP is required before a user can register as a service provider. JWT tokens are automatically attached to every API request and refresh tokens handle session renewal transparently.

The UI adapts to each user role, showing only the navigation and pages relevant to that role. Framer Motion powers smooth page transitions and micro-animations on interactive elements. Toast notifications provide real-time feedback for actions like booking confirmation, payment success, and review submission.

Recharts is used to render analytics charts on the admin and provider dashboards. jsPDF enables generating downloadable PDF reports from payment and booking data. Image uploads for profiles and services go directly to Cloudinary from the browser. Razorpay's checkout is loaded as a script and the payment flow is handled client-side with server-side verification.

---

## Screenshots

> Screenshots will be added here once the application is deployed.

---

## Deployment

To deploy the frontend, first run `npm run build` to generate the production bundle in the `dist/` folder.

For **Vercel**, connect your GitHub repository and set the project root to the `frontend/` directory. Vercel will automatically detect the Vite configuration. Add all `VITE_` environment variables in the Vercel project settings.

For **Netlify**, drag and drop the `dist/` folder into the Netlify dashboard or connect your repository. Set the build command to `npm run build` and the publish directory to `dist`. Add environment variables in the Netlify site settings. Make sure to add a `_redirects` file inside `public/` with the content `/* /index.html 200` to support client-side routing.

After deployment, update the backend's `FRONTEND_URL` environment variable and CORS configuration to your deployed frontend URL.

---

## License

MIT 
