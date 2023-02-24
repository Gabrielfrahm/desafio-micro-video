export type FieldsError = {
  [field: string]: string[];
};

export default interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsError;
  validatedData: PropsValidated;
  validate(date: any): boolean;
}
