import { showNotification } from '@mantine/notifications';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import { sendRequestWithRetry } from '../../../api/helpers';
import { APP_URL, NAME_PROJECT, SHARING_TEXT, URL_PROXY } from '../../constants';
import { addTextInLocalPhotoNew, convertToLocalFileInBlob } from '../../files';
import { getUserToken } from '../bridge-methods';

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
export const sharingStory = async (link: string) => {
  return await bridge.send('VKWebAppShowStoryBox', {
    background_type: 'image',
    url: link,
    attachment: {
      text: 'go_to',
      type: 'url',
      url: APP_URL
    }
  });
};

//  Добавление репоста на стену пользователя
export const shareWall = (e: React.SyntheticEvent<any>, link: string) => {
  e.preventDefault();

  // заменить фото
  const urlPhoto = `${link}, ${APP_URL}`;

  bridge.send('VKWebAppShowWallPostBox', {
    message: SHARING_TEXT,
    attachments: urlPhoto
  });
};

export async function createAndShareStory(
  text: string,
  photo: File,
  ACCESS_TOKEN: string,
  staticText: string
) {
  const { blob } = await addTextInLocalPhotoNew(text, photo, staticText);

  try {
    // canvas.toBlob(async (blob: any) => {
    // Загрузка картинки на сервер
    const formData = new FormData();
    formData.append('photo', blob, 'photo.png');

    const albumId = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.createAlbum',
      params: {
        title: NAME_PROJECT,
        description: SHARING_TEXT,
        v: '5.131',
        access_token: ACCESS_TOKEN
      }
    });

    const uploadUrl = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.getUploadServer',
      params: {
        album_id: albumId.response.id,
        v: '5.131',
        access_token: ACCESS_TOKEN
      }
    });

    const { data: result } = await axios({
      method: 'post',
      url: `${URL_PROXY}/${uploadUrl.response.upload_url}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const { response } = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.save',
      params: {
        album_id: albumId.response.id,
        v: '5.131',
        access_token: ACCESS_TOKEN,
        hash: result.hash,
        photos_list: result.photos_list,
        server: result.server,
        caption: SHARING_TEXT
      }
    });

    const lastItem = response[0]?.sizes.length - 1;

    const photoUrl = response[0]?.sizes[lastItem]?.url;

    console.log('response', response);

    // Открытие редактора историй с картинкой
    await bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: photoUrl,
      attachment: {
        text: 'go_to',
        type: 'url',
        url: APP_URL
      }
    });

    // }, 'image/png');
  } catch (error) {
    console.log(error);
  }
}

export async function postPhotoOnWall(linkPhoto: string, ACCESS_TOKEN: string) {
  const blob = await convertToLocalFileInBlob(linkPhoto);
  let token = ACCESS_TOKEN;

  if (!token) {
    token = await getUserToken('wall,photos,friends');
  }

  try {
    const formData = new FormData();
    formData.append('photo', blob, 'photo.png');

    const albumId = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.createAlbum',
      params: {
        title: NAME_PROJECT,
        description: SHARING_TEXT,
        v: '5.131',
        access_token: token
      }
    });

    const uploadUrl = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'photos.getUploadServer',
      params: {
        album_id: albumId.response.id,
        v: '5.131',
        access_token: token
      }
    });

    try {
      const config = {
        method: 'post',
        url: `${URL_PROXY}/${uploadUrl.response.upload_url}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      const { data: result } = await sendRequestWithRetry(10, 1000, config);

      await bridge.send('VKWebAppCallAPIMethod', {
        method: 'photos.save',
        params: {
          album_id: albumId.response.id,
          v: '5.131',
          access_token: token,
          hash: result.hash,
          photos_list: result.photos_list,
          server: result.server,
          caption: SHARING_TEXT
        }
      });
    } catch (error) {
      console.error('sendRequestWithRetry error', error);
    }
    // const { data: result } = await axios({
    //   method: 'post',
    //   url: `${URL_PROXY}/${uploadUrl.response.upload_url}`,
    //   data: formData,
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   timeout: 30_000
    // });
  } catch (error) {
    console.log('postPhotoOnWall', error);
  }
}
