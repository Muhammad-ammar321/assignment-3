import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { fetchStudents } from '../features/student/studentSlice'
import Button from './Button'
import StudentCard from './StudentCard'
import StudentDrawer from './StudentDrawer'

const StudentsList: React.FC = () => {
  const { studentList, error, loading } = useSelector(
    (state: RootState) => state.students
  )
  const dispatch = useDispatch<AppDispatch>()

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    )
  }

  if (error)
    return (
      <p className="text-red-500 text-2xl min-h-screen flex justify-center items-center">
        Error: {error}
      </p>
    )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Students Result</h1>
        <Button variant="outline" onClick={() => setDrawerOpen(true)}>
          Add New Student
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studentList.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      <StudentDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}

export default StudentsList
