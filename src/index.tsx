import bridge from '@vkontakte/vk-bridge';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Init VK  Mini App
bridge.send('VKWebAppInit');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
