import { ICommand } from '@nestjs/cqrs';

export class UserInitCommand implements ICommand {
  constructor(public readonly userSeq: string) {}
}
