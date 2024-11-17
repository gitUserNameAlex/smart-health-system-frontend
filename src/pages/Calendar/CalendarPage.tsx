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

import s from './CalendarPage.module.scss';
import { useRootStore } from 'stores/RootStore';
import { StaticDatePicker } from '@mui/x-date-pickers';
import LoadingPage from 'pages/LoadingPage';
import dayjs, { Dayjs } from 'dayjs';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const { userStore } = useRootStore();

  const navigate = useNavigate();

  const openTelegramBot = () => {
    window.open('https://t.me/myHealthTula_bot', '_blank', 'noopener,noreferrer');
  };

  const taskDescription = React.useMemo(() => {
    return selectedDate ? userStore.getTaskDescription(selectedDate) : null;
  }, [selectedDate, userStore]);

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

      <div className={s.calendar__content}>
        <StaticDatePicker displayStaticWrapperAs="desktop" value={selectedDate} onChange={handleDateChange} />

        {selectedDate && (
          <Box
            className={s.calendar__recipe}
            sx={{
              bgcolor: 'error.light',
              width: '90vw',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              padding: '15px',
            }}
          >
            <Typography variant="h6" align="center" sx={{ color: 'primary.main' }}>
              Рецепт на {selectedDate.format('DD.MM.YYYY')}:
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: 'primary.main' }}>
              {taskDescription}
            </Typography>
          </Box>
        )}
      </div>

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

export default observer(CalendarPage);
