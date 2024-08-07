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

  async loginFake({ email, password }: LoginParams) {
    return await new Promise((res, rej) => {
      setTimeout(() => {
        if (email && password) {
          console.log(email, password);
          return res({ token: 'jwt-access-token-blabla1235' });
        } else {
          console.log('email or password not found');
          rej('email or password not found');
          return null;
        }
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
    return await new Promise((res, rej) => {
      setTimeout(() => {
        if (token) {
          return res({
            data: {
              user: {
                name: 'Jakhongir',
                roles: ['user'],
              },
            },
          });
        } else {
          rej('Token not found!');
          console.log('ERROR: Token not found!');
          return null;
        }
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
