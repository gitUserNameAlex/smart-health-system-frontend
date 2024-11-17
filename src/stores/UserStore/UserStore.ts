import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { BASE_URL } from 'config/api';
import { IUser, IUserStore } from './types';

export class UserStore implements IUserStore {
  user: IUser | null = null;
  doctor: IUser | null = null;
  userLoadingStage: string = 'loading';
  doctorLoadingStage: string = 'loading';
  metricsLoadingStage: string = 'loading';
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(token: string): Promise<void> {
    this.error = null;

    try {
      const response = await axios.get(`${BASE_URL}/user/${token}/`);
      this.user = response.data;
      this.userLoadingStage = 'success';
    } catch (err) {
      this.error = (err as Error).message || 'Ошибка при выполнении запроса';
      this.userLoadingStage = 'error';
    }
  }

  async fetchDoctor(token: string): Promise<void> {
    this.error = null;

    try {
      const response = await axios.get(`${BASE_URL}/user/${token}/get_doctor/`);
      this.doctor = response.data;
      this.doctorLoadingStage = 'success';
    } catch (err) {
      this.error = (err as Error).message || 'Ошибка при выполнении запроса';
      this.doctorLoadingStage = 'error';
    }
  }

  get userName(): string | undefined {
    return this.user?.FCs;
  }

  get doctorInfo(): IUser | null {
    return this.doctor;
  }

  get isUserLoading(): boolean {
    return this.userLoadingStage === 'loading';
  }

  get isMetricsLoading(): boolean {
    return this.metricsLoadingStage === 'loading';
  }
}
