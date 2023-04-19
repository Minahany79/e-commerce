const Validator = require('validatorjs');

export class RequestBodyValidator {
    public static validateWithRules(body: any, validationRules: any, callBack: any): void {
        const bodyValidation = new Validator(body, validationRules);

        bodyValidation.passes(() => callBack(null, true));
        bodyValidation.fails(() => callBack(bodyValidation.errors, false));
    }
}