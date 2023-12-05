import { ripples } from 'ldrs';
import 'ldrs/ripples'
ripples.register()

export const LoadingComponent = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <l-ripples size="150" speed="2" color="#314361"></l-ripples>
    </div>
  );
};