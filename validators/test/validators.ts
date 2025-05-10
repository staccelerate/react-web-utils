import { Validator } from '../types/validator';

export class RequiredValidator extends Validator<any> {
  constructor(name: string = 'required', errorMessage: string = 'This field is required') {
    super(name, errorMessage);
  }

  validate(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    
    return true;
  }
}

export class MinLengthValidator extends Validator<string> {
  private minLength: number;

  constructor(minLength: number, name: string = 'minLength', errorMessage?: string) {
    super(
      name, 
      errorMessage || `Minimum length is ${minLength} characters`
    );
    this.minLength = minLength;
  }

  validate(value: string): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    return value.length >= this.minLength;
  }

  protected getErrorMessage(value: string): string {
    return `Minimum length is ${this.minLength} characters, but got ${value.length}`;
  }
}

export class EmailValidator extends Validator<string> {
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(name: string = 'email', errorMessage: string = 'Invalid email format') {
    super(name, errorMessage);
  }

  validate(value: string): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    return this.emailRegex.test(value);
  }
}

export class NumericRangeValidator extends Validator<number> {
  private min: number;
  private max: number;

  constructor(min: number, max: number, name: string = 'numericRange', errorMessage?: string) {
    super(
      name, 
      errorMessage || `Value must be between ${min} and ${max}`
    );
    this.min = min;
    this.max = max;
  }

  validate(value: number): boolean {
    if (value === null || value === undefined || isNaN(value)) {
      return false;
    }
    return value >= this.min && value <= this.max;
  }

  protected getErrorMessage(value: number): string {
    if (value < this.min) {
      return `Value ${value} is less than minimum ${this.min}`;
    }
    if (value > this.max) {
      return `Value ${value} is greater than maximum ${this.max}`;
    }
    return this.errorMessage;
  }
}
