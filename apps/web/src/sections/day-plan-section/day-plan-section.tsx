import { Card, Collapse, Image, Tag, Typography, Timeline, Divider, Row, Col } from 'antd';
import {
  EnvironmentOutlined,
  CoffeeOutlined,
  HomeOutlined,
  CarOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { TripDay } from '@travel/shared';
import { usePlannerStore } from '../../store/planner.store';

const { Paragraph, Text, Title } = Typography;

type Props = {
  days: TripDay[];
};

export function DayPlanSection({ days }: Props) {
  const { selectedDay, setSelectedDay, setHighlightedSpotId, setMobileMapVisible } = usePlannerStore();

  const focusSpotOnMap = (spotId: string) => {
    setHighlightedSpotId(spotId);
    setMobileMapVisible(true);
  };

  return (
    <Card
      id="days"
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
          .saas-collapse .ant-collapse-item {
            border-bottom: 1px solid #f0f0f0;
          }
          .saas-collapse .ant-collapse-item:last-child {
            border-bottom: none;
          }
          .saas-collapse .ant-collapse-header {
            padding: 20px 0 !important;
            align-items: center !important;
          }
          .saas-collapse .ant-collapse-content-box {
            padding: 0 0 24px 0 !important;
          }
          .saas-spot-item {
            display: flex;
            gap: 20px;
            padding: 16px;
            background: #ffffff;
            border: 1px solid #f0f0f0;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-bottom: 16px;
          }
          .saas-spot-item:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            border-color: #d9d9d9;
          }
          .saas-spot-img-wrap {
            width: 160px;
            height: 110px;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
            position: relative;
          }
          .saas-info-block {
            background: #f8fafc;
            border-radius: 12px;
            padding: 16px 20px;
            border: 1px solid #f1f5f9;
          }
          .saas-address-btn {
            background: transparent;
            border: none;
            padding: 0;
            color: #6b7280;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 13px;
            transition: color 0.2s;
            text-align: left;
          }
          .saas-address-btn:hover {
            color: #1677ff;
          }
          @media (max-width: 768px) {
            .saas-spot-item { flex-direction: column; gap: 12px; }
            .saas-spot-img-wrap { width: 100%; height: 180px; }
          }
        `}
      </style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: '#f0f5ff', color: '#1677ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
        }}>
          <CalendarOutlined />
        </div>
        <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#1f2937' }}>逐日行程</Title>
      </div>

      <Collapse
        accordion
        ghost
        className="saas-collapse"
        activeKey={String(selectedDay)}
        onChange={(key) => setSelectedDay(Number(key || 1))}
        expandIconPosition="end"
        items={days.map((day) => ({
          key: String(day.dayNo),
          label: (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Day {day.dayNo}</span>
              <span style={{ fontSize: 14, color: '#6b7280', fontWeight: 500 }}>{day.date}</span>
            </div>
          ),
          children: (
            <div style={{ paddingTop: 8 }}>
              {/* 每日概览块 */}
              <div className="saas-info-block" style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <InfoCircleOutlined style={{ color: '#1677ff', marginTop: 4 }} />
                  <Text style={{ color: '#374151', lineHeight: 1.6, fontSize: 14 }}>{day.summary}</Text>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4b5563', fontSize: 13 }}>
                    <CarOutlined /> <span>交通：{day.transport}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4b5563', fontSize: 13 }}>
                    <HomeOutlined /> <span>住宿：{day.hotel.name}</span>
                  </div>
                </div>
              </div>

              {/* 行程时间轴 */}
              <Timeline
                style={{ marginLeft: 8 }}
                items={[
                  // 1. 景点节点
                  ...day.spots.map((spot, index) => ({
                    color: '#1677ff',
                    dot: (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1677ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, border: '2px solid #fff', boxShadow: '0 0 0 1px #1677ff' }}>
                        {index + 1}
                      </div>
                    ),
                    children: (
                      <div 
                        className="saas-spot-item"
                        onMouseEnter={() => setHighlightedSpotId(spot.id)}
                        onClick={() => focusSpotOnMap(spot.id)}
                      >
                        <div className="saas-spot-img-wrap">
                          <Image width="100%" height="100%" src={spot.image} preview={false} style={{ objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>
                            {spot.duration}
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {spot.name}
                            </Text>
                            {typeof spot.ticketPrice === 'number' && (
                              <span style={{ fontSize: 14, fontWeight: 600, color: '#1677ff', flexShrink: 0 }}>￥{spot.ticketPrice}</span>
                            )}
                          </div>
                          <button className="saas-address-btn" onClick={(e) => { e.stopPropagation(); focusSpotOnMap(spot.id); }}>
                            <EnvironmentOutlined /> <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{spot.address}</span>
                          </button>
                          <Paragraph style={{ marginTop: 'auto', marginBottom: 0, fontSize: 13, color: '#6b7280', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {spot.description}
                          </Paragraph>
                        </div>
                      </div>
                    ),
                  })),
                  // 2. 餐饮节点
                  {
                    color: '#fa8c16',
                    dot: <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '2px solid #fa8c16', color: '#fa8c16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}><CoffeeOutlined /></div>,
                    children: (
                      <div className="saas-info-block" style={{ marginBottom: 16 }}>
                        <Text strong style={{ color: '#d46b08', display: 'block', marginBottom: 12 }}>餐饮推荐</Text>
                        <Row gutter={[16, 16]}>
                          <Col xs={24} sm={8}>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>早餐</Text>
                            <Text style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{day.meals.breakfast}</Text>
                          </Col>
                          <Col xs={24} sm={8}>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>午餐</Text>
                            <Text style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{day.meals.lunch}</Text>
                          </Col>
                          <Col xs={24} sm={8}>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>晚餐</Text>
                            <Text style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{day.meals.dinner}</Text>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                  // 3. 住宿节点
                  {
                    color: '#13c2c2',
                    dot: <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', border: '2px solid #13c2c2', color: '#13c2c2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}><HomeOutlined /></div>,
                    children: (
                      <div className="saas-info-block">
                        <Text strong style={{ color: '#08979c', display: 'block', marginBottom: 12 }}>当日住宿</Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                          <div>
                            <Text style={{ fontSize: 16, fontWeight: 600, color: '#111827', display: 'block' }}>{day.hotel.name}</Text>
                            <Text type="secondary" style={{ fontSize: 13, marginTop: 4, display: 'block' }}>
                              {day.hotel.address} <span style={{ margin: '0 6px' }}>·</span> 距中心 {day.hotel.distance}
                            </Text>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: '#1f2937' }}>￥{day.hotel.price} <span style={{ fontSize: 12, fontWeight: 400, color: '#6b7280' }}>/晚</span></div>
                            <div style={{ marginTop: 6, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                              <Tag bordered={false} color="cyan" style={{ margin: 0 }}>{day.hotel.type}</Tag>
                              <Tag bordered={false} color="gold" style={{ margin: 0 }}>★ {day.hotel.rating}</Tag>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  }
                ]}
              />
            </div>
          ),
        }))}
      />
    </Card>
  );
}
