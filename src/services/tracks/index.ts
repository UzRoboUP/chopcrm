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
  async getTracks(url: URLSearchParams) {
    console.log(url);
    try {
      const { data } = await this.$api.get(
        url ? `/tracking/list/?${url}` : '/tracking/list/',
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

  // UPDATE: /tracking/update/:id/
  async updateTrack({ ...payload }) {
    const reqBody = { ...payload };
    delete reqBody.id;
    console.log(reqBody)
    try {
      const response = await this.$api.patch(
        reqBody?.company
          ? `/contract/update/${payload.id}`
          : `/driver/update/${payload.id}`,
        {
          ...reqBody,
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

  // POST: /comment/create/
  async createComment({ ...payload }) {
    
    try {
      const response = await this.$api.post(`/comment/create/`, {
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

  // POST: /comment/create/
  async createStaffComment({ ...payload }) {
    try {
      const response = await this.$api.post(`/comment-staff2staff/create/`, {
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

  // POST: /License/create/
  async createDriverLicense(data: { data: FormData }) {
    try {
      const response = await this.$api.post(`/ypx/create/`, data);
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
