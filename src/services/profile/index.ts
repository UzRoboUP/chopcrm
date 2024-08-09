import { AxiosError } from 'axios';
import { LoginParams } from '../../models';
import apiClient from '../axios';

type LoginResponse = {
  access: string;
  refresh: string;
  id: string;
};

type ApiErrorResponse = {
  message: string;
};

class Profile {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async login({ ...payload }: LoginParams): Promise<LoginResponse> {
    try {
      const { data } = await this.$api.post<LoginResponse>('/login/', {
        ...payload,
      });
      console.log('login', data);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getCurrentUser(userId: string) {
    try {
      return (await this.$api.get('/staff/retrieve/' + userId + '/')).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async logout() {}

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Profile();
