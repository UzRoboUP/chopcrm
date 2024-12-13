import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Pastings {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /pasting/list/
  async getPastings(url: URLSearchParams) {
    try {
      const obj = (
        await this.$api.get(url ? `/pasting/list/?${url}` : '/pasting/list/')
      ).data;
      return obj;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /pasting/retrieve/:id
  async getPasting(id: string) {
    try {
      return (await this.$api.get(`/pasting/retrieve/${id}`)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // DELETE: /pasting/delete/:id/
  async deletePasting(id: string) {
    try {
      return (await this.$api.delete(`/pasting/delete/${id}/`)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // UPDATE: /pasting/update/:id/
  async updatePasting({ ...payload }) {
    try {
      const response = await this.$api.put(
        `/pasting/update/pasting-time/${payload.id}/`,
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

  async updatePastingComment({ ...payload }) {
    // const id = payload.id;
    delete payload?.id;
    try {
      const response = await this.$api.post(`/rate/create/`, {
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

  // UPDATE: /pasting/update/:id/
  async updatePastingPhoto({ ...payload }) {
    try {
      const response = await this.$api.put(
        `/pasting/update/status/${payload.id}/`,
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

  async updateArchivedPasting({ ...payload }) {
    try {
      const response = await this.$api.put(
        `/pasting/update/archieve/${payload.id}/`,
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

  async updateArchivedPastingAll(payload: {
    is_archived: boolean;
    ids: string[];
  }) {
    try {
      const response = await this.$api.patch(`/pasting/bulk-update/`, payload);
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

export default new Pastings();
