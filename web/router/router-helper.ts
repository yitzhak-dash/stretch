import { ValidationResult } from 'joi';
import { Response } from 'restify';
import errors from 'restify-errors';


export const sendValidationError = (res: Response, validationRes: ValidationResult<any>) =>
    res.send(new errors.BadRequestError(validationRes.error));