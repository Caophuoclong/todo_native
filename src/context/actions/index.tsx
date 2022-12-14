import {IUser, Task, TaskType, TaskWithBackgroundId} from '~/interfaces';
import {emptyState} from '..';
import {Type} from '../type';
import {Language} from '../../interfaces/index';
import {ColorSchemeName} from 'react-native';
export const setSystemSetting = (value: boolean) => ({
  type: Type.SET_SYSTEM_SETTING,
  payload: value,
});
export const setBaseOnSystem = (value: boolean) => ({
  type: Type.SET_BASE_ON_SYSTEM,
  payload: value,
});
export const setColorScheme = (colorScheme: ColorSchemeName) => ({
  type: Type.SET_COLOR_SCHEME,
  payload: colorScheme,
});
export const setChannelId = (channelId: string) => ({
  type: Type.SET_CHANNEL_ID,
  payload: channelId,
});
export const updateLevel = (x: {
  type: TaskType;
  value: number;
  index: number;
}) => {
  return {
    type: Type.UPDATE_LEVEL,
    payload: x,
  };
};
export const deleteTask = (_id: string) => {
  return {
    type: Type.DELETE_TASK,
    payload: _id,
  };
};
export const setSortType = (sortType: 'asc' | 'desc') => {
  return {
    type: Type.SET_SORT_TYPE,
    payload: sortType,
  };
};
export const setBackgroundId = (_id: string, data: number[]) => {
  return {
    type: Type.SET_BACKGROUND_ID,
    payload: {
      _id,
      data,
    },
  };
};
export const setAlert = ({_id, enable}: {_id: string; enable: boolean}) => {
  return {
    type: Type.SET_ALERT,
    payload: {
      _id,
      enable,
    },
  };
};

export const setLan = (lan: Language) => {
  return {
    type: Type.SET_LAN,
    payload: lan,
  };
};
export const clearData = () => {
  return {
    type: Type.CLEAR_DATA,
    payload: null,
  };
};

export const setTasks = (tasks: Array<Task>) => {
  return {
    type: Type.SET_TASKS,
    payload: tasks,
  };
};
export const setNoDone = (_id: string) => {
  return {
    type: Type.SET_NO_DONE,
    payload: _id,
  };
};
export const setDone = (_id: string, isDone: boolean) => {
  return {
    type: Type.SET_DONE,
    payload: {
      _id,
      isDone,
    },
  };
};
export const setTaskFilter = (tasks: Array<Task>) => {
  return {
    type: Type.SET_TASK_FILTER,
    payload: tasks,
  };
};
export const setTaskCompleted = (tasks: Array<Task>) => {
  return {
    type: Type.SET_TASK_COMPLETED,
    payload: tasks,
  };
};
export const addTask = (task: TaskWithBackgroundId) => {
  return {
    type: Type.ADD_TASK,
    payload: task,
  };
};
export const setUser = (user: Partial<IUser>) => {
  return {
    type: Type.SET_USER,
    payload: user,
  };
};
export const setTask = (task: Partial<TaskWithBackgroundId>) => {
  return {
    type: Type.SET_TASK,
    payload: task,
  };
};
export const setEmptyTasks = () => {
  return {
    type: Type.SET_EMPTY_TASKS,
    payload: null,
  };
};
export const setEmptyTask = () => {
  return {
    type: Type.SET_TASK,
    payload: emptyState.task,
  };
};
export const setActive = (value: boolean) => {
  return {
    type: Type.SET_ACTIVE,
    payload: value,
  };
};
