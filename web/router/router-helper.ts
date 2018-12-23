import { ValidationResult } from 'joi';
import { Next } from 'restify';
import errors from 'restify-errors';


export const sendValidationError = (next: Next, validationRes: ValidationResult<any>) =>
    next(new errors.BadRequestError(validationRes.error));