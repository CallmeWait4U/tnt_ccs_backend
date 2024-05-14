import { faker } from '@faker-js/faker/locale/vi';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Gender, StatusCustomerAccount, TypeAccount } from '@prisma/client';
import { PrismaService } from 'libs/database.module';
import { CreateAccountCommand } from 'src/account/application/command/create.account.command';
import { CreateAccountForCustomerCommand } from 'src/account/application/command/create.account.for.customer.command';
import { CreateActivityCommand } from 'src/activity/application/activity/command/create.activity.command';
import { CreateTaskCommand } from 'src/activity/application/task/command/create.task.command';
import { SignUpCommand } from 'src/auth/application/command/signup.command';
import { CreateBillCommand } from 'src/bill/application/command/create.bill.command';
import { CreateTypeComplaintCommand } from 'src/complaint/application/command/create.typeComplaint.command';
import { CreateCustomerCommand } from 'src/customer/application/command/create.customer.command';
import { CreatePhaseCommand } from 'src/phase/application/command/create.phase.command';
import { CreatePriceQuoteCommand } from 'src/priceQuote/application/command/create.priceQuote.command';
import { CreatePriceQuoteRequestCommand } from 'src/priceQuoteRequest/application/command/create.priceQuoteRequest.command';
import { CreateProductCommand } from 'src/product/application/command/create.product.command';

@Injectable()
export class TestService {
  @Inject()
  private readonly prisma: PrismaService;

  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
  ) {}

  async mockData() {
    // Tạo Tenant
    const dataTenant: SignUpCommand[] = [];
    const tenantIds: string[] = [];
    const businessIndustryList = [
      'Bất động sản',
      'Sản xuất',
      'Bán lẻ và phân phối',
      'Hoạt động thương mại điện tử',
      'Kinh doanh vận tải biển',
      'Dịch vụ in, trừ in bao bì',
      'Kinh doanh thủy sản',
      'Kinh doanh dược',
      'Cung ứng dịch vụ thông tin tín dụng',
      'Sản xuất mỹ phẩm',
    ];
    for (let i = 0; i < 2; i++) {
      dataTenant.push(
        new SignUpCommand({
          tenantName: faker.company.name(),
          taxCode: faker.string.numeric(10) + '-' + faker.string.numeric(3),
          businessRegistrationNumber: faker.string.numeric(10),
          businessNationality: 'Việt Nam',
          businessIndustry: faker.helpers.arrayElement(businessIndustryList),
          phoneNumber: faker.phone.number(),
          email: faker.internet.email({
            firstName: faker.lorem.word(5),
            provider: 'gmail.com',
          }),
          addressDetail: faker.location.streetAddress(),
          district: faker.location.county(),
          city: faker.location.city(),
          country: 'Việt Nam',
          domain: i === 1 ? 'cola' : 'cocolala',
          name: faker.person.fullName(),
          dayOfBirth: faker.date.birthdate({
            min: 18,
            max: 65,
            mode: 'age',
          }),
          username: `username${i + 1}`,
          password: '123456',
          passwordConfirm: '123456',
        }),
      );
    }
    for (const item of dataTenant) {
      await this.commandBus.execute(item);
    }
    const tenants = await this.prisma.account.findMany();
    tenants.forEach((tenant) => {
      tenantIds.push(tenant.tenantId);
    });
    console.log('Đã tạo Tenant');

    // Phase
    const dataPhase: CreatePhaseCommand[] = [];
    const namePhases = [
      'Tiềm năng',
      'Đang liên lạc',
      'Đã báo giá',
      'Chính thức',
      'Thân thiết',
    ];
    for (const tenantId of tenantIds) {
      for (let i = 0; i < namePhases.length; i++) {
        dataPhase.push(
          new CreatePhaseCommand({
            name: namePhases[i],
            priority: i,
            description: 'Không có mô tả cho giai đoạn này',
            tenantId,
          }),
        );
      }
    }
    for (const item of dataPhase) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Giai đoạn');

    // Tạo Account - Employee
    const dataAccount: CreateAccountCommand[] = [];
    const accountUUIDs: { uuid: string; tenantId: string }[] = [];
    for (let i = 0; i < 12; i++) {
      dataAccount.push(
        new CreateAccountCommand({
          name: faker.person.fullName(),
          code: 'NV-' + i.toString().padStart(8, '0'),
          position: faker.person.jobTitle(),
          dayOfBirth: faker.date.birthdate({
            min: 18,
            max: 65,
            mode: 'age',
          }),
          gender: faker.helpers.arrayElement([
            Gender.FEMALE,
            Gender.MALE,
            Gender.UNKNOWN,
          ]),
          nationality: 'Việt Nam',
          cccd: faker.string.numeric(12),
          phoneNumber: faker.phone.number(),
          email: faker.internet.email({
            firstName: faker.lorem.word(5),
            provider: 'gmail.com',
          }),
          city: 'TP HCM',
          district: 'Quận 10',
          detailAddress: '246 Lý Thường Kiệt',
          description: faker.lorem.sentence(),
          type: faker.helpers.arrayElement(['ADMIN', 'EMPLOYEE']),
          tenantId: faker.helpers.arrayElement(tenantIds),
        }),
      );
    }
    for (const item of dataAccount) {
      const uuid = await this.commandBus.execute(item);
      accountUUIDs.push({ uuid, tenantId: item.tenantId });
    }
    console.log('Đã tạo Tài khoản cho Admin/Employee');

    // Tạo Hoạt động
    const dataActivity: CreateActivityCommand[] = [];
    const activityUUID: string[] = [];
    const nameActivities = [
      'Gửi email chúc sinh nhật tự động',
      'Gọi điện lần 1',
      'Gọi điện lần 2',
    ];
    for (const tenantId of tenantIds) {
      const phaseUUID = (
        await this.prisma.phase.findMany({
          where: { tenantId },
        })
      ).map((phase) => phase.uuid);
      for (const name of nameActivities) {
        dataActivity.push(
          new CreateActivityCommand({
            name,
            description: faker.lorem.sentence(),
            phases: faker.helpers.arrayElements(phaseUUID),
            tenantId,
          }),
        );
      }
    }
    for (const item of dataActivity) {
      activityUUID.push(await this.commandBus.execute(item));
    }
    console.log('Đã tạo Hoạt động');

    // Tạo Khách hàng
    const dataCustomer: CreateCustomerCommand[] = [];
    const customerUUID: {
      uuid: string;
      tenantId: string;
      isBusiness: boolean;
    }[] = [];
    const numCus = faker.number.int({ min: 50, max: 100 });
    for (let i = 0; i < numCus; i++) {
      const employeeBus: string[] = [];
      const tenantId = faker.helpers.arrayElement(tenantIds);
      const employees = await this.prisma.employee.findMany({
        where: { tenantId },
      });
      const phases = (
        await this.prisma.phase.findMany({
          where: { tenantId },
          select: { uuid: true },
        })
      ).map((i) => i.uuid);
      faker.helpers
        .arrayElements(employees, {
          min: 2,
          max: 4,
        })
        .map(async (employee) => {
          employeeBus.push(employee.uuid);
        });
      dataCustomer.push(
        new CreateCustomerCommand({
          isBusiness: true,
          source: 1,
          city: faker.location.city(),
          district: faker.location.county(),
          detailAddress: faker.location.streetAddress(),
          description: faker.lorem.sentence(),
          createdDate: new Date(),
          hasAccount: StatusCustomerAccount.NOTAPPROVED,
          name: faker.company.name(),
          businessNationality: 'Việt Nam',
          registrationNumber: faker.string.numeric(10),
          taxCode: faker.string.numeric(10) + '-' + faker.string.numeric(3),
          industry: faker.helpers.arrayElement(businessIndustryList),
          representativeName: faker.person.fullName(),
          representativeDayOfBirth: faker.date.birthdate({
            min: 18,
            max: 65,
            mode: 'age',
          }),
          representativeCccd: faker.string.numeric(12),
          representativePosition: faker.person.jobTitle(),
          representativeGender: faker.helpers.arrayElement([
            Gender.FEMALE,
            Gender.MALE,
            Gender.UNKNOWN,
          ]),
          representativePhone: faker.phone.number(),
          representativeEmail: faker.internet.email({
            firstName: faker.lorem.word(5),
            provider: 'gmail.com',
          }),
          representativeNationality: 'Việt Nam',
          phaseUUID: faker.helpers.arrayElement(phases),
          employeeUUIDs: employeeBus,
          tenantId,
        }),
      );
      const employeeInd: string[] = [];
      faker.helpers
        .arrayElements(employees, {
          min: 2,
          max: 4,
        })
        .map(async (employee) => {
          employeeInd.push(employee.uuid);
        });
      dataCustomer.push(
        new CreateCustomerCommand({
          isBusiness: false,
          source: 1,
          city: faker.location.city(),
          district: faker.location.county(),
          detailAddress: faker.location.streetAddress(),
          description: faker.lorem.sentence(),
          createdDate: new Date(),
          hasAccount: StatusCustomerAccount.NOTAPPROVED,
          name: faker.person.fullName(),
          dayOfBirth: faker.date.birthdate({
            min: 18,
            max: 65,
            mode: 'age',
          }),
          cccd: faker.string.numeric(12),
          gender: faker.helpers.arrayElement([
            Gender.FEMALE,
            Gender.MALE,
            Gender.UNKNOWN,
          ]),
          email: faker.internet.email({
            firstName: faker.lorem.word(5),
            provider: 'gmail.com',
          }),
          phoneNumber: faker.phone.number(),
          nationality: 'Việt Nam',
          phaseUUID: faker.helpers.arrayElement(phases),
          employeeUUIDs: employeeInd,
          tenantId,
        }),
      );
    }
    for (const item of dataCustomer) {
      customerUUID.push({
        uuid: await this.commandBus.execute(item),
        tenantId: item.tenantId,
        isBusiness: item.isBusiness,
      });
    }
    console.log('Đã tạo Khách hàng');

    // Tạo Account cho Khách hàng
    const dataAccountCustomer: CreateAccountForCustomerCommand[] = [];
    const customers = faker.helpers.arrayElements(customerUUID, {
      min: 12,
      max: 12,
    });
    for (let i = 0; i < 12; i++) {
      dataAccountCustomer.push(
        new CreateAccountForCustomerCommand({
          customerUUID: customers[i].uuid,
          type: TypeAccount.CUSTOMER,
          tenantId: customers[i].tenantId,
        }),
      );
    }
    for (const item of dataAccountCustomer) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Tài khoản cho Khách hàng');

    // Tạo Task
    const dataTask: CreateTaskCommand[] = [];
    for (const tenantId of tenantIds) {
      const activities = await this.prisma.activity.findMany({
        where: { tenantId },
      });
      const customers = await this.prisma.customer.findMany({
        where: { tenantId },
      });
      const employees = await this.prisma.employee.findMany({
        where: { tenantId },
      });
      const activityUUIDs = activities.map((activity) => activity.uuid);
      const customerUUIDs = customers.map((customer) => customer.uuid);
      const employeeUUIDs = employees.map((employee) => employee.uuid);
      for (const uuid of activityUUIDs) {
        const num = faker.number.int({ min: 30, max: 50 });
        for (let i = 0; i < num; i++) {
          const startDate = faker.date.recent();
          dataTask.push(
            new CreateTaskCommand({
              startDate,
              endDate: faker.date.future(),
              createDate: faker.date.recent({ days: 10, refDate: startDate }),
              note: faker.lorem.sentence(),
              autoAnnounceEmp: false,
              autoAnnounceCus: false,
              employees: faker.helpers.arrayElements(employeeUUIDs, {
                min: 1,
                max: 3,
              }),
              activityUUID: uuid,
              customerUUID: faker.helpers.arrayElement(customerUUIDs),
              tenantId,
            }),
          );
        }
      }
    }
    for (const item of dataTask) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Công việc');

    // Tạo sản phẩm
    const dataProduct: CreateProductCommand[] = [];
    const products: { uuid: string; quantity: number; price: number }[] = [];
    const numProduct = faker.number.int({ min: 50, max: 80 });
    for (let i = 0; i < numProduct; i++) {
      dataProduct.push(
        new CreateProductCommand({
          name: faker.commerce.productName(),
          code: 'SP-' + i.toString().padStart(8, '0'),
          features: faker.commerce.productAdjective(),
          quantity: faker.number.int({ min: 5, max: 10 }),
          description: faker.commerce.productDescription(),
          price: Number(faker.commerce.price({ min: 1000, max: 8739 })) * 1000,
          unit: 'Cái',
          tenantId: faker.helpers.arrayElement(tenantIds),
        }),
      );
    }
    for (const item of dataProduct) {
      products.push({
        uuid: await this.commandBus.execute(item),
        quantity: item.quantity,
        price: item.price,
      });
    }
    console.log('Đã tạo Sản phẩm');

    // Tạo Yêu cầu báo giá
    const dataPriceQuoteRequest: CreatePriceQuoteRequestCommand[] = [];
    for (const customer of customerUUID) {
      const num = faker.number.int({ min: 2, max: 5 });
      const cus = await this.prisma.customer.findUnique({
        where: { uuid: customer.uuid },
      });
      const code = cus.code.split('-')[1];
      for (let i = 0; i < num; i++) {
        const createdDate = faker.date.recent({
          days: 10,
          refDate: new Date(),
        });
        dataPriceQuoteRequest.push(
          new CreatePriceQuoteRequestCommand({
            code: 'YCBG-' + i.toString().padStart(8, '0') + '-' + code,
            createdDate: createdDate,
            status: faker.helpers.arrayElement(['SENT', 'UNSENT']),
            sentDate: faker.date.future({ refDate: createdDate }),
            customerUUID: customer.uuid,
            products: faker.helpers.arrayElements(products).map((product) => {
              return {
                uuid: product.uuid,
                quantity: faker.number.int({ min: 1, max: product.quantity }),
              };
            }),
          }),
        );
      }
    }
    for (const item of dataPriceQuoteRequest) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Yêu cầu báo giá');

    // Tạo Báo giá
    const dataPriceQuote: CreatePriceQuoteCommand[] = [];
    for (const customer of customerUUID) {
      const num = faker.number.int({ min: 2, max: 5 });
      const cus = await this.prisma.customer.findUnique({
        where: { uuid: customer.uuid },
      });
      const code = cus.code.split('-')[1];
      const priceQuoteRequest = await (
        await this.prisma.priceQuoteRequest.findMany({
          where: { customerUUID: customer.uuid },
          select: { uuid: true },
        })
      ).map((item) => item.uuid);
      for (let i = 0; i < num; i++) {
        const createdDate = faker.date.recent({
          days: 10,
          refDate: new Date(),
        });
        const account = faker.helpers.arrayElement(accountUUIDs);
        dataPriceQuote.push(
          new CreatePriceQuoteCommand({
            code: 'BG-' + i.toString().padStart(8, '0') + '-' + code,
            createdDate: createdDate,
            status: faker.helpers.arrayElement(['SENT', 'UNSENT']),
            sentDate: faker.date.future({ refDate: createdDate }),
            customerUUID: customer.uuid,
            accountUUID: account.uuid,
            tenantId: account.tenantId,
            priceQuoteRequestUUID:
              faker.helpers.arrayElement(priceQuoteRequest),
            products: faker.helpers.arrayElements(products).map((product) => {
              return {
                uuid: product.uuid,
                quantity: faker.number.int({ min: 1, max: product.quantity }),
                negotiatedPrice:
                  Number(faker.commerce.price({ min: 1000, max: 8739 })) * 1000,
              };
            }),
            effectiveDate: faker.date.future(),
          }),
        );
      }
    }
    for (const item of dataPriceQuote) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Báo giá');

    // Tạo Hóa đơn
    const dataBill: CreateBillCommand[] = [];
    for (const customer of customerUUID) {
      const num = faker.number.int({ min: 2, max: 5 });
      const cus = await this.prisma.customer.findUnique({
        where: { uuid: customer.uuid },
      });
      const priceQuotes = await this.prisma.priceQuote.findMany({
        where: { customerUUID: customer.uuid },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
      const code = cus.code.split('-')[1];
      for (let i = 0; i < num; i++) {
        const createdDate = faker.date.recent({
          days: 10,
          refDate: new Date(),
        });
        const priceQuote = faker.helpers.arrayElement(priceQuotes);
        dataBill.push(
          new CreateBillCommand({
            code: 'HD-' + i.toString().padStart(8, '0') + '-' + code,
            createdDate: createdDate,
            status: faker.helpers.arrayElement(['PAID', 'UNPAID']),
            sentDate: faker.date.future({ refDate: createdDate }),
            customerUUID: customer.uuid,
            priceQuoteUUID: priceQuote.uuid,
            products: priceQuote.products.map((product) => {
              return {
                uuid: product.productUUID,
                quantity: faker.number.int({ min: 1, max: product.quantity }),
                fixedPrice:
                  Number(
                    faker.commerce.price({
                      min: 1000,
                      max: product.negotiatedPrice / 1000,
                    }),
                  ) * 1000,
              };
            }),
          }),
        );
      }
    }
    for (const item of dataBill) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Hóa đơn');

    // Tạo Loại Khiếu nại
    const dataTypeComplaint: CreateTypeComplaintCommand[] = [];
    const typeComplaints: { name: string; listOfField: any }[] = [
      {
        name: 'Vận chuyển',
        listOfField: [
          {
            name: 'Trắc nghiệm',
            isFieldFile: false,
            title: 'Vấn đề bạn gặp với việc giao hàng?',
            specificFileTypes: [],
            maxNumOfFiles: 0,
            listOptions: [
              'Shipper không thân thiện',
              'Giao hàng quá chậm',
              'Không có free ship',
            ],
          },
          {
            name: 'Tải tệp lên',
            isFieldFile: true,
            title: 'Hình ảnh minh họa',
            specificFileTypes: [],
            maxNumOfFiles: 2,
            listOptions: [],
          },
          {
            name: 'Trả lời dài',
            isFieldFile: false,
            title: 'Mô tả chi tiết',
            specificFileTypes: [],
            maxNumOfFiles: 0,
            listOptions: [],
          },
        ],
      },
      {
        name: 'Nhân viên',
        listOfField: [
          {
            name: 'Trắc nghiệm',
            isFieldFile: false,
            title: 'Vấn đề bạn gặp phải với nhân viên chúng tôi?',
            specificFileTypes: [],
            maxNumOfFiles: 0,
            listOptions: [
              'Tư vấn không đúng',
              'Thái độ không tích cực',
              'Phản hồi chậm',
            ],
          },
          {
            name: 'Trả lời dài',
            isFieldFile: false,
            title: 'Mô tả chi tiết',
            specificFileTypes: [],
            maxNumOfFiles: 0,
            listOptions: [],
          },
        ],
      },
    ];
    for (const tenantId of tenantIds) {
      for (const typeComplaint of typeComplaints) {
        dataTypeComplaint.push(
          new CreateTypeComplaintCommand({
            name: typeComplaint.name,
            description: 'Không có mô tả cho loại khiếu nại này',
            listOfField: typeComplaint.listOfField,
            tenantId,
          }),
        );
      }
    }
    for (const item of dataTypeComplaint) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Loại khiếu nại');

    // Tạo khiếu nại
    // const
  }
}
