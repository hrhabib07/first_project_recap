import express from 'express'
import { StudentController } from './student.controller'

const router = express.Router()

// will call controller function
router.post('/create-student', StudentController.createStudent)
router.get('/:studentId', StudentController.getSingleStudent)
router.delete('/:studentId', StudentController.deleteStudent)
router.patch('/:studentId', StudentController.updateStudent)
router.get('/', StudentController.getAllStudents)

export const studentRoutes = router
