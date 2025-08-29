import { createBrowserRouter } from 'react-router'
import AppLayout from '../components/AppLayout'
import About from '../pages/About'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import StudentsDetails from '../pages/StudentDetail'
import ProtectedRoute from '../components/ProtectedRoutes'

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
      }, // default route
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      {
        path: 'students/:id',
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
