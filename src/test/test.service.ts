import { faker } from '@faker-js/faker/locale/vi';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Gender, StatusCustomerAccount } from '@prisma/client';
import { PrismaService } from 'libs/database.module';
import { CreateAccountCommand } from 'src/account/application/command/create.account.command';
import { CreateActivityCommand } from 'src/activity/application/activity/command/create.activity.command';
import { CreateTaskCommand } from 'src/activity/application/task/command/create.task.command';
import { SignUpCommand } from 'src/auth/application/command/signup.command';
import { CreateCustomerCommand } from 'src/customer/application/command/create.customer.command';
import { CreatePhaseCommand } from 'src/phase/application/command/create.phase.command';
import { CreateProductCommand } from 'src/product/application/command/create.product.command';

@Injectable()
export class TestService {
  @Inject()
  private readonly prisma: PrismaService;

  constructor(
    readonly queryBus: QueryBus,
    readonly commandBus: CommandBus,
  ) {}

  async mockData(numCus: number) {
    // Tạo Giai đoạn
    const dataPhase: CreatePhaseCommand[] = [];
    const namePhases = [
      'Tiềm năng',
      'Đang liên lạc',
      'Đã báo giá',
      'Chính thức',
      'Thân thiết',
    ];
    for (let i = 0; i < namePhases.length; i++) {
      dataPhase.push(
        new CreatePhaseCommand({
          name: namePhases[i],
          priority: i,
          description: 'Không có mô tả cho giai đoạn này',
        }),
      );
    }
    for (const item of dataPhase) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Giai đoạn');

    // Tạo Tenant
    const dataTenant: SignUpCommand[] = [];
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
          domain: faker.word.noun(5),
          username: `username${i + 1}`,
          password: '123456',
          passwordConfirm: '123456',
        }),
      );
    }
    for (const item of dataTenant) {
      await this.commandBus.execute(item);
    }
    console.log('Đã tạo Tenant');

    // Tạo Account - Employee
    const dataAccount: CreateAccountCommand[] = [];
    const employeeUUID: string[] = [];
    for (let i = 0; i < 12; i++) {
      dataAccount.push(
        new CreateAccountCommand({
          name: faker.person.fullName(),
          code: 'NV-' + i.toString().padStart(8, '0'),
          position: faker.person.jobTitle(),
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
        }),
      );
    }
    for (const item of dataAccount) {
      employeeUUID.push(await this.commandBus.execute(item));
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
    for (const name of nameActivities) {
      dataActivity.push(
        new CreateActivityCommand({
          name,
          description: faker.lorem.sentence(),
        }),
      );
    }
    for (const item of dataActivity) {
      activityUUID.push(await this.commandBus.execute(item));
    }
    console.log('Đã tạo Hoạt động');

    // Tạo Khách hàng
    const dataCustomer: CreateCustomerCommand[] = [];
    const customerUUID: { uuid: string; isBusiness: boolean }[] = [];
    const phases = (
      await this.prisma.phase.findMany({ select: { uuid: true } })
    ).map((i) => i.uuid);
    for (let i = 0; i < numCus; i++) {
      dataCustomer.push(
        new CreateCustomerCommand({
          isBusiness: true,
          source: 1,
          city: 1,
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
        }),
      );
      dataCustomer.push(
        new CreateCustomerCommand({
          isBusiness: true,
          source: 1,
          city: 1,
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
        }),
      );
    }
    for (const item of dataCustomer) {
      customerUUID.push({
        uuid: await this.commandBus.execute(item),
        isBusiness: item.isBusiness,
      });
    }
    console.log('Đã tạo Khách hàng');

    // Tạo Task
    const dataTask: CreateTaskCommand[] = [];
    for (const uuid of activityUUID) {
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
            activityUUID: uuid,
            customerUUID: faker.helpers.arrayElement(customerUUID).uuid,
          }),
        );
      }
    }
    console.log('Đã tạo Công việc');

    // Tạo sản phẩm
    const dataProduct: CreateProductCommand[] = [];
    const productUUID: string[] = [];
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
        }),
      );
    }
    for (const item of dataProduct) {
      productUUID.push(await this.commandBus.execute(item));
    }
    console.log('Đã tạo Sản phẩm');

    // Tạo Yêu cầu báo giá
    // const dataPriceQuoteRequest: CreatePriceQuoteRequestCommand[] = []
    // const
  }
}
