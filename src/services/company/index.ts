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
  async getCompany(url: string) {
    try {
      return (
        await this.$api.get(
          url ? `/client-company/list/?${url}` : '/client-company/list/',
        )
      ).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // UPDATE: /client-company/update/:id/
  async updateCompany({ ...payload }) {
    try {
      const response = await this.$api.patch(
        `/client-company/update/${payload.id}/`,
        {
          ...payload,
        },
      );
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('The API response did not contain any data.');
      }
    } catch (error) {
      console.log('ERR', error);
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Company();
