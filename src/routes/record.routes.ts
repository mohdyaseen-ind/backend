import { Router } from 'express';
import { RecordController } from '../controllers/record.controller';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { createRecordSchema, updateRecordSchema, getRecordsQuerySchema } from '../schemas';

const router = Router();

router.use(authenticate); // ALL record routes require Auth

router.post('/', authorize(['ADMIN']), validate(createRecordSchema), RecordController.create);
router.get('/', authorize(['ADMIN', 'ANALYST']), validate(getRecordsQuerySchema), RecordController.findAll);
router.get('/:id', authorize(['ADMIN', 'ANALYST']), RecordController.findById);
router.put('/:id', authorize(['ADMIN']), validate(updateRecordSchema), RecordController.update);
router.delete('/:id', authorize(['ADMIN']), RecordController.delete);

export default router;
