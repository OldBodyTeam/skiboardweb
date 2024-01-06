import router from '@router/router';
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import '@assets/common.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
