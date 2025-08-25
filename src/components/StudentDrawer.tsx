import { Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { addNewStudent } from '../features/student/studentSlice'
import Button from './Button'
import Drawer from './Drawer'
import Input from './Input'

interface StudentDrawerProps {
  open: boolean
  onClose: () => void
}

const StudentDrawer: React.FC<StudentDrawerProps> = ({ open, onClose }) => {
  const { addLoading } = useSelector((state: RootState) => state.students)
  const dispatch = useDispatch<AppDispatch>()

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    major: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('fromData', formData)
    dispatch(addNewStudent(formData))
    onClose()
    setFormData({ name: '', age: '', major: '' })
  }

  return (
    <Drawer isOpen={open} onClose={onClose} title="Add New Student">
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
          placeholder="Enter student Age"
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
          <Button type="submit" disabled={addLoading}>
            {addLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default StudentDrawer
