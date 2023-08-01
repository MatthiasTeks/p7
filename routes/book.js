const express = require('express');
const bookController = require('../controllers/book');
const verifyToken = require('../middlewares/verify-token');
const multer = require('../middlewares/multer-config');
const router = express.Router();

router.post('/', verifyToken, multer, bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/bestrating', bookController.getTopRatedBooks);
router.get('/:id', bookController.getBook);
router.put('/:id', verifyToken, bookController.updateBook);
router.post('/:id/rating', verifyToken, bookController.rateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);

module.exports = router;