import { Layout } from '../../layout';
import { useState } from 'react';
import { StartPanel } from './panels/start';
import { SelectPanel } from './panels/select';
import { AccessPanel } from './panels/access-publish-photo';

export const Home = () => {
  const [activePanel, setActivePanel] = useState<string>('start');

  return (
    <Layout>
      {activePanel === 'start' && <StartPanel setActivePanel={setActivePanel} />}
      {activePanel === 'access-publish-photo' && <AccessPanel setActivePanel={setActivePanel} />}
      {activePanel === 'select' && <SelectPanel setActivePanel={setActivePanel} />}
    </Layout>
  );
};
