import React, { FunctionComponent } from 'react';
import './App.css';
import Authentication from './components/auth/Authentication';

const App: FunctionComponent = () => {
  return (
    <div>
      <h1>Welcome to game KPI Student!</h1>
      <Authentication />
    </div>
  );
};

export default App;
