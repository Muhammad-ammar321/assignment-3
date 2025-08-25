import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { API_URI } from '../../config/api'

interface Student {
  id: number
  name: string
  age: number
  major: string
  courses?: { courseName: string; grade: string }[]
}

export interface StudentsState {
  studentList: Student[]
  loading: boolean
  error: string
  addLoading: boolean
}

interface NewStudentData {
  name: string
  age: string
  major: string
}

const initialState: StudentsState = {
  studentList: [],
  loading: false,
  error: '',
  addLoading: false,
}

export const fetchStudents = createAsyncThunk(
  'fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URI}/students`)
      if (!res.ok) {
        return rejectWithValue('Failed to fetch students')
      }
      const data = await res.json()
      return data.data.students
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unexpected error')
    }
  }
)

export const addNewStudent = createAsyncThunk(
  'addNewStudent',
  async (student: NewStudentData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URI}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })

      if (!res.ok) {
        return rejectWithValue('Failed to add student')
      }

      const data = await res.json()
      console.log('data', data)

      return data.data.newStudent
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unexpected error')
    }
  }
)

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false
          state.studentList = action.payload
        }
      )
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Error in fetch data'
      })
      .addCase(addNewStudent.pending, (state) => {
        state.addLoading = true
        state.error = ''
      })
      .addCase(
        addNewStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          console.log('addNewStudent', action.payload)
          state.addLoading = false
          state.studentList.push(action.payload)
        }
      )
      .addCase(addNewStudent.rejected, (state, action) => {
        state.addLoading = false
        state.error = (action.payload as string) || 'Error in post data'
      })
  },
})

export const {} = studentSlice.actions

export default studentSlice.reducer
