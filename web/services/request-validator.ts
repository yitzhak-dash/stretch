import joi, { ValidationResult } from 'joi';

const userSchema = joi.object().keys({
    firstName: joi.string().alphanum().min(3).max(30).required(),
    lastName: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().min(6).max(16).required(),
    email: joi.string().email()
});

const validator = () => ({
    validateUser: (obj: any): ValidationResult<any> => joi.validate(obj, userSchema)
});

export default validator;