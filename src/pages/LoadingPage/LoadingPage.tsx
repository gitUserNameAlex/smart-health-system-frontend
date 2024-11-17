import * as React from 'react';

import s from './LoadingPage.module.scss';
import { Logo } from 'components/Logo';
import { CircularProgress, Typography } from '@mui/material';

const LoadingPage: React.FC = () => {
  return (
    <div className={s.loading}>
      <div className={s.loading__logo}>
        <Logo />
      </div>
      <div className={s.loading__loader}>
        <CircularProgress sx={{ color: 'secondary.dark' }} />
        <Typography sx={{ color: 'secondary.dark' }}>Сбор данных...</Typography>
      </div>
    </div>
  );
};

export default LoadingPage;
