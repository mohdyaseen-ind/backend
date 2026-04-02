import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

export class DashboardController {
  static async getSummary(req: Request, res: Response) {
    const data = await DashboardService.getSummary();
    res.status(200).json({ status: 'success', data });
  }
}
