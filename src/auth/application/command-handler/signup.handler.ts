import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WelcomeMailDTO } from 'interfaces/mailer.dto';
import { EmailService } from 'libs/email.module';
import { AuthDomain } from 'src/auth/domain/auth.domain';
import { AuthFactory } from 'src/auth/infrastructure/auth.factory';
import { AuthQuery } from 'src/auth/infrastructure/auth.query';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { SignUpCommand } from '../command/signup.command';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand, string> {
  @Inject()
  private readonly authenticationRepository: AuthRepository;
  @Inject()
  private readonly authenticationFactory: AuthFactory;
  @Inject()
  private readonly authenticationDomain: AuthDomain;
  @Inject()
  private readonly authenticationQuery: AuthQuery;
  @Inject()
  private readonly emailService: EmailService;

  async execute(command: SignUpCommand): Promise<string> {
    // Create Tenant
    const tenantModel = this.authenticationFactory.createTenantModel({
      ...command,
      name: command.tenantName,
    });
    const domainList = await this.authenticationQuery.getDomainList();
    const tenant = this.authenticationDomain.createTenant(
      tenantModel,
      domainList,
    );
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
    const result = await this.authenticationRepository.createAccount(account);
    const mailerDto: WelcomeMailDTO = {
      from: { name: 'TNT.CCS', address: 'tnt.ccs.system@gmail.com' },
      recipients: [{ name: command.name, address: command.email }],
      subject: 'Chào mừng đến với TNT CCS',
      domain: command.domain,
      name: command.name,
    };
    // await this.emailService.sendWelcomeEmail(mailerDto);
    return result;
  }
}
