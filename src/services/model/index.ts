import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Model {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /model/list/
  async getModel(modelName: string | null) {
    try {
      return (await this.$api.get(`/car-model/list/?brand_name=${modelName}`)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Model();
