import { FieldsError } from "../domain/validator/validator-fields-interface";

export class ValidatorError extends Error {}

export class EntityValidatorError extends Error {
  constructor(public error: FieldsError) {
    super("Entity Validation Error");
    this.name = "EntityValidatorError";
  }
}
