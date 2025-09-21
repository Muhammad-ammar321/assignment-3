import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import './app.css'
import { store } from './app/store'
import router from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
=======
// import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router'
import { Routes } from './router/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>,
>>>>>>> 24b606852aa9f3bd67e0c4e6fbdc57f7a2cc5765
)
