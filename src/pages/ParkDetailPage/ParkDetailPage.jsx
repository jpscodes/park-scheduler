import { useLocation } from 'react-router-dom';

export default function ParkDetailPage() {
  const location = useLocation();
  console.log(location, 'location here')
  const park = location.state?.park;
  console.log(park, 'the parkkk')

  return <div>park details</div> 
}