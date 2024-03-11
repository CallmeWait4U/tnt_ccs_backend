import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthDomain } from 'src/auth/domain/auth.domain';
import { AuthFactory } from 'src/auth/infrastructure/auth.factory';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { SignUpCommand } from '../command/signup.command';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand, any> {
  @Inject()
  private readonly authenticationRepository: AuthRepository;
  @Inject()
  private readonly authenticationFactory: AuthFactory;
  @Inject()
  private readonly authenticationDomain: AuthDomain;

  async execute(command: SignUpCommand): Promise<any> {
    // Create Tenant
    const tenantModel = this.authenticationFactory.createTenantModel({
      ...command,
      name: command.tenantName,
    });
    const tenant = this.authenticationDomain.createTenant(tenantModel);
    const tenantId = await this.authenticationRepository.createTenant(tenant);

    // Create Account
    const accountModel = this.authenticationFactory.createAccountModel({
      ...command,
      tenantId,
    });
    const account = await this.authenticationDomain.createAccount(
      accountModel,
      command.passwordConfirm,
    );
    return await this.authenticationRepository.createAccount(account);
  }
}
