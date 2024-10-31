import Calculator from '@/components/Calculator';
import Header from '@/components/Header';
import { SignedIn } from '@clerk/nextjs';

const Page = () => {
  

  return (
    <div className='inline-flex flex-col gap-4 m-4'>
      <Header />
      <SignedIn>
        <Calculator />
      </SignedIn>
    </div>
  );
};

export default Page;
