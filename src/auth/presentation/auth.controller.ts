import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'interfaces/user';
import { GetUser } from 'libs/getuser.decorator';
import { CreatePhaseCommand } from 'src/phase/application/command/create.phase.command';
import { ChangePasswordCommand } from '../application/command/change.password.command';
import { RefreshTokensPairCommand } from '../application/command/refreshTokenPair.command';
import { SignOutCommand } from '../application/command/signout.command';
import { SignUpCommand } from '../application/command/signup.command';
import { SignInQuery } from '../application/query/signin.query';
import { ChangePasswordDTO } from './dto/change.password.dto';
import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO) {
    const command = new SignUpCommand(body);
    const tenantId = await this.commandBus.execute(command);
    const dataPhase: CreatePhaseCommand[] = [];
    const namePhases = [
      'Tiềm năng',
      'Đang liên lạc',
      'Đã báo giá',
      'Chính thức',
      'Thân thiết',
    ];
    for (let i = 0; i < namePhases.length; i++) {
      dataPhase.push(
        new CreatePhaseCommand({
          name: namePhases[i],
          priority: i,
          description: 'Không có mô tả cho giai đoạn này',
          tenantId,
        }),
      );
    }
    for (const item of dataPhase) {
      await this.commandBus.execute(item);
    }
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInDTO) {
    const query = new SignInQuery(body);
    return await this.queryBus.execute(query);
  }

  @Post('sign-out')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async signOut(@GetUser() user: User) {
    const command = new SignOutCommand({
      uuid: user.uuid,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }

  @Post('changePassword')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async changePassword(@Body() body: ChangePasswordDTO, @GetUser() user: User) {
    const command = new ChangePasswordCommand({
      ...body,
      uuid: user.uuid,
      tenantId: user.tenantId,
    });
    await this.commandBus.execute(command);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshTokensPair(@GetUser() user: User) {
    const command = new RefreshTokensPairCommand({
      uuid: user.uuid,
      tenantId: user.tenantId,
      domain: user.domain,
    });
    return await this.commandBus.execute(command);
  }

  @Get('createData')
  async mockData() {
    Promise.all([
      this.commandBus.execute(
        new SignUpCommand({
          username: 'admin',
          password: '123456',
          passwordConfirm: '123456',
        }),
      ),
      this.commandBus.execute(
        new SignUpCommand({
          username: 'employee',
          password: '123456',
          passwordConfirm: '123456',
        }),
      ),
      this.commandBus.execute(
        new SignUpCommand({
          username: 'customer',
          password: '123456',
          passwordConfirm: '123456',
        }),
      ),
    ]);
  }
}
