import { Card, Empty, Typography } from 'antd';
// import { MapOutlined } from '@ant-design/icons';
import { Amap, Marker, config as amapConfig } from '@amap/amap-react';
import type { MapSpot } from '@travel/shared';
import { usePlannerStore } from '../../store/planner.store';
import { useEffect, useRef } from 'react';

const { Title } = Typography;
const amapApiKey = import.meta.env.VITE_AMAP_JS_API_KEY;

if (amapApiKey) {
  amapConfig.key = amapApiKey;
}

type Props = {
  spots: MapSpot[];
};

const CustomMarker = ({ spot, isHighlighted }: { spot: MapSpot; isHighlighted: boolean }) => {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {isHighlighted && <div className="map-marker-pulse" />}
      <div className="map-marker-dot">
        {spot.orderNo}
      </div>
    </div>
  );
};

export function MapSection({ spots }: Props) {
  const mapInstance = useRef<AMap.Map | null>(null);
  const { highlightedSpotId } = usePlannerStore();

  // 当点位变化时，自动缩放地图以包含所有点
  useEffect(() => {
    if (mapInstance.current && spots.length > 0) {
      mapInstance.current.setFitView(
        undefined, // 使用默认的 Marker 覆盖物
        false,     // 动画
        [120, 120, 120, 120], // 上下左右的 padding
        16 // 最大缩放级别
      );
    }
  }, [spots]);

  // 当高亮点变化时，将地图中心移动到该点
  useEffect(() => {
    if (mapInstance.current && highlightedSpotId) {
      const spot = spots.find(s => s.id === highlightedSpotId);
      if (spot) {
        mapInstance.current.setCenter([spot.longitude, spot.latitude]);
      }
    }
  }, [highlightedSpotId, spots]);

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03)',
        background: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      styles={{
        header: { flexShrink: 0, paddingTop: 24, paddingBottom: 16 },
        body: { flex: 1, padding: '0 8px 8px 8px', display: 'flex' }
      }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0fff0', color: '#52c41a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {/* <MapOutlined /> */}
          </div>
          <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#1f2937' }}>行程地图</Title>
        </div>
      }
    >
      <style>
        {`
          .map-container {
            width: 100%;
            height: 100%;
            border-radius: 16px;
            overflow: hidden;
          }
          .map-marker-dot {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #1677ff;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 700;
            border: 2px solid #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 10;
          }
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 119, 255, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 12px rgba(22, 119, 255, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 119, 255, 0); }
          }
          .map-marker-pulse {
            position: absolute;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #1677ff;
            box-shadow: 0 0 0 0 rgba(22, 119, 255, 1);
            transform: scale(1);
            animation: pulse 2s infinite;
          }
        `}
      </style>
      <div className="map-container">
        
          {spots.length === 0 ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
              <Empty description="正在等待行程点位数据..." />
            </div>
          ) : (
            <Amap zoom={12} onComplete={(map) => { mapInstance.current = map; }}>
              {spots.map((spot) => (
                <Marker key={spot.id} position={[spot.longitude, spot.latitude]}>
                  <CustomMarker spot={spot} isHighlighted={spot.id === highlightedSpotId} />
                </Marker>
              ))}
            </Amap>
          )}
        
      </div>
    </Card>
  );
}
