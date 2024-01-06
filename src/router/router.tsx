import Login from '@pages/login/Login';
import Register from '@pages/register/Register';
import { createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);
export default router;
