import React from 'react';
import NavBar from 'components/NavBar';
import DgTable from 'components/DgTable';
import './App.sass';

const App: React.FC = () => {
  return (
    <div id="app">
      <NavBar name="Lucien Lee" />
      <div className="dataTable">
        <DgTable />
      </div>
    </div>
  );
};

export default App;
