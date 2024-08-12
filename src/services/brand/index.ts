import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Brand {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /Brand/list/
  async getBrand() {
    try {
      return (await this.$api.get('/car-brand/list/')).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

}

export default new Brand();
