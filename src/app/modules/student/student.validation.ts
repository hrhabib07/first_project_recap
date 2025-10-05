import { z } from 'zod'

const GenderEnum = z.enum(['male', 'female'])
const BloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
])
const ActiveEnum = z.enum(['active', 'blocked'])

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(20)
    .regex(/^[A-Z]/, 'First Name must start with a capital letter'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[A-Za-z]+$/u, 'Last name must contain only letters'),
})

const guardianSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
})

const localGuardianSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  address: z.string().min(1, 'Local guardian address is required'),
})

export const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  name: userNameSchema,
  password: z.string().min(1, 'Password is required'),
  gender: GenderEnum,
  bloodGroup: BloodGroupEnum.optional(), // optional in Mongoose
  isActive: ActiveEnum.default('active'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Email is not valid'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  presentAddress: z.string().min(1, 'Present address is required'),
  // Mirror the exact Mongoose key. If it's a typo there, fix both sides.
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(), // optional in Mongoose
  isDeleted: z.boolean().default(false),
})
export const updateStudentZodSchema = studentValidationSchema.partial()
export type StudentInput = z.infer<typeof studentValidationSchema>
