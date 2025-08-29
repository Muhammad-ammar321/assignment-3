import React from 'react'
import { Link } from 'react-router'

interface Course {
  courseName: string
  grade: string
}

interface Student {
  id: number
  name: string
  age: number
  major: string
  courses?: Course[]
}

const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      {/* Header */}
      <div className="mb-3">
        <Link to={`/students/${student.id}`}>
          <h2 className="text-xl font-semibold text-gray-900">
            {student.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500">
          Age {student.age} • {student.major}
        </p>
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* Courses */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Courses</h3>
        <ul className="space-y-2">
          {student.courses?.map((course, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
            >
              <span className="text-gray-700 text-sm">{course.courseName}</span>
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-blue-100 text-blue-700">
                {course.grade}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StudentCard
