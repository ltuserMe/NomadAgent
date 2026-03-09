import { HeroSection } from '../sections/hero/hero-section';
import { PlannerFormSection } from '../sections/planner-form/planner-form-section';
import { GenerationStatusSection } from '../sections/generation-status/generation-status-section';
import { TripResultSection } from '../sections/trip-result/trip-result-section';
import { usePlannerStore } from '../store/planner.store';

export function PlannerPage() {
  const { viewState, result } = usePlannerStore();

  return (
    <main className="planner-page min-h-screen flex flex-col">
      {viewState !== 'result' && <HeroSection />}

      <div className="flex-1 w-full">
        {viewState === 'form' && <PlannerFormSection />}
        {viewState === 'generating' && <GenerationStatusSection />}
        {viewState === 'result' && result && <TripResultSection result={result} />}
      </div>
    </main>
  );
}
