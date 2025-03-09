import React from 'react';

import { MainScene } from './scenes';
import { Dashboard } from './pages';

const App: React.FC = () => {
  return (
    <MainScene>
      <Dashboard />
    </MainScene>
  );
};

export default App;
