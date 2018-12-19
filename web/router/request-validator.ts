import joi, { ValidationResult } from 'joi';

const userSchema = joi.object().keys({
    firstName: joi.string().alphanum().min(3).max(30).required(),
    lastName: joi.string().alphanum().min(3).max(30).required()
});

const validator = () => ({
    validateUser: (obj: any): ValidationResult<any> => joi.validate(obj, userSchema)
});

export default validator;