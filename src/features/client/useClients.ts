import { useQuery } from '@tanstack/react-query';
import Clients from '../../services/clients';
import { useSearchParams } from 'react-router-dom';

export function useClients() {
  const [params] = useSearchParams();
  const url = new URLSearchParams(params.toString());
  const client_user_status = params.get('client_user_status') || '';
  const phone_number = params.get('phone_number') || '';
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['clients',client_user_status,phone_number],
    queryFn: () => Clients.getClients(url),
    // enabled: isOpenModal,
  });
  const clientsList = data?.client_user?.results;
  const clientsListCount = data?.number_of_client_user;

  return { isLoading, clientsList, clientsListCount, error: isError };
}
