import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from 'react-redux';
import { AppDispatch, RootState } from '.';

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
