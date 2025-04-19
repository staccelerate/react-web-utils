import axios, { AxiosResponse } from 'axios';
import ApiUtil from '../mod';

export function GET(apiUtil: ApiUtil, path: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      let url = apiUtil.baseUrl + '/' + path
      try {
        const response: AxiosResponse = await axios.get(url);
        return originalMethod.apply(this, [response.data, ...args]);
      } catch (error) {
        console.error(`GET request to ${path} failed:`, error);
        throw error;
      }
    };
    
    return descriptor;
  };
}

export function POST(apiUtil: ApiUtil, path: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(body: any, config?: any, ...args: any[]) {
      let url = apiUtil.baseUrl + '/' + path
      try {
        const response: AxiosResponse = await axios.post(
          url, 
          body,
          config || {} 
        );
        return originalMethod.apply(this, [response.data, ...args]);
      } catch (error) {
        console.error(`POST to ${path} failed:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}



export function DELETE(apiUtil: ApiUtil, path: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(body?: any, ...args: any[]) {
      let url = apiUtil.baseUrl + '/' + path
      try {
        const response: AxiosResponse = await axios.delete(url, { data: body });
        return originalMethod.apply(this, [response.data, ...args]);
      } catch (error) {
        console.error(`DELETE request to ${path} failed:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}

export function PUT(apiUtil: ApiUtil, path: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      let url = apiUtil.baseUrl + '/' + path
      try {
        const body = args[0]; 

        const response: AxiosResponse = await axios.put(url, body);
        return originalMethod.apply(this, [response.data, ...args.slice(1)]);
      } catch (error) {
        console.error(`PUT request to ${path} failed:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}

