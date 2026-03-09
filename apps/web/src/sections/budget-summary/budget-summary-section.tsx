import { Card, Col, Row, Statistic } from 'antd';
import type { BudgetSummary } from '@travel/shared';

type Props = {
  budget: BudgetSummary;
};

export function BudgetSummarySection({ budget }: Props) {
  return (
    <Card className="travel-card section-card budget-card" id="budget" title="预算明细">
      <Row gutter={[12, 12]}>
        <Col xs={12} md={8}>
          <Statistic title="景点门票" value={budget.ticketCost} suffix="元" />
        </Col>
        <Col xs={12} md={8}>
          <Statistic title="酒店住宿" value={budget.hotelCost} suffix="元" />
        </Col>
        <Col xs={12} md={8}>
          <Statistic title="餐饮费用" value={budget.foodCost} suffix="元" />
        </Col>
        <Col xs={12} md={8}>
          <Statistic title="交通费用" value={budget.transportCost} suffix="元" />
        </Col>
        <Col xs={12} md={8}>
          <Statistic title="总价" value={budget.totalCost} suffix="元" valueStyle={{ color: '#5f67ff' }} />
        </Col>
      </Row>
    </Card>
  );
}
