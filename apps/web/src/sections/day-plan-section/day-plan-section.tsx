import { Card, Collapse, Descriptions, Image, Space, Tag, Typography } from 'antd';
import type { TripDay } from '@travel/shared';
import { usePlannerStore } from '../../store/planner.store';

const { Paragraph, Text } = Typography;

type Props = {
  days: TripDay[];
};

export function DayPlanSection({ days }: Props) {
  const { selectedDay, setSelectedDay, setHighlightedSpotId } = usePlannerStore();

  return (
    <Card className="travel-card section-card day-plan-card" id="days" title="每日行程">
      <Collapse
        accordion
        activeKey={String(selectedDay)}
        onChange={(key) => setSelectedDay(Number(key || 1))}
        items={days.map((day) => ({
          key: String(day.dayNo),
          label: `第${day.dayNo}天`,
          extra: <Text type="secondary">{day.date}</Text>,
          children: (
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <Descriptions bordered size="small" column={1}>
                <Descriptions.Item label="行程描述">{day.summary}</Descriptions.Item>
                <Descriptions.Item label="交通方式">{day.transport}</Descriptions.Item>
                <Descriptions.Item label="住宿信息">{day.hotel.name}</Descriptions.Item>
              </Descriptions>

              <Card size="small" title="景点安排">
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  {day.spots.map((spot) => (
                    <Card
                      key={spot.id}
                      className="day-spot-card"
                      size="small"
                      onMouseEnter={() => setHighlightedSpotId(spot.id)}
                    >
                      <Space align="start" style={{ width: '100%' }}>
                        <Image
                          width={120}
                          height={90}
                          src={spot.image}
                          style={{ objectFit: 'cover', borderRadius: 8 }}
                        />
                        <Space direction="vertical" size={2} style={{ flex: 1 }}>
                          <Space>
                            <Tag color="blue">#{spot.orderNo}</Tag>
                            <Text strong>{spot.name}</Text>
                            {typeof spot.ticketPrice === 'number' ? (
                              <Tag color="purple">{spot.ticketPrice} 元</Tag>
                            ) : null}
                          </Space>
                          <Text type="secondary">{spot.address}</Text>
                          <Text type="secondary">游览时长：{spot.duration}</Text>
                          <Paragraph style={{ marginBottom: 0 }}>{spot.description}</Paragraph>
                        </Space>
                      </Space>
                    </Card>
                  ))}
                </Space>
              </Card>

              <Card className="day-aux-card" size="small" title="住宿推荐">
                <Descriptions size="small" column={2}>
                  <Descriptions.Item label="酒店">{day.hotel.name}</Descriptions.Item>
                  <Descriptions.Item label="价格">{day.hotel.price} 元/晚</Descriptions.Item>
                  <Descriptions.Item label="类型">{day.hotel.type}</Descriptions.Item>
                  <Descriptions.Item label="评分">{day.hotel.rating}</Descriptions.Item>
                  <Descriptions.Item label="地址" span={2}>
                    {day.hotel.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="距离">{day.hotel.distance}</Descriptions.Item>
                </Descriptions>
              </Card>

              <Card className="day-aux-card" size="small" title="餐饮安排">
                <Descriptions size="small" column={1}>
                  <Descriptions.Item label="早餐">{day.meals.breakfast}</Descriptions.Item>
                  <Descriptions.Item label="午餐">{day.meals.lunch}</Descriptions.Item>
                  <Descriptions.Item label="晚餐">{day.meals.dinner}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Space>
          ),
        }))}
      />
    </Card>
  );
}
