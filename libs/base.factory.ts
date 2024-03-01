import { ClassConstructor, plainToInstance } from 'class-transformer';

export abstract class BaseFactory {
  protected createModel<E, P>(entity: ClassConstructor<E>, plain: P): E {
    return plainToInstance(entity, plain, {
      excludeExtraneousValues: true,
    }) as E;
  }
}
