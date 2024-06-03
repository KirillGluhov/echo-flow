import * as React from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from './components/MainPage.jsx';
import "../src/styles/style.css"

const root = createRoot(document.getElementById('root'));
root.render(<MainPage />);