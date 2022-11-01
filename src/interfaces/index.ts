export type Language = "en" | "vi"
export type NavigationParamsList ={
    Home: undefined,
    Todo: undefined,
    Splash: undefined,
    Setting: undefined,
}
export type TabNavigationParamsList = {
    Home1: undefined,

}
export type TaskType = {
    title: "important" | "normal" | "unimportant",
    name: string
}
export type date = {
    day: number,
    month: number,
    year: number
}
export type time ={
    hour: number,
    minute: number
}
export interface Task {
  _id: string;
  title: string,
  description?: string,
  start:{
    date: date | null,
    time: time | null,
  },
  end: {
    date: date | null,
    time: time | null,
  }
  type: TaskType,
    isDone: boolean,
    isAlert: boolean,
}
export interface IUser {
    _id?:string;
    name: string;
    level: {
        [key in TaskType["title"]]: number[]
    }

}
export interface TaskWithBackgroundId extends Task{
  backgroundId?: number[]
}