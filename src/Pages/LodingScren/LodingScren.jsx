import { Spinner } from '@heroui/react'
import React from 'react'

export default function LodingScren() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
       <Spinner color="primary" />
    </div>
  )
}
