import { MantineProvider } from '@mantine/core';
import { MainRoutes } from './containers/routes';
import { theme } from './theme/global-theme';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <MainRoutes />
    </MantineProvider>
  );
};

export default App;
