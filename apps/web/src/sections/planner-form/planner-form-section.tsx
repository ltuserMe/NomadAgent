import type { GeneratePlanRequest } from '@travel/shared';
import dayjs, { type Dayjs } from 'dayjs';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import { useMemo, useState } from 'react';
import { useGeneratePlan } from '../../hooks/useGeneratePlan';
import { usePlannerForm } from '../../hooks/usePlannerForm';

type PlannerFormValues = {
  destination: string;
  dateRange: [Dayjs, Dayjs];
  extraRequirements?: string;
};

const cityOptions = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '南京',
  '成都',
  '重庆',
  '西安',
  '武汉',
].map((city) => ({ label: city, value: city }));

export function PlannerFormSection() {
  const { form, initialValues } = usePlannerForm();
  const { generatePlan } = useGeneratePlan();

  const [budgetLevel, setBudgetLevel] = useState(initialValues.hotelPreference || '舒适型酒店');
  const [preferences, setPreferences] = useState<string[]>(
    Array.isArray(initialValues.preferences) ? (initialValues.preferences as unknown as string[]) : [],
  );

  const dateRange = Form.useWatch('dateRange', form) as [Dayjs, Dayjs] | undefined;
  const dayCount = useMemo(() => {
    if (!Array.isArray(dateRange) || !dateRange[0] || !dateRange[1]) return 0;
    return Math.max(dateRange[1].diff(dateRange[0], 'day') + 1, 1);
  }, [dateRange]);

  const budgetOptions = [
    { label: '经济', value: '经济型酒店' },
    { label: '舒适', value: '舒适型酒店' },
    { label: '高档', value: '高档型酒店' },
  ];
  const preferenceOptions = ['历史文化', '自然风光', '美食', '购物', '艺术', '休闲'];

  const togglePreference = (value: string) => {
    setPreferences((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const onFinish = (values: PlannerFormValues) => {
    generatePlan({
      destination: values.destination,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
      transport: '公共交通',
      hotelPreference: budgetLevel,
      preferences: preferences as unknown as GeneratePlanRequest['preferences'],
      extraRequirements: values.extraRequirements,
    });
  };

  return (
    <section className="planner-magic-stage">
      <div className="planner-form-blob planner-form-blob-indigo" />
      <div className="planner-form-blob planner-form-blob-violet" />

      <Card className="magic-card planner-magic-card">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            destination: initialValues.destination,
            dateRange: [
              dayjs(initialValues.startDate || dayjs().format('YYYY-MM-DD')),
              dayjs(initialValues.endDate || dayjs().add(2, 'day').format('YYYY-MM-DD')),
            ],
            extraRequirements: initialValues.extraRequirements,
          }}
          onFinish={onFinish}
        >
          <p className="planner-magic-kicker">AI 旅行规划引擎</p>

          <Form.Item name="destination" rules={[{ required: true, message: '请选择目的地' }]}>
            <div className="planner-destination-wrap">
              <Select
                showSearch
                options={cityOptions}
                className="planner-destination-select"
                placeholder="请选择目的地城市"
                optionFilterProp="label"
              />
              <span className="planner-destination-line" />
            </div>
          </Form.Item>

          <div className="planner-magic-group">
            <p className="planner-magic-label">日期范围</p>
            <Form.Item
              name="dateRange"
              rules={[{ required: true, message: '请选择开始和结束日期' }]}
              style={{ marginBottom: 10 }}
            >
              <DatePicker.RangePicker className="planner-date-picker" allowClear={false} />
            </Form.Item>
            <div className="planner-magic-date">
              共 {dayCount || '--'} 天
              {Array.isArray(dateRange) && dateRange[0] && dateRange[1]
                ? `（${dateRange[0].format('YYYY-MM-DD')} 至 ${dateRange[1].format('YYYY-MM-DD')}）`
                : ''}
            </div>
          </div>

          <div className="planner-magic-group">
            <p className="planner-magic-label">预算</p>
            <div className="planner-pill-row">
              {budgetOptions.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setBudgetLevel(item.value)}
                  className={`planner-pill ${budgetLevel === item.value ? 'planner-pill-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="planner-magic-group">
            <p className="planner-magic-label">偏好</p>
            <div className="planner-pill-row">
              {preferenceOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => togglePreference(item)}
                  className={`planner-pill ${preferences.includes(item) ? 'planner-pill-active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Form.Item name="extraRequirements" style={{ marginBottom: 28 }}>
            <Input.TextArea rows={4} className="planner-magic-textarea" placeholder="额外要求（可选）" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button htmlType="submit" type="primary" size="large" className="planner-magic-submit">
              ✨ 开启智能规划
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
}
