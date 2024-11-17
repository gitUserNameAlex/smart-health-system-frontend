import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';

import { Logo } from 'components/Logo';
import { useNavigate } from 'react-router-dom';

import s from './Authorization.module.scss';
import { TOKEN_DEFAULT } from 'config/token';
import { useRootStore } from 'stores/RootStore';

const Authorization: React.FC = () => {
  const { userStore } = useRootStore();

  const navigate = useNavigate();

  const [role, setRole] = React.useState<string>('doctor');

  const handleLogin = (): void => {
    userStore.fetchUser(TOKEN_DEFAULT);
    navigate('/medical-card');
  };

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
    <div className={s.authorization}>
      <div className={s.authorization__logo}>
        <Logo />
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
              <OutlinedInput sx={{ borderRadius: '20px' }} id="component-outlined" defaultValue={TOKEN_DEFAULT} />
            </FormControl>

            <Button
              fullWidth
              startIcon={<QrCodeIcon />}
              sx={{ borderRadius: '15px', textTransform: 'initial', height: '56px' }}
              variant="outlined"
            >
              <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Сканировать QR-код</Typography>
            </Button>

            <Button
              fullWidth
              sx={{ borderRadius: '15px', textTransform: 'initial', paddingTop: '12px', paddingBottom: '12px' }}
              variant="contained"
              onClick={handleLogin}
            >
              <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Войти</Typography>
            </Button>
          </div>
        )}

        <div className={s['authorization__content-roles_container']}>
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
    </div>
  );
};

export default observer(Authorization);
