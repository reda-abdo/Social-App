import { addToast, Button } from '@heroui/react'
import React from 'react'

export default function PrpfilePage() {

  function showtost() {
    addToast({
      title: "dfdfd",
      timeout: 5000,
      color: "success"
    })
  }


  return (
    <div>
      <h1> Prpfile Page</h1>
      <Button onPress={showtost}>dfff</Button>
      <h1> Prpfile Page</h1>
    </div>
  )
}
