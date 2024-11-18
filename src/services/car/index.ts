import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Car {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }



  async getCarServiceList() {
    try {
      return (await this.$api.get('/car-service/list/')).data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

}

export default new Car();
