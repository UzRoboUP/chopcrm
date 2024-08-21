import { AxiosError } from 'axios';
import { LoginParams } from '../../models';
import apiClient from '../axios';
import { StaffType } from '../../features/staff/CreateStaffDataModal';

type LoginResponse = {
  access: string;
  refresh: string;
  id: string;
};

type ApiErrorResponse = {
  message: string;
};

class Profile {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async login({ ...payload }: LoginParams): Promise<LoginResponse> {
    try {
      const { data } = await this.$api.post<LoginResponse>('/login/', {
        ...payload,
      });
      console.log('login', data);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getCurrentUser(userId: string) {
    try {
      return (await this.$api.get('/staff/retrieve/' + userId + '/')).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async logout() {}

  async updateProfile(formData: FormData): Promise<LoginResponse> {
    try {
      const { data } = await this.$api.put<LoginResponse>(
        `/staff/update/${formData.get('id')}`,
        {
          ...formData,
        },
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getStaffList(staff_status: string, search: string) {
    try {
      return (
        await this.$api.get('/staff/list/', {
          params: { staff_status, search },
        })
      ).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // DELETE: /staff/delete/:id/
  async deleteStaff(id: string) {
    try {
      const { data } = await this.$api.delete(`/staff/delete/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /staff/retrieve/:id
  async getStaff(id: string) {
    try {
      return (await this.$api.get(`/staff/retrieve/${id}`)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // Post: /staff/
  async createStaff(data:StaffType) {
    console.log(data);
    
    try {
      return (await this.$api.post(`/${data.status}/create/`,data)).data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Profile();
