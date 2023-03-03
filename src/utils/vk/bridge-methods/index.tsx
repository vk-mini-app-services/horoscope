import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';
import { USER_ID } from '../../constants';
import { APP_ID, SHARING_TEXT, URL_PROXY } from '../../constants/app';

// import sharingMan from '../img/sharingMan.png';
// import sharingWoman from '../img/sharingWoman.png';

export const getUserPlatform = async () => {
  let platform = null;

  await bridge
    .send('VKWebAppGetClientVersion')
    .then((res) => {
      if (res.platform) {
        platform = res.platform;
      }
      console.log('VKWebAppGetAuthTokeN RES', res);
    })
    .catch((err) => {
      console.log('VKWebAppGetAuthTokeN ERR', err);
    });

  return platform;
};
// получение токена пользователя
export const getUserToken = async (scope: string) => {
  let token = '';

  await bridge
    .send('VKWebAppGetAuthToken', {
      app_id: APP_ID,
      scope: scope
    })
    .then((res) => {
      token = res.access_token;
      console.log('VKWebAppGetAuthTokeN RES', res);
    })
    .catch((err) => {
      console.log('VKWebAppGetAuthTokeN ERR', err);
    });

  return token;
};

// разрешение на отправку сообщений от имени группы
export const subscribeMessageFromGroup = async (groupIDsubscription: number) => {
  return await bridge
    .send('VKWebAppAllowMessagesFromGroup', {
      group_id: groupIDsubscription
    })
    .then((res) => {
      console.log('VKWebAppAllowMessagesFromGroup RES', res);
    })
    .catch((err) => {
      console.log('VKWebAppAllowMessagesFromGroup ERR', err);
    });
};

// подписка на группу
export const addGroup = async (groupId: number) => {
  return await bridge
    .send('VKWebAppJoinGroup', { group_id: groupId })
    .then(({ result }) => {
      console.log('VKWebAppJoinGroup RES', result);
    })
    .catch((err) => {
      console.log('VKWebAppJoinGroup RES', err);
    });
};

// добавление сервиса в сообщество
export function AddToCommunity() {
  bridge
    .send('VKWebAppAddToCommunity', {})
    .then((res) => {
      console.log('VKWebAppAddToCommunity RES', res);
    })
    .catch((err) => {
      console.log('VKWebAppAddToCommunity ERR', err);
    });
}

// открытие др приложение
export function goToApp(appID: number, location: string) {
  // location (string) Хеш, строка после # в URL вида vk.com/app123456#.
  bridge.send('VKWebAppOpenApp', { app_id: appID, location });
}

// вызов метода vk api
// groups.get
export async function getApiMethod(token: string, method: string) {
  return bridge
    .send('VKWebAppCallAPIMethod', {
      method: method,
      params: {
        user_id: USER_ID,
        v: '5.131',
        access_token: token,
        // filter: "admin", // является ли данный пользователь админом
        extended: 1
      }
    })
    .then((res) => {
      console.log('VKWebAppCallAPIMethod RES', res);
    })
    .catch((err) => {
      console.log('VKWebAppCallAPIMethod ERR', err);
    });
}

export const publishPhotoInAlbum = async (
  userToken: string,
  sex: number,
  sharingMan: string,
  sharingWoman: string
) => {
  const albumId = await bridge.send('VKWebAppCallAPIMethod', {
    method: 'photos.createAlbum',
    params: {
      title: 'ILLUMINATE TEST',
      description: SHARING_TEXT,
      v: '5.131',
      access_token: userToken
    }
  });

  const uploadUrl = await bridge.send('VKWebAppCallAPIMethod', {
    method: 'photos.getUploadServer',
    params: {
      album_id: albumId.response.id,
      v: '5.131',
      access_token: userToken
    }
  });

  // const img = [img1, img2, img3, img4][getRandomInt(0, 3)];
  const img = sex === 2 ? sharingMan : sharingWoman;

  const blob = await (await fetch(img)).blob();
  const formData = new FormData();
  formData.append('file', blob, 'image.png');

  const proxy = URL_PROXY;

  const { data: result } = await axios({
    method: 'post',
    url: `${proxy}/${uploadUrl.response.upload_url}`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  await bridge.send('VKWebAppCallAPIMethod', {
    method: 'photos.save',
    params: {
      album_id: albumId.response.id,
      v: '5.131',
      access_token: userToken,
      hash: result.hash,
      photos_list: result.photos_list,
      server: result.server,
      caption: SHARING_TEXT
    }
  });
};

export const subscriptionById = async (subGroup?: number, mailGroup?: number) => {
  if (subGroup) {
    await addGroup(subGroup);
  }

  if (mailGroup) {
    await subscribeMessageFromGroup(mailGroup);
  }
};

export const appAllowNotifications = async () => {
  let appNotyRes = false;
  await bridge
    .send('VKWebAppAllowNotifications', {})
    .then((res) => {
      if (res.result) {
        appNotyRes = true;
      }
      console.log('VKWebAppAllowNotifications RES', res);
    })
    .catch((err) => {
      console.log('VKWebAppAllowNotifications ERR', err);
    });

  return appNotyRes;
};
