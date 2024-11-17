export interface IUser {
  id: number;
  FCs: string;
  phone: string;
  role: string;
  device_id: string;
  doctor_id: number;
  tasks: string;
  calendar_id: number;
  heart_rate_hight_limit: number;
  heart_rate_low_limit: number;
  pressure_hight_limit: number;
  pressure_low_limit: number;
  spo2_hight_limit: number;
  spo2_low_limit: number;
}

export interface IUserStore {
  fetchUser(token: string): Promise<void>;
  fetchMetrics(token: string): Promise<void>;
  userName: string | undefined;
  isUserLoading: boolean;
  isMetricsLoading: boolean;
}
