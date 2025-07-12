import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyContextProvider } from './Context.jsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <MyContextProvider>
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <App />
  </StrictMode>
  </QueryClientProvider>
  </MyContextProvider>
)
