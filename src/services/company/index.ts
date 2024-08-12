import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Company {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /Company/list/
  async getCompany() {
    try {
      return (await this.$api.get('/client-company/list/')).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

}

export default new Company();
