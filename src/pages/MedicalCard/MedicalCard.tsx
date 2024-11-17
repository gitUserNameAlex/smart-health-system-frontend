import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import { fetchEventSource } from '@microsoft/fetch-event-source';
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
import { BASE_URL } from 'config/api';
import { TOKEN_DEFAULT } from 'config/token';

const MedicalCard: React.FC = () => {
  const [heartData, setHeartData] = React.useState<number[]>([]);
  const [heartTS, setHeartTS] = React.useState<string[]>([]);

  const [pressureData, setPressureData] = React.useState<number[]>([]);
  const [pressureTS, setPressureTS] = React.useState<string[]>([]);

  const [spoData, setSpoData] = React.useState<number[]>([]);
  const [spoTS, setSpoTS] = React.useState<string[]>([]);

  const { userStore } = useRootStore();

  const navigate = useNavigate();

  const openTelegramBot = () => {
    window.open('https://t.me/myHealthTula_bot', '_blank', 'noopener,noreferrer');
  };

  React.useEffect(() => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const controller3 = new AbortController();

    fetchEventSource(`${BASE_URL}/user/${TOKEN_DEFAULT}/chart/heart-rate/flow/`, {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream',
      },
      signal: controller1.signal,
      async onopen(res) {
        if (res.ok && res.status === 200) {
          console.log('Connection made ', res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log('Client side error ', res);
        }
      },
      onmessage(event) {
        const parsedData = JSON.parse(event.data);
        setHeartData(parsedData.values);
        setHeartTS(parsedData.values.map((_: number, idx: number) => idx));
      },
      onclose() {
        console.log('Connection closed by the server');
      },
      onerror(err) {
        console.log('There was an error from server', err);
      },
    });

    fetchEventSource(`${BASE_URL}/user/${TOKEN_DEFAULT}/chart/pressure/flow/`, {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream',
      },
      signal: controller2.signal,
      async onopen(res) {
        if (res.ok && res.status === 200) {
          console.log('Connection made ', res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log('Client side error ', res);
        }
      },
      onmessage(event) {
        const parsedData = JSON.parse(event.data);
        setPressureData(parsedData.values.map((newVal: number) => newVal / 7.7));
        setPressureTS(parsedData.values.map((_: number, idx: number) => idx));
      },
      onclose() {
        console.log('Connection closed by the server');
      },
      onerror(err) {
        console.log('There was an error from server', err);
      },
    });

    fetchEventSource(`${BASE_URL}/user/${TOKEN_DEFAULT}/chart/spo2/flow/`, {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream',
      },
      signal: controller3.signal,
      async onopen(res) {
        if (res.ok && res.status === 200) {
          console.log('Connection made ', res);
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          console.log('Client side error ', res);
        }
      },
      onmessage(event) {
        const parsedData = JSON.parse(event.data);
        setSpoData(parsedData.values);
        setSpoTS(parsedData.values.map((_: number, idx: number) => idx));
      },
      onclose() {
        console.log('Connection closed by the server');
      },
      onerror(err) {
        console.log('There was an error from server', err);
      },
    });

    return () => {
      controller1.abort();
      controller2.abort();
      controller3.abort();
    };
  }, []);

  if (userStore.isUserLoading) {
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
            <Typography
              color="secondary.contrastText"
              sx={{
                width: '70vw',
                borderRadius: '30px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'error.main',
              }}
              variant="h5"
            >
              Сердечный ритм
            </Typography>
            <LineChart
              xAxis={[{ data: heartTS }]}
              series={[
                {
                  data: heartData,
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
            <Typography
              color="primary.main"
              variant="h5"
              sx={{
                width: '70vw',
                borderRadius: '30px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'error.light',
              }}
            >
              Давление
            </Typography>
            <LineChart
              xAxis={[{ data: pressureTS }]}
              series={[
                {
                  data: pressureData,
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
            <Typography
              color="primary.light"
              variant="h5"
              sx={{
                width: '70vw',
                borderRadius: '30px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'error.dark',
              }}
            >
              Кислород в крови
            </Typography>
            <LineChart
              xAxis={[{ data: spoTS }]}
              series={[
                {
                  data: spoData,
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
