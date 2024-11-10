import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Contract {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // // GET: /leads/list/
  // async getLeads(url: URLSearchParams) {
  //   try {
  //     return (await this.$api.get(url ? `/leads/list?${url}` : '/leads/list'))
  //       .data;
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiErrorResponse>;
  //     throw new Error(
  //       axiosError.response?.data?.message || 'An unknown error occurred',
  //     );
  //   }
  // }

    // POST: /contract/create/
    async createContract({ ...payload }) {
    
      try {
        const response = await this.$api.post(`/contract/create`, {
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

    
  // DELETE: /tracking/delete/:id/
  async deleteContract(id: string) {
    try {
      const { data } = await this.$api.delete(`/contract/delete/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  
}

export default new Contract();
