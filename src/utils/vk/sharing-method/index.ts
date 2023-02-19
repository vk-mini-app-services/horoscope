import { showNotification } from '@mantine/notifications';
import bridge from '@vkontakte/vk-bridge';
import { APP_URL } from '../../constants';

// Поделиться ссылкой
export const shareLink = () => {
  bridge.send('VKWebAppShare', {
    link: APP_URL
  });
};

// Копирование в буфер
export const copyLink = () => {
  bridge
    .send('VKWebAppGetClientVersion')
    .then((result) => {
      console.log(result.platform);
      if (result.platform === 'web' || result.platform === 'mobile-web') {
        window.navigator.clipboard.writeText(APP_URL).then(
          () => {
            console.log('successfully set', APP_URL);
            showNotification({
              title: `Ссылка скопирована`,
              message: '',
              autoClose: 5_000,
              color: 'green'
            });
          },
          () => {
            console.log('write failed', APP_URL);
          }
        );
      } else {
        bridge.send('VKWebAppCopyText', { text: APP_URL });
        showNotification({
          title: `Ссылка скопирована`,
          message: '',
          autoClose: 5_000,
          color: 'green'
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
};

//  Поделиться в истории
export const sharingStory = () => {
  const urlStories =
    'https://sun9-10.userapi.com/impg/UTdCX4NZTbH1oV7Xa_j0Ou_jcpXcR4PzfV0poA/sdgdmhgbyBM.jpg?size=887x666&quality=95&sign=2f6142a06c6c3d08030ac21d962f09f6&type=album';

  bridge.send('VKWebAppShowStoryBox', {
    background_type: 'image',
    url: urlStories,
    attachment: {
      text: 'go_to',
      type: 'url',
      url: APP_URL
    }
  });
};

//  Добавление репоста на стену пользователя
export const share = (e: React.SyntheticEvent<any>) => {
  e.preventDefault();

  // заменить фото
  const urlPhoto = `photo-215416619_457239017, ${APP_URL}`;
  const textStories = `Если твой клик будет последним, забираешь приз! Залетай в приложение, Приложение - ${APP_URL}`;

  bridge.send('VKWebAppShowWallPostBox', {
    message: textStories,
    attachments: urlPhoto
  });
};
