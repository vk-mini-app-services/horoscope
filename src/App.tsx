import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { MainRoutes } from './containers/routes';
import { theme } from './theme/global-theme';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider position="top-right" zIndex={1200}>
        <MainRoutes />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
