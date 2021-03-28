import React from 'react';
import { EventBus } from 'ts-bus';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Api from './lib/Api';
import { ServiceProvider } from './lib/ServiceContext';
import EmployeeList from './components/EmployeeList';
import DepartmentFilter from './components/DepartmentFilter';

const App = () => (
  <div className="App">
    <ServiceProvider value={{
      bus: new EventBus(),
      api: Api(),
    }}
    >
      <ToastContainer
        hideProgressBar
        autoClose={6000}
      />
      <header className="App-header">
        <h1>Employee list</h1>
      </header>
      <div className="Content">
        <DepartmentFilter />
        <EmployeeList />
      </div>
    </ServiceProvider>
  </div>
);

export default App;
