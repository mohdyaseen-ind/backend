import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    const user = await AuthService.register(req.body);
    res.status(201).json({ status: 'success', data: { user } });
  }

  static async login(req: Request, res: Response) {
    const data = await AuthService.login(req.body);
    res.status(200).json({ status: 'success', data });
  }
}
