import { Schedule } from "../../../controllers/ScheduleController";
import { ScheduleHour } from "../../../controllers/ScheduleHourController";

export default function useSchedule() {
  const scheduleClass = new Schedule();
  const scheduleHourClass = new ScheduleHour();

  return { scheduleClass, scheduleHourClass };
}
