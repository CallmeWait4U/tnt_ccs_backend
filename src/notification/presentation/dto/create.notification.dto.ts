export class CreateNotificationDTO {
  title: string;
  content: string;
  time: Date;
  tokens: string[];
  accountUUIDs: string[];
  tenantId: string;
}
