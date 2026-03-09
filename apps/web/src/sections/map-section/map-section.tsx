import { Card, Typography } from 'antd';
import type { SpotInfo } from '@travel/shared';
import { usePlannerStore } from '../../store/planner.store';

const { Text } = Typography;

type Props = {
  spots: SpotInfo[];
};

export function MapSection({ spots }: Props) {
  const { highlightedSpotId, setHighlightedSpotId } = usePlannerStore();

  return (
    <Card className="travel-card magic-card section-card planner-map-card planner-map-island" id="map" title="景点地图">
      <div className="planner-fake-map">
        {spots.map((spot, index) => {
          const left = 14 + ((index * 22) % 73);
          const top = 20 + ((index * 21) % 62);
          const active = highlightedSpotId === spot.id;

          return (
            <button
              key={spot.id}
              type="button"
              className="planner-map-marker"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                background: active ? '#cf8c3f' : '#4a67ae',
              }}
              onMouseEnter={() => setHighlightedSpotId(spot.id)}
              onClick={() => setHighlightedSpotId(spot.id)}
            >
              {spot.orderNo}
            </button>
          );
        })}
      </div>
      <Text type="secondary" style={{ marginTop: 10, display: 'inline-block' }}>
        地图组件为占位实现，后续可替换为真实地图 SDK。
      </Text>
    </Card>
  );
}
