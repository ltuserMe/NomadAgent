import type { GeneratePlanRequest } from '@travel/shared';

export function buildPrompt(input: GeneratePlanRequest): string {
  return [
    '娴ｇ姵妲搁弲楦垮厴閺冨懓顢戦崝鈺傚閿涘矁顕潏鎾冲毉缂佹挻鐎崠鏍ㄦ⒕鐞涘矁顓搁崚鎺嬧偓?,
    `閻╊喚娈戦崷? ${input.destination}`,
    `瀵偓婵妫╅張? ${input.startDate}`,
    `缂佹挻娼弮銉︽埂: ${input.endDate}`,
    `娴溿倝鈧碍鏌熷? ${input.transport}`,
    `娴ｅ繐顔栭崑蹇撱偨: ${input.hotelPreference}`,
    `閺冨懓顢戦崑蹇撱偨: ${input.preferences.join('閵?)}`,
    `妫版繂顦荤憰浣圭湴: ${input.extraRequirements || '閺?}`,
  ].join('\n');
}
