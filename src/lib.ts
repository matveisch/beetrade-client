import axios, { AxiosResponse } from 'axios';
import { store } from './store';
import { setGlobalError } from './features/globalError/globalErrorSlice';

export async function getData<T>(url: string, signOutFunc?: () => void): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get(`${import.meta.env.VITE_API}/${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401 && signOutFunc) signOutFunc();
      throw new Error(error.response.data.message);
    } else {
      store.dispatch(setGlobalError(error.message));
      throw new Error('there was a problem getting data');
    }
  }
}

export async function postData(url: string, data: unknown): Promise<any> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      store.dispatch(setGlobalError(error.message));
    }
  }
}

export async function putData(url: string, data?: any): Promise<any> {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('There was a problem making the PUT request');
    }
  }
}
