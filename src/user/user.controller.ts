import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { GetUserQuery } from './queries/get-user.query';

@Controller('user')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

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
