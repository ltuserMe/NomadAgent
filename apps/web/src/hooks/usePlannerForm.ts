import { Form } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { usePlannerStore } from '../store/planner.store';

export function usePlannerForm() {
  const [form] = Form.useForm();
  const { formValue, setFormValue } = usePlannerStore();

  const initialValues = useMemo(
    () => ({
      ...formValue,
      dateRange: [dayjs(formValue.startDate), dayjs(formValue.endDate)],
    }),
    [formValue],
  );

  return {
    form,
    initialValues,
    setFormValue,
  };
}
