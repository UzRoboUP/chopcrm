import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Reports {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /reporting/list/
  async getReports() {
    try {
      const obj = (await this.$api.get('/reporting/list/')).data;
      return obj.reports;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /reporting/retrieve/:id
  async getReport(id: string) {
    try {
      return (await this.$api.get(`/reporting/retrieve/${id}`)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // DELETE: /reporting/delete/:id/
  async deleteReport(id: string) {
    try {
      return (await this.$api.delete(`/reporting/delete/${id}/`)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // UPDATE: /reporting/update/:id/
  async updateReport({ ...payload }) {
    try {
      const response = await this.$api.put(`/reporting/update/${payload.id}/`, {
        ...payload,
      });
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

export default new Reports();
