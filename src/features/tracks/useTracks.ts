import { useQuery } from '@tanstack/react-query';
import Tracks from '../../services/tracks';
import { useSearchParams } from 'react-router-dom';

export function useTracks() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const brand = params.get('car_brand') || '';
  const model = params.get('car_model') || '';
  const company = params.get('company__name') || '';
  const phone = params.get('phone_number') || '';
  const search = params.get('search') || '';
  const created_at__gt = params.get('created_at__gt') || '';

  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['tracks', brand, model, company, phone, search,created_at__gt],
    queryFn: () => Tracks.getTracks(url),
  });

  return { isLoading, data, error: isError };
}
