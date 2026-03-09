import type { GeneratePlanRequest } from '@travel/shared';

export function buildPrompt(input: GeneratePlanRequest): string {
  const preferenceText = input.preferences.length ? input.preferences.join('、') : '无特殊偏好';

  return [
    '你是专业旅行规划师，请根据以下信息输出结构化的旅行方案。',
    `目的地：${input.destination}`,
    `开始日期：${input.startDate}`,
    `结束日期：${input.endDate}`,
    `交通方式：${input.transport}`,
    `酒店偏好：${input.hotelPreference}`,
    `旅行偏好：${preferenceText}`,
    `额外需求：${input.extraRequirements || '无'}`,
  ].join('\n');
}
