import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import { Demo } from './pages/Demo'



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
