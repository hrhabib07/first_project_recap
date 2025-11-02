import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// will call controller function
// router.post('/create-student', StudentController.createStudent)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)
// router.patch('/:studentId', StudentControllers.updateStudent)
router.get('/', StudentControllers.getAllStudents)

export const studentRoutes = router
