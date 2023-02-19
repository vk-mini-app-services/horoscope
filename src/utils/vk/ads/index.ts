import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';

// открытие рекламного ролика
export const nativeAds = async () => {
  return bridge
    .send('VKWebAppShowNativeAds', {
      ad_format: EAdsFormats.REWARD
    })
    .then((res) => {
      console.log('ads res', res);
    })
    .catch((err) => {
      console.log('ads err', err);
    });
};
