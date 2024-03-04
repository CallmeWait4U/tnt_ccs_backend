import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDomain } from 'src/account/domain/account.domain';
import { ProductFactory } from 'src/account/infrastructure/account.factory';
import { ProductRepository } from 'src/account/infrastructure/account.repository';
import { CreateProductCommand } from '../command/create.product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, string>
{
  @Inject()
  private readonly accountRepository: ProductRepository;
  @Inject()
  private readonly accountFactory: ProductFactory;
  @Inject()
  private readonly accountDomain: ProductDomain;

  async execute(command: CreateProductCommand): Promise<string> {
    const id = (await this.accountRepository.count()) + 1;
    const model = this.accountFactory.createProductModel(command);

    const account = await this.accountDomain.create(id, model);

    return await this.accountRepository.create(account);
  }
}
