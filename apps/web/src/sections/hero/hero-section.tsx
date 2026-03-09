import { CompassOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export function HeroSection() {
  return (
    <section className="planner-hero">
      <div className="planner-hero-brand">
        <div className="planner-hero-icon">
          <CompassOutlined />
        </div>
        <div>
          <Title level={1} className="planner-hero-title">
            智能旅行助手
          </Title>
          <Paragraph className="planner-hero-subtitle">
            基于 AI 的个性化旅行规划，让每一次出行都更高效、更从容。
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
