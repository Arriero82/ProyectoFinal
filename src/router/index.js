import productsController from '../controllers/products.controller.js'
import cartsController from '../controllers/carts.controller.js'
import messageController from '../controllers/messages.controller.js'
import usersController from '../controllers/users.controller.js'
import viewsTemplateController from '../controllers/viewsTemplate.controller.js'
import authController from '../controllers/controller.auth.js'
import mockController from '../controllers/mock.controller.js'
import mockTestController from '../controllers/mockTest.controller.js'
import loggerTest from '../controllers/logger.controller.js'
import mailController from '../controllers/mail.controller.js'

const router = (app) => {
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
    app.use('/', messageController)
    app.use('/api/users', usersController)
    app.use('/', viewsTemplateController)
    app.use('/api/auth', authController)
    app.use('/mockingproducts', mockController)
    app.use('/test', mockTestController)
    app.use('/loggerTest', loggerTest)
    app.use('/mail', mailController)
}

export default router

