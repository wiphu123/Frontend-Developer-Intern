import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import KolRegistrationFlow from './KolRegistrationFlow';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
    ],
  },
]);