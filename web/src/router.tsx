import { createBrowserRouter, Navigate } from 'react-router';

import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StatsPage } from './pages/StatsPage';
import { TasksPage } from './pages/TasksPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/tasks" replace /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'stats', element: <StatsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
