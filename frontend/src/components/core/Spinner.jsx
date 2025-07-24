import { LoaderCircle } from 'lucide-react';

const Spinner = ({ size = 'h-12 w-12' }) => {
  return <LoaderCircle className={`animate-spin text-blue-600 ${size}`} />;
};

export default Spinner;