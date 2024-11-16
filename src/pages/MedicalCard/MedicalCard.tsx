import * as React from 'react';

import { observer } from 'mobx-react-lite';
import s from './MedicalCard.module.scss';

const MedicalCard: React.FC = () => {
  return <div className={s.card}>Medical Card</div>;
};

export default observer(MedicalCard);
