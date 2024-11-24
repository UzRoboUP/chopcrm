import { AxiosError } from 'axios';
import apiClient from '../axios';
import { stockDriverType } from '../../context/StockDriverContext';

type ApiErrorResponse = {
  message: string;
};

class Leads {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /leads/list/
  async getStocksTask({ ...params }) {
    try {
      return (
        await this.$api.get('/stock-task/list/', {
          params: { ...params },
        })
      ).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getStocks({ ...params }) {
    try {
      return (
        await this.$api.get(`/stock/list/`, {
          params: { ...params },
        })
      ).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateStockStatus({ ...payload }) {
    try {
      const response = await this.$api.patch(
        `/stock-task/status/update/${payload.id}`,
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

  // DELETE: /stock/delete/:id/
  async deleteStock(id: string) {
    try {
      return (await this.$api.delete(`/stock-task/delete/${id}/`)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /comment/create/
  async createComment({ ...payload }) {
    try {
      const response = await this.$api.post(`/comment-stock-task/create/`, {
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

  async createStockDrivers(payload: stockDriverType[]) {
    console.log(payload);

    try {
      const response = await this.$api.post(`/stock/bulk-create`, payload);
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
    async deleteStockEmployee(id: string) {
      try {
        const { data } = await this.$api.delete(`/stock/delete/${id}/`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw new Error(
          axiosError.response?.data?.message || 'An unknown error occurred',
        );
      }
    }
  

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
