// academicDepartment.constant.ts
export const DEPARTMENT_INFO = {
  English: { shortForm: 'ENG', code: '114' },
  Economics: { shortForm: 'ECO', code: '111' },
  Law: { shortForm: 'LLB', code: '113' },
  BusinessAdministration: { shortForm: 'BBA', code: '116' },
  ComputerScience: { shortForm: 'CSE', code: '115' },
  SoftwareEngineering: { shortForm: 'SWE', code: '134' },
  ElectricalEngineering: { shortForm: 'EEE', code: '141' },
} as const

export type DepartmentName = keyof typeof DEPARTMENT_INFO
export type DepartmentShort =
  (typeof DEPARTMENT_INFO)[DepartmentName]['shortForm']
export type DepartmentCode = (typeof DEPARTMENT_INFO)[DepartmentName]['code']
