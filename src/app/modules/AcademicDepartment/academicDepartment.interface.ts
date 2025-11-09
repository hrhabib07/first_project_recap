// academicDepartment.interface.ts
import { Types } from 'mongoose'
import type {
  DepartmentName,
  DepartmentShort,
  DepartmentCode,
} from './academicDepartment.constant'

export type TAcademicDepartment = {
  name: DepartmentName // Example: "English"
  shortForm: DepartmentShort // Example: "ENG"
  departmentCode: DepartmentCode // Example: "114"
  academicFaculty: Types.ObjectId // Reference
}
