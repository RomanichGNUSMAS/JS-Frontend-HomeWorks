const { UserController } = require('../controllers/users.controller');
const { UserMiddleware } = require('../middlewares/user.middleware');

const userRouter = require('express').Router();

userRouter.post('/add', UserMiddleware.checkFields, UserController.add)
userRouter.delete('/remove/:id',UserMiddleware.checkId,UserController.remove)
userRouter.put('/update/:id',UserMiddleware.checkId,UserController.update)
userRouter.get('/all',UserController.all)

exports.userRouter = userRouter;