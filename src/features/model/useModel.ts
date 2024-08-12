import { useQuery } from '@tanstack/react-query';
import Model from '../../services/model';

export function useModel(modelName: string | null) {
    
  const {
    isPending: isLoading,
    data: model,
    isError,
  } = useQuery({
    queryKey: ['model'],
    queryFn: () => Model.getModel(modelName),

    enabled: !!modelName,
  });

  return { isLoading, model, error: isError };
}
