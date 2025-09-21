import { Loader2 } from 'lucide-react'
import { useState, useEffect, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { addNewStudent, updateStudent } from '../features/student/studentSlice'
import Button from './Button'
import Drawer from './Drawer'
import Input from './Input'

interface StudentDrawerProps {
  open: boolean
  onClose: () => void
  student?: { id: number; name: string; age: number | string; major: string }
}

const StudentDrawer: React.FC<StudentDrawerProps> = ({ open, onClose, student }) => {
  const { addLoading, loading } = useSelector((state: RootState) => state.students)
  const dispatch = useDispatch<AppDispatch>()

  const [formData, setFormData] = useState({
    name: '',
    age:'' ,
    major: '',
  })

  // Prefill form when editing
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        age: String(student.age),
        major: student.major,
      })
    } else {
      setFormData({ name: '', age: '', major: '' })
    }
  }, [student, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (student) {
      // Editing existing student
      dispatch(
        updateStudent({
          id: student.id,
          name: formData.name,
          age: Number(formData.age), 
          major: formData.major,
        })
      )
    } else {
      // Adding new student
      dispatch(
        addNewStudent({
          name: formData.name,
          age: Number(formData.age), 
          major: formData.major,
        })
      )
    }

    onClose()
  }

  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title={student ? 'Edit Student' : 'Add New Student'}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          placeholder="Enter student name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Age"
          name="age"
          type="number"
          placeholder="Enter student age"
          value={formData.age}
          onChange={handleChange}
        />
        <Input
          label="Major"
          name="major"
          placeholder="Enter major"
          value={formData.major}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={addLoading || loading}>
            {(addLoading || loading) ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : student ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default StudentDrawer
