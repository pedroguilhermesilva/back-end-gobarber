import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;
    // verify if date exist
    if (!date) {
      return res.status(400).json({ erro: 'Invalid date' });
    }

    const searchDate = Number(date);

    // verify if date of providerId is startOfDay between endOfDay
    const appointments = await Appointment.finddAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      // formated the schedules in right way
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      // return all objects in format right way
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
