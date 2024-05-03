import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ActivityComplaint } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { ComplaintQuery } from '../infrastructure/complaint.query';
import {
  ActivityComplaintModel,
  ComplaintModel,
  EmployeeType,
  TypeComplaintModel,
} from './complaint.model';

export class ComplaintDomain {
  @Inject()
  private readonly complaintQuery: ComplaintQuery;

  createComplaint(
    model: ComplaintModel,
    listEmployees: EmployeeType[],
  ): ComplaintModel {
    const complaintUUID = uuidv4().toString();
    model.uuid = complaintUUID;
    model.code = `KN-` + model.customerUUID;
    model.createdDate = new Date();
    model.valueFieldComplaint = model.valueFieldComplaint.map((i) => ({
      ...i,
      tenantId: model.tenantId,
    }));
    model.employees = listEmployees;
    return model;
  }

  async createTypeComplaint(
    model: TypeComplaintModel,
  ): Promise<TypeComplaintModel> {
    const typeComplaintUUID = uuidv4().toString();
    const listPhaseName =
      await this.complaintQuery.getTypeComplaintListForCheck(model.tenantId);
    if (listPhaseName.includes(model.name)) {
      throw new HttpException('Type Complaint name already exists', 400);
    }
    model.uuid = typeComplaintUUID;
    model.listOfField.forEach((field) => {
      const fieldUUID = uuidv4().toString();
      field.uuid = fieldUUID;
    });
    return model;
  }

  createActivityComplaint(
    model: ActivityComplaintModel,
  ): ActivityComplaintModel {
    const activityComplaintUUID = uuidv4().toString();
    model.uuid = activityComplaintUUID;
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

  checkActivityComplaint(
    activityComplaint: ActivityComplaintModel[] | ActivityComplaint | null,
  ) {
    if (
      !activityComplaint ||
      (Array.isArray(activityComplaint) && activityComplaint.length === 0)
    )
      throw new HttpException(
        'Activity complaints do not exist',
        HttpStatus.BAD_REQUEST,
      );
  }
}
