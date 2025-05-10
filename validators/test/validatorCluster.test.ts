import { expect } from 'chai';
import { ValidatorCluster } from '../helpers/validatorCluster';
import { RequiredValidator, EmailValidator, MinLengthValidator } from '../types/validators';

describe('ValidatorCluster', () => {
  describe('Validator management', () => {
    it('should add validators correctly', () => {
      const cluster = new ValidatorCluster<string>('test-cluster');
      const requiredValidator = new RequiredValidator();

      cluster.addValidator(requiredValidator);
      expect(cluster.getValidators()).to.have.length(1);

      const emailValidator = new EmailValidator();
      cluster.addValidator(emailValidator);
      expect(cluster.getValidators()).to.have.length(2);
    });

    it('should remove validator by name', () => {
      const requiredValidator = new RequiredValidator();
      const emailValidator = new EmailValidator();

      const cluster = new ValidatorCluster<string>('test-cluster', [
        requiredValidator,
        emailValidator,
      ]);

      expect(cluster.getValidators()).to.have.length(2);

      const removed = cluster.removeValidator('email');
      expect(removed).to.be.true;
      expect(cluster.getValidators()).to.have.length(1);
      expect(cluster.getValidators()[0].getName()).to.equal('required');

      const notRemoved = cluster.removeValidator('nonexistent');
      expect(notRemoved).to.be.false;
    });
  });

  describe('Validation', () => {
    it('should pass when all validators pass', () => {
      const cluster = new ValidatorCluster<string>('email-validation', [
        new RequiredValidator(),
        new EmailValidator(),
      ]);

      const errors = cluster.validate('user@example.com');
      expect(errors).to.be.empty;
    });

    it('should fail when any validator fails', () => {
      const cluster = new ValidatorCluster<string>('email-validation', [
        new RequiredValidator(),
        new EmailValidator(),
        new MinLengthValidator(20),
      ]);

      const email = 'user@example.com';
      const errors = cluster.validate(email);

      expect(errors).to.have.length(1);
      expect(errors[0].validatorName).to.equal('minLength');
    });

    it('should return multiple errors when multiple validators fail', () => {
      const cluster = new ValidatorCluster<string>('email-validation', [
        new RequiredValidator(),
        new EmailValidator(),
        new MinLengthValidator(10),
      ]);

      const value = 'not-email';
      const errors = cluster.validate(value);

      expect(errors).to.have.length(2);
      const errorNames = errors.map(e => e.validatorName);
      expect(errorNames).to.include('email');
      expect(errorNames).to.include('minLength');
    });
  });
});