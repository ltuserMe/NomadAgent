import dayjs from 'dayjs';
import type { GeneratePlanRequest } from '@travel/shared';
import { message } from 'antd';
import { useRef } from 'react';
import { MOCK_PROGRESS_INTERVAL } from '../constants';
import { plannerApi } from '../services/planner.api';
import { createMockPlan } from '../services/mock-plan';
import { usePlannerStore } from '../store/planner.store';

export function useGeneratePlan() {
  const timerRef = useRef<number | null>(null);
  const { setViewState, setProgress, setResult, setFormValue } = usePlannerStore();

  const clear = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const generatePlan = async (input: GeneratePlanRequest) => {
    setFormValue(input);
    setViewState('generating');
    setProgress(8);
    setResult(undefined);

    timerRef.current = window.setInterval(() => {
      usePlannerStore.setState((state) => ({
        progress: Math.min(state.progress + 8, 92),
      }));
    }, MOCK_PROGRESS_INTERVAL);

    try {
      const payload: GeneratePlanRequest = {
        ...input,
        startDate: dayjs(input.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(input.endDate).format('YYYY-MM-DD'),
      };

      const data =
      await Promise.resolve(createMockPlan(payload))
        // import.meta.env.VITE_USE_MOCK === 'true'
        //   ? await Promise.resolve(createMockPlan(payload))
        //   : await plannerApi.generatePlan(payload);

      clear();
      setProgress(100);
      setResult(data);
      setViewState('result');
    } catch (error) {
      clear();
      setViewState('form');
      setProgress(0);
      message.error((error as Error).message || '生成失败，请稍后重试');
    }
  };

  const backToForm = () => {
    clear();
    setViewState('form');
    setProgress(0);
  };

  return { generatePlan, backToForm };
}
