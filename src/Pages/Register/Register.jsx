import { useState } from 'react'
import { Input, Select, SelectItem, Button } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../Schemas/RegisterSchema';
import { registerApi } from '../../services/authServices';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {

  const [isLoding, setIsLoding] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [succsesMsg, setSuccsesMsg] = useState('')
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: '',
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(formData) {
    setSuccsesMsg('')
    setErrorMsg('')
    setIsLoding(true)
    console.log(formData)
    const data = await registerApi(formData)
    console.log(data)
    setIsLoding(false)
    if (data.error) {
      setSuccsesMsg('')
      setErrorMsg(data)
    } else {
      reset()
      setErrorMsg('')
      setSuccsesMsg(data.message)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }


  return (
    <div className=' max-w-xl mx-auto my-16 py-10 '>
      <form onSubmit={handleSubmit(handleRegister)} className=' shadow-lg p-5 py-10 rounded-xl'>
        <div className=' flex  flex-col text-center  gap-6'>
          <h1>Register Page</h1>
          <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} variant="bordered" label="Name" type="name" {...register('name')} />
          <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} variant="bordered" label="Email" type="email" {...register('email')} />
          <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} variant="bordered" label="Password" type="password" {...register('password')} />
          <Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors.rePassword?.message} variant="bordered" label="rePassword" type="password" {...register('rePassword')} />
          <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors.dateOfBirth?.message} variant="bordered" label="Date" type="date" {...register('dateOfBirth')} />
          <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors.gender?.message} variant="bordered" label="Select an gender" {...register('gender')}>
            <SelectItem key={'male'}>Male</SelectItem>
            <SelectItem key={'female'}>Female</SelectItem>
          </Select>
          <Button isLoading={isLoding} type='submit' color="primary" variant="bordered">
            Register
          </Button>
          {errorMsg && <p className='text-sm bg-red-200 rounded-md p-2 text-red-800 text-center mt-0'>{errorMsg}</p>}
          {succsesMsg && <p className='text-sm bg-green-200 rounded-md p-2 text-green-800 text-center mt-0'>{succsesMsg}</p>}
          <p> Aurady have a count??  <Link to={'/login'} className=' text-green-900 font-medium'> Login now</Link> </p>


        </div>
      </form>
    </div>
  )
}
