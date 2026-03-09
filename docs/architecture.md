# 閺嬭埖鐎拠瀛樻閿涘牆宕熸い鐢告桨閿?
## 閸撳秶顏?
- 閸楁洟銆夐棃銏犲弳閸欙綇绱癭apps/web/src/page/planner-page.tsx`
- 妞ょ敻娼伴悩鑸碘偓渚婄窗`form` / `generating` / `result`
- 閻樿埖鈧胶顓搁悶鍡窗`apps/web/src/store/planner.store.ts`
- 閸掑棗灏紒鍕閿?  - Hero
  - PlannerForm
  - GenerationStatus
  - TripResult
  - TripOverview / BudgetSummary / MapSection / DayPlanSection

## 閸氬海顏?
- Fastify 鎼存梻鏁ら崗銉ュ經閿涙瓪apps/api/src/app.ts`
- 鐠侯垳鏁遍敍?  - `GET /health`
  - `POST /api/plan/generate`
- 娑撴艾濮熺仦鍌︾窗`GeneratePlanUsecase`
- AI 鐏炲偊绱癭agent.service + provider + prompt + parser + tools`

## 閸忓彉闊╃猾璇茬€?
`packages/shared/src/types.ts` 鐎规矮绠熼敍?
- `GeneratePlanRequest`
- `GeneratePlanResponse`
- `TripPlan`
- `TripOverview`
- `BudgetSummary`
- `TripDay`
- `SpotInfo`
- `HotelInfo`
- `WeatherInfo`
