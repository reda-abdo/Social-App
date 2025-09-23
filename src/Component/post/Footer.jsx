import { useContext } from 'react'
import { CounterContext } from '../../contexts/counterContext'
 

export default function Footer() {

    const {counter}= useContext(CounterContext)
  return <>
  

  
 <div className='bg-gray-400 py-10 text-center '>
  <h1> footer{counter}</h1>
 </div>

  </>
}
