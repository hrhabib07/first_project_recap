import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
  localNameBn?: string
}
export type TGuardian = {
  name: string
  relation: 'father' | 'mother' | 'spouse' | 'brother' | 'sister' | 'other'
  contactNo: string
}

export type TLevelTerm =
  | 'L1T1'
  | 'L1T2'
  | 'L1T3'
  | 'L2T1'
  | 'L2T2'
  | 'L2T3'
  | 'L3T1'
  | 'L3T2'
  | 'L3T3'
  | 'L4T1'
  | 'L4T2'
  | 'L4T3'

export type TStudentStatus =
  | 'active'
  | 'probation'
  | 'on_leave'
  | 'graduated'
  | 'expelled'
  | 'suspended'
  | 'dropped'
  | 'alumni'

export type TStudent = {
  // Identity
  studentId: string
  user: Types.ObjectId
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: Date
  universityEmail: string
  personalEmail?: string
  contactNo: string
  guardian: TGuardian
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  profileImg?: string

  // Education History
  sscSchool: string
  sscYear: string
  sscGPA?: number
  hscCollege: string
  hscYear: string
  hscGroup?: 'Science' | 'Commerce' | 'Humanities'
  hscGPA?: number

  // Academics
  program: string
  academicDepartment: string
  // program: Types.ObjectId
  // academicDepartment: Types.ObjectId
  admissionSemester: Types.ObjectId
  admissionYear?: number
  term: 'Spring' | 'Summer' | 'Fall'
  currentSemester?: Types.ObjectId
  currentLevelTerm?: TLevelTerm
  batch: string
  section: 'A' | 'B' | 'C' | 'D'
  shift?: 'day' | 'evening'
  rollNo?: string
  registrationNo?: string
  adviser?: string
  // adviser?: Types.ObjectId

  // Performance
  cgpa: number
  completedCredits: number
  enrolledCredits?: number

  // Financial
  waiverPercent?: number
  scholarshipName?: string
  isFinancialHold: boolean

  // Status
  status: TStudentStatus
  expectedGraduation?: Date
  graduationDate?: Date

  // System fields
  emailVerified?: boolean
  phoneVerified?: boolean
  isDeleted: boolean
  deletedAt?: Date
  deletedBy?: Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}

export interface StudentModel extends Model<TStudent> {
  isUserExists(studentId: string): Promise<TStudent | null>
  findByUniversityEmail(email: string): Promise<TStudent | null>
}
