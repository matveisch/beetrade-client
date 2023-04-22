import axios, { AxiosError, AxiosResponse } from 'axios';
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
      store.dispatch(setGlobalError(error.response.data.message));
      throw new Error(error.response.data.message);
    } else {
      store.dispatch(setGlobalError(error.message));
      throw new Error('there was a problem getting data');
    }
  }
}

export async function postData<T, DataType>(url: string, data: DataType): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post(`${import.meta.env.VITE_API}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      store.dispatch(setGlobalError(error.response.data.message));
      throw new Error(error.response.data.message);
    } else {
      store.dispatch(setGlobalError(error.message));
      throw new Error('there was a problem creating data');
    }
  }
}

export async function putData<T, DataType>(url: string, data?: DataType): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.put(`${import.meta.env.VITE_API}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      store.dispatch(setGlobalError(error.response.data.message));
      throw new Error(error.response.data.message);
    } else {
      store.dispatch(setGlobalError(error.message));
      throw new Error('there was a problem updating data');
    }
  }
}

export async function deleteData<T>(url: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.delete(`${import.meta.env.VITE_API}/${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      store.dispatch(setGlobalError(error.response.data.message));
      throw new Error(error.response.data.message);
    } else {
      store.dispatch(setGlobalError(error.message));
      throw new Error('there was a problem updating data');
    }
  }
}
