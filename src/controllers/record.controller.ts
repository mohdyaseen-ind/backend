import { Request, Response } from 'express';
import { RecordService } from '../services/record.service';

export class RecordController {
  static async create(req: Request, res: Response) {
    const record = await RecordService.create(req.body, req.user!.id);
    res.status(201).json({ status: 'success', data: { record } });
  }

  static async findAll(req: Request, res: Response) {
    const data = await RecordService.findAll(req.query);
    res.status(200).json({ status: 'success', data });
  }

  static async findById(req: Request, res: Response) {
    const record = await RecordService.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { record } });
  }

  static async update(req: Request, res: Response) {
    const record = await RecordService.update(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { record } });
  }

  static async delete(req: Request, res: Response) {
    await RecordService.delete(req.params.id);
    res.status(204).send();
  }
}
