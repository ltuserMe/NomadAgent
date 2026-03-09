import { Button, Card, Space, Typography } from 'antd';
import { EditOutlined, ExportOutlined, ReloadOutlined } from '@ant-design/icons';
import type { GeneratePlanResponse } from '@travel/shared';
import { useAnchorScroll } from '../../hooks/useAnchorScroll';
import { useGeneratePlan } from '../../hooks/useGeneratePlan';
import { BudgetSummarySection } from '../budget-summary/budget-summary-section';
import { DayPlanSection } from '../day-plan-section/day-plan-section';
import { MapSection } from '../map-section/map-section';
import { TripOverviewSection } from '../trip-overview/trip-overview-section';

const { Paragraph, Title } = Typography;

type Props = {
  result: GeneratePlanResponse;
};

export function TripResultSection({ result }: Props) {
  const { scrollTo } = useAnchorScroll();
  const { backToForm } = useGeneratePlan();

  return (
    <section className="planner-result">
      <div className="planner-result-grid">
        <Card className="travel-card planner-result-nav sticky-anchor" title="内容导航">
          <button className="planner-anchor-item" onClick={() => scrollTo('overview')}>
            行程概览
          </button>
          <button className="planner-anchor-item" onClick={() => scrollTo('budget')}>
            预算明细
          </button>
          <button className="planner-anchor-item" onClick={() => scrollTo('map')}>
            景点地图
          </button>
          <button className="planner-anchor-item" onClick={() => scrollTo('days')}>
            每日行程
          </button>
          <button className="planner-anchor-item" onClick={() => scrollTo('weather')}>
            天气信息
          </button>
        </Card>

        <div className="planner-result-main">
          <Card className="travel-card planner-top-actions">
            <Space wrap>
              <Button type="primary" icon={<ReloadOutlined />} onClick={backToForm}>
                重新生成
              </Button>
              <Button icon={<EditOutlined />}>编辑行程</Button>
              <Button icon={<ExportOutlined />}>导出行程</Button>
            </Space>
          </Card>

          <div className="planner-result-content-grid">
            <div className="planner-result-middle">
              <TripOverviewSection overview={result.plan.overview} />
              <BudgetSummarySection budget={result.plan.budget} />
            </div>
            <div className="planner-result-map-wrap">
              <MapSection spots={result.plan.mapSpots} />
            </div>
            <div className="planner-result-days-wrap">
              <DayPlanSection days={result.plan.days} />
            </div>
            <Card className="travel-card section-card planner-result-weather" id="weather" title="天气信息">
              <Title level={5}>天气摘要</Title>
              <Paragraph>{result.plan.weather.summary}</Paragraph>
              <Paragraph>温度范围：{result.plan.weather.temperatureRange}</Paragraph>
              <Paragraph type="secondary">{result.plan.weather.advice}</Paragraph>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
