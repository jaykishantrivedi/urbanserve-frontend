import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { useSelector } from "react-redux"

import SignIn from "../pages/auth/SignIn"
import SignUp from "../pages/auth/SignUp"
import VerifyOTP from "../pages/auth/VerifyOTP"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ResetPassword from "../pages/auth/ResetPassword"

import HomePage from "../pages/user/HomePage"
import CategoriesPage from "../pages/user/CategoriesPage"
import CategoryServicesPage from "../pages/user/CategoryServicesPage"
import ProviderServicesPage from "../pages/user/ProviderServicesPage"
import BecomeProviderPage from "../pages/user/BecomeProviderPage"
import SearchResultsPage from "../pages/user/SearchResultsPage"
import ProfilePage from "../pages/user/ProfilePage"
import ProviderDetailsPage from "../pages/user/ProviderDetailsPage"
import ForProvidersPage from "../pages/user/ForProvidersPage"

import ProviderDashboard from "../pages/provider/ProviderDashboard"
import AddServicePage from "../pages/provider/AddServicePage"
import ManageServicesPage from "../pages/provider/ManageServicesPage"
import ProviderWalletPage from "../pages/provider/ProviderWalletPage"
import ProviderRequestsPage from "../pages/provider/ProviderRequestsPage"
import ProviderBookingsPage from "../pages/provider/ProviderBookingsPage"
import ProviderPaymentsPage from "../pages/provider/ProviderPaymentsPage"
import ProviderReviewsPage from "../pages/provider/ProviderReviewsPage"

import AdminLayout from "../pages/admin/AdminLayout"
import { AdminDashboard } from "../pages/admin/AdminDashboard"
import { AdminUsersPage } from "../pages/admin/AdminUsersPage"
import { AdminUserProfilePage } from "../pages/admin/AdminUserProfilePage"
import { AdminProvidersPage } from "../pages/admin/AdminProvidersPage"
import { AdminPendingProvidersPage } from "../pages/admin/AdminPendingProvidersPage"
import { AdminProviderProfilePage } from "../pages/admin/AdminProviderProfilePage"
import { AdminServicesPage } from "../pages/admin/AdminServicesPage"
import { AdminAddServicePage } from "../pages/admin/AdminAddServicePage"
import { AdminEditServicePage } from "../pages/admin/AdminEditServicePage"
import { AdminServiceCategoryPage } from "../pages/admin/AdminServiceCategoryPage"
import { AdminAddCategoryPage } from "../pages/admin/AdminAddCategoryPage"
import { AdminEditCategoryPage } from "../pages/admin/AdminEditCategoryPage"
import { AdminBookingsPage } from "../pages/admin/AdminBookingsPage"
import { AdminBookingDetailsPage } from "../pages/admin/AdminBookingDetailsPage"
import { AdminPaymentsPage } from "../pages/admin/AdminPaymentsPage"
import { AdminReviewsPage } from "../pages/admin/AdminReviewsPage"
import { AdminNotificationPage } from "../pages/admin/AdminNotificationPage"
import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage"
import AdminMyProfilePage from "../pages/admin/AdminMyProfilePage"

import Layout from "../components/layout/Layout"

import UserRequestsPage from "../pages/user/UserRequestsPage"
import UserProviderResponsesPage from "../pages/user/UserProviderResponsesPage"
import UserBookingsPage from "../pages/user/UserBookingsPage"
import UserBookingDetailPage from "../pages/user/UserBookingDetailPage"
import PaymentPage from "../pages/user/PaymentPage"
import ReviewPage from "../pages/user/ReviewPage"
import UserPaymentsPage from "../pages/user/UserPaymentsPage"
import UserReviewsPage from "../pages/user/UserReviewsPage"

import NotificationsPage from "../pages/shared/NotificationsPage"
import TermsAndConditionsPage from "../pages/legal/TermsAndConditionsPage"
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicyPage"
import AboutUsPage from "../pages/legal/AboutUsPage"

//  Route Guards 

const PublicRoute = ({ children }) => <Layout>{children}</Layout>

const AuthRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.auth)
  if (userData) {
    if (userData.user?.role === "provider") return <Navigate to="/provider/dashboard" replace />
    if (userData.user?.role === "admin") return <Navigate to="/admin" replace />
    return <Navigate to="/" replace />
  }
  return children
}

const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.auth)
  if (!userData) return <Navigate to="/signin" replace />
  return <Layout>{children}</Layout>
}

const UserRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.auth)
  if (!userData) return <Navigate to="/signin" replace />
  if (userData.user?.role !== "user") return <Navigate to="/" replace />
  return <Layout>{children}</Layout>
}

const ProviderRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.auth)
  if (!userData) return <Navigate to="/signin" replace />
  if (userData.user?.role !== "provider") return <Navigate to="/" replace />
  return <Layout>{children}</Layout>
}

const AdminRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.auth)
  if (!userData) return <Navigate to="/signin" replace />
  if (userData.user?.role !== "admin") return <Navigate to="/" replace />
  return children  // AdminLayout wraps via Outlet, not here
}

//  Router 
const router = createBrowserRouter([

  //  Public routes (anyone) 
  {
    path: "/",
    element: <PublicRoute><HomePage /></PublicRoute>
  },
  {
    path: "/categories",
    element: <PublicRoute><CategoriesPage /></PublicRoute>
  },
  {
    //  Hero section search result — /services?service=X&city=Y
    path: "/services",
    element: <PublicRoute><SearchResultsPage /></PublicRoute>
  },
  {
    path: "/:city/:categorySlug",
    element: <PublicRoute><CategoryServicesPage /></PublicRoute>
  },
  {
    path: "/:city/:categorySlug/:serviceSlug",
    element: <PublicRoute><ProviderServicesPage /></PublicRoute>
  },
  {
    path: "/providers/:id",
    element: <PublicRoute><ProviderDetailsPage /></PublicRoute>
  },
  {
    path: "/for-providers",
    element: <PublicRoute><ForProvidersPage /></PublicRoute>
  },
  {
    path: "/terms",
    element: <PublicRoute><TermsAndConditionsPage /></PublicRoute>
  },
  {
    path: "/privacy",
    element: <PublicRoute><PrivacyPolicyPage /></PublicRoute>
  },
  {
    path: "/about",
    element: <PublicRoute><AboutUsPage /></PublicRoute>
  },
  //  Auth routes (guests only) 
  {
    path: "/signin",
    element: <AuthRoute><SignIn /></AuthRoute>
  },
  {
    path: "/signup",
    element: <AuthRoute><SignUp /></AuthRoute>
  },
  {
    path: "/verifyOTP-email",
    element: <AuthRoute><VerifyOTP /></AuthRoute>
  },
  {
    path: "/forgot-password",
    element: <AuthRoute><ForgotPassword /></AuthRoute>
  },
  {
    path: "/reset-password/:token",
    element: <AuthRoute><ResetPassword /></AuthRoute>
  },

  //  Protected routes (any logged in user) 
  // Removed global protected routes to split by role as requested

  //  User only routes 
  {
    path: "/user/profile",
    element: <UserRoute><ProfilePage /></UserRoute>
  },
  {
    path: "/user/notifications",
    element: <UserRoute><NotificationsPage /></UserRoute>
  },
  {
    path: "/become-provider",
    element: <UserRoute><BecomeProviderPage /></UserRoute>
  },
  {
    path: "/user/requests",
    element: <UserRoute><UserRequestsPage /></UserRoute>
  },
  {
    path: "/user/requests/:id",
    element: <UserRoute><UserProviderResponsesPage /></UserRoute>
  },
  {
    path: "/user/bookings",
    element: <UserRoute><UserBookingsPage /></UserRoute>
  },
  {
    path: "/user/bookings/:id",
    element: <UserRoute><UserBookingDetailPage /></UserRoute>
  },
  {
    path: "/user/bookings/:id/pay",
    element: <UserRoute><PaymentPage /></UserRoute>
  },
  {
    path: "/user/bookings/:id/review",
    element: <UserRoute><ReviewPage /></UserRoute>
  },
  {
    path: "/user/payments",
    element: <UserRoute><UserPaymentsPage /></UserRoute>
  },
  {
    path: "/user/reviews",
    element: <UserRoute><UserReviewsPage /></UserRoute>
  },

  //  Provider only routes 
  {
    path: "/provider/profile",
    element: <ProviderRoute><ProfilePage /></ProviderRoute>
  },
  {
    path: "/provider/notifications",
    element: <ProviderRoute><NotificationsPage /></ProviderRoute>
  },
  {
    path: "/provider/dashboard",
    element: <ProviderRoute><ProviderDashboard /></ProviderRoute>
  },
  {
    path: "/provider/services",
    element: <ProviderRoute><ManageServicesPage /></ProviderRoute>
  },
  {
    path: "/provider/services/add",
    element: <ProviderRoute><AddServicePage /></ProviderRoute>
  },
  {
    path: "/provider/wallet",
    element: <ProviderRoute><ProviderWalletPage /></ProviderRoute>
  },
  {
    path: "/provider/requests",
    element: <ProviderRoute><ProviderRequestsPage /></ProviderRoute>
  },
  {
    path: "/provider/bookings",
    element: <ProviderRoute><ProviderBookingsPage /></ProviderRoute>
  },
  {
    path: "/provider/payments",
    element: <ProviderRoute><ProviderPaymentsPage /></ProviderRoute>
  },
  {
    path: "/provider/reviews",
    element: <ProviderRoute><ProviderReviewsPage /></ProviderRoute>
  },

  //  Admin only routes 
  {
    path: "/admin",
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "users/:userId", element: <AdminUserProfilePage /> },
      { path: "providers", element: <AdminProvidersPage /> },
      { path: "providers/pending", element: <AdminPendingProvidersPage /> },
      { path: "providers/:providerId", element: <AdminProviderProfilePage /> },
      { path: "services", element: <AdminServicesPage /> },
      { path: "services/add", element: <AdminAddServicePage /> },
      { path: "services/:serviceId/edit", element: <AdminEditServicePage /> },
      { path: "categories", element: <AdminServiceCategoryPage /> },
      { path: "categories/add", element: <AdminAddCategoryPage /> },
      { path: "categories/:categoryId/edit", element: <AdminEditCategoryPage /> },
      { path: "bookings", element: <AdminBookingsPage /> },
      { path: "bookings/:bookingId", element: <AdminBookingDetailsPage /> },
      { path: "payments", element: <AdminPaymentsPage /> },
      { path: "reviews", element: <AdminReviewsPage /> },
      { path: "notifications", element: <AdminNotificationPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
      { path: "profile", element: <AdminMyProfilePage /> },
    ]
  },

  //  404 
  {
    path: "*",
    element: (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
          <p className="text-xl font-semibold text-gray-700 mb-2">Page not found</p>
          <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
          <a
            href="/"
            className="inline-flex items-center justify-center h-9 px-6 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
          >
            Back to Home
          </a>
        </div>
      </Layout>
    )
  }
])

//  AppRouter 
const AppRouter = () => <RouterProvider router={router} />

export default AppRouter