import express from 'express'
import blogRouter from './blogRouter.js'

const router = express.Router()
router.use('/', blogRouter)

export default router