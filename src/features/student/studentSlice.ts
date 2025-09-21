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
  singleStudent: Student | null
  loading: boolean
  error: string
  addLoading: boolean
}

interface NewStudentData {
  name: string
  age: number
  major: string
}

interface UpdateStudentData {
  id: number
  name: string
  age: number
  major: string
}

const initialState: StudentsState = {
  studentList: [],
  singleStudent: null,
  loading: false,
  error: '',
  addLoading: false,
}

export const fetchStudents = createAsyncThunk(
  'fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URI}/students`)
      if (!res.ok) return rejectWithValue('Failed to fetch students')
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      })
      if (!res.ok) return rejectWithValue('Failed to add student')
      const data = await res.json()
      return data.data.newStudent
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unexpected error')
    }
  }
)

export const fetchStudentById = createAsyncThunk(
  'fetchStudentById',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URI}/students/${id}`)
      if (!res.ok) return rejectWithValue('Failed to fetch student')
      const data = await res.json()
      return data.data.student
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unexpected error')
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'deleteStudent',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URI}/students/${id}`, { method: 'DELETE' })
      if (!res.ok) return rejectWithValue('Failed to delete student')
      return id
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unexpected error')
    }
  }
)

export const updateStudent = createAsyncThunk(
  "updateStudent",
  async (student: UpdateStudentData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URI}/students/${student.id}`, {
        method: "PATCH", // ✅ backend doesn’t allow PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: student.name,
          age: student.age,
          major: student.major,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Update failed:", res.status, errorText);
        return rejectWithValue(`Failed to update student: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.data?.student) return data.data.student;
      if (data.data?.updatedStudent) return data.data.updatedStudent;

      // fallback: return whole response
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unexpected error");
    }
  }
);



export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.loading = false
        state.studentList = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Error in fetch data'
      })
      // Add
      .addCase(addNewStudent.pending, (state) => {
        state.addLoading = true
        state.error = ''
      })
      .addCase(addNewStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.addLoading = false
        state.studentList.push(action.payload)
      })
      .addCase(addNewStudent.rejected, (state, action) => {
        state.addLoading = false
        state.error = (action.payload as string) || 'Error in post data'
      })
      // Fetch by id
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchStudentById.fulfilled, (state, action: PayloadAction<Student>) => {
        state.loading = false
        state.singleStudent = action.payload
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Error in fetch single student'
      })
      // Delete
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false
        state.studentList = state.studentList.filter(s => s.id !== action.payload)
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Error deleting student'
      })
      // Update
      .addCase(updateStudent.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(updateStudent.fulfilled, (state, action: PayloadAction<Student | any>) => {
        state.loading = false;
        if (!action.payload?.id) return;
        state.studentList = state.studentList.map(s =>
          s.id === action.payload.id ? action.payload : s
        );
      })

      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Error updating student'
      })
  },
})

export default studentSlice.reducer
