import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { GetUserQuery } from './queries/get-user.query';
import { UserInitCommand } from './commands/user-init.command';

@Controller('user')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post('init')
  async initUser(@Req() req: ExpressRequest & { user: { userSeq: string } }) {
    await this.commandBus.execute(new UserInitCommand(req.user.userSeq));
  }

  @UseGuards(JwtAuthGuard)
  @Get('name')
  async getUserName(
    @Req() req: ExpressRequest & { user: { userSeq: string } },
  ) {
    const userName: string = await this.queryBus.execute(
      new GetUserQuery(req.user.userSeq),
    );
    return userName;
  }
}
