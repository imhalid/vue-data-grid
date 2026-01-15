import React from 'react';
import NavBar from 'components/NavBar';
import SalesTable from 'components/SalesTable';
import './App.sass';

const App: React.FC = () => {
  return (
    <div id="app">
      <NavBar name="Lucien Lee" />
      <div className="dataTable">
        <SalesTable />
      </div>
    </div>
  );
};

export default App;
