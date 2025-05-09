export abstract class Validator<T> {
    protected name: string;
    protected errorMessage: string;

    constructor(name: string, errorMessage: string) {
      this.name = name;
      this.errorMessage = errorMessage;
    }
  
    abstract validate(value: T): boolean;

    validateWithResult(value: T): ValidationResult {
      const isValid = this.validate(value);
      return {
        isValid,
        errorMessage: isValid ? null : this.getErrorMessage(value),
        validatorName: this.name
      };
    }

    protected getErrorMessage(value: T): string {
      return this.errorMessage;
    }
  
    getName(): string {
      return this.name;
    }
  }

  export interface ValidationResult {
    isValid: boolean;
    errorMessage: string | null;
    validatorName: string;
  }
  