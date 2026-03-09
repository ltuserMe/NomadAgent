import {
  BankOutlined,
  CarOutlined,
  CoffeeOutlined,
  DollarCircleOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Card } from 'antd';
import type { BudgetSummary } from '@travel/shared';

type Props = {
  budget: BudgetSummary;
};

export function BudgetSummarySection({ budget }: Props) {
  const items = [
    {
      key: 'ticket',
      label: '景点门票',
      value: budget.ticketCost,
      icon: <ShopOutlined />,
      tone: 'budget-stat-blue',
    },
    {
      key: 'hotel',
      label: '酒店住宿',
      value: budget.hotelCost,
      icon: <BankOutlined />,
      tone: 'budget-stat-purple',
    },
    {
      key: 'food',
      label: '餐饮费用',
      value: budget.foodCost,
      icon: <CoffeeOutlined />,
      tone: 'budget-stat-cyan',
    },
    {
      key: 'transport',
      label: '交通费用',
      value: budget.transportCost,
      icon: <CarOutlined />,
      tone: 'budget-stat-amber',
    },
    {
      key: 'total',
      label: '总价',
      value: budget.totalCost,
      icon: <DollarCircleOutlined />,
      tone: 'budget-stat-total',
    },
  ];

  return (
    <Card className="travel-card air-card section-card budget-card" id="budget" title="预算明细">
      <div className="budget-grid">
        {items.map((item) => (
          <article key={item.key} className={`budget-stat-card ${item.tone}`}>
            <div className="budget-stat-icon">{item.icon}</div>
            <div className="budget-stat-value">
              {item.value}
              <span className="budget-stat-unit">元</span>
            </div>
            <div className="budget-stat-label">{item.label}</div>
          </article>
        ))}
      </div>
    </Card>
  );
}
