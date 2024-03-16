import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetUserQueryHandler } from './queries/get-user.handler';

@Module({
  controllers: [UserController],
  providers: [GetUserQueryHandler],
})
export class UserModule {}
