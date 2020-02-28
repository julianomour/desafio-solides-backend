import { format, isToday } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Schedule from '../models/Schedule';

class ScheduleController {
  async index(req, res) {
    const schedules = await Schedule.findAll({
      where: { user_id: req.userId },
    });

    return res.json(schedules);
  }

  async today(req, res) {
    const schedule = await Schedule.findOne({
      where: { user_id: req.userId },
      order: [['createdAt', 'DESC']],
    });

    let startDay;
    let startLunch;
    let endLunch;
    let endDay;

    if (!isToday(schedule.createdAt)) {
      return res.status(400).json({ error: 'Horário não é de hoje' });
    }

    if (schedule.start_day) {
      startDay = format(schedule.start_day, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      });
    }
    if (schedule.start_lunch) {
      startLunch = format(schedule.start_lunch, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      });
    }
    if (schedule.end_lunch) {
      endLunch = format(schedule.end_lunch, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      });
    }

    if (schedule.end_day) {
      endDay = format(schedule.end_day, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      });
    }

    return res.status(200).json({
      start_day: startDay,
      start_lunch: startLunch,
      end_lunch: endLunch,
      end_day: endDay,
    });
  }

  async start_day(req, res) {
    const verifySchedule = await Schedule.findOne({
      where: { user_id: req.userId },
      order: [['createdAt', 'DESC']],
    });

    if (verifySchedule && isToday(verifySchedule.createdAt)) {
      return res.status(400).json({ error: 'Horário já registrado hoje' });
    }

    const schedule = await Schedule.create({
      start_day: new Date(),
      user_id: req.userId,
    });

    req.startDay = schedule.id;

    return res.json({
      message: `Horário de entrada registrado às ${schedule.start_day}`,
      hour: format(schedule.start_day, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      }),
    });
  }

  async start_lunch(req, res) {
    const schedule = await Schedule.findOne({
      where: { user_id: req.userId },
      order: [['createdAt', 'DESC']],
    });

    if (schedule.start_lunch !== null) {
      return res.status(401).json({ error: 'Horário já registrado hoje' });
    }

    await schedule.update({ start_lunch: new Date() });
    return res.json({
      message: `Horário de início do intervalo registrado às ${schedule.start_lunch}`,
      hour: format(schedule.start_lunch, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      }),
    });
  }

  async end_lunch(req, res) {
    const schedule = await Schedule.findOne({
      where: { user_id: req.userId },
      order: [['createdAt', 'DESC']],
    });

    if (schedule.end_lunch) {
      return res.status(401).json({ error: 'Horário já registrado hoje' });
    }

    await schedule.update({ end_lunch: new Date() });
    return res.json({
      message: `Horário de fim do intervalo registrado às ${schedule.end_lunch}`,
      hour: format(schedule.end_lunch, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      }),
    });
  }

  async end_day(req, res) {
    const schedule = await Schedule.findOne({
      where: { user_id: req.userId },
      order: [['createdAt', 'DESC']],
    });

    if (schedule.end_day) {
      return res.status(401).json({ error: 'Hoário já registrado hoje' });
    }

    await schedule.update({ end_day: new Date() });
    return res.json({
      message: `Horário de fim do expediente ${schedule.end_day}`,
      hour: format(schedule.end_day, "dd-MM-yyyy'  'HH:mm:ss", {
        locale: pt,
      }),
    });
  }
}

export default new ScheduleController();
