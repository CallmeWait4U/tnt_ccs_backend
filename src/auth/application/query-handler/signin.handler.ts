import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthDomain } from 'src/auth/domain/auth.domain';
import { AuthRepository } from 'src/auth/infrastructure/auth.repository';
import { SignInResult } from '../query/result/signin.query.result';
import { SignInQuery } from '../query/signin.query';

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery, SignInResult> {
  @Inject()
  private readonly authenticationRepository: AuthRepository;
  @Inject()
  private readonly authenticationDomain: AuthDomain;

  async execute(query: SignInQuery): Promise<SignInResult> {
    const tenant = await this.authenticationRepository.getTenantByDomain(
      query.domain,
    );
    this.authenticationDomain.checkTenant(tenant);
    const account = await this.authenticationRepository.getAccount(
      query.username,
      tenant.tenantId,
    );
    const model = await this.authenticationDomain.signIn(
      account,
      query.password,
    );
    return await this.authenticationRepository.updateAccount(model, true);
  }
}
