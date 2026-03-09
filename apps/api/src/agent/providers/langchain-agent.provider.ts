import type { GeneratePlanRequest, GeneratePlanResponse } from '@travel/shared';
import { parseAgentOutput } from '../output.parser.js';
import { buildPrompt } from '../prompt.builder.js';
import { BaseAgentProvider } from './base-agent.provider.js';

const BEIJING_KEYWORDS = ['北京'];

const TEXT = {
  overviewTitleSuffix: '旅行规划方案',
  overviewSuggestion:
    '建议采用“核心景点 + 在地美食 + 夜间休闲”的节奏，避免高强度赶路；优先使用地铁并提前预约热门景点。',
  fallbackSuggestionPrefix: '已根据你的偏好生成通用城市模板，重点关注：',
  weatherSummary: '白天舒适，早晚偏凉。',
  weatherRange: '14-22°C',
  weatherAdvice: '建议分层穿搭，白天轻薄外套，夜间增加保暖；随身携带雨具。',
} as const;

function createBeijingPlan(input: GeneratePlanRequest): GeneratePlanResponse {
  return {
    plan: {
      overview: {
        title: `${input.destination}${TEXT.overviewTitleSuffix}`,
        destination: input.destination,
        startDate: input.startDate,
        endDate: input.endDate,
        suggestion: TEXT.overviewSuggestion,
      },
      budget: {
        ticketCost: 620,
        hotelCost: 1800,
        foodCost: 1200,
        transportCost: 960,
        totalCost: 4580,
      },
      weather: {
        summary: TEXT.weatherSummary,
        temperatureRange: TEXT.weatherRange,
        advice: TEXT.weatherAdvice,
      },
      mapSpots: [
        {
          id: 'spot-1',
          orderNo: 1,
          name: '故宫博物院',
          address: '北京市东城区景山前街4号',
          duration: '3.5小时',
          description: '以中轴线与宫廷建筑群为核心，适合历史文化主题深度游览。',
          ticketPrice: 60,
          latitude: 39.9163,
          longitude: 116.3972,
          image:
            'https://images.unsplash.com/photo-1582111194711-54e89457f65c?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'spot-2',
          orderNo: 2,
          name: '颐和园',
          address: '北京市海淀区新建宫门路19号',
          duration: '4小时',
          description: '皇家园林与湖景步道结合，节奏相对轻松，适合半日漫游。',
          ticketPrice: 30,
          latitude: 39.9999,
          longitude: 116.2755,
          image:
            'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'spot-3',
          orderNo: 3,
          name: '798艺术区',
          address: '北京市朝阳区酒仙桥路4号',
          duration: '2.5小时',
          description: '工业遗存与当代艺术融合，适合摄影、看展与咖啡休闲。',
          ticketPrice: 0,
          latitude: 39.9358,
          longitude: 116.4548,
          image:
            'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=800&q=80',
        },
      ],
      days: [
        {
          dayNo: 1,
          date: input.startDate,
          summary: '故宫 + 景山公园 + 王府井商圈，体验经典历史轴线。',
          transport: input.transport,
          hotel: {
            name: '北京王府井精选酒店',
            price: 620,
            type: input.hotelPreference,
            rating: 4.7,
            address: '北京市东城区王府井大街88号',
            distance: '距核心景点约900m',
          },
          meals: {
            breakfast: '酒店自助早餐',
            lunch: '东华门小吃',
            dinner: '王府井烤鸭餐厅',
          },
          spots: [
            {
              id: 'day1-spot1',
              orderNo: 1,
              name: '故宫博物院',
              address: '北京市东城区景山前街4号',
              duration: '3.5小时',
              description: '建议上午入场，优先游览太和殿、中和殿与乾清宫。',
              ticketPrice: 60,
              latitude: 39.9163,
              longitude: 116.3972,
              image:
                'https://images.unsplash.com/photo-1582111194711-54e89457f65c?auto=format&fit=crop&w=800&q=80',
            },
            {
              id: 'day1-spot2',
              orderNo: 2,
              name: '景山公园',
              address: '北京市西城区景山西街44号',
              duration: '1.5小时',
              description: '傍晚登高俯瞰故宫中轴线，拍照体验较好。',
              ticketPrice: 10,
              latitude: 39.9272,
              longitude: 116.3961,
              image:
                'https://images.unsplash.com/photo-1614113935627-143efed8f2a2?auto=format&fit=crop&w=800&q=80',
            },
          ],
        },
        {
          dayNo: 2,
          date: input.startDate,
          summary: '颐和园深度游，搭配园林湖景慢节奏行走。',
          transport: input.transport,
          hotel: {
            name: '北京王府井精选酒店',
            price: 620,
            type: input.hotelPreference,
            rating: 4.7,
            address: '北京市东城区王府井大街88号',
            distance: '距颐和园约14km',
          },
          meals: {
            breakfast: '酒店自助早餐',
            lunch: '颐和园园区简餐',
            dinner: '簋街风味餐厅',
          },
          spots: [
            {
              id: 'day2-spot1',
              orderNo: 1,
              name: '颐和园',
              address: '北京市海淀区新建宫门路19号',
              duration: '4小时',
              description: '重点游览长廊、佛香阁与昆明湖，建议预留休息时段。',
              ticketPrice: 30,
              latitude: 39.9999,
              longitude: 116.2755,
              image:
                'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
            },
          ],
        },
        {
          dayNo: 3,
          date: input.endDate,
          summary: '798艺术区 + 三里屯街区，轻松收尾并安排返程。',
          transport: input.transport,
          hotel: {
            name: '北京王府井精选酒店',
            price: 560,
            type: input.hotelPreference,
            rating: 4.6,
            address: '北京市东城区王府井大街88号',
            distance: '距798艺术区约11km',
          },
          meals: {
            breakfast: '酒店自助早餐',
            lunch: '798创意园简餐',
            dinner: '返程前轻食',
          },
          spots: [
            {
              id: 'day3-spot1',
              orderNo: 1,
              name: '798艺术区',
              address: '北京市朝阳区酒仙桥路4号',
              duration: '2.5小时',
              description: '选择2-3个重点展馆，控制节奏，避免返程前过度疲劳。',
              ticketPrice: 0,
              latitude: 39.9358,
              longitude: 116.4548,
              image:
                'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=800&q=80',
            },
          ],
        },
      ],
    },
  };
}

function createFallbackPlan(input: GeneratePlanRequest): GeneratePlanResponse {
  const base = createBeijingPlan(input);
  const preferencesText = input.preferences.length ? input.preferences.join('、') : '轻松休闲';

  base.plan.overview.title = `${input.destination}${TEXT.overviewTitleSuffix}`;
  base.plan.overview.destination = input.destination;
  base.plan.overview.suggestion = `${TEXT.fallbackSuggestionPrefix}${preferencesText}。`;

  return base;
}

export class LangChainAgentProvider extends BaseAgentProvider {
  name = 'langchain';

  async generatePlan(input: GeneratePlanRequest): Promise<GeneratePlanResponse> {
    const _prompt = buildPrompt(input);

    const isBeijing = BEIJING_KEYWORDS.some((keyword) => input.destination.includes(keyword));
    const raw = isBeijing ? createBeijingPlan(input) : createFallbackPlan(input);

    return parseAgentOutput(raw);
  }
}
