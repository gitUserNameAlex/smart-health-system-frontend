import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MedicalCard from 'pages/MedicalCard';
import Authorization from 'pages/Authorization';
import { createTheme, ThemeProvider } from '@mui/material';
import DoctorInfo from 'pages/DoctorInfo';
import { RootStoreProvider } from 'stores/RootStore';
import CalendarPage from 'pages/Calendar/CalendarPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2155CD',
      light: '#02d5d1',
      contrastText: '#FBFFFF',
    },
    secondary: {
      main: '#79747E',
      light: '#ACCAFF',
      contrastText: '#C13041',
      dark: '#FFFFFF',
    },
    error: {
      main: '#F0B9BF',
      light: '#CAD8F9',
      dark: '#ACF4F4',
    },
  },
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <RootStoreProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Authorization />} />
            <Route path="/" element={<Authorization />} />
            <Route path="/medical-card" element={<MedicalCard />} />
            <Route path="/doctor-info" element={<DoctorInfo />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </RootStoreProvider>
  );
};

export default observer(App);
