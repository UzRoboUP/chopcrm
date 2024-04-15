import { AxiosError } from 'axios';
import { LoginParams } from '../../models';
import apiClient from '../axios';

type LoginResponse = {
  token: string;
};

type ApiErrorResponse = {
  message: string;
};

class Profile {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async login({ email, password }: LoginParams): Promise<LoginResponse> {
    try {
      const { data } = await this.$api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return { token: data.token };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async loginFake({ email, password }: LoginParams) {
    return await new Promise((res) => {
      setTimeout(() => {
        console.log('log:', email, password);
        res({ token: 'jwt-access-token-blabla1235' });
      }, 1500);
    });
  }

  async getCurrentUser({ token }: { token: string }) {
    try {
      const { data } = await this.$api.post('/user/me', {
        token,
      });
      return { user: data.user };
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
  async getCurrentUserFake({ token }: { token: string }) {
    return await new Promise((res) => {
      setTimeout(() => {
        console.log('getCurrentUserFake token :', token);
        res({
          data: {
            user: {
              name: 'Jakhongir',
              roles: ['user'],
            },
          },
        });
      }, 1500);
    });
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
