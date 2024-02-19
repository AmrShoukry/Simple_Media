import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from '@/pages/authentic8tn/Login'
import { Demo } from './pages/Demo'
import ForgetPassword from './pages/authentic8tn/ForgetPassword'
import Register from './pages/authentic8tn/Register'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout  />,
    children: [
      {
        path: '/',
        element: <Home  />
      },
      {
        path: '/login',
        element: <Login  />
      },
      {
        path: '/forget-password',
        element: <ForgetPassword  />
      },
      {
        path: '/register',
        element: <Register  />
      },
      {
        path: '/demo',
        element: <Demo  />
      },
    ]
  }
])
function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App
