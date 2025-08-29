import { LoaderCircle } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import type { AppDispatch } from '../app/store'
import Button from '../components/Button'
import DummyLogo from '../components/DummyLogo'
import Input from '../components/Input'
import { login } from '../features/auth/authSlice'

function Login() {
  let navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [showLoader, setShowLoader] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    let newErrors = { email: '', password: '' }

    if (!user.email.trim()) {
      newErrors.email = 'Please enter a valid email.'
    }

    if (!user.password.trim()) {
      newErrors.password = 'Password cannot be empty.'
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }
    setShowLoader(true)
    dispatch(login({ email: user.email, password: user.password }))
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <DummyLogo />
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
          Login to My App
        </h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            type="email"
            label="Email"
            name="email"
            placeholder="Please enter your email"
            value={user.email}
            onChange={handleChange}
          />
          <div>
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Please enter your password"
              value={user.password}
              onChange={handleChange}
            />
            {/* Forgot Password Link */}
            <div className="mb-4 text-right">
              <a
                href="javascript:void(0)"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <Button disabled={showLoader} type="submit">
            {showLoader ? (
              <LoaderCircle className="animate-spin" color="#fff" />
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
        {/* Sign-up Link */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">New here? </span>
          <a
            href="javascript:void(0)"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
