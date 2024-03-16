import { ICommand } from '@nestjs/cqrs';

export class UserCreateCommand implements ICommand {
  constructor(public readonly userSeq: string) {}
}
