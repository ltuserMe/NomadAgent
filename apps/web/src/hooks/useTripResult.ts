import { usePlannerStore } from '../store/planner.store';

export function useTripResult() {
  const { result, selectedDay, setSelectedDay, highlightedSpotId, setHighlightedSpotId } =
    usePlannerStore();

  return {
    result,
    selectedDay,
    setSelectedDay,
    highlightedSpotId,
    setHighlightedSpotId,
  };
}
