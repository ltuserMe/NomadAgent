import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from './app/providers/app-providers';
import { PlannerPage } from './page/planner-page';
import './app/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <PlannerPage />
    </AppProviders>
  </React.StrictMode>,
);
