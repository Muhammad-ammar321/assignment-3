import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import type { AppDispatch, RootState } from '../app/store'
import { fetchStudentById } from '../features/student/studentSlice'
import StudentDrawer from '../components/StudentDrawer'

const StudentDetail = () => {
  const { id } = useParams<{ id?: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const { singleStudent, loading, error } = useSelector(
    (state: RootState) => state.students
  )

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(Number(id)))
    }
  }, [id, dispatch])

  if (loading)
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-600">
        <p className="text-lg animate-pulse">Loading student details...</p>
      </div>
    )

  if (error)
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-red-500 font-medium">
        {error}
      </div>
    )

  if (!singleStudent)
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-700">
        No student found.
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white mb-10 rounded-xl border border-gray-300">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Student Details
      </h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">ID:</span>{' '}
          {singleStudent.id}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Name:</span>{' '}
          {singleStudent.name}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Age:</span>{' '}
          {singleStudent.age}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Major:</span>{' '}
          {singleStudent.major}
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Courses
      </h2>
      <ul className="space-y-2">
        {singleStudent.courses?.map((course, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-50 border rounded-lg p-3"
          >
            <span className="text-gray-700">{course.courseName}</span>
            <span className="font-semibold text-indigo-600">
              {course.grade}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition duration-300"
        >
          Back to Home
        </Link>

        <button
          onClick={() => setDrawerOpen(true)}
          className="inline-block px-6 py-2 text-indigo-600 border border-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition duration-300"
        >
          Edit
        </button>
      </div>

      {/* Drawer for editing */}
      <StudentDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        student={singleStudent}
      />
    </div>
  )
}

export default StudentDetail
