import { z } from 'zod';

export const PreferenceSchema = z.enum(['历史文化', '自然风光', '美食', '购物', '艺术', '休闲']);
export type Preference = z.infer<typeof PreferenceSchema>;

export const SpotInfoSchema = z.object({
  id: z.string(),
  orderNo: z.number(),
  name: z.string(),
  image: z.string().optional(),
  address: z.string(),
  duration: z.string(),
  description: z.string(),
  ticketPrice: z.number().optional(),
  latitude: z.number(),
  longitude: z.number(),
});
export type SpotInfo = z.infer<typeof SpotInfoSchema>;

export const HotelInfoSchema = z.object({
  name: z.string(),
  price: z.number(),
  type: z.string(),
  rating: z.number(),
  address: z.string(),
  distance: z.string(),
});
export type HotelInfo = z.infer<typeof HotelInfoSchema>;

export const WeatherInfoSchema = z.object({
  summary: z.string(),
  temperatureRange: z.string(),
  advice: z.string(),
});
export type WeatherInfo = z.infer<typeof WeatherInfoSchema>;

export const TripOverviewSchema = z.object({
  title: z.string(),
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  suggestion: z.string(),
});
export type TripOverview = z.infer<typeof TripOverviewSchema>;

export const BudgetSummarySchema = z.object({
  ticketCost: z.number(),
  hotelCost: z.number(),
  foodCost: z.number(),
  transportCost: z.number(),
  totalCost: z.number(),
});
export type BudgetSummary = z.infer<typeof BudgetSummarySchema>;

export const MealsSchema = z.object({
  breakfast: z.string(),
  lunch: z.string(),
  dinner: z.string(),
});
export type Meals = z.infer<typeof MealsSchema>;

export const TripDaySchema = z.object({
  dayNo: z.number(),
  date: z.string(),
  summary: z.string(),
  transport: z.string(),
  hotel: HotelInfoSchema,
  meals: MealsSchema,
  spots: z.array(SpotInfoSchema),
});
export type TripDay = z.infer<typeof TripDaySchema>;

export const TripPlanSchema = z.object({
  overview: TripOverviewSchema,
  budget: BudgetSummarySchema,
  weather: WeatherInfoSchema,
  mapSpots: z.array(SpotInfoSchema),
  days: z.array(TripDaySchema),
});
export type TripPlan = z.infer<typeof TripPlanSchema>;

export const GeneratePlanRequestSchema = z.object({
  destination: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  transport: z.string().min(1),
  hotelPreference: z.string().min(1),
  preferences: z.array(PreferenceSchema),
  extraRequirements: z.string().optional(),
});
export type GeneratePlanRequest = z.infer<typeof GeneratePlanRequestSchema>;

export const GeneratePlanResponseSchema = z.object({
  plan: TripPlanSchema,
});
export type GeneratePlanResponse = z.infer<typeof GeneratePlanResponseSchema>;

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  message: string;
  errorCode?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
