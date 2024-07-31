import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Tracks {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /tracking/list/
  async getTracks() {
    try {
      const { data } = await this.$api.get(
        '/tracking/list/',
        //    {
        //   params: { name, limit, offset, status, q },
        // }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /tracking/retrieve/:id
  async getTrack(id: string) {
    try {
      const { data } = await this.$api.get(`/tracking/retrieve/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // DELETE: /tracking/delete/:id/
  async deleteTrack(id: string) {
    try {
      const { data } = await this.$api.delete(`/tracking/delete/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /carriers/create/
  async createCarrier({
    name,
    address,
    mcNumber,
    contactName,
    phone,
    phone2,
    email,
    fax,
    status,
    location,
  }: CreateCarrierParams) {
    try {
      const { data } = await this.$api.post('/carriers/create/', {
        name,
        address,
        mcNumber,
        contactName,
        phone,
        phone2,
        email,
        fax,
        status,
        location,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Tracks();
