import {
  Body,
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

  @HttpCode(201)
  @Post('init')
  async initUser(@Body() dto: { userSeq: string }) {
    console.log(dto);
    await this.commandBus.execute(new UserInitCommand(dto.userSeq));
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
