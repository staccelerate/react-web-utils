import { Validator, ValidationResult } from '../types/validator';

export interface ClusterValidationResult {
  isValid: boolean;
  errors: ValidationResult[];
}

export class ValidatorCluster<T> {
  private validators: Validator<T>[] = [];
  private name: string;

  constructor(name: string, validators: Validator<T>[] = []) {
    this.name = name;
    this.validators = [...validators];
  }

  addValidator(validator: Validator<T>): ValidatorCluster<T> {
    this.validators.push(validator);
    return this;
  }

  addValidators(validators: Validator<T>[]): ValidatorCluster<T> {
    this.validators.push(...validators);
    return this;
  }

  removeValidator(validatorName: string): boolean {
    const initialLength = this.validators.length;
    this.validators = this.validators.filter(v => v.getName() !== validatorName);
    return initialLength !== this.validators.length;
  }

  getValidators(): Validator<T>[] {
    return [...this.validators];
  }

  validate(value: T): ClusterValidationResult {
    const results = this.validators.map(validator => 
      validator.validateWithResult(value)
    );

    const errors = results.filter(result => !result.isValid);

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  getName(): string {
    return this.name;
  }
}
