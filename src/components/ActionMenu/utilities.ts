import {MenuActionDescriptor, MenuGroupDescriptor} from '../../types';

export function sortAndOverrideActionOrder(
  actions: (MenuActionDescriptor | MenuGroupDescriptor)[],
) {
  const sortedActions = actions.sort((actionA, actionB) => {
    // order actionA and actionB by index value if they both have overrides
    if (actionA.index !== undefined && actionB.index !== undefined) {
      return actionA.index - actionB.index;
    }
    // order actionA toward the front of the array if it has an override
    if (actionA.index !== undefined && actionB.index === undefined) {
      return -1;
    }
    // order actionA toward the back of the array if it doesn't have an override
    if (actionA.index === undefined && actionB.index !== undefined) {
      return 1;
    }
    // keep the current order if neither actionA nor actionB have an override
    return 0;
  });

  const overriddenActions: (MenuActionDescriptor | MenuGroupDescriptor)[] = [];

  sortedActions.forEach((action) => {
    if (action.index !== undefined) {
      overriddenActions[action.index] = action;
    } else {
      overriddenActions.push(action);
    }
  });

  return overriddenActions;
}
