import { Button, Card, Space, Typography } from 'antd';
import { EditOutlined, ExportOutlined, ReloadOutlined, CloudOutlined } from '@ant-design/icons';
import type { GeneratePlanResponse } from '@travel/shared';
import { useGeneratePlan } from '../../hooks/useGeneratePlan';
import { BudgetSummarySection } from '../budget-summary/budget-summary-section';
import { DayPlanSection } from '../day-plan-section/day-plan-section';
import { TripOverviewSection } from '../trip-overview/trip-overview-section';

const { Paragraph, Title, Text } = Typography;

type Props = {
  result: GeneratePlanResponse;
};

export function TripResultSection({ result }: Props) {
  const { backToForm } = useGeneratePlan();

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%', paddingBottom: 48 }}>
      <Card 
        bordered={false}
        style={{
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          background: '#ffffff'
        }}
        styles={{ body: { padding: '24px 32px' } }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #1677ff 0%, #13c2c2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              ✨
            </div>
            <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#1f2937' }}>
              您的专属行程已就绪
            </Title>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button size="large" icon={<ReloadOutlined />} onClick={backToForm} style={{ borderRadius: 8 }}>重新生成</Button>
            <Button size="large" icon={<EditOutlined />} style={{ borderRadius: 8 }}>编辑</Button>
            <Button size="large" type="primary" icon={<ExportOutlined />} style={{ borderRadius: 8, background: '#1677ff', boxShadow: '0 4px 12px rgba(22, 119, 255, 0.2)' }}>导出</Button>
          </div>
        </div>
      </Card>

      <TripOverviewSection overview={result.plan.overview} />
      <BudgetSummarySection budget={result.plan.budget} />
      <DayPlanSection days={result.plan.days} />

      <Card 
        id="weather" 
        bordered={false}
        style={{
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03)',
          background: '#ffffff'
        }}
        styles={{ body: { padding: '32px 24px' } }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fffbe6', color: '#faad14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            <CloudOutlined />
          </div>
          <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#1f2937' }}>天气摘要</Title>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Paragraph style={{ fontSize: 16, color: '#374151', margin: 0, lineHeight: 1.6 }}>
            {result.plan.weather.summary}
          </Paragraph>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#4b5563' }}>
            <Text strong style={{ color: '#1f2937' }}>温度范围：</Text>
            <Text>{result.plan.weather.temperatureRange}</Text>
          </div>
          <div style={{ marginTop: 8, padding: '16px 20px', background: '#f0fdfa', borderRadius: 12, border: '1px solid #ccfbf1', color: '#0f766e', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 20, lineHeight: 1 }}>💡</span>
            <span style={{ fontSize: 14, lineHeight: 1.6 }}>{result.plan.weather.advice}</span>
          </div>
        </div>
      </Card>
    </section>
  );
}
