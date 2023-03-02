import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useAds } from '../../../utils/hooks/useAds';
import { useStores } from '../../../utils/hooks/useStores';
import { Layout } from '../../layout';
import { ResultPanel } from './panels/result';
import { SelectPanel } from './panels/select';
import ariesWeb from '../../../assets/img/demonic-horoscope/desktop/aries.png';
import taurusWeb from '../../../assets/img/demonic-horoscope/desktop/taurus.png';
import geminiWeb from '../../../assets/img/demonic-horoscope/desktop/gemini.png';
import cancerWeb from '../../../assets/img/demonic-horoscope/desktop/cancer.png';
import leoWeb from '../../../assets/img/demonic-horoscope/desktop/leo.png';
import virgoWeb from '../../../assets/img/demonic-horoscope/desktop/virgo.png';
import libraWeb from '../../../assets/img/demonic-horoscope/desktop/libra.png';
import scorpioWeb from '../../../assets/img/demonic-horoscope/desktop/scorpio.png';
import sagittariusWeb from '../../../assets/img/demonic-horoscope/desktop/sagittarius.png';
import capricornWeb from '../../../assets/img/demonic-horoscope/desktop/capricorn.png';
import aquariusWeb from '../../../assets/img/demonic-horoscope/desktop/aquarius.png';
import piscesWeb from '../../../assets/img/demonic-horoscope/desktop/pisces.png';

import aries from '../../../assets/img/demonic-horoscope/aries.png';
import taurus from '../../../assets/img/demonic-horoscope/taurus.png';
import gemini from '../../../assets/img/demonic-horoscope/gemini.png';
import cancer from '../../../assets/img/demonic-horoscope/cancer.png';
import leo from '../../../assets/img/demonic-horoscope/leo.png';
import virgo from '../../../assets/img/demonic-horoscope/virgo.png';
import libra from '../../../assets/img/demonic-horoscope/libra.png';
import scorpio from '../../../assets/img/demonic-horoscope/scorpio.png';
import sagittarius from '../../../assets/img/demonic-horoscope/sagittarius.png';
import capricorn from '../../../assets/img/demonic-horoscope/capricorn.png';
import aquarius from '../../../assets/img/demonic-horoscope/aquarius.png';
import pisces from '../../../assets/img/demonic-horoscope/pisces.png';

const zodiacLocalPhoto: { [key: string]: string } = {
  aries: aries,
  taurus: taurus,
  gemini: gemini,
  cancer: cancer,
  leo: leo,
  virgo: virgo,
  libra: libra,
  scorpio: scorpio,
  sagittarius: sagittarius,
  capricorn: capricorn,
  aquarius: aquarius,
  pisces: pisces
};

const zodiacLocalPhotoWeb: { [key: string]: string } = {
  aries: ariesWeb,
  taurus: taurusWeb,
  gemini: geminiWeb,
  cancer: cancerWeb,
  leo: leoWeb,
  virgo: virgoWeb,
  libra: libraWeb,
  scorpio: scorpioWeb,
  sagittarius: sagittariusWeb,
  capricorn: capricornWeb,
  aquarius: aquariusWeb,
  pisces: piscesWeb
};

export const DemonicHoroscope = observer(() => {
  const { UserStore } = useStores();
  const [activePanel, setActivePanel] = useState<string>('select');
  const [zodiac, setZodiac] = useState<string>('');

  useAds();

  const resultImg =
    UserStore.platform === 'web' ? zodiacLocalPhotoWeb[zodiac] : zodiacLocalPhoto[zodiac];

  return (
    <Layout>
      {activePanel === 'select' && (
        <SelectPanel setActivePanel={setActivePanel} setZodiac={setZodiac} zodiac={zodiac} />
      )}
      {activePanel === 'result' && (
        <ResultPanel setActivePanel={setActivePanel} zodiac={zodiac} resultImg={resultImg} />
      )}
    </Layout>
  );
});
