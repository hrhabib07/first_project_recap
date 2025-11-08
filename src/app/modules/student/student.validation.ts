import { z } from 'zod'

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId')
const phone = z.string().regex(/^\+?\d{10,15}$/, 'Invalid phone number')

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((v) => /^[A-Z]/.test(v), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().max(20).optional(),
  lastName: z.string().min(1).max(20),
  localNameBn: z.string().max(40).optional(),
})

const guardianValidationSchema = z.object({
  name: z.string().min(1),
  relation: z.enum([
    'father',
    'mother',
    'spouse',
    'brother',
    'sister',
    'other',
  ]),
  contactNo: phone,
})

const levelTermEnum = z.enum([
  'L1T1',
  'L1T2',
  'L1T3',
  'L2T1',
  'L2T2',
  'L2T3',
  'L3T1',
  'L3T2',
  'L3T3',
  'L4T1',
  'L4T2',
  'L4T3',
])

const statusEnum = z.enum([
  'active',
  'probation',
  'on_leave',
  'graduated',
  'expelled',
  'suspended',
  'dropped',
  'alumni',
])

const termEnum = z.enum(['Spring', 'Summer', 'Fall'])

const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
])

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      studentId: z.string().min(1).trim(),
      user: objectId.optional(),

      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().datetime().optional(),

      universityEmail: z.string().email(),
      personalEmail: z.string().email().optional(),
      contactNo: phone,

      guardian: guardianValidationSchema,

      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      profileImg: z.string().url().optional(),

      sscSchool: z.string().min(1),
      sscYear: z.string().regex(/^\d{4}$/, 'Use 4-digit year'),
      sscGPA: z.number().min(0).max(5).optional(),
      hscCollege: z.string().min(1),
      hscYear: z.string().regex(/^\d{4}$/, 'Use 4-digit year'),
      hscGroup: z.enum(['Science', 'Commerce', 'Humanities']).optional(),
      hscGPA: z.number().min(0).max(5).optional(),

      program: z.string().min(1),
      academicDepartment: z.string().min(1),
      admissionSemester: objectId,
      admissionYear: z.number().int().min(2000).max(2100).optional(),
      term: termEnum,

      currentSemester: objectId.optional(),
      currentLevelTerm: levelTermEnum.optional(),

      batch: z.string().min(1),
      section: z.enum(['A', 'B', 'C', 'D']),
      shift: z.enum(['day', 'evening']).optional(),
      rollNo: z.string().optional(),
      registrationNo: z.string().optional(),
      adviser: z.string().optional(),

      cgpa: z.number().min(0).max(4),
      completedCredits: z.number().min(0),
      enrolledCredits: z.number().min(0).optional(),

      waiverPercent: z.number().min(0).max(100).optional(),
      scholarshipName: z.string().optional(),
      isFinancialHold: z.boolean().default(false),

      status: statusEnum.default('active'),
      expectedGraduation: z.string().datetime().optional(),
      graduationDate: z.string().datetime().optional(),

      emailVerified: z.boolean().optional(),
      phoneVerified: z.boolean().optional(),
      isDeleted: z.boolean().default(false),
      deletedAt: z.string().datetime().optional(),
      deletedBy: objectId.optional(),
    }),
  }),
})

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      studentId: z.string().min(1).trim().optional(),
      user: z.string().optional(),

      name: userNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().datetime().optional(),

      universityEmail: z.string().email().optional(),
      personalEmail: z.string().email().optional(),
      contactNo: phone.optional(),

      guardian: guardianValidationSchema.optional(),

      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().url().optional(),

      sscSchool: z.string().optional(),
      sscYear: z
        .string()
        .regex(/^\d{4}$/)
        .optional(),
      sscGPA: z.number().min(0).max(5).optional(),
      hscCollege: z.string().optional(),
      hscYear: z
        .string()
        .regex(/^\d{4}$/)
        .optional(),
      hscGroup: z.enum(['Science', 'Commerce', 'Humanities']).optional(),
      hscGPA: z.number().min(0).max(5).optional(),

      program: z.string().optional(),
      academicDepartment: z.string().optional(),
      admissionSemester: objectId.optional(),
      admissionYear: z.number().int().min(2000).max(2100).optional(),
      term: termEnum.optional(),

      currentSemester: objectId.optional(),
      currentLevelTerm: levelTermEnum.optional(),

      batch: z.string().optional(),
      section: z.enum(['A', 'B', 'C', 'D']).optional(),
      shift: z.enum(['day', 'evening']).optional(),
      rollNo: z.string().optional(),
      registrationNo: z.string().optional(),
      adviser: z.string().optional(),

      cgpa: z.number().min(0).max(4).optional(),
      completedCredits: z.number().min(0).optional(),
      enrolledCredits: z.number().min(0).optional(),

      waiverPercent: z.number().min(0).max(100).optional(),
      scholarshipName: z.string().optional(),
      isFinancialHold: z.boolean().optional(),

      status: statusEnum.optional(),
      expectedGraduation: z.string().datetime().optional(),
      graduationDate: z.string().datetime().optional(),

      emailVerified: z.boolean().optional(),
      phoneVerified: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
      deletedAt: z.string().datetime().optional(),
      deletedBy: objectId.optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
