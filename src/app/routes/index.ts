import { Router } from 'express'
import { AdminRoutes } from '../modules/Admin/admin.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { CourseRoutes } from '../modules/Course/course.route'

import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.route'
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route'
import { FacultyRoutes } from '../modules/Faculty/faculty.route'
import { offeredCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route'
import { semesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.route'

import { UserRoutes } from '../modules/User/user.route'
import { studentRoutes } from '../modules/Student/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
