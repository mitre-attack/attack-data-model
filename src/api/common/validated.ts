import { z } from 'zod/v4';

type IsPrimitive<T> = T extends object ? false : true;

export type ValidatedConstructor<Schema extends z.ZodType<unknown>, WrapValue extends boolean> = {
  new (
    value: z.input<Schema>,
  ): Readonly<WrapValue extends true ? { value: Readonly<z.infer<Schema>> } : z.infer<Schema>>;
  schema: Schema;
  z: <T extends ValidatedConstructor<Schema, WrapValue>>(
    this: T,
  ) => z.ZodType<InstanceType<T>, z.input<Schema>>;
};

export type ValidatedMutableConstructor<
  Schema extends z.ZodType<unknown>,
  WrapValue extends boolean,
> = {
  new (
    value: z.input<Schema>,
  ): WrapValue extends true ? { value: z.infer<Schema> } : z.infer<Schema>;
  schema: Schema;
  z: <T extends ValidatedMutableConstructor<Schema, WrapValue>>(
    this: T,
  ) => z.ZodType<InstanceType<T>, z.input<Schema>>;
};

export const Validated = <
  Schema extends z.ZodType<unknown>,
  Options extends { wrapValue: true } | null = null,
>(
  schema: Schema,
  options?: Options,
) => {
  const ctor = function Validated(this: Record<string, unknown>, value: z.input<typeof schema>) {
    const validatedValue = schema.parse(value);
    const wrapValue = !isObject(validatedValue) || options?.wrapValue;
    const _this = wrapValue ? { value: validatedValue } : validatedValue;
    return Object.create(this, Object.getOwnPropertyDescriptors(_this));
  } as unknown as ValidatedConstructor<
    Schema,
    Options extends { wrapValue: true } ? true : IsPrimitive<z.infer<Schema>>
  >;
  ctor.schema = schema;
  ctor.z = function <T extends typeof ctor>(this: T) {
    return z.any().transform((data, ctx) => {
      try {
        return new this(data) as InstanceType<T>;
      } catch (error) {
        if (error instanceof z.ZodError) {
          for (const issue of error.issues) {
            ctx.addIssue(issue);
          }
          return z.NEVER;
        }
        throw error;
      }
    });
  };
  return ctor;
};

export const ValidatedMutable = <
  Schema extends z.ZodType<unknown>,
  Options extends { wrapValue: true } | null = null,
>(
  schema: Schema,
  options?: Options,
) => {
  const makeValidatedValueProxy = (initialInput: unknown) => {
    const inputObject: Record<string | symbol, unknown> = {};
    if (isObject(initialInput)) {
      Object.assign(inputObject, initialInput);
    }
    return (validatedValue: object) => {
      return new Proxy(validatedValue, {
        set(object, propertyName, newValue) {
          inputObject[propertyName] = newValue;
          const validatedNewValue = schema.parse(inputObject) as Record<string | symbol, unknown>;
          return Reflect.set(object, propertyName, validatedNewValue[propertyName]);
        },
      });
    };
  };
  const ctor = function ValidatedMutable(
    this: Record<string, unknown>,
    value: z.input<typeof schema>,
  ) {
    const validatedValue = schema.parse(value);
    if (!isObject(validatedValue) || options?.wrapValue) {
      const validatedValueProxy = isObject(validatedValue)
        ? makeValidatedValueProxy(value)(validatedValue)
        : validatedValue;
      const _this = { value: validatedValueProxy };
      return new Proxy(Object.create(this, Object.getOwnPropertyDescriptors(_this)), {
        set(object, propertyName, newValue) {
          if (propertyName !== 'value') {
            return Reflect.set(object, propertyName, newValue);
          }
          const validatedNewValue = schema.parse(newValue);
          const validatedNewValueProxy = isObject(validatedNewValue)
            ? makeValidatedValueProxy(newValue)(validatedNewValue)
            : validatedNewValue;
          return Reflect.set(object, 'value', validatedNewValueProxy);
        },
      });
    }
    const _this = validatedValue;
    return makeValidatedValueProxy(value)(
      Object.create(this, Object.getOwnPropertyDescriptors(_this)),
    );
  } as unknown as ValidatedMutableConstructor<
    Schema,
    Options extends { wrapValue: true } ? true : IsPrimitive<z.infer<Schema>>
  >;
  ctor.schema = schema;
  ctor.z = function <T extends typeof ctor>(this: T) {
    return z.any().transform((data, ctx) => {
      try {
        return new this(data) as InstanceType<T>;
      } catch (error) {
        if (error instanceof z.ZodError) {
          for (const issue of error.issues) {
            ctx.addIssue(issue);
          }
          return z.NEVER;
        }
        throw error;
      }
    });
  };
  return ctor;
};

const isObject = (value: unknown): value is object =>
  value !== null && (typeof value === 'object' || typeof value === 'function');
