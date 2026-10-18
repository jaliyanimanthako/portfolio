import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import IllustrationLab from './components/illustrations/IllustrationLab';

createRoot(document.getElementById('root')).render(<StrictMode><IllustrationLab /></StrictMode>);
