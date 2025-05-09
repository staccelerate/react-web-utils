export type Result<T, E = Error> = 
  | { state: 'success'; data: T }
  | { state: 'failure'; error: E }
  | { state: 'loading' };

export enum ResultState {
  Success = 'success',
  Failure = 'failure',
  Loading = 'loading',
}  

export const createSuccess = <T>(data: T): Result<T, never> => ({
  state: 'success',
  data
});

export const createFailure = <E extends Error>(error: E): Result<never, E> => ({
  state: 'failure',
  error
});

export const createLoading = (): Result<never, never> => ({
  state: 'loading'
});

export const initialResult: Result<never, never> = createLoading();
