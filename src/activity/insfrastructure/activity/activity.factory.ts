import { Activity, Prisma } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { ActivityModel } from '../../domain/activity/activity.model';

type ActivityEntity = Prisma.ActivityGetPayload<{
  include: {
    tasks: true;
  };
}>;

export class ActivityFactory extends BaseFactory {
  createActivityModel(
    activity: ActivityEntity | Activity | Partial<Activity> | null,
  ) {
    if (!activity) return null;
    return this.createModel(ActivityModel, activity);
  }

  createActivityModels(
    activities: ActivityEntity[] | Activity[] | Partial<Activity>[] | null,
  ) {
    if (!activities) return null;
    return activities.map((activity) => this.createActivityModel(activity));
  }
}
