export type ToolDefinition = {
  name: 'searchAttractions' | 'getWeather' | 'estimateBudget' | 'searchHotels' | 'getRouteDistance';
  description: string;
  run: (...args: unknown[]) => Promise<unknown>;
};

export const toolRegistry: ToolDefinition[] = [
  {
    name: 'searchAttractions',
    description: '閺嶈宓侀惄顔炬畱閸︽澘鎷伴崑蹇撱偨閹兼粎鍌ㄩ弲顖滃仯閸婃瑩鈧?,
    run: async () => ({ items: [] }),
  },
  {
    name: 'getWeather',
    description: '閼惧嘲褰囬惄顔炬畱閸︽澘銇夊鏂句繆閹?,
    run: async () => ({ summary: '閺呯娴嗘径姘隘' }),
  },
  {
    name: 'estimateBudget',
    description: '娴兼壆鐣婚幀濠氼暕缁?,
    run: async () => ({ total: 0 }),
  },
  {
    name: 'searchHotels',
    description: '閹兼粎鍌ㄩ柊鎺戠暗閸婃瑩鈧?,
    run: async () => ({ items: [] }),
  },
  {
    name: 'getRouteDistance',
    description: '娴兼壆鐣荤捄顖滃殠鐠烘繄顬?,
    run: async () => ({ distance: '0km' }),
  },
];
