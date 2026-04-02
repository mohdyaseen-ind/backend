import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async findAll(req: Request, res: Response) {
    const users = await UserService.findAll();
    res.status(200).json({ status: 'success', data: { users } });
  }

  static async updateRole(req: Request, res: Response) {
    const user = await UserService.updateRole(req.params.id, req.body.role);
    res.status(200).json({ status: 'success', data: { user } });
  }

  static async updateStatus(req: Request, res: Response) {
    const user = await UserService.updateStatus(req.params.id, req.body.isActive);
    res.status(200).json({ status: 'success', data: { user } });
  }
}
