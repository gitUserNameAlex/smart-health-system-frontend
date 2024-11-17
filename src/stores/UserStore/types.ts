import { Dayjs } from 'dayjs';

export interface IUser {
  id: number;
  FCs: string;
  phone: string;
  role: string;
  device_id: string;
  doctor_id: number;
  tasks: Record<number, string>;
  calendar_id: number;
  hospital_address: string;
  expiriance: string;
  email: string;
  heart_rate_hight_limit: number;
  heart_rate_low_limit: number;
  pressure_hight_limit: number;
  pressure_low_limit: number;
  spo2_hight_limit: number;
  spo2_low_limit: number;
}

export interface IUserStore {
  fetchUser(token: string): Promise<void>;
  fetchDoctor(token: string): Promise<void>;
  getTaskDescription(date: Dayjs): string;
  userName: string | undefined;
  doctorInfo: IUser | null;
  userInfo: IUser | null;
  isUserLoading: boolean;
  isDoctorLoading: boolean;
}
