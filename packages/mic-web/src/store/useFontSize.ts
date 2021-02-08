import { useSharedState } from '@/hooks/useSharedState';

export function useFontSize() {
  return useSharedState('fontSize', 10);
}
