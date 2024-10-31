import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import { Card, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

const Header = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center'>
          <SignedOut>
            <div className='flex gap-4'>
              <Button className='flex-1' asChild>
                <SignInButton />
              </Button>
              <Button className='flex-1' asChild>
                <SignUpButton />
              </Button>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-20 w-20',
                  userButtonTrigger: 'p-0.5',
                },
              }}
            />
          </SignedIn>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
export default Header
