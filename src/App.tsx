import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import bridge from '@vkontakte/vk-bridge';
import { useEffect } from 'react';
import { getPayload } from './api';
import { MainRoutes } from './containers/routes';
import { theme } from './theme/global-theme';
import { useStores } from './utils/hooks/useStores';

const App = () => {
  const { UserStore } = useStores();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getPayload();

        if (data && data.success) {
          UserStore.setGroups(data.message);
        }
      } catch (e) {
        console.warn('getPayload ERR', e);
      }

      const user = await bridge.send('VKWebAppGetUserInfo');
      console.log('user', user);

      UserStore.setUserInfo(user);
    })();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider position="top-right" zIndex={1200}>
        <MainRoutes />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
