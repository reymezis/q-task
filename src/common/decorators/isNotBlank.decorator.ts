import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsNotBlank(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim().length > 0;
        },

        defaultMessage(args: ValidationArguments): string {
          const constraints = args.constraints as string[] | undefined;
          return constraints.length === 0
            ? `at least one property in $target must be defined and can't be blank`
            : `${constraints.map((x) => `${x}`).join(', ')} can't be blank`;
        },
      },
    });
  };
}
