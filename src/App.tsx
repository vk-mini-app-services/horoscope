import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
// import { useEffect } from 'react';
// import { addApp } from './api';
import { MainRoutes } from './containers/routes';
import { theme } from './theme/global-theme';
// import { NAME_PROJECT } from './utils/constants';

const App = () => {
  // useEffect(() => {
  //   addApp(NAME_PROJECT);
  // }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider position="top-right" zIndex={1200}>
        <MainRoutes />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
