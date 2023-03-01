import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import bridge from '@vkontakte/vk-bridge';
// import eruda from 'eruda';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { getPayload } from './api';
import { MainRoutes } from './containers/routes';
import { theme } from './theme/global-theme';
import { useStores } from './utils/hooks/useStores';
import { getUserPlatform } from './utils/vk/bridge-methods';

const App = observer(() => {
  const { UserStore } = useStores();

  // useEffect(() => {
  //   // if (process.env.NODE_ENV === 'development') {
  //   eruda.init();
  //   // }
  // }, []);

  useEffect(() => {
    (async () => {
      const platform = await getUserPlatform();
      UserStore.setPlatform(platform);
    })();
  }, []);

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
      localStorage.setItem('userInfo', JSON.stringify(user));

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
});

export default App;
