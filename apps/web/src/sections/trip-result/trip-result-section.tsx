import { Button, Card, Space, Typography } from 'antd';
import { EditOutlined, ExportOutlined, ReloadOutlined } from '@ant-design/icons';
import type { GeneratePlanResponse } from '@travel/shared';
import { useGeneratePlan } from '../../hooks/useGeneratePlan';
import { BudgetSummarySection } from '../budget-summary/budget-summary-section';
import { DayPlanSection } from '../day-plan-section/day-plan-section';
import { TripOverviewSection } from '../trip-overview/trip-overview-section';

const { Paragraph, Title } = Typography;

type Props = {
  result: GeneratePlanResponse;
};

export function TripResultSection({ result }: Props) {
  const { backToForm } = useGeneratePlan();

  return (
    <section className="planner-result-modern space-y-8">
      <Card className="magic-card planner-top-actions">
        <Space wrap>
          <Button type="primary" icon={<ReloadOutlined />} onClick={backToForm}>
            重新生成
          </Button>
          <Button icon={<EditOutlined />}>编辑行程</Button>
          <Button icon={<ExportOutlined />}>导出行程</Button>
        </Space>
      </Card>

      <TripOverviewSection overview={result.plan.overview} />
      <BudgetSummarySection budget={result.plan.budget} />
      <DayPlanSection days={result.plan.days} />

      <Card className="travel-card magic-card section-card planner-result-weather" id="weather" title="天气信息">
        <Title level={5}>天气摘要</Title>
        <Paragraph>{result.plan.weather.summary}</Paragraph>
        <Paragraph>温度范围：{result.plan.weather.temperatureRange}</Paragraph>
        <Paragraph type="secondary">{result.plan.weather.advice}</Paragraph>
      </Card>
    </section>
  );
}
