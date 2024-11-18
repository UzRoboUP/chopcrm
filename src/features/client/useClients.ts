import { useQuery } from '@tanstack/react-query';
import Clients from '../../services/clients';

export function useClients({ isOpenModal }: { isOpenModal: boolean }) {
  const {
    isPending: isLoading,
    data,
    isError,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: () => Clients.getClients(),
    enabled: isOpenModal,
  });
  const clientsList = data?.client_user?.results;
  return { isLoading, clientsList, error: isError };
}
