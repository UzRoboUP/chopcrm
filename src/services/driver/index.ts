import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Driver {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /tracking/list/
  async getDrivers() {
    try {
      const { data } = await this.$api.get('/driver/make-contract/list/');
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  // DELETE: /tracking/delete/:id/
  async deleteDriver(id: string) {
    try {
      const { data } = await this.$api.delete(`/driver/delete/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }







}

export default new Driver();
