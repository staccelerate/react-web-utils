import { Validator, ValidationResult } from '../types/validator';

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

  validate(value: T): ValidationResult[] {
    return this.validators
      .map(validator => validator.validateWithResult(value))
      .filter(result => !result.isValid);
  }

  getName(): string {
    return this.name;
  }
}