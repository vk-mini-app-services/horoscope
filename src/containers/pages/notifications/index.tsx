import { useState } from 'react';
import { IZodiac } from '../../../types';
import { useAds } from '../../../utils/hooks/useAds';
import { Layout } from '../../layout';
import { ResultPanel } from './panels/result';
import { SelectPanel } from './panels/select';

export const Notifications = () => {
  const [activePanel, setActivePanel] = useState<string>('select');
  const [zodiac, setZodiac] = useState<string>('');
  const [sharingPhotoUrl, setSharingPhotoUrl] = useState<string>('');
  const [zodiacObj, setZodiacObj] = useState<IZodiac | null>(null);

  useAds();

  return (
    <Layout>
      {activePanel === 'select' && (
        <SelectPanel
          setActivePanel={setActivePanel}
          setZodiac={setZodiac}
          zodiac={zodiac}
          setSharingPhotoUrl={setSharingPhotoUrl}
          setZodiacObj={setZodiacObj}
          zodiacObj={zodiacObj}
        />
      )}
      {activePanel === 'result' && (
        <ResultPanel
          sharingPhotoUrl={sharingPhotoUrl}
          zodiacObj={zodiacObj}
          setActivePanel={setActivePanel}
          zodiac={zodiac}
        />
      )}
    </Layout>
  );
};
