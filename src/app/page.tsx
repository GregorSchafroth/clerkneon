'use client'

import { useState } from 'react'; // Import useState
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Page = () => {
  const [count, setCount] = useState(0); // State to manage the current number

  // Function to add 1
  const addOne = () => {
    setCount(count + 1);
  };

  // Function to subtract 1
  const subtractOne = () => {
    setCount(count - 1);
  };

  return (
    <div className='m-5'>
      <Card className='inline-flex flex-col'>
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
          <CardDescription>can add 1 and subtract 1</CardDescription>
        </CardHeader>
        <CardContent className='flex gap-4'>
          <Button onClick={addOne}>+1</Button>
          <Button onClick={subtractOne}>-1</Button>
          <Button variant="outline">{count}</Button> {/* Display the current count */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
