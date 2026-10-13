import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSecurityProtection } from './utils/security';

// Initialize code protection & devtools deterrents
initSecurityProtection();

createRoot(document.getElementById('root')!).render(<App />);
