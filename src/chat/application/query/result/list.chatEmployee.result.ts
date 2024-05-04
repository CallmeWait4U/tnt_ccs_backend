import { Expose } from 'class-transformer';

export class ChatEmployeeResult {
  @Expose()
  isSender: boolean;
  @Expose()
  content: string;
  @Expose()
  createdAt: Date;
}
export class ListChatEmployeeResult {
  @Expose()
  items: ChatEmployeeResult[];
  @Expose()
  total: number;
}
