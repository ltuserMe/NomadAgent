import type { GeneratePlanRequest, GeneratePlanResponse } from '@travel/shared';

export function createMockPlan(input: GeneratePlanRequest): GeneratePlanResponse {
  const day1Spots = [
    {
      id: 'bj-d1-s1',
      orderNo: 1,
      name: '故宫博物院',
      address: '北京市东城区景山前街4号',
      duration: '3.5小时',
      description: '建议提前预约，按午门-太和殿-乾清宫主线游览。',
      ticketPrice: 60,
      latitude: 39.9163,
      longitude: 116.3972,
      image:
        'https://images.unsplash.com/photo-1582111194711-54e89457f65c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bj-d1-s2',
      orderNo: 2,
      name: '景山公园',
      address: '北京市西城区景山西街44号',
      duration: '1.5小时',
      description: '登万春亭俯瞰故宫全景，适合日落时段拍照。',
      ticketPrice: 10,
      latitude: 39.9272,
      longitude: 116.3961,
      image:
        'https://images.unsplash.com/photo-1614113935627-143efed8f2a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bj-d1-s3',
      orderNo: 3,
      name: '王府井步行街',
      address: '北京市东城区王府井大街',
      duration: '2小时',
      description: '适合晚间休闲、购物和品尝北京特色小吃。',
      ticketPrice: 0,
      latitude: 39.9135,
      longitude: 116.4123,
      image:
        'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const day2Spots = [
    {
      id: 'bj-d2-s1',
      orderNo: 1,
      name: '颐和园',
      address: '北京市海淀区新建宫门路19号',
      duration: '4小时',
      description: '昆明湖环湖漫步，建议乘船体验长廊景观。',
      ticketPrice: 30,
      latitude: 39.9999,
      longitude: 116.2755,
      image:
        'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bj-d2-s2',
      orderNo: 2,
      name: '圆明园遗址公园',
      address: '北京市海淀区清华西路28号',
      duration: '2小时',
      description: '重点看西洋楼遗址，适合人文历史主题游览。',
      ticketPrice: 25,
      latitude: 40.0075,
      longitude: 116.3032,
      image:
        'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const day3Spots = [
    {
      id: 'bj-d3-s1',
      orderNo: 1,
      name: '三里屯太古里',
      address: '北京市朝阳区三里屯路19号',
      duration: '2.5小时',
      description: '城市休闲与潮流商业街区，适合收尾行程。',
      ticketPrice: 0,
      latitude: 39.9358,
      longitude: 116.4548,
      image:
        'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bj-d3-s2',
      orderNo: 2,
      name: '国贸CBD城市观景',
      address: '北京市朝阳区建国门外大街',
      duration: '1.5小时',
      description: '城市天际线打卡，返程前的轻松路线。',
      ticketPrice: 0,
      latitude: 39.9087,
      longitude: 116.4574,
      image:
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const allSpots = [...day1Spots, ...day2Spots, ...day3Spots];

  return {
    plan: {
      overview: {
        title: `${input.destination}旅行计划`,
        destination: input.destination,
        startDate: input.startDate,
        endDate: input.endDate,
        suggestion: `根据你的偏好（${input.preferences.join('、')}）生成。建议采用“核心景点+休闲穿插”节奏，每天保留1小时机动时间。`,
      },
      budget: {
        ticketCost: 620,
        hotelCost: 1860,
        foodCost: 1200,
        transportCost: 980,
        totalCost: 4660,
      },
      weather: {
        summary: '白天晴到多云，早晚温差较明显。',
        temperatureRange: '14-23℃',
        advice: '建议携带薄外套，步行较多建议穿缓震运动鞋。',
      },
      mapSpots: allSpots,
      days: [
        {
          dayNo: 1,
          date: input.startDate,
          summary: '中轴线经典线路：故宫-景山-王府井',
          transport: input.transport,
          hotel: {
            name: `${input.destination}东城艺境酒店`,
            price: 620,
            type: input.hotelPreference,
            rating: 4.7,
            address: '北京市东城区灯市口大街88号',
            distance: '距王府井地铁站约700m',
          },
          meals: {
            breakfast: '酒店早餐',
            lunch: '故宫角楼咖啡轻食',
            dinner: '王府井北京烤鸭',
          },
          spots: day1Spots,
        },
        {
          dayNo: 2,
          date: input.startDate,
          summary: '历史园林线路：颐和园-圆明园',
          transport: input.transport,
          hotel: {
            name: `${input.destination}中关村园景酒店`,
            price: 640,
            type: input.hotelPreference,
            rating: 4.6,
            address: '北京市海淀区中关村南大街12号',
            distance: '距颐和园约3.8km',
          },
          meals: {
            breakfast: '酒店早餐',
            lunch: '园区简餐',
            dinner: '簋街川湘菜',
          },
          spots: day2Spots,
        },
        {
          dayNo: 3,
          date: input.endDate,
          summary: '城市休闲线路：三里屯-CBD观景-返程',
          transport: input.transport,
          hotel: {
            name: `${input.destination}朝阳都会酒店`,
            price: 600,
            type: input.hotelPreference,
            rating: 4.5,
            address: '北京市朝阳区工体北路6号',
            distance: '距三里屯太古里约500m',
          },
          meals: {
            breakfast: '酒店早餐',
            lunch: '三里屯融合餐厅',
            dinner: '机场简餐',
          },
          spots: day3Spots,
        },
      ],
    },
  };
}
