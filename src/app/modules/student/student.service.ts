import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!')
  }
  const result = await Student.create(studentData)
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

const updateSingleStudentFromDB = async (
  id: string,
  updateData: Partial<TStudent>,
) => {
  const result = await Student.findOneAndUpdate({ id }, updateData, {
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
