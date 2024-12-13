import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Client {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /Company/list/
  async getClients(url: URLSearchParams) {
    try {
      return (
        await this.$api.get(
          url ? `client-user/list/?${url}` : '/client-user/list/',
        )
      ).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Client();
