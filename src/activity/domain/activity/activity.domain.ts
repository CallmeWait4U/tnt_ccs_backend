import { v4 as uuidv4 } from 'uuid';
import { ActivityModel } from './activity.model';

export class ActivityDomain {
  create(model: ActivityModel): ActivityModel {
    const activityUUID = uuidv4().toString();
    model.uuid = activityUUID;
    return model;
  }

  update(
    activityCurrent: ActivityModel,
    activityUpdate: Partial<ActivityModel>,
  ): ActivityModel {
    for (const [prop, value] of Object.entries(activityCurrent)) {
      activityCurrent[prop] = activityUpdate[prop]
        ? activityUpdate[prop]
        : value;
    }
    return activityCurrent;
  }
}
