import { Prisma, Tenant } from '@prisma/client';
import { AutoMailDTO } from 'interfaces/mailer.dto';

export class NotificationDomain {
  handlerAutoNotifyTask(
    customers: Prisma.CustomerGetPayload<{
      include: {
        tasks: { include: { activity: true } };
        business: true;
        individual: true;
      };
    }>[],
    employees: Prisma.EmployeeGetPayload<{
      include: {
        tasks: { include: { activity: true } };
      };
    }>[],
    tenants: Tenant[],
  ) {
    const mailers: AutoMailDTO[] = [];
    tenants.forEach((tenant) => {
      customers.forEach((customer) => {
        if (
          customer.tenantId === tenant.tenantId &&
          customer.tasks.length > 0
        ) {
          const nameCustomer = customer.isBusiness
            ? customer.business.name
            : customer.individual.name;
          const emailCustomer = customer.isBusiness
            ? customer.business.representativeEmail
            : customer.individual.email;
          const tasks = [];
          customer.tasks.forEach((task) => {
            if (task.autoAnnounceCus) {
              tasks.push({
                activityName: task.activity.name,
                startDate: task.startDate,
                endDate: task.endDate,
              });
            }
          });
          mailers.push({
            from: { name: tenant.name, address: tenant.email },
            recipients: [{ name: nameCustomer, address: emailCustomer }],
            subject: 'Thông báo về các hoạt động trong tuần',
            isCustomer: true,
            tenantName: tenant.name,
            tasks,
          });
        }
      });

      employees.forEach((employee) => {
        if (
          employee.tenantId === tenant.tenantId &&
          employee.tasks.length > 0
        ) {
          const tasks = [];
          employee.tasks.forEach((task) => {
            if (task.autoAnnounceEmp) {
              tasks.push({
                activityName: task.activity.name,
                startDate: task.startDate,
                endDate: task.endDate,
              });
            }
          });
          mailers.push({
            from: { name: tenant.name, address: tenant.email },
            recipients: [{ name: employee.name, address: employee.email }],
            subject: 'Thông báo về các công việc trong tuần',
            isCustomer: false,
            employeeName: employee.name,
            tasks,
          });
        }
      });
    });
    return mailers;
  }
}
