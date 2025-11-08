import { Schema, model } from 'mongoose'
import {
  StudentModel,
  TGuardian,
  TLevelTerm,
  TStudent,
  TStudentStatus,
  TUserName,
} from './student.interface'

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxlength: [20, 'First name cannot be more than 20 characters'],
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [20, 'Middle name cannot be more than 20 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      trim: true,
      maxlength: [20, 'Last name cannot be more than 20 characters'],
    },
    localNameBn: {
      type: String,
      trim: true,
      maxlength: [40, 'Local (Bangla) name cannot be more than 40 characters'],
    },
  },
  { _id: false },
)

const guardianSchema = new Schema<TGuardian>(
  {
    name: {
      type: String,
      required: [true, 'Guardian name is required'],
      trim: true,
    },
    relation: {
      type: String,
      enum: ['father', 'mother', 'spouse', 'brother', 'sister', 'other'],
      required: [true, 'Guardian relation is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Guardian contact number is required'],
      trim: true,
    },
  },
  { _id: false },
)

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    // Identity
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
      unique: true,
      index: true,
    },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },

    universityEmail: {
      type: String,
      required: [true, 'University email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    personalEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },

    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },

    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },

    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
      trim: true,
    },
    profileImg: { type: String, trim: true },

    // Education History
    sscSchool: {
      type: String,
      required: [true, 'SSC school is required'],
      trim: true,
    },
    sscYear: {
      type: String,
      required: [true, 'SSC year is required'],
      trim: true,
    },
    sscGPA: { type: Number, min: 0, max: 5 },
    hscCollege: {
      type: String,
      required: [true, 'HSC college is required'],
      trim: true,
    },
    hscYear: {
      type: String,
      required: [true, 'HSC year is required'],
      trim: true,
    },
    hscGroup: { type: String, enum: ['Science', 'Commerce', 'Humanities'] },
    hscGPA: { type: Number, min: 0, max: 5 },

    // Academics
    program: {
      type: String,
      required: [true, 'Program is required'],
      trim: true,
    }, // string for now
    academicDepartment: {
      type: String,
      required: [true, 'Academic department is required'],
      trim: true,
    }, // string for now
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      index: true,
    },
    admissionYear: { type: Number, min: 2000, max: 2100 },
    term: { type: String, enum: ['Spring', 'Summer', 'Fall'], required: true },

    currentSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    currentLevelTerm: {
      type: String,
      enum: [
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
      ] as TLevelTerm[],
    },

    batch: { type: String, required: [true, 'Batch is required'], trim: true },
    section: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
    shift: { type: String, enum: ['day', 'evening'] },
    rollNo: { type: String, trim: true },
    registrationNo: { type: String, trim: true },
    adviser: { type: String, trim: true }, // string for now

    // Performance
    cgpa: { type: Number, required: true, min: 0, max: 4 },
    completedCredits: { type: Number, required: true, min: 0 },
    enrolledCredits: { type: Number, min: 0 },

    // Financial
    waiverPercent: { type: Number, min: 0, max: 100 },
    scholarshipName: { type: String, trim: true },
    isFinancialHold: { type: Boolean, default: false },

    // Status
    status: {
      type: String,
      enum: [
        'active',
        'probation',
        'on_leave',
        'graduated',
        'expelled',
        'suspended',
        'dropped',
        'alumni',
      ] as TStudentStatus[],
      default: 'active',
      index: true,
    },
    expectedGraduation: { type: Date },
    graduationDate: { type: Date },

    // System fields
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// ---------- Virtuals ----------
studentSchema.virtual('fullName').get(function (this: TStudent) {
  const parts = [
    this.name?.firstName,
    this.name?.middleName,
    this.name?.lastName,
  ].filter(Boolean)
  return parts.join(' ')
})

// ---------- Indexes ----------
studentSchema.index({ academicDepartment: 1, batch: 1, section: 1 })
studentSchema.index(
  { personalEmail: 1 },
  {
    unique: true,
    partialFilterExpression: {
      personalEmail: { $type: 'string' },
      isDeleted: false,
    },
  },
)

// ---------- Query Middleware: soft-delete default filter ----------
studentSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// ---------- Statics ----------
studentSchema.statics.isUserExists = function (studentId: string) {
  return this.findOne({ studentId, isDeleted: false })
}

studentSchema.statics.findByUniversityEmail = function (email: string) {
  return this.findOne({
    universityEmail: String(email).toLowerCase(),
    isDeleted: false,
  })
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
