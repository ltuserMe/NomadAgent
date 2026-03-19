import { Card, Typography, Row, Col, Divider } from 'antd';
import type { TripOverview } from '@travel/shared';
import { FileTextOutlined, PushpinOutlined, CalendarOutlined } from '@ant-design/icons';

const { Paragraph, Text, Title } = Typography;

type Props = {
  overview: TripOverview;
};

export function TripOverviewSection({ overview }: Props) {
  return (
    <Card
      id="overview"
      bordered={false}
      style={{
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03)',
        marginBottom: 32,
      }}
      styles={{ body: { padding: '32px 24px' } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: '#e6f7ff', color: '#1677ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
        }}>
          <FileTextOutlined />
        </div>
        <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#1f2937' }}>行程概览</Title>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#111827' }}>
          {overview.title}
        </Title>
        
        <Paragraph style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
          {overview.suggestion}
        </Paragraph>

        <Divider style={{ margin: '8px 0' }} />

        <Row gutter={[32, 20]}>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <PushpinOutlined style={{ fontSize: 18, color: '#6b7280' }} />
              <div>
                <Text style={{ fontSize: 13, color: '#9ca3af', display: 'block' }}>目的地</Text>
                <Text style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{overview.destination}</Text>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CalendarOutlined style={{ fontSize: 18, color: '#6b7280' }} />
              <div>
                <Text style={{ fontSize: 13, color: '#9ca3af', display: 'block' }}>旅行日期</Text>
                <Text style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{overview.startDate} 至 {overview.endDate}</Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
