import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserInitCommand } from './user-init.command';
import { PrismaService } from 'src/public/prisma/prisma.service';

@CommandHandler(UserInitCommand)
export class UserInitCommandHandler
  implements ICommandHandler<UserInitCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UserInitCommand): Promise<any> {
    await this.prisma.user.create({ data: { userSeq: command.userSeq } });
  }
}
