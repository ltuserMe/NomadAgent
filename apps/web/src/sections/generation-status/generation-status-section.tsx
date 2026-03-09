import { Card, Progress, Space, Tag, Typography } from 'antd';
import { usePlannerStore } from '../../store/planner.store';

const { Text } = Typography;

export function GenerationStatusSection() {
  const { progress } = usePlannerStore();

  return (
    <Card className="planner-shell-card magic-card generation-status-layer" bodyStyle={{ padding: 20 }}>
      <div className="generating-banner">正在进行行程推理和资源匹配...</div>
      <Card className="generating-progress-card" bodyStyle={{ padding: 16 }}>
        <Progress percent={progress} strokeColor={{ '0%': '#4e6ff0', '100%': '#5a88f3' }} />
        <Space>
          <Tag color="processing">生成中</Tag>
          <Text type="secondary">正在生成行程概览、预算、地图点位和每日安排</Text>
        </Space>
      </Card>
    </Card>
  );
}
