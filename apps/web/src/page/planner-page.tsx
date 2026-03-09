import { PlannerFormSection } from '../sections/planner-form/planner-form-section';
import { GenerationStatusSection } from '../sections/generation-status/generation-status-section';
import { TripResultSection } from '../sections/trip-result/trip-result-section';
import { MapSection } from '../sections/map-section/map-section';
import { usePlannerStore } from '../store/planner.store';

export function PlannerPage() {
  const { viewState, result } = usePlannerStore();

  if (viewState === 'form') {
    return (
      <main className="planner-page-modern min-h-screen bg-slate-50">
        <PlannerFormSection />
      </main>
    );
  }

  return (
    <main className="planner-page-modern min-h-screen bg-slate-50 pt-8 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 flex gap-8 items-start planner-result-shell">
        <div className="flex-1 space-y-8 planner-result-left">
          {viewState === 'result' && result ? (
            <TripResultSection result={result} />
          ) : (
            <section className="magic-card planner-generating-panel">
              <h3 className="planner-generating-title">智能体正在构建你的旅行方案</h3>
              <p className="planner-generating-desc">正在同步地图点位、预算分配和逐日行程。</p>
            </section>
          )}
        </div>

        <aside className="w-[400px] xl:w-[480px] shrink-0 planner-result-right">
          <div className="sticky top-8 space-y-6">
            <MapSection spots={result?.plan.mapSpots ?? []} />
            {viewState === 'generating' ? <GenerationStatusSection /> : null}
          </div>
        </aside>
      </div>
    </main>
  );
}
