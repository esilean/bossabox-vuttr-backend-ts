import { ValidationError, ValidationTypes } from 'class-validator'


export function getErrors(errors: ValidationError[]) {

    return errors.map(error => {
        return JSON.stringify(error.constraints)
    }).toString()

}