import { Card, Space, Tag, Typography } from 'antd';
import type { TripOverview } from '@travel/shared';

const { Paragraph, Text, Title } = Typography;

type Props = {
  overview: TripOverview;
};

export function TripOverviewSection({ overview }: Props) {
  return (
    <Card className="travel-card section-card" id="overview" title="行程概览">
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            {overview.title}
          </Title>
          <Tag color="blue">{overview.destination}</Tag>
        </Space>
        <Text type="secondary">
          {overview.startDate} 至 {overview.endDate}
        </Text>
        <Paragraph style={{ marginBottom: 0 }}>{overview.suggestion}</Paragraph>
      </Space>
    </Card>
  );
}
