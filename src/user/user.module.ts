import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetUserQueryHandler } from './queries/get-user.handler';
import { UserInitCommandHandler } from './commands/user-init.handler';

@Module({
  controllers: [UserController],
  providers: [GetUserQueryHandler, UserInitCommandHandler],
})
export class UserModule {}
