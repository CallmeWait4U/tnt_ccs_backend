import { faker } from '@faker-js/faker/locale/vi';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ActivityComplaint, StatusComplaint } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { FirebaseService } from 'libs/firebase.module';
import { v4 as uuidv4 } from 'uuid';
import { ComplaintQuery } from '../infrastructure/complaint.query';
import {
  ActivityComplaintModel,
  ComplaintModel,
  EmployeeType,
  HistoryStatusComplaintType,
  TypeComplaintModel,
} from './complaint.model';

export class ComplaintDomain {
  @Inject()
  private readonly complaintQuery: ComplaintQuery;
  @Inject()
  private readonly firebase: FirebaseService;

  async createComplaint(
    model: ComplaintModel,
    listEmployees: EmployeeType[],
    typeComplaint: TypeComplaintModel,
    images: Express.Multer.File[],
  ): Promise<ComplaintModel> {
    const fieldComplaintUUIDs = typeComplaint.listOfField.map(
      (field) => field.uuid,
    );
    for (const field of model.valueFieldComplaint) {
      const index = fieldComplaintUUIDs.indexOf(field.fieldComplaintUUID);
      if (index === -1) {
        throw new HttpException(
          'Field does not exist in Type Complaint',
          HttpStatus.BAD_REQUEST,
        );
      }
      const fieldComplaint = typeComplaint.listOfField[index];
      if (fieldComplaint.isFieldFile) {
        if (fieldComplaint.maxNumOfFiles < field.value.length) {
          throw new HttpException(
            'Vuot qua so tep quy dinh',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (fieldComplaint.specificFileTypes.length !== 0) {
          for (const i of field.value) {
            const index = Number(i);
            if (
              !fieldComplaint.specificFileTypes.includes(
                images[index].originalname.split('.')[1],
              )
            ) {
              throw new HttpException(
                'Dinh dang tep khong phu hop',
                HttpStatus.BAD_REQUEST,
              );
            }
          }
        }
        const urls: string[] = [];
        for (const i of field.value) {
          const index = Number(i);
          urls.push(await this.firebase.uploadImage(images[index]));
        }
        field.value = urls;
      }
    }
    const complaintUUID = uuidv4().toString();
    model.uuid = complaintUUID;
    model.code = `KN-` + faker.string.numeric(5);
    model.createdDate = new Date();
    model.valueFieldComplaint = model.valueFieldComplaint.map((i) => ({
      ...i,
      tenantId: model.tenantId,
    }));
    model.listStatus = [
      plainToClass(
        HistoryStatusComplaintType,
        {
          date: new Date(),
          status: StatusComplaint.PENDING,
          complaintUUID: undefined,
        },
        { excludeExtraneousValues: true },
      ),
    ];
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

  updateStatusComplaint(status: StatusComplaint): HistoryStatusComplaintType {
    return plainToClass(HistoryStatusComplaintType, {
      data: new Date(),
      status,
    });
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
