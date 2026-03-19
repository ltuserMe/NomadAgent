import { PlannerFormSection } from '../sections/planner-form/planner-form-section';
import { GenerationStatusSection } from '../sections/generation-status/generation-status-section';
import { TripResultSection } from '../sections/trip-result/trip-result-section';
import { MapSection } from '../sections/map-section/map-section';
import { HeroSection } from '../sections/hero/hero-section';
import { Drawer, Grid, Spin, Typography, FloatButton } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { usePlannerStore } from '../store/planner.store';

export function PlannerPage() {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const { viewState, result, mobileMapVisible, setMobileMapVisible } = usePlannerStore();

  useEffect(() => {
    if (!isMobile && mobileMapVisible) {
      setMobileMapVisible(false);
    }
  }, [isMobile, mobileMapVisible, setMobileMapVisible]);

  if (viewState === 'form') {
    return (
      <main className="planner-page-modern planner-page-intake min-h-screen bg-[#f8fafc] flex items-start md:items-center justify-center py-6 md:py-0">
        <div className="planner-intake-shell w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 lg:gap-24 items-center md:items-start">
          <aside className="w-full md:w-5/12 lg:w-5/12 pt-0 md:pt-12">
            <HeroSection />
          </aside>
          <section className="planner-intake-form w-full md:w-7/12 lg:w-7/12">
            <PlannerFormSection />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="planner-page-modern planner-page-result min-h-screen bg-slate-50">
      <div className="planner-result-shell max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col lg:flex-row gap-6 md:gap-8">
        <div className="planner-result-main-column flex-1 min-w-0">
          {viewState === 'result' && result ? (
            <TripResultSection result={result} />
          ) : (
            <section className="magic-card planner-generating-panel flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[50vh] text-center">
              <Spin size="large" />
              <Typography.Title level={4} className="mt-6 text-slate-800">
                智能体正在构建你的旅行方案
              </Typography.Title>
              <Typography.Text type="secondary" className="text-base">
                正在同步地图点位、预算分配和逐日行程...
              </Typography.Text>
            </section>
          )}
        </div>

        {!isMobile ? (
          <aside className="planner-result-side-column planner-result-right w-full lg:w-[400px] shrink-0">
            <div className="planner-result-side-sticky sticky top-8 flex flex-col gap-6">
              <MapSection spots={result?.plan.mapSpots ?? []} />
              {viewState === 'generating' ? <GenerationStatusSection /> : null}
            </div>
          </aside>
        ) : null}
      </div>

      {isMobile ? (
        <>
          <FloatButton
            type="primary"
            icon={<EnvironmentOutlined />}
            onClick={() => setMobileMapVisible(true)}
            description="地图"
            shape="square"
            style={{ right: 24, bottom: 24, width: 60, height: 60 }}
            className="shadow-lg"
          />
          <Drawer
            placement="bottom"
            height="85vh"
            closable
            title="景点地图"
            open={mobileMapVisible}
            onClose={() => setMobileMapVisible(false)}
            className="planner-mobile-map-drawer"
            styles={{ body: { padding: 0 } }}
          >
            <MapSection spots={result?.plan.mapSpots ?? []} />
            {viewState === 'generating' ? <GenerationStatusSection /> : null}
          </Drawer>
        </>
      ) : null}
    </main>
  );
}
