import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import s from './DoctorInfo.module.scss';
import { useRootStore } from 'stores/RootStore';
import LoadingPage from 'pages/LoadingPage';
import { TOKEN_DEFAULT } from 'config/token';

const DoctorInfo: React.FC = () => {
  const { userStore } = useRootStore();

  const navigate = useNavigate();

  const openTelegramBot = () => {
    window.open('https://t.me/myHealthTula_bot', '_blank', 'noopener,noreferrer');
  };

  React.useEffect(() => {
    userStore.fetchDoctor(TOKEN_DEFAULT);
  }, [userStore]);

  if (userStore.isDoctorLoading) {
    return <LoadingPage />;
  }

  console.log(userStore.doctorInfo);

  return (
    <div className={s.doctor}>
      <div className={s['doctor__header-container']}>
        <div className={s.doctor__header}>
          <div>
            <Typography sx={{ color: 'primary.contrastText', cursor: 'pointer' }}>{userStore.userName}</Typography>
          </div>

          <div className={s['doctor__header-ui']}>
            <NotificationsOutlinedIcon sx={{ color: 'primary.contrastText', cursor: 'pointer' }} />
            <SettingsOutlinedIcon sx={{ color: 'primary.contrastText', cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      <div className={s.doctor__content}>
        <Box
          sx={{
            bgcolor: 'error.light',
            width: '90vw',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            alignItems: 'center',
            padding: '15px',
          }}
        >
          <Typography variant="h5" sx={{ color: 'primary.main' }}>
            {userStore.doctorInfo?.FCs}
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'primary.main' }}>
            Телефон: {userStore.doctorInfo?.phone}
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'primary.main' }}>
            Почта: {userStore.doctorInfo?.email}
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'primary.main' }}>
            Адрес больницы: {userStore.doctorInfo?.hospital_address}
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: 'primary.main' }}>
            Степень: {userStore.doctorInfo?.expiriance}
          </Typography>
        </Box>
      </div>

      <div className={s['doctor__footer-container']}>
        <div className={s.doctor__footer}>
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '0px',
            }}
            onClick={() => navigate('/medical-card')}
          >
            <OtherHousesOutlinedIcon sx={{ color: 'secondary.light' }} />
            <Typography sx={{ color: 'secondary.light', textTransform: 'initial' }}>Главная</Typography>
          </Button>

          <Button sx={{ display: 'flex', flexDirection: 'column' }}>
            <LocalHospitalOutlinedIcon sx={{ color: 'secondary.dark' }} />
            <Typography sx={{ color: 'secondary.dark', textTransform: 'initial' }}>Врач</Typography>
          </Button>

          <Button sx={{ display: 'flex', flexDirection: 'column' }} onClick={openTelegramBot}>
            <MarkChatUnreadOutlinedIcon sx={{ color: 'secondary.light' }} />
            <Typography sx={{ color: 'secondary.light', textTransform: 'initial' }}>Чат</Typography>
          </Button>

          <Button sx={{ display: 'flex', flexDirection: 'column' }} onClick={() => navigate('/calendar')}>
            <CalendarTodayOutlinedIcon sx={{ color: 'secondary.light' }} />
            <Typography sx={{ color: 'secondary.light', textTransform: 'initial' }}>Календарь</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(DoctorInfo);
