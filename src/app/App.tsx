import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MedicalCard from 'pages/MedicalCard';
import Authorization from 'pages/Authorization';
import DoctorChat from 'pages/DoctorChat';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MedicalCard />} />
        <Route path="/" element={<MedicalCard />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/doctor-chat" element={<DoctorChat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default observer(App);
