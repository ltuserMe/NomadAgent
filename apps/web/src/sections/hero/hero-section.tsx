import { CompassOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Space, Typography } from 'antd';

const { Text, Title, Paragraph } = Typography;

export function HeroSection() {
  return (
    <div className="hero-container" style={{ padding: '24px 0' }}>
      {/* 注入原生 CSS 动画关键帧 */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .hero-animate-enter {
            opacity: 0;
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .hero-icon-float {
            animation: floatIcon 3s ease-in-out infinite;
          }
          
          /* 默认桌面端字体与间距 */
          .hero-title { font-size: 46px; margin-bottom: 24px; }
          .hero-desc { font-size: 18px; margin-bottom: 48px; }
          .hero-brand { font-size: 28px; }
          .hero-feature { font-size: 18px; }
          .hero-logo-box { width: 56px; height: 56px; font-size: 32px; }
          
          /* 移动端 (小于768px) 响应式自动适配 */
          @media (max-width: 768px) {
            .hero-title { font-size: 32px !important; margin-bottom: 16px !important; }
            .hero-desc { font-size: 15px !important; margin-bottom: 32px !important; }
            .hero-brand { font-size: 24px !important; }
            .hero-feature { font-size: 15px !important; }
            .hero-logo-box { width: 48px !important; height: 48px !important; font-size: 24px !important; }
            
            /* 移动端改为居中排版 */
            .hero-container { padding: 0 0 24px 0 !important; text-align: center; }
            .hero-header-wrap { justify-content: center; margin-bottom: 24px !important; }
            .hero-feature-wrap { align-items: center; justify-content: center; text-align: left; }
          }
        `}
      </style>

      <div className="hero-animate-enter hero-header-wrap" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 40, animationDelay: '0s' }}>
        <div className="hero-icon-float hero-logo-box" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #1677ff 0%, #13c2c2 100%)',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(22, 119, 255, 0.3)'
        }}>
          <CompassOutlined />
        </div>
        <Text className="hero-brand" style={{ fontWeight: 900, color: '#1f2937', letterSpacing: '-0.5px' }}>
          Nomad AI
        </Text>
      </div>
      
      <Title level={1} className="hero-animate-enter hero-title" style={{ fontWeight: 900, color: '#111827', lineHeight: 1.2, animationDelay: '0.15s' }}>
        重新定义你的<br /><span style={{ color: '#1677ff' }}>旅行方式</span>
      </Title>
      
      <Paragraph className="hero-animate-enter hero-desc" style={{ color: '#4b5563', lineHeight: 1.6, animationDelay: '0.3s' }}>
        告诉我们你想去哪里，我们将利用最先进的 AI 智能体技术，为你量身定制包含路线、预算和住宿的完美行程。
      </Paragraph>

      <Space direction="vertical" size="middle" className="hero-feature-wrap" style={{ width: '100%', display: 'flex' }}>
        {['智能规划，秒级生成逐日路线', '精准预算，覆盖吃住行游购娱', '交互地图，点位距离一目了然', '个性定制，满足多样游玩偏好'].map((feature, index) => (
          <div key={index} className="hero-animate-enter" style={{ display: 'flex', alignItems: 'center', gap: '16px', animationDelay: `${0.45 + index * 0.15}s` }}>
            <CheckCircleFilled style={{ color: '#13c2c2', fontSize: 24 }} />
            <Text className="hero-feature" style={{ color: '#374151', fontWeight: 500 }}>{feature}</Text>
          </div>
        ))}
      </Space>
    </div>
  );
}
