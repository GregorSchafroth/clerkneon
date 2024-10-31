// src/components/Calculator.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { useUser } from '@clerk/clerk-react'

const Calculator = () => {
  const clerkUser = useUser().user
  const [count, setCount] = useState(0) // State to manage the current number
  const [databaseCount, setDatabaseCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true) // Loading state

  useEffect(() => {
    const fetchDatabaseCount = () => {
      setIsLoading(true) // Start loading
      if (clerkUser?.id) {
        fetch(`/api/user/count?userId=${clerkUser.id}`)
          .then((response) => response.json())
          .then((data) => {
            setDatabaseCount(data.count)
            setCount(data.count)
          })
          .catch((error) => {
            console.error('Error fetching database count:', error)
          })
          .finally(() => {
            setIsLoading(false) // Set loading to false after fetching
          })
      }
    }
    fetchDatabaseCount()
  }, [clerkUser])

  const addOne = async () => {
    const newCount = count + 1
    setCount(newCount)
    try {
      if (clerkUser?.id) {
        await fetch(`/api/user/count?userId=${clerkUser.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: newCount, userId: clerkUser.id }), // Only pass `clerkUser.id`
        })
        setDatabaseCount(newCount)
      }
    } catch (error) {
      console.error('Error updating database count:', error)
    }
  }

  const reset = async () => {
    setCount(0)
    try {
      if (clerkUser?.id) {
        await fetch(`/api/user/count?userId=${clerkUser.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: 0, userId: clerkUser.id }), // Only pass `clerkUser.id`
        })
        setDatabaseCount(0)
      }
    } catch (error) {
      console.error('Error resetting database count:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculator</CardTitle>
        <CardDescription>can add 1 and reset</CardDescription>
      </CardHeader>
      <CardContent className='flex gap-4'>
        <Button onClick={addOne} className='flex-1'>
          +1
        </Button>
        <Button onClick={reset} variant='outline' className='flex-1'>
          {isLoading ? '...' : databaseCount}
        </Button>
      </CardContent>
    </Card>
  )
}
export default Calculator
