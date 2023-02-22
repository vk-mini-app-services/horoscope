import { useState } from 'react';
import { Layout } from '../../layout';
import { ResultPanel } from './panels/result';
import { SelectPanel } from './panels/select';

export const DemonicHoroscope = () => {
  const [activePanel, setActivePanel] = useState<string>('select');
  const [zodiac, setZodiac] = useState<string>('');

  return (
    <Layout>
      {activePanel === 'select' && (
        <SelectPanel setActivePanel={setActivePanel} setZodiac={setZodiac} zodiac={zodiac} />
      )}
      {activePanel === 'result' && <ResultPanel setActivePanel={setActivePanel} zodiac={zodiac} />}
    </Layout>
  );
};
