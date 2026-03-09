import type { GeneratePlanRequest, GeneratePlanResponse } from '@travel/shared';
import { parseAgentOutput } from '../output.parser.js';
import { buildPrompt } from '../prompt.builder.js';
import { BaseAgentProvider } from './base-agent.provider.js';

function createBeijingPlan(input: GeneratePlanRequest): GeneratePlanResponse {
  return {
    plan: {
      overview: {
        title: `${input.destination}閺冨懓顢戠拋鈥冲灊`,
        destination: input.destination,
        startDate: input.startDate,
        endDate: input.endDate,
        suggestion:
          '瀵ら缚顔呴柌鍥╂暏閳ユ粍鐗宠箛鍐╂珯閻?+ 娴兼垿妫界粚鎸庡絻閳ユ繄娈戦懞鍌氼殧閿涘本鐦℃径鈺咁暕閻ｆ瑦婧€閸斻劍妞傞梻杈剧礉闁灝鍘ゆ妯哄槻閹枫儱鐗妴?,
      },
      budget: {
        ticketCost: 620,
        hotelCost: 1800,
        foodCost: 1200,
        transportCost: 960,
        totalCost: 4580,
      },
      weather: {
        summary: '閻ц棄銇夐弲鏉戝煂婢舵矮绨敍灞炬－閺呮艾浜搁崙?,
        temperatureRange: '14-22閳?,
        advice: '瀵ら缚顔呴幖鍝勭敨閽栧嫬顦绘總妞剧瑢閼告帡鈧倹顒炵悰宀勭€烽妴?,
      },
      mapSpots: [
        {
          id: 'spot-1',
          orderNo: 1,
          name: '閺佸懎顔傞崡姘卞⒖闂?,
          address: '閸栨ぞ鍚敮鍌欑閸╁骸灏弲顖氬寳閸撳秷顢?閸?,
          duration: '3.5鐏忓繑妞?,
          description: '娑擃叀閰辩痪鎸庣壋韫囧啯娅欓悙鐧哥礉瀵ら缚顔呴幓鎰妫板嫮瀹抽妴?,
          ticketPrice: 60,
          latitude: 39.9163,
          longitude: 116.3972,
          image:
            'https://images.unsplash.com/photo-1582111194711-54e89457f65c?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'spot-2',
          orderNo: 2,
          name: '妫版劕鎷伴崶?,
          address: '閸栨ぞ鍚敮鍌涙崳濞ｂ偓閸栫儤鏌婂鍝勵唫闂傘劏鐭?9閸?,
          duration: '4鐏忓繑妞?,
          description: '閸ヮ厽鐏勯弲顖濐潎娑撳孩绠归弲顖滃殠鐠侯垶鈧倸鎮庨幈銏＄埗閵?,
          ticketPrice: 30,
          latitude: 39.9999,
          longitude: 116.2755,
          image:
            'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'spot-3',
          orderNo: 3,
          name: '娑撳鍣风仦顖氥亰閸欍倝鍣?,
          address: '閸栨ぞ鍚敮鍌涙篂闂冨啿灏稉澶愬櫡鐏烆垵鐭?9閸?,
          duration: '2.5鐏忓繑妞?,
          description: '閸╁骸绔舵导鎴︽＝娑撳氦鍠橀悧鈺傛暪鐏忎勘鈧?,
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
          summary: '閺佸懎顔?閺咁垰鍖?閻滃绨绘禍鏇犵病閸忓摜鍤庣捄?,
          transport: input.transport,
          hotel: {
            name: '閸栨ぞ鍚稉婊勬煙閼瑰搫顣ㄩ柊鎺戠暗',
            price: 620,
            type: input.hotelPreference,
            rating: 4.7,
            address: '閸栨ぞ鍚敮鍌欑閸╁骸灏悘顖氱閸欙絽銇囩悰?8閸?,
            distance: '鐠烘繄甯囨惔婊€绨?00m',
          },
          meals: {
            breakfast: '闁版帒绨甸弮鈺咁樀',
            lunch: '鐟欐帗銈奸崪鏍ф殝鏉炲顥?,
            dinner: '閻滃绨绘禍鏇炲娴滎剛鍎版ウ?,
          },
          spots: [
            {
              id: 'day1-spot1',
              orderNo: 1,
              name: '閺佸懎顔傞崡姘卞⒖闂?,
              address: '閸栨ぞ鍚敮鍌欑閸╁骸灏弲顖氬寳閸撳秷顢?閸?,
              duration: '3.5鐏忓繑妞?,
              description: '瀵ら缚顔呴弮鈺佸弳閸ヮ叏绱濋幐澶夊瘜缁炬寧鐖剁憴鍫涒偓?,
              ticketPrice: 60,
              latitude: 39.9163,
              longitude: 116.3972,
              image:
                'https://images.unsplash.com/photo-1582111194711-54e89457f65c?auto=format&fit=crop&w=800&q=80',
            },
            {
              id: 'day1-spot2',
              orderNo: 2,
              name: '閺咁垰鍖楅崗顒€娲?,
              address: '閸栨ぞ鍚敮鍌濄偪閸╁骸灏弲顖氬寳鐟楄儻顢?4閸?,
              duration: '1.5鐏忓繑妞?,
              description: '闁倸鎮庢穱顖滅仩缁鳖偆顩﹂崺搴″弿閺咁垬鈧?,
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
          summary: '妫版劕鎷伴崶?閸﹀棙妲戦崶顓炴疮閺嬫鏋冮崠鏍殠鐠?,
          transport: input.transport,
          hotel: {
            name: '閸栨ぞ鍚稉婊勬煙閼瑰搫顣ㄩ柊鎺戠暗',
            price: 620,
            type: input.hotelPreference,
            rating: 4.7,
            address: '閸栨ぞ鍚敮鍌欑閸╁骸灏悘顖氱閸欙絽銇囩悰?8閸?,
            distance: '鐠烘繈顣甸崪灞芥疮缁?4km',
          },
          meals: {
            breakfast: '闁版帒绨甸弮鈺咁樀',
            lunch: '妫版劕鎷伴崶顓炴疮閸愬懐鐣濇?,
            dinner: '缁ㄥ顢滃婵囩閼?,
          },
          spots: [
            {
              id: 'day2-spot1',
              orderNo: 1,
              name: '妫版劕鎷伴崶?,
              address: '閸栨ぞ鍚敮鍌涙崳濞ｂ偓閸栫儤鏌婂鍝勵唫闂傘劏鐭?9閸?,
              duration: '4鐏忓繑妞?,
              description: '閺勫棙妲戝﹢鏍ф嫲闂€鍨矕闁倸鎮庨幈銏ｅΝ婵傚繈鈧?,
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
          summary: '閸╁骸绔舵导鎴︽＝閹垫挸宕?+ 鏉╂梻鈻?,
          transport: input.transport,
          hotel: {
            name: '閸栨ぞ鍚稉婊勬煙閼瑰搫顣ㄩ柊鎺戠暗',
            price: 560,
            type: input.hotelPreference,
            rating: 4.6,
            address: '閸栨ぞ鍚敮鍌欑閸╁骸灏悘顖氱閸欙絽銇囩悰?8閸?,
            distance: '鐠烘繀绗侀柌灞芥偛缁?km',
          },
          meals: {
            breakfast: '闁版帒绨甸弮鈺咁樀',
            lunch: '娑撳鍣风仦顖濈€洪崥鍫ｅ綅',
            dinner: '閺堝搫婧€缁犫偓妞?,
          },
          spots: [
            {
              id: 'day3-spot1',
              orderNo: 1,
              name: '娑撳鍣风仦顖氥亰閸欍倝鍣?,
              address: '閸栨ぞ鍚敮鍌涙篂闂冨啿灏稉澶愬櫡鐏烆垵鐭?9閸?,
              duration: '2.5鐏忓繑妞?,
              description: '娴兼垿妫界拹顓犲⒖閵嗕焦濯块悡褎澧﹂崡掳鈧?,
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
  base.plan.overview.title = `${input.destination}閺呴缚鍏橀弮鍛邦攽鐠佲€冲灊`;
  base.plan.overview.destination = input.destination;
  base.plan.overview.suggestion = `閺嶈宓佹担鐘烩偓澶嬪閻ㄥ嫬浜告總鏂ょ礄${input.preferences.join('閵?)}閿涘鏁撻幋鎰剁礉瀵ら缚顔呮导妯哄帥鐎瑰甯撻弽绋跨妇閺咁垳鍋ｉ獮鑸靛付閸掕埖妫╅崸鍥劄鐞涘苯宸辨惔锔衡偓淇?
  return base;
}

export class LangChainAgentProvider extends BaseAgentProvider {
  name = 'langchain';

  async generatePlan(input: GeneratePlanRequest): Promise<GeneratePlanResponse> {
    const _prompt = buildPrompt(input);

    const raw = input.destination.includes('閸栨ぞ鍚?)
      ? createBeijingPlan(input)
      : createFallbackPlan(input);

    return parseAgentOutput(raw);
  }
}
