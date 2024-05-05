import { Expose } from 'class-transformer';

export class ChatCustomerResult {
  @Expose()
  isSender: boolean;
  @Expose()
  content: string;
  @Expose()
  createdAt: Date;
  @Expose()
  senderUsername: string;
  @Expose()
  receiverUsername: string;
}
export class ListChatCustomerResult {
  @Expose()
  items: ChatCustomerResult[];
  @Expose()
  total: number;
}
