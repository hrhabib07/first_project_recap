// academicDepartment.validation.ts
import { z } from 'zod'
import { DEPARTMENT_INFO } from './academicDepartment.constant'

const NameEnum = z.enum(Object.keys(DEPARTMENT_INFO) as [string, ...string[]])
const ShortEnum = z.enum(
  Object.values(DEPARTMENT_INFO).map((v) => v.shortForm) as [
    string,
    ...string[],
  ],
)
const CodeEnum = z.enum(
  Object.values(DEPARTMENT_INFO).map((v) => v.code) as [string, ...string[]],
)

const checkMatching = (
  ctx: z.RefinementCtx,
  name?: string,
  shortForm?: string,
  code?: string,
) => {
  if (!name) return
  const expected = DEPARTMENT_INFO[name as keyof typeof DEPARTMENT_INFO]

  if (shortForm && shortForm !== expected.shortForm) {
    ctx.addIssue({
      path: ['body', 'shortForm'],
      code: z.ZodIssueCode.custom,
      message: `shortForm must be "${expected.shortForm}" for "${name}"`,
    })
  }

  if (code && code !== expected.code) {
    ctx.addIssue({
      path: ['body', 'departmentCode'],
      code: z.ZodIssueCode.custom,
      message: `departmentCode must be "${expected.code}" for "${name}"`,
    })
  }
}

export const createAcademicDepartmentValidationSchema = z
  .object({
    body: z.object({
      name: NameEnum,
      shortForm: ShortEnum,
      departmentCode: CodeEnum,
      academicFaculty: z.string({ error: 'Faculty id must be a string' }),
    }),
  })
  .superRefine((data, ctx) => {
    const { name, shortForm, departmentCode } = data.body
    checkMatching(ctx, name, shortForm, departmentCode)
  })

export const updateAcademicDepartmentValidationSchema = z
  .object({
    body: z.object({
      name: NameEnum.optional(),
      shortForm: ShortEnum.optional(),
      departmentCode: CodeEnum.optional(),
      academicFaculty: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    const { name, shortForm, departmentCode } = data.body
    checkMatching(ctx, name, shortForm, departmentCode)
  })

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
}
