import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from './routes/Homepage.jsx'
import PostListPage from './routes/PostListPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import Write from './routes/Write.jsx'
import SinglePostPage from './routes/SinglePostPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right"/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
