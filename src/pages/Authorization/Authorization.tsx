import * as React from 'react';

import { observer } from 'mobx-react-lite';

import {
  Button,
  createTheme,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

import s from './Authorization.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2155CD',
    },
    secondary: {
      main: '#79747E',
    },
  },
});

const Authorization: React.FC = () => {
  const [role, setRole] = React.useState<string>('doctor');

  // Show/Hide password logic
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  // Show/Hide password logic

  return (
    <ThemeProvider theme={theme}>
      <div className={s.authorization}>
        <div className={s.authorization__logo}>
          <img src="../../assets/logo.jpg" alt="Логотип" />
        </div>
        <div className={s.authorization__content}>
          {role === 'doctor' ? (
            <div className={s['authorization__content-form']}>
              <Typography variant="h5">Добро пожаловать!</Typography>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="component-outlined">E-mail</InputLabel>
                <OutlinedInput sx={{ borderRadius: '20px' }} id="component-outlined" label="E-mail" />
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                  sx={{ borderRadius: '20px' }}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Пароль"
                />
              </FormControl>

              <Button
                fullWidth
                sx={{ borderRadius: '15px', textTransform: 'initial', paddingTop: '12px', paddingBottom: '12px' }}
                variant="contained"
              >
                <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Войти</Typography>
              </Button>
            </div>
          ) : (
            <div className={s['authorization__content-form']}>
              <Typography variant="h5">Добро пожаловать!</Typography>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="component-outlined">ID</InputLabel>
                <OutlinedInput sx={{ borderRadius: '20px' }} id="component-outlined" label="ID" />
              </FormControl>

              <Button
                fullWidth
                sx={{ borderRadius: '15px', textTransform: 'initial', paddingTop: '12px', paddingBottom: '12px' }}
                variant="contained"
              >
                <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Войти</Typography>
              </Button>
            </div>
          )}

          <div className={s['authorization__content-roles']}>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px',
                borderBottom: role === 'patient' ? '2px solid' : 'none',
              }}
              color={role === 'patient' ? 'primary' : 'secondary'}
              onClick={() => setRole('patient')}
            >
              <AccountCircleOutlinedIcon />
              <Typography sx={{ fontWeight: 400, fontSize: '14px', textTransform: 'initial' }}>Пациент</Typography>
            </Button>

            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px',
                borderBottom: role === 'doctor' ? '2px solid' : 'none',
              }}
              color={role === 'doctor' ? 'primary' : 'secondary'}
              onClick={() => setRole('doctor')}
            >
              <LocalHospitalOutlinedIcon />
              <Typography sx={{ fontWeight: 400, fontSize: '14px', textTransform: 'initial' }}>Врач</Typography>
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default observer(Authorization);
