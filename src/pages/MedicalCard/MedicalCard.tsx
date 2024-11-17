import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import s from './MedicalCard.module.scss';
import { useRootStore } from 'stores/RootStore';
import LoadingPage from 'pages/LoadingPage';
import { TOKEN_DEFAULT } from 'config/token';

const MedicalCard: React.FC = () => {
  const { userStore } = useRootStore();

  const navigate = useNavigate();

  const openTelegramBot = () => {
    window.open('https://t.me/myHealthTula_bot', '_blank', 'noopener,noreferrer');
  };

  React.useEffect(() => {
    userStore.fetchMetrics(TOKEN_DEFAULT);
  }, [userStore]);

  if (userStore.isUserLoading || userStore.isMetricsLoading) {
    return <LoadingPage />;
  }

  if (userStore)
    return (
      <div className={s.card}>
        <div className={s['card__header-container']}>
          <div className={s.card__header}>
            <div>
              <Typography sx={{ color: 'primary.contrastText', cursor: 'pointer' }}>{userStore.userName}</Typography>
            </div>

            <div className={s['card__header-ui']}>
              <NotificationsOutlinedIcon sx={{ color: 'primary.contrastText', cursor: 'pointer' }} />
              <SettingsOutlinedIcon sx={{ color: 'primary.contrastText', cursor: 'pointer' }} />
            </div>
          </div>
        </div>

        <div className={s.card__content}>
          <div className={s['card__content-item']}>
            <Typography color="secondary.contrastText" variant="h5">
              Сердечный ритм
            </Typography>
            <LineChart
              xAxis={[{ data: [0, 1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [0, 2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                  color: '#C13041',
                  curve: 'linear',
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              width={360}
              height={360}
            />
          </div>

          <div className={s['card__content-item']}>
            <Typography color="primary.main" variant="h5">
              Давление
            </Typography>
            <LineChart
              xAxis={[{ data: [0, 1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [0, 2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                  color: '#2155CD',
                  curve: 'linear',
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              width={360}
              height={360}
            />
          </div>

          <div className={s['card__content-item']}>
            <Typography color="primary.light" variant="h5">
              Кислород в крови
            </Typography>
            <LineChart
              xAxis={[{ data: [0, 1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [0, 2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                  curve: 'linear',
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              width={360}
              height={360}
            />
          </div>
        </div>

        <div className={s['card__footer-container']}>
          <div className={s.card__footer}>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px',
              }}
            >
              <OtherHousesOutlinedIcon sx={{ color: 'secondary.dark' }} />
              <Typography sx={{ color: 'secondary.dark', textTransform: 'initial' }}>Главная</Typography>
            </Button>

            <Button sx={{ display: 'flex', flexDirection: 'column' }} onClick={() => navigate('/doctor-info')}>
              <LocalHospitalOutlinedIcon sx={{ color: 'secondary.light' }} />
              <Typography sx={{ color: 'secondary.light', textTransform: 'initial' }}>Врач</Typography>
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

export default observer(MedicalCard);
