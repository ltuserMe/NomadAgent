import { create } from 'zustand';
import type { GeneratePlanRequest, GeneratePlanResponse, Preference } from '@travel/shared';

export type PlannerViewState = 'form' | 'generating' | 'result';

export type PlannerFormValue = GeneratePlanRequest;

type PlannerStore = {
  viewState: PlannerViewState;
  progress: number;
  selectedDay: number;
  highlightedSpotId?: string;
  mobileMapVisible: boolean;
  formValue: PlannerFormValue;
  result?: GeneratePlanResponse;
  setViewState: (state: PlannerViewState) => void;
  setProgress: (value: number) => void;
  setSelectedDay: (day: number) => void;
  setHighlightedSpotId: (spotId?: string) => void;
  setMobileMapVisible: (visible: boolean) => void;
  setFormValue: (value: PlannerFormValue) => void;
  setResult: (result?: GeneratePlanResponse) => void;
};

const defaultFormValue: PlannerFormValue = {
  destination: '北京',
  startDate: '2026-04-12',
  endDate: '2026-04-14',
  transport: '公共交通',
  hotelPreference: '经济型酒店',
  preferences: ['自然风光'] as Preference[],
  extraRequirements: '',
};

export const usePlannerStore = create<PlannerStore>((set) => ({
  viewState: 'form',
  progress: 0,
  selectedDay: 1,
  highlightedSpotId: undefined,
  mobileMapVisible: false,
  formValue: defaultFormValue,
  result: undefined,
  setViewState: (viewState) => set({ viewState }),
  setProgress: (progress) => set({ progress }),
  setSelectedDay: (selectedDay) => set({ selectedDay }),
  setHighlightedSpotId: (highlightedSpotId) => set({ highlightedSpotId }),
  setMobileMapVisible: (mobileMapVisible) => set({ mobileMapVisible }),
  setFormValue: (formValue) => set({ formValue }),
  setResult: (result) => set({ result }),
}));
