import {
  BankOutlined,
  CarOutlined,
  CoffeeOutlined,
  ShopOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Card, Typography, Row, Col } from 'antd';
import type { BudgetSummary } from '@travel/shared';

const { Text, Title } = Typography;

type Props = {
  budget: BudgetSummary;
};

export function BudgetSummarySection({ budget }: Props) {
  // 计算各项占比的辅助函数
  const getPct = (val: number) => (budget.totalCost > 0 ? (val / budget.totalCost) * 100 : 0);

  const items = [
    {
      key: 'hotel',
      label: '住宿费用',
      value: budget.hotelCost,
      pct: getPct(budget.hotelCost),
      icon: <BankOutlined />,
      color: '#1677ff', // 经典蓝
    },
    {
      key: 'food',
      label: '餐饮费用',
      value: budget.foodCost,
      pct: getPct(budget.foodCost),
      icon: <CoffeeOutlined />,
      color: '#fa8c16', // 活力橙
    },
    {
      key: 'transport',
      label: '交通费用',
      value: budget.transportCost,
      pct: getPct(budget.transportCost),
      icon: <CarOutlined />,
      color: '#13c2c2', // 质感青
    },
    {
      key: 'ticket',
      label: '景点门票',
      value: budget.ticketCost,
      pct: getPct(budget.ticketCost),
      icon: <ShopOutlined />,
      color: '#722ed1', // 典雅紫
    },
  ];

  return (
    <Card
      id="budget"
      bordered={false}
      style={{
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03)',
        marginBottom: 32,
      }}
      styles={{ body: { padding: '32px 24px' } }}
    >
      <style>
        {`
          .budget-detail-card {
            background: #ffffff;
            border: 1px solid #f0f0f0;
            border-radius: 16px;
            padding: 20px;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
            cursor: default;
          }
          .budget-detail-card:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            transform: translateY(-2px);
            border-color: transparent;
          }
          .budget-progress-bar {
            display: flex;
            width: 100%;
            height: 10px;
            border-radius: 5px;
            overflow: hidden;
            background: #f5f5f5;
            margin-bottom: 32px;
          }
          .budget-progress-segment {
            height: 100%;
            transition: opacity 0.3s;
          }
          .budget-progress-segment:hover {
            opacity: 0.85;
          }
        `}
      </style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: '#f6ffed', color: '#1677ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
        }}>
          <WalletOutlined />
        </div>
        <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#1f2937' }}>预算分析</Title>
      </div>

      {/* 总花费高亮区 */}
      <div style={{ textAlign: 'center', padding: '16px 0 40px' }}>
        <Text style={{ fontSize: 16, color: '#6b7280' }}>预计总花费</Text>
        <div style={{ marginTop: 8 }}>
          <span style={{ fontSize: 28, color: '#1f2937', fontWeight: 600, marginRight: 4 }}>￥</span>
          <span style={{ fontSize: 64, color: '#111827', fontWeight: 900, fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-1px' }}>
            {budget.totalCost}
          </span>
        </div>
      </div>

      {/* 可视化比例条 */}
      <div className="budget-progress-bar">
        {items.map((item) => (
          <div 
            key={`bar-${item.key}`} 
            className="budget-progress-segment" 
            style={{ width: `${item.pct}%`, backgroundColor: item.color }} 
            title={`${item.label}: ￥${item.value} (${item.pct.toFixed(1)}%)`}
          />
        ))}
      </div>

      {/* 分类预算网格 */}
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={12} md={6} key={item.key}>
            <div className="budget-detail-card">
              {/* 高级感侧边指示线 */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', backgroundColor: item.color }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `${item.color}15`, color: item.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                }}>
                  {item.icon}
                </div>
                <Text style={{ color: '#6b7280', fontSize: 14, fontWeight: 500 }}>{item.label}</Text>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#374151' }}>￥</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#1f2937' }}>{item.value}</span>
              </div>
              
              <div style={{ marginTop: 8 }}>
                <Text style={{ color: '#9ca3af', fontSize: 13 }}>占比 {item.pct.toFixed(1)}%</Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
}
