/* eslint-disable @typescript-eslint/no-explicit-any */
// academicDepartment.model.ts
import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'

export const DEPARTMENT_INFO = {
  English: { shortForm: 'ENG', code: '114' },
  Economics: { shortForm: 'ECO', code: '111' },
  Law: { shortForm: 'LLB', code: '113' },
  BusinessAdministration: { shortForm: 'BBA', code: '116' },
  ComputerScience: { shortForm: 'CSE', code: '115' },
  SoftwareEngineering: { shortForm: 'SWE', code: '134' },
  ElectricalEngineering: { shortForm: 'EEE', code: '141' },
} as const

type DepartmentName = keyof typeof DEPARTMENT_INFO
const NAME_ENUM = Object.keys(DEPARTMENT_INFO) as DepartmentName[]
const SHORT_ENUM = Object.values(DEPARTMENT_INFO).map((v) => v.shortForm)
const CODE_ENUM = Object.values(DEPARTMENT_INFO).map((v) => v.code)

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: NAME_ENUM,
      trim: true,
    },
    shortForm: {
      type: String,
      required: true,
      unique: true,
      enum: SHORT_ENUM,
      trim: true,
    },
    departmentCode: {
      type: String,
      required: true,
      unique: true,
      enum: CODE_ENUM,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true },
)

/**
 * Enforce the trio mapping:
 *   name => shortForm => departmentCode
 */
academicDepartmentSchema.pre('validate', function (next) {
  const self = this as any
  const info = DEPARTMENT_INFO[self.name as DepartmentName]
  if (!info) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `Invalid department name: ${self.name}`,
      ),
    )
  }
  if (self.shortForm !== info.shortForm) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `shortForm must be "${info.shortForm}" for "${self.name}".`,
      ),
    )
  }
  if (self.departmentCode !== info.code) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `departmentCode must be "${info.code}" for "${self.name}".`,
      ),
    )
  }
  next()
})

/**
 * Existence checks (your originals), but with better status codes.
 * Note: you already have unique indexes; these checks are optional.
 */
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.exists({ name: this.name })
  if (isDepartmentExist) {
    return next(
      new AppError(httpStatus.CONFLICT, 'This department already exists!'),
    )
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const doc = await AcademicDepartment.findOne(query)
  if (!doc) {
    return next(
      new AppError(httpStatus.NOT_FOUND, 'This department does not exist!'),
    )
  }

  // If someone updates name/shortForm/departmentCode, re-verify mapping
  const update: any = this.getUpdate() || {}
  const nextName = update.name ?? doc.name
  const nextShort = update.shortForm ?? doc.shortForm
  const nextCode = update.departmentCode ?? doc.departmentCode

  const info = DEPARTMENT_INFO[nextName as DepartmentName]
  if (!info) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `Invalid department name: ${nextName}`,
      ),
    )
  }
  if (nextShort !== info.shortForm) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `shortForm must be "${info.shortForm}" for "${nextName}".`,
      ),
    )
  }
  if (nextCode !== info.code) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `departmentCode must be "${info.code}" for "${nextName}".`,
      ),
    )
  }

  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
