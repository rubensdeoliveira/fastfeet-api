import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import authMiddleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import RecipientController from './app/controllers/RecipientController'
import FileController from './app/controllers/FileController'
import DeliverymanController from './app/controllers/DeliverymanController'
import DeliverymanDeliveriesController from './app/controllers/DeliverymanDeliveriesController'
import DeliveryController from './app/controllers/DeliveryController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.get('/deliveryman/:id/deliveries', DeliverymanDeliveriesController.index)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.post('/recipients', RecipientController.store)
routes.put('/recipients/:id', RecipientController.update)

routes.post('/files', upload.single('file'), FileController.store)

routes.get('/deliverymans', DeliverymanController.index)
routes.post('/deliverymans', DeliverymanController.store)
routes.put('/deliverymans/:id', DeliverymanController.update)
routes.delete('/deliverymans/:id', DeliverymanController.delete)

routes.get('/deliveries', DeliveryController.index)
routes.post('/deliveries', DeliveryController.store)
routes.put('/deliveries/:id', DeliveryController.update)
routes.delete('/deliveries/:id', DeliveryController.delete)

export default routes
