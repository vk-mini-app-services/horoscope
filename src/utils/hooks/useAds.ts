import { useEffect } from 'react';
import { nativeAds } from '../vk/ads';

export const useAds = (delay?: number) => {
  useEffect(() => {
    const _delay = delay ? delay : 0;
    setTimeout(() => {
      nativeAds();
    }, _delay);
  }, []);
};
