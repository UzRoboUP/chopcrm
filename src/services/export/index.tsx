import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Export {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /reporting/list/
  async getExportDriversId() {
    try {
      const obj = (await this.$api.get('/drivers/export/')).data;
      return obj;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
  async getExportDriversZip(id: string) {
    try {
      const obj = (
        await this.$api.get(`/drivers/tasks/${id}/`, {
          headers: {
            'Content-Type': 'application/zip',
          },
          responseType:"blob"
        })
      ).data;
      return obj;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Export();
