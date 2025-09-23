import { useContext, useState } from 'react'
import { Input, Select, SelectItem, Button } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../Schemas/LoginSchema';
import { loginApi } from '../../services/authServices';
import { useNavigate, Link } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';

export default function Login() {

  const [isLoding, setIsLoding] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(authContext)

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(formData) {
    setErrorMsg('')
    setIsLoding(true)
    const data = await loginApi(formData)
    setIsLoding(false)
    console.log(data.message)

    if (data.message == "success") {
      localStorage.setItem("token", data.token)
      setIsLoggedIn(true);
      console.log(data.token)
      navigate('/')
    } else {
      setErrorMsg(data)
      console.log(data)
    }
  }


  return (
    <div className=' max-w-xl mx-auto my-16 py-10 '>
      <form onSubmit={handleSubmit(handleLogin)} className=' shadow-lg p-5 py-10 rounded-xl'>
        <div className=' flex  flex-col text-center  gap-6'>
          <h1>Login Page</h1>
          <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} variant="bordered" label="Email" type="email" {...register('email')} />
          <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} variant="bordered" label="Password" type="password" {...register('password')} />

          <Button isLoading={isLoding} type='submit' color="primary" variant="bordered">
            Login
          </Button>
          {errorMsg && <p className='text-sm bg-red-200 rounded-md p-2 text-red-800 text-center mt-0'>{errorMsg}</p>}
          <p>U don't have a count??  <Link to={'/rigister'} className=' text-green-900 font-medium'> craet acount now</Link> </p>
        </div>
      </form>
    </div>
  )
}
