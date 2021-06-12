import { Schedule } from "../../Controllers/ScheduleController";
import { ScheduleHour } from "../../Controllers/ScheduleHourController";

export default function useSchedule() {
  const scheduleClass = new Schedule();
  const scheduleHourClass = new ScheduleHour();

  return { scheduleClass, scheduleHourClass };
}
