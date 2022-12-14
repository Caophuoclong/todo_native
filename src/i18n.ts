import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
    en: {
        translation:{
            WelcomeTo: "Welcome to",
            EnterYourName: "Enter your name",
            GetStarted: "Get Started",
            Hello: "Hello",
            MyDay: "My Day",
            Important: "Important",
            Normal: "Normal",
            All: "All",
            Tasks: "Tasks",
            Completed: "Completed",
            Setting: "Setting",
            Language: "Language",
            ChangeLanguage: "Change Language",
            ClearData: "Clear Data",
            CreateTask: "Create Task",
            TaskTitle: "Task Title",
            Description: "Description",
            Choose_DateTimeStart: "Choose Date Time Start",
            Choose_DateTimeEnd: "Choose Date Time End",
            GetAlert: "Get alert for this task",
            EnterDescription: "Enter Description",
            Optional:"Optional",
            Done: "Done",
            Cancel: "Cancel",
            TaskLevel: "Task Level",
            Unimportant: "Unimportant",
            SelectDate: "Select Date",
            SelectTime: "Select Time",
            TaskTitlePlaceholder: "Enter Task Title",
            Start: "Start",
            End: "End",
            Close : "Close",
            To: "To",
            MessageNotify: "You have a task",
            In: "in",
            Minutes: "minutes",
            Now: "Now",
            Expired: "Expired",
            Delete: "Delete",
            SetTimeToNotify: "Set time to notify",
            Theme: "Theme",
            AutoChangeTheme: "Auto change theme",
            Light: "Light",
            Dark: "Dark",
            SubtitleAutoChangeThme: "Base on system setting",
            ViewTask: "View Task",
            DoneTask: "Done Task",
            Permission: "Permission",
            PermissionNotifyMessage: "Please allow notification permission to use this app",
            PleaseEnterYourName: "Please enter your name",
            Error: "Error",
            PermissionNeverAskAgainMessage: "Please go to setting to allow notification permission to use this app",
            // MessageNotify: (title: string, timer?: number)=>{
            //   return `You have a task ${title} ${timer ? `in ${timer} minutes` : "now"}`;
            // }
        }
    },
    vi: {
        translation:{
            WelcomeTo: "Ch??o m???ng ?????n",
            EnterYourName: "Nh???p t??n c???a b???n",
            GetStarted: "B???t ?????u",
            Hello: "Xin ch??o",
            MyDay: "H??m nay",
            Important: "Quan tr???ng",
            Normal: "B??nh th?????ng",
            All: "T???t c???",
            Tasks: "C??ng vi???c",
            Completed: "Ho??n th??nh",
            Setting: "C??i ?????t",
            Language: "Ng??n ng???",
            ChangeLanguage: "Thay ?????i ng??n ng???",
            ClearData: "X??a d??? li???u",
            CreateTask: "T???o c??ng vi???c",
            TaskTitle: "Ti??u ????? c??ng vi???c",
            Description: "M?? t???",
            Choose_DateTimeStart: "Ch???n th???i gian b???t ?????u",
            Choose_DateTimeEnd: "Ch???n th???i gian k???t th??c",
            GetAlert: "Nh???n th??ng b??o cho c??ng vi???c n??y",
            EnterDescription: "Nh???p m?? t???",
            Optional:"T??y ch???n",
            Done: "Xong",
            Cancel: "H???y",
            TaskLevel: "M???c ????? c??ng vi???c",
            Unimportant: "Kh??ng quan tr???ng",
            SelectDate: "Ch???n ng??y",
            SelectTime: "Ch???n th???i gian",
            TaskTitlePlaceholder: "Nh???p ti??u ????? c??ng vi???c",
            Start: "B???t ?????u",
            End: "K???t th??c",
            Close : "????ng",
            To: "?????n",
            MessageNotify: "B???n c?? m???t c??ng vi???c",
            In: "trong",
            Minutes: "ph??t",
            Now: "b??y gi???",
            Expired: "H???t h???n",
            Delete: "X??a",
            SetTimeToNotify: "Thi???t l???p th???i gian th??ng b??o",
            Theme: "Giao di???n",
            AutoChangeTheme: "T??? ?????ng thay ?????i giao di???n",
            Light: "S??ng",
            Dark: "T???i",
            SubtitleAutoChangeThme: "Theo t??y ch???n h??? th???ng",
            ViewTask: "Xem",
            DoneTask: "Xong",
            Permission: "Quy???n truy c???p",
            PermissionNotifyMessage: "Vui l??ng cho ph??p quy???n th??ng b??o ????? s??? d???ng ???ng d???ng n??y",
            PleaseEnterYourName: "Vui l??ng nh???p t??n c???a b???n",
            Error: "L???i",
            PermissionNeverAskAgainMessage: "Vui l??ng v??o c??i ?????t ????? cho ph??p quy???n th??ng b??o ????? s??? d???ng ???ng d???ng n??y",
            // MessageNotify: (title: string, timer?: number)=>{
            //   return `B???n c?? c??ng vi???c ${title} ${timer ? `trong ${timer} ph??t` : "b??y gi???"}`;
            // }

        }
    }
}
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;