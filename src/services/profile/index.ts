import { AxiosError } from 'axios';
import { LoginParams } from '../../models';
import apiClient from '../axios';

type LoginResponse = {
  accessToken: string;
};

type ApiErrorResponse = {
  message: string;
};

class Profile {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async login({ login, password }: LoginParams): Promise<LoginResponse> {
    try {
      const { data } = await this.$api.post<LoginResponse>('/auth/login', {
        login,
        password,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getCurrentUser() {}

  async logout() {}
}

export default new Profile();
