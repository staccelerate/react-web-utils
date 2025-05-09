import { Result, ResultState } from "../types/result";

export function onSuccess<T, E>(
    result: Result<T, E>,
    handler: (data: T) => void
  ) {
    if (result.state === ResultState.Success) {
      handler(result.data);
    }
  }
  
  export function onError<T, E>(
    result: Result<T, E>,
    handler: (error: E) => void
  ) {
    if (result.state === ResultState.Failure) {
      handler(result.error);
    }
  }
  
  export function onLoading<T, E>(
    result: Result<T, E>,
    handler: () => void
  ) {
    if (result.state === ResultState.Loading) {
      handler();
    }
  }
  