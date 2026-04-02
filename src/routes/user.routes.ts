import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { updateUserRoleSchema, updateUserStatusSchema } from '../schemas';

const router = Router();

// Only ADMIN can manage users
router.use(authenticate, authorize(['ADMIN']));

router.get('/', UserController.findAll);
router.put('/:id/role', validate(updateUserRoleSchema), UserController.updateRole);
router.put('/:id/status', validate(updateUserStatusSchema), UserController.updateStatus);

export default router;
