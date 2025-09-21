import React from 'react'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import { deleteStudent } from '../features/student/studentSlice'
import Button from './Button'

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

interface StudentCardProps {
  student: Student
  onEdit?: (student: Student) => void // NEW
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      dispatch(deleteStudent(student.id))
    }
  }

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

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-4">
        {onEdit && (
          <Button  onClick={() => onEdit(student)}>
            Edit
          </Button>
        )}
        <Button  onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default StudentCard
