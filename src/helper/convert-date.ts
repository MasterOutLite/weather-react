import {Language} from "../const/language";

const monthsEN = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October", "November", "December"];

const monthsUA = ["Січень", "Лютий", "Березень", "Квітень",
  "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

let daysEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let daysUA = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

export function convertDate(date: Date, lan: Language) {
  const {days, months} = configDate(lan);
  const day = days[date.getDay()].substring(0, 3);
  const month = months[date.getMonth()];

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return `${day}, ${date.getDate()} ${month}, ${formattedTime}`
}

export function configDate(lan: Language) {
  switch (lan) {
    case Language.EN: {
      return {days: daysEN, months: monthsEN}
    }
    case Language.UA : {
      return {days: daysUA, months: monthsUA}
    }
    default: {
      return {days: daysEN, months: monthsEN}
    }
  }

}
