import { Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { ComplaintModel, TypeComplaintModel } from '../domain/complaint.model';

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
}
