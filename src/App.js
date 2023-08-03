import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewServices from './components/view-services';
import Login from './components/login';
import Tickets from './components/tickets';
import CreateTicket from './components/create-ticket';
import AddReport from './components/add-report';
import Logout from './components/logout';
const App = () => {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setAccessToken={setAccessToken} />} />
        <Route
          path="/view-services"
          element={<ViewServices accessToken={accessToken} />}
        />
        <Route
          path="/tickets"
          element={<Tickets accessToken={accessToken} />}
        />
        <Route
          path="/create-ticket"
          element={<CreateTicket accessToken={accessToken} />}
        />
        <Route
          path="/add-report"
          element={<AddReport accessToken={accessToken} />}
        />
        <Route path="/logout" element={<Logout accessToken={accessToken} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
