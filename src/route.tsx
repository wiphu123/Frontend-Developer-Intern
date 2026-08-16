import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import KolRegistrationFlow from './KolRegistrationFlow';
import RegisterSuccessPage from './RegisterSuccessPage'; // 1. นำเข้าหน้าสำเร็จ
import App from './App';
import KolRegisterSuccessPage from './KolRegisterSuccessPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'register-kol',
        element: <KolRegistrationFlow />,
      },
      {
        path: 'register-success', // 
        element: <RegisterSuccessPage />,
      },
      {
  path: 'register-kol-success',
  element: <KolRegisterSuccessPage />,
},
    ],
  },
]);