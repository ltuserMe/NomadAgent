import { PlannerFormSection } from '../sections/planner-form/planner-form-section';
import { GenerationStatusSection } from '../sections/generation-status/generation-status-section';
import { TripResultSection } from '../sections/trip-result/trip-result-section';
import { MapSection } from '../sections/map-section/map-section';
import { HeroSection } from '../sections/hero/hero-section';
import { Button, Drawer, Grid } from 'antd';
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
      <main className="planner-page-modern planner-page-intake min-h-screen bg-slate-50">
        <div className="planner-intake-shell">
          {/* <aside className="planner-intake-overview">
           
           
           
          </aside> */}
            <HeroSection />
             {/* <section className="magic-card planner-intake-guide">
              <h3 className="planner-intake-guide-title">3 步生成可执行行程</h3>
              <ol className="planner-intake-guide-list">
                <li>选择目的地和出行日期</li>
                <li>设置预算、偏好与补充要求</li>
                <li>一键生成逐日路线、预算与地图</li>
              </ol>
            </section> */}
          <section className="planner-intake-form">
            <PlannerFormSection />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="planner-page-modern planner-page-result min-h-screen bg-slate-50">
      <div className="planner-result-shell">
        <div className="planner-result-main-column">
          {viewState === 'result' && result ? (
            <TripResultSection result={result} />
          ) : (
            <section className="magic-card planner-generating-panel">
              <h3 className="planner-generating-title">智能体正在构建你的旅行方案</h3>
              <p className="planner-generating-desc">正在同步地图点位、预算分配和逐日行程。</p>
            </section>
          )}
        </div>

        {!isMobile ? (
          <aside className="planner-result-side-column planner-result-right">
            <div className="planner-result-side-sticky">
              <MapSection spots={result?.plan.mapSpots ?? []} />
              {viewState === 'generating' ? <GenerationStatusSection /> : null}
            </div>
          </aside>
        ) : null}
      </div>

      {isMobile ? (
        <>
          <Button
            type="primary"
            icon={<EnvironmentOutlined />}
            className="planner-mobile-map-trigger"
            onClick={() => setMobileMapVisible(true)}
          >
            查看地图
          </Button>
          <Drawer
            placement="bottom"
            height="78vh"
            closable
            title="景点地图"
            open={mobileMapVisible}
            onClose={() => setMobileMapVisible(false)}
            className="planner-mobile-map-drawer"
          >
            <MapSection spots={result?.plan.mapSpots ?? []} />
            {viewState === 'generating' ? <GenerationStatusSection /> : null}
          </Drawer>
        </>
      ) : null}
    </main>
  );
}
