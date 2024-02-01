import Draw from '@pages/draw/Draw';
import DrawList from '@pages/drew-list/DrawList';
import Login from '@pages/login/Login';
import Register from '@pages/register/Register';
import ScrollText from '@pages/scroll-text/ScrollText';
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
  {
    path: 'draw',
    element: <Draw />,
  },
  {
    path: 'draw-list',
    element: <DrawList />,
  },
  {
    path: 'scroll-text',
    element: <ScrollText />,
  },
]);
export default router;
