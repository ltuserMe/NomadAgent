export type ToolDefinition = {
  name: 'searchAttractions' | 'getWeather' | 'estimateBudget' | 'searchHotels' | 'getRouteDistance';
  description: string;
  run: (...args: unknown[]) => Promise<unknown>;
};

export const toolRegistry: ToolDefinition[] = [
  {
    name: 'searchAttractions',
    description: '根据目的地和偏好检索景点列表及推荐信息。',
    run: async () => ({ items: [] }),
  },
  {
    name: 'getWeather',
    description: '查询目的地天气概览与出行建议。',
    run: async () => ({ summary: '晴到多云' }),
  },
  {
    name: 'estimateBudget',
    description: '根据天数、城市和偏好估算预算。',
    run: async () => ({ total: 0 }),
  },
  {
    name: 'searchHotels',
    description: '按价格和地理位置筛选酒店候选。',
    run: async () => ({ items: [] }),
  },
  {
    name: 'getRouteDistance',
    description: '计算景点之间的路线距离和耗时。',
    run: async () => ({ distance: '0km' }),
  },
];
