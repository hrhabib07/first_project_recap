import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import { studentUpdateSchema } from './student.validation'

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body
//     const zodParsedData = studentValidationSchema.parse(studentData)

//     const result = await StudentServices.createStudentIntoDB(zodParsedData)

//     res.status(200).json({
//       success: true,
//       message: 'Student is created succesfully',
//       data: result,
//     })
//   } catch (err: unknown) {
//     let message = 'something went wrong'

//     if (err instanceof Error) {
//       message = err.message
//     }

//     res.status(500).json({
//       success: false,
//       message,
//       error: err,
//     })
//   }
// }

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'All students are retrived successfully.',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully.',
      data: result,
    })
  } catch (err: unknown) {
    let message = 'something went wrong'

    if (err instanceof Error) {
      message = err.message
    }

    res.status(500).json({
      success: false,
      message,
      error: err,
    })
  }
}

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const { student: updateData } = req.body
    const zodParsedData = studentUpdateSchema.parse(updateData)

    const result = await StudentServices.updateSingleStudentFromDB(
      studentId,
      zodParsedData,
    )

    res.status(200).json({
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
