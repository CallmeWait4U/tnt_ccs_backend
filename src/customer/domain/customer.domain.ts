import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BusinessType, CustomerModel, IndividualType } from './customer.model';

const field = {
  source: 'Nguồn',
  city: 'Địa chỉ',
  district: 'Địa chỉ',
  detailAddress: 'Địa chỉ',
  description: 'Ghi chú',
  name: 'Tên',
  // Business
  businessNationality: 'Quốc gia',
  registrationNumber: 'Số ĐKKD',
  taxCode: 'Mã số thuế',
  industry: 'Lĩnh vực kinh doanh',
  representativeName: 'Tên Người đại diện',
  representativeDayOfBirth: 'Ngày sinh Người đại diện',
  representativeCccd: 'CCCD Người đại diện',
  representativePosition: 'Vị trí Người đại diện',
  representativeGender: 'Giới tính Người đại diện',
  representativePhone: 'Số điện thoại Người đại diện',
  representativeEmail: 'Email Người đại diện',
  representativeNationality: 'Quốc tịch Người đại diện',
  //Individual
  dayOfBirth: 'Ngày sinh',
  cccd: 'CCCD',
  gender: 'Giới tính',
  email: 'Email',
  phoneNumber: 'Số điện thoại',
  nationality: 'Quốc tịch',
};

export class CustomerDomain {
  create(model: CustomerModel): CustomerModel {
    const customerUUID = uuidv4().toString();
    model.uuid = customerUUID;
    model.code = 'KH-';
    model.receiveMail = false;
    return model;
  }

  update(
    customerCurrent: CustomerModel,
    customerUpdate: Partial<CustomerModel> &
      Partial<BusinessType> &
      Partial<IndividualType>,
  ): { modelUpdated: CustomerModel; note: string } {
    const listNote: string[] = ['Những thông tin thay đổi:'];
    for (const [prop, value] of Object.entries(customerCurrent)) {
      if (prop === 'business' && customerCurrent[prop]) {
        for (const [propBusi, item] of Object.entries(
          customerCurrent.business,
        )) {
          if (customerUpdate[propBusi]) {
            if (customerUpdate[propBusi] !== item) {
              listNote.push(field[propBusi]);
              customerCurrent.business[propBusi] = customerUpdate[propBusi];
            }
          }
        }
      } else if (prop === 'individual' && customerCurrent[prop]) {
        for (const [propIndi, item] of Object.entries(
          customerCurrent.individual,
        )) {
          if (customerUpdate[propIndi]) {
            if (customerUpdate[propIndi] !== item) {
              listNote.push(field[propIndi]);
              customerCurrent.individual[propIndi] = customerUpdate[propIndi];
            }
          }
        }
      } else {
        if (customerUpdate[prop]) {
          if (customerUpdate[prop] !== value) {
            listNote.push(field[prop] + ',');
            customerCurrent[prop] = customerUpdate[prop];
          }
        }
      }
    }
    if (listNote.length === 1) {
      throw new HttpException(
        'Không có sự thay đổi dữ liệu',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      modelUpdated: customerCurrent,
      note: listNote.join(' ').slice(0, -1),
    };
  }

  checkCustomer(customer: CustomerModel[] | CustomerModel | null) {
    if (!customer)
      throw new HttpException('Customers do not exist', HttpStatus.BAD_REQUEST);
  }
}
