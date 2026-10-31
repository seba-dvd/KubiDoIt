import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import './index.css';
import { router } from './router';
import { TasksProvider } from './state/TasksProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  </StrictMode>,
);
