import { useEffect, useState } from 'react';
import { Layout } from '../../layout';
import { ResultPanel } from './panels/result';
import { SelectPanel } from './panels/select';

export const ZodiacCompatibility = () => {
  const [activePanel, setActivePanel] = useState<string>('select');
  const [generalZodiac, setGeneralZodiac] = useState<string>('');

  useEffect(() => {
    console.log('generalZodiac', generalZodiac);
    console.log('generalZodiac', generalZodiac);
  }, [generalZodiac]);

  return (
    <Layout>
      {activePanel === 'select' && (
        <SelectPanel setActivePanel={setActivePanel} setGeneralZodiac={setGeneralZodiac} />
      )}
      {activePanel === 'result' && (
        <ResultPanel setActivePanel={setActivePanel} generalZodiac={generalZodiac} />
      )}
    </Layout>
  );
};
