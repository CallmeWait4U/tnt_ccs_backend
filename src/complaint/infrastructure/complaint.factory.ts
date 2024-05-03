import { Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import {
  ActivityComplaintModel,
  ComplaintModel,
  TypeComplaintModel,
} from '../domain/complaint.model';

type ComplaintEntity = Prisma.ComplaintGetPayload<{
  include: {
    employees: true;
    valueFieldComplaint: true;
  };
}>;

type TypeComplaintEntity = Prisma.TypeComplaintGetPayload<{
  include: {
    complaints: true;
    listOfField: true;
  };
}>;

type ActivityComplaintEntity = Prisma.ActivityComplaintGetPayload<{
  include: {
    employee: true;
    activity: true;
    complaint: true;
  };
}>;

export class ComplaintFactory extends BaseFactory {
  createComplaintModel(
    complaint: Partial<ComplaintModel> | Partial<ComplaintEntity> | null,
  ) {
    if (!complaint) return null;
    return this.createModel(ComplaintModel, complaint);
  }

  createComplaintModels(
    complaints: Partial<ComplaintModel>[] | Partial<ComplaintEntity>[] | null,
  ) {
    if (!complaints) return null;
    return complaints.map((complaint) =>
      this.createModel(ComplaintModel, complaint),
    );
  }

  createTypeComplaintModel(
    typeComplaint:
      | Partial<TypeComplaintModel>
      | Partial<TypeComplaintEntity>
      | null,
  ) {
    if (!typeComplaint) return null;
    return this.createModel(TypeComplaintModel, typeComplaint);
  }

  createTypeComplaintModels(
    typeComplaints:
      | Partial<TypeComplaintModel>[]
      | Partial<TypeComplaintEntity>[]
      | null,
  ) {
    if (!typeComplaints) return null;
    return typeComplaints.map((typeComplaint) =>
      this.createModel(TypeComplaintModel, typeComplaint),
    );
  }

  createActivityComplaintModel(
    activityComplaint:
      | Partial<ActivityComplaintModel>
      | Partial<ActivityComplaintEntity>
      | null,
  ) {
    if (!activityComplaint) return null;
    return this.createModel(ActivityComplaintModel, activityComplaint);
  }

  createActivityComplaintModels(
    activityComplaints:
      | Partial<ActivityComplaintModel>[]
      | Partial<ActivityComplaintEntity>[]
      | null,
  ) {
    if (!activityComplaints) return null;
    return activityComplaints.map((activitiComplaint) =>
      this.createModel(ActivityComplaintModel, activitiComplaint),
    );
  }
}
