import { Card, Progress, Typography } from 'antd';
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { usePlannerStore } from '../../store/planner.store';

const { Text, Title } = Typography;

export function GenerationStatusSection() {
  const { progress } = usePlannerStore();

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
        background: '#ffffff',
      }}
      styles={{ body: { padding: '24px' } }}
    >
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .ai-status-pulse {
            background: linear-gradient(270deg, #f0fdfa, #eff6ff, #f0fdfa);
            background-size: 200% 200%;
            animation: gradientFlow 3s ease infinite;
            border-radius: 16px;
            padding: 20px;
            border: 1px solid #e0f2fe;
            margin-bottom: 24px;
          }
          .ai-step-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            padding: 8px 0;
          }
          .ai-step-dot-wait {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid #e5e7eb;
          }
        `}
      </style>

      <div className="ai-status-pulse">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ color: '#1677ff', fontSize: 20, display: 'flex' }}>
            <LoadingOutlined />
          </div>
          <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#1f2937' }}>
            AI 正在为您规划专属行程
          </Title>
        </div>
        <Text style={{ color: '#4b5563', fontSize: 14, display: 'block', paddingLeft: 32 }}>
          正在进行深度路网分析和资源匹配，请稍候...
        </Text>
      </div>

      <div style={{ padding: '0 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontWeight: 600, color: '#374151', fontSize: 14 }}>构建进度</Text>
          <Text style={{ fontWeight: 700, color: '#1677ff', fontSize: 16 }}>{progress}%</Text>
        </div>
        <Progress
          percent={progress}
          showInfo={false}
          strokeColor={{ '0%': '#1677ff', '100%': '#13c2c2' }}
          trailColor="#f3f4f6"
          strokeWidth={8}
        />

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="ai-step-item">
            {progress > 20 ? <CheckCircleOutlined style={{ color: '#10b981', fontSize: 16 }} /> : <LoadingOutlined style={{ color: '#1677ff', fontSize: 16 }} />}
            <Text style={{ color: progress > 20 ? '#374151' : '#1677ff', fontWeight: progress > 20 ? 400 : 500, fontSize: 14 }}>解析目的地与用户出行偏好</Text>
          </div>
          <div className="ai-step-item">
            {progress > 60 ? <CheckCircleOutlined style={{ color: '#10b981', fontSize: 16 }} /> : (progress > 20 ? <LoadingOutlined style={{ color: '#1677ff', fontSize: 16 }} /> : <div className="ai-step-dot-wait" />)}
            <Text style={{ color: progress > 60 ? '#374151' : (progress > 20 ? '#1677ff' : '#9ca3af'), fontWeight: progress > 20 && progress <= 60 ? 500 : 400, fontSize: 14 }}>全网检索景点与高性价比住宿</Text>
          </div>
          <div className="ai-step-item">
            {progress === 100 ? <CheckCircleOutlined style={{ color: '#10b981', fontSize: 16 }} /> : (progress > 60 ? <LoadingOutlined style={{ color: '#1677ff', fontSize: 16 }} /> : <div className="ai-step-dot-wait" />)}
            <Text style={{ color: progress === 100 ? '#374151' : (progress > 60 ? '#1677ff' : '#9ca3af'), fontWeight: progress > 60 && progress < 100 ? 500 : 400, fontSize: 14 }}>智能规划最佳路线与日程排布</Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
