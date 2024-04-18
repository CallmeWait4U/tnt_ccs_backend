import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  ComplaintModel,
  EmployeeType,
  TypeComplaintModel,
} from './complaint.model';

export class ComplaintDomain {
  createComplaint(
    model: ComplaintModel,
    listEmployees: EmployeeType[],
  ): ComplaintModel {
    const complaintUUID = uuidv4().toString();
    model.uuid = complaintUUID;
    model.createdDate = new Date();
    model.valueFieldComplaint = model.valueFieldComplaint.map((i) => ({
      ...i,
      tenantId: model.tenantId,
    }));
    model.employees = listEmployees;
    return model;
  }

  createTypeComplaint(model: TypeComplaintModel): TypeComplaintModel {
    const typeComplaintUUID = uuidv4().toString();
    model.uuid = typeComplaintUUID;
    model.listOfField.forEach((field) => {
      const fieldUUID = uuidv4().toString();
      field.uuid = fieldUUID;
    });
    return model;
  }

  updateStatusComplaint(
    complaintCurrent: ComplaintModel,
    complaintUpdate: Partial<ComplaintModel>,
  ): ComplaintModel {
    for (const [prop, value] of Object.entries(complaintCurrent)) {
      if (prop === 'status') {
        complaintCurrent[prop] = complaintUpdate[prop]
          ? complaintUpdate[prop]
          : value;
      }
    }
    return complaintCurrent;
  }

  updateTypeComplaint(
    typeComplaintCurrent: TypeComplaintModel,
    typeComplaintUpdated: Partial<TypeComplaintModel>,
  ): TypeComplaintModel {
    for (const [prop, value] of Object.entries(typeComplaintCurrent)) {
      if (prop === 'listOfField') {
        typeComplaintCurrent.listOfField.forEach((field) => {
          const fieldUpdated = typeComplaintUpdated.listOfField.filter(
            (i) => i.uuid === field.uuid,
          )[0];
          if (fieldUpdated) {
            for (const [propField, valueFiel] of Object.entries(field)) {
              field[propField] = fieldUpdated[propField]
                ? fieldUpdated[propField]
                : valueFiel;
            }
          }
        });
      } else {
        typeComplaintCurrent[prop] = typeComplaintUpdated[prop]
          ? typeComplaintUpdated[prop]
          : value;
      }
    }
    return typeComplaintCurrent;
  }

  checkComplaint(complaint: ComplaintModel[] | ComplaintModel | null) {
    if (!complaint)
      throw new HttpException(
        'Complaints do not exist',
        HttpStatus.BAD_REQUEST,
      );
  }

  checkTypeComplaint(
    typeComplaint: TypeComplaintModel[] | TypeComplaintModel | null,
  ) {
    if (
      !typeComplaint ||
      (Array.isArray(typeComplaint) && typeComplaint.length === 0)
    )
      throw new HttpException(
        'Type complaints do not exist',
        HttpStatus.BAD_REQUEST,
      );
  }
}
