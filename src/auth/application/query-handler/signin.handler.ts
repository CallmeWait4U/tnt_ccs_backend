import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { AuthQuery } from 'src/auth/infrastructure/auth.query';
import { AuthRepository } from 'src/auth/infrastructure/auth.repository';
import { SignInQuery } from '../query/signin.query';

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery, any> {
  @Inject()
  private readonly authenticationQuery: AuthQuery;
  @Inject()
  private readonly authenticationRepository: AuthRepository;

  async execute(query: SignInQuery): Promise<any> {
    const user = await this.authenticationQuery.findUser(query.username);
    if (!user) {
      throw new HttpException('Wrong Username', HttpStatus.BAD_REQUEST);
    }
    const match = await bcrypt.compare(query.password, user.password);
    if (!match) {
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
    }
    return await this.authenticationRepository.signIn(user);
  }
}
