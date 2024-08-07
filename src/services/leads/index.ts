import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Leads {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /leads/list/
  async getLeads() {
    try {
      return (await this.$api.get('/leads/list')).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // // TODO
  // // GET: /reporting/retrieve/:id
  // async getLead(id: string) {
  //   try {
  //     return (await this.$api.get(`/reporting/retrieve/${id}`)).data;
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiErrorResponse>;
  //     throw new Error(
  //       axiosError.response?.data?.message || 'An unknown error occurred',
  //     );
  //   }
  // }

  // // DELETE: /reporting/delete/:id/
  // async deleteLead(id: string) {
  //   try {
  //     return (await this.$api.delete(`/reporting/delete/${id}/`)).data;
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiErrorResponse>;
  //     throw new Error(
  //       axiosError.response?.data?.message || 'An unknown error occurred',
  //     );
  //   }
  // }

  // // UPDATE: /reporting/update/:id/
  // async updateLead({ ...payload }) {
  //   try {
  //     const response = await this.$api.put(`/reporting/update/${payload.id}/`, {
  //       ...payload,
  //     });
  //     if (response && response.data) {
  //       return response.data;
  //     } else {
  //       throw new Error('The API response did not contain any data.');
  //     }
  //   } catch (error) {
  //     console.log('ERR', error);
  //     const axiosError = error as AxiosError<ApiErrorResponse>;
  //     throw new Error(
  //       axiosError.response?.data?.message || 'An unknown error occurred',
  //     );
  //   }
  // }
}

export default new Leads();
