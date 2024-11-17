import * as React from 'react';

import { observer } from 'mobx-react-lite';
import { Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import s from './Calendar.module.scss';
import { useRootStore } from 'stores/RootStore';
import LoadingPage from 'pages/LoadingPage';

const Calendar: React.FC = () => {
  const { userStore } = useRootStore();

  const navigate = useNavigate();

  const openTelegramBot = () => {
    window.open('https://t.me/myHealthTula_bot', '_blank', 'noopener,noreferrer');
  };

  if (userStore.isUserLoading) {
    return <LoadingPage />;
  }

  return (
    <div className={s.calendar}>
      <div className={s['calendar__header-container']}>
        <div className={s.calendar__header}>
          <div>
            <Typography sx={{ color: 'primary.contrastText', cursor: 'pointer' }}>{userStore.userName}</Typography>
          </div>

          <div className={s['calendar__header-ui']}>
            <NotificationsOutlinedIcon sx={{ color: 'primary.contrastText', cursor: 'pointer' }} />
            <SettingsOutlinedIcon sx={{ color: 'primary.contrastText', cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      <div className={s.calendar__content}></div>

      <div className={s['calendar__footer-container']}>
        <div className={s.calendar__footer}>
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

          <Button sx={{ display: 'flex', flexDirection: 'column' }} onClick={() => navigate('/doctor-info')}>
            <LocalHospitalOutlinedIcon sx={{ color: 'secondary.light' }} />
            <Typography sx={{ color: 'secondary.light', textTransform: 'initial' }}>Врач</Typography>
          </Button>

          <Button sx={{ display: 'flex', flexDirection: 'column' }} onClick={openTelegramBot}>
            <MarkChatUnreadOutlinedIcon sx={{ color: 'secondary.light' }} />
            <Typography sx={{ color: 'secondary.light', textTransform: 'initial' }}>Чат</Typography>
          </Button>

          <Button sx={{ display: 'flex', flexDirection: 'column' }}>
            <CalendarTodayOutlinedIcon sx={{ color: 'secondary.dark' }} />
            <Typography sx={{ color: 'secondary.dark', textTransform: 'initial' }}>Календарь</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Calendar);
