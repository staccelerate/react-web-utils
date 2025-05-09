import { strict as assert } from 'assert';
import { 
  Result, 
  createSuccess, 
  createFailure, 
  createLoading, 
  initialResult 
} from '../types/result';
import { onSuccess, onError, onLoading } from '../helpers/resultHelper';

describe('Result and Handlers', () => {
  it('should handle initial (loading) state', () => {
    let loadingCalled = false;
    onLoading(initialResult, () => {
      loadingCalled = true;
    });
    assert.strictEqual(loadingCalled, true);
  });

  it('should handle success state', () => {
    const result: Result<number> = createSuccess(42);
    let successValue: number | null = null;
    onSuccess(result, (data) => {
      successValue = data;
    });
    assert.strictEqual(successValue, 42);
  });

  it('should handle failure state', () => {
    const error = new Error('fail!');
    const result: Result<never> = createFailure(error);
    let errorValue: Error | null = null;
    onError(result, (err) => {
      errorValue = err;
    });
    assert.strictEqual(errorValue, error);
  });

  it('should handle loading -> error', () => {

    let loadingCalled = false;
    let errorCalled = false;
    let errorObj = new Error('network');
    let result: Result<number> = createLoading();
    onLoading(result, () => { loadingCalled = true; });
    assert.strictEqual(loadingCalled, true);

    result = createFailure(errorObj);
    onError(result, (err) => { 
      errorCalled = true;
      assert.equal(err, errorObj);
    });
    assert.strictEqual(errorCalled, true);
  });

  it('should handle loading -> success', () => {

    let loadingCalled = false;
    let successCalled = false;
    let result: Result<number> = createLoading();
    onLoading(result, () => { loadingCalled = true; });
    assert.equal(loadingCalled, true);

    result = createSuccess(100);
    onSuccess(result, (data) => { 
      successCalled = true;
      assert.equal(data, 100);
    });
    assert.equal(successCalled, true);
  });
});
