export default function addEventToCalendar(title, startDate, endDate) {
  return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&dates=${startDate}/${endDate}&details=https://meetjobs.kktix.cc/events/si2022-summer&location&trp=true&sprop=https://meetjobs.kktix.cc/events/si2022-summer&sprop=name:KKTIX&sf=true`;
}
