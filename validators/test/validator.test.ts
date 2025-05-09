import { expect } from 'chai';
import { 
  RequiredValidator, 
  MinLengthValidator, 
  EmailValidator, 
  NumericRangeValidator 
} from '../types/validators';

describe('Validator Classes', () => {
  describe('RequiredValidator', () => {
    const validator = new RequiredValidator();

    it('should pass for non-empty string', () => {
      expect(validator.validate('hello')).to.be.true;
    });

    it('should fail for empty string', () => {
      expect(validator.validate('')).to.be.false;
    });

    it('should fail for null', () => {
      expect(validator.validate(null)).to.be.false;
    });

    it('should fail for undefined', () => {
      expect(validator.validate(undefined)).to.be.false;
    });

    it('should pass for number 0', () => {
      expect(validator.validate(0)).to.be.true;
    });

    it('should return correct error message', () => {
      const result = validator.validateWithResult('');
      expect(result.isValid).to.be.false;
      expect(result.errorMessage).to.equal('This field is required');
      expect(result.validatorName).to.equal('required');
    });
  });

  describe('MinLengthValidator', () => {
    const minLength = 5;
    const validator = new MinLengthValidator(minLength);

    it('should pass for string longer than minimum length', () => {
      expect(validator.validate('hello world')).to.be.true;
    });

    it('should fail for string shorter than minimum length', () => {
      expect(validator.validate('hi')).to.be.false;
    });

    it('should return detailed error message', () => {
      const shortString = 'hi';
      const result = validator.validateWithResult(shortString);
      expect(result.isValid).to.be.false;
      expect(result.errorMessage).to.equal(`Minimum length is ${minLength} characters, but got ${shortString.length}`);
    });
  });

  describe('EmailValidator', () => {
    const validator = new EmailValidator();

    it('should pass for valid email', () => {
      expect(validator.validate('user@example.com')).to.be.true;
    });

    it('should fail for invalid email', () => {
      expect(validator.validate('userexample.com')).to.be.false;
    });

    it('should return correct error message', () => {
      const result = validator.validateWithResult('invalid-email');
      expect(result.isValid).to.be.false;
      expect(result.errorMessage).to.equal('Invalid email format');
    });
  });

  describe('NumericRangeValidator', () => {
    const min = 10;
    const max = 20;
    const validator = new NumericRangeValidator(min, max);

    it('should pass for value within range', () => {
      expect(validator.validate(15)).to.be.true;
    });

    it('should fail for value below minimum', () => {
      expect(validator.validate(5)).to.be.false;
    });

    it('should return specific error message for below minimum', () => {
      const value = 5;
      const result = validator.validateWithResult(value);
      expect(result.isValid).to.be.false;
      expect(result.errorMessage).to.equal(`Value ${value} is less than minimum ${min}`);
    });
  });
});
