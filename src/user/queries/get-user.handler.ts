import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { PrismaService } from 'src/public/prisma/prisma.service';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUserQuery): Promise<{ name: string }> {
    const { userSeq } = query;

    const user = await this.prisma.user.findUnique({
      where: {
        userSeq,
      },
      select: {
        name: true,
      },
    });

    return { name: user.name };
  }
}
