import mongoose, { Types } from 'mongoose'
import { z } from 'zod'

// ---------- Reuse from your create schema ----------
const objectIdSchema = z
  .union([
    z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
    z.instanceof(mongoose.Types.ObjectId),
  ])
  .transform((v) => (typeof v === 'string' ? new Types.ObjectId(v) : v))

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string().min(1).max(20),
})

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

// ---------- Your create schema (for reference) ----------
export const studentValidationSchema = z.object({
  id: z.string(),
  user: objectIdSchema,
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  isDeleted: z.boolean().default(false),
})
export type StudentCreateInput = z.output<typeof studentValidationSchema>

// ---------- UPDATE (PATCH) schema ----------
// All top-level fields optional; nested objects are partially updatable.
export const studentUpdateSchema = z
  .object({
    // If you want to **allow** changing these, keep as below.
    // If you want to **forbid** changes, see "Immutable fields" variant further down.
    id: z.string().optional(),
    user: objectIdSchema.optional(),

    name: userNameSchema.partial().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: guardianSchema.partial().optional(),
    localGuardian: localGuardianSchema.partial().optional(),
    profileImg: z.string().optional(),
    isDeleted: z.boolean().optional(), // or omit to prevent external toggling
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })

export type StudentUpdateInput = z.input<typeof studentUpdateSchema>
export type StudentUpdateOutput = z.output<typeof studentUpdateSchema>

// ---------- OPTIONAL: Immutable fields variant ----------
// If you do NOT want clients to change `id` and `user`, use this instead:
// export const studentUpdateSchema = z
//   .object({
//     id: z.never({ message: "id is immutable" }).optional(),
//     user: z.never({ message: "user is immutable" }).optional(),
//     name: userNameSchema.partial().optional(),
//     gender: z.enum(["male", "female", "other"]).optional(),
//     dateOfBirth: z.string().optional(),
//     email: z.string().email().optional(),
//     contactNo: z.string().optional(),
//     emergencyContactNo: z.string().optional(),
//     bloodGroup: z
//       .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
//       .optional(),
//     presentAddress: z.string().optional(),
//     permanentAddress: z.string().optional(),
//     guardian: guardianSchema.partial().optional(),
//     localGuardian: localGuardianSchema.partial().optional(),
//     profileImg: z.string().optional(),
//     isDeleted: z.boolean().optional(),
//   })
//   .refine((data) => Object.keys(data).length > 0, {
//     message: "At least one field must be provided for update",
//   });
