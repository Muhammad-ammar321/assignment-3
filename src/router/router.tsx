import { createBrowserRouter } from 'react-router'
import AppLayout from '../components/AppLayout'
import About from '../pages/About'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import StudentsDetails from '../pages/StudentDetail'
import ProtectedRoute from '../components/protectedRoute/ProtectedRoutes'
import PublicRoute from '../components/protectedRoute/PublicRoute'
import Recipe from '../pages/RecipeBook/recipe'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: '/about', element: <About /> },
      {
        path:"/recipebook",
        element:<ProtectedRoute><Recipe/></ProtectedRoute>
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: '/students/:id',
        element: (
          <ProtectedRoute>
            <StudentsDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

export default router
