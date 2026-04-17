const express = require('express');
const {
  getBatchesByCourse,
  createBatch,
  updateBatchStatus
} = require('../controllers/batch.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/admin.middleware');

const router = express.Router();

router.get('/:courseId', getBatchesByCourse);
router.post('/', authenticateToken, requireAdmin, createBatch);
router.patch('/:id/status', authenticateToken, requireAdmin, updateBatchStatus);

module.exports = router;