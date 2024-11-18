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

  // GET: /Company/list/
  async getCompanyEmployees(params: { company: string | undefined }) {
    try {
      return (
        await this.$api.get('/contract/one-company/list/', { params: params })
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
        `/client-company/update/${payload.id}`,
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
  // DELETE: /pasting/delete/:id/
  async deleteCompany(id: string) {
    try {
      return (await this.$api.delete(`/client-company/delete/${id}`)).data;
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
      const response = await this.$api.post(`/comment-client-company/create/`, {
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

  async createCompany(data: FormData) {
    try {
      return (await this.$api.post('/client-company/create/', data)).data;
    } catch (error) {
      console.log('ERR', error);
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // UPDATE: /client-company/update/:id/
  async updateCompanyStatus({ ...payload }) {
    try {
      const response = await this.$api.patch(
        `/client-company/update/status/${payload.id}`,
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

  async createCompanyLogo(data: FormData) {
    try {
      return (await this.$api.post('/client-company/create/logo/', data)).data;
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
