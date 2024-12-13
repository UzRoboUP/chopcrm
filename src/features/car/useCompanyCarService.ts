import { useParams } from 'react-router-dom';
import Car from '../../services/car';
import { useQuery } from '@tanstack/react-query';

export function useCompanyCarService(carRate:boolean) {
  const params = useParams();

  const {
    isPending: isLoadingCompanyCarService,
    data: car_data,
    isError,
  } = useQuery({
    queryKey: ['company-car-service', params],
    queryFn: () => Car.getCompanyCarService(params?.id),
    retry: 1,
    enabled:carRate
  });

  return { isLoadingCompanyCarService, car_data, error: isError };
}
