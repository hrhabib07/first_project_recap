import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.studentId)) {
    throw new Error('User already exists!')
  }
  const result = await Student.create(studentData)
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.findOne({ studentId })
  return result
}

const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne({ studentId }, { isDeleted: true })
  return result
}

const updateSingleStudentFromDB = async (
  studentId: string,
  updateData: Partial<TStudent>,
) => {
  const result = await Student.findOneAndUpdate({ studentId }, updateData, {
    new: true,
  })
  return result
}
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentFromDB,
}
