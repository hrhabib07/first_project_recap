// academicDepartment.service.ts
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'
import { AcademicDepartmentSearchableFields } from './academicDepartmets.constant'
import { DEPARTMENT_INFO } from './academicDepartment.model' // same single source of truth

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // (Optional) auto-fill shortForm & code if client only sends name
  const info = DEPARTMENT_INFO[payload.name as keyof typeof DEPARTMENT_INFO]
  if (!info) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Invalid department name: ${payload.name}`,
    )
  }

  const doc = await AcademicDepartment.create({
    ...payload,
    shortForm: payload.shortForm ?? info.shortForm,
    departmentCode: payload.departmentCode ?? info.code,
  })

  return doc
}

const getAllAcademicDepartmentsFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await academicDepartmentQuery.modelQuery.lean()
  const meta = await academicDepartmentQuery.countTotal()

  return { meta, result }
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty')
  return result // controller will 404 if null
}

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  // (Optional) when name changes but short/code not provided, auto-derive
  const update: Partial<TAcademicDepartment> = { ...payload }
  if (payload.name) {
    const info = DEPARTMENT_INFO[payload.name as keyof typeof DEPARTMENT_INFO]
    if (!info) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Invalid department name: ${payload.name}`,
      )
    }
    update.shortForm = payload.shortForm ?? info.shortForm
    update.departmentCode = payload.departmentCode ?? info.code
  }

  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    update,
    {
      new: true,
      runValidators: true, // 🔑 ensure enum & custom validators run
      context: 'query', // helps some validators/hooks in updates
    },
  ).populate('academicFaculty')

  return result // controller will 404 if null
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
}
