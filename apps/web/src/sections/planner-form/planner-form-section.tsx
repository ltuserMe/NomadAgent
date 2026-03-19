import type { GeneratePlanRequest } from '@travel/shared';
import dayjs, { type Dayjs } from 'dayjs';
import { Button, DatePicker, Form, Input, Select, Typography, Row, Col, Radio, Tag, Space, Divider, Flex } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, WalletOutlined, HeartOutlined, ShakeOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { useGeneratePlan } from '../../hooks/useGeneratePlan';
import { usePlannerForm } from '../../hooks/usePlannerForm';

const { Title, Text } = Typography;
const { CheckableTag } = Tag;

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
  const [isGenerating, setIsGenerating] = useState(false);

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

  const togglePreference = (tag: string, checked: boolean) => {
    setPreferences((prev) =>
      checked ? [...prev, tag] : prev.filter((item) => item !== tag),
    );
  };

  const onFinish = async (values: PlannerFormValues) => {
    setIsGenerating(true);
    try {
      await generatePlan({
      destination: values.destination,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
      transport: '公共交通',
      hotelPreference: budgetLevel,
      preferences: preferences as unknown as GeneratePlanRequest['preferences'],
      extraRequirements: values.extraRequirements,
    });
    } finally {
      // 如果 generatePlan 会触发路由跳转，这里的 false 可以视情况保留或移除
      setIsGenerating(false);
    }
  };

  return (
    <div className="form-container-card">
      <style>
        {`
          .form-container-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 40px 32px;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.04);
            border: 1px solid #f0f0f0;
          }
          @media (max-width: 768px) {
            .form-container-card {
              padding: 28px 20px;
            }
          }
        `}
      </style>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 56,
          height: 56,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #e6f4ff 0%, #e6fffb 100%)',
          color: '#1677ff',
          fontSize: 28,
          marginBottom: 16
        }}>
          <ShakeOutlined />
        </div>
        <Title level={2} style={{ marginTop: 0, marginBottom: 8, color: '#1f2937', fontWeight: 600 }}>
          定制您的专属旅程
        </Title>
        <Text style={{ fontSize: 16, color: '#6b7280' }}>
          告诉 AI 您的想法，只需几步即可生成完美的行程方案
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        size="large"
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
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="destination"
              rules={[{ required: true, message: '请选择目的地' }]}
              label={<Text strong style={{ fontSize: 15 }}><EnvironmentOutlined style={{ color: '#1677ff', marginRight: 6 }}/>目的地</Text>}
            >
              <Select
                showSearch
                allowClear
                options={cityOptions}
                placeholder="想去哪儿？（例如：成都）"
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="dateRange"
              rules={[{ required: true, message: '请选择出行日期' }]}
              label={
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Text strong style={{ fontSize: 15 }}><CalendarOutlined style={{ color: '#1677ff', marginRight: 6 }}/>出行日期</Text>
                  <Text type="secondary" style={{ fontSize: 13 }}>共 {dayCount || '--'} 天</Text>
                </div>
              }
            >
              <DatePicker.RangePicker style={{ width: '100%' }} allowClear={false} />
            </Form.Item>
          </Col>
        </Row>

        <Divider dashed style={{ margin: '12px 0 24px' }} />

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label={<Text strong style={{ fontSize: 15 }}><WalletOutlined style={{ color: '#1677ff', marginRight: 6 }}/>住宿预算</Text>}>
              <Radio.Group
                value={budgetLevel}
                onChange={(e) => setBudgetLevel(e.target.value)}
                optionType="button"
                buttonStyle="solid"
                style={{ display: 'flex', width: '100%' }}
              >
                {budgetOptions.map(item => (
                  <Radio.Button key={item.value} value={item.value} style={{ flex: 1, textAlign: 'center' }}>
                    {item.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<Text strong style={{ fontSize: 15 }}><HeartOutlined style={{ color: '#f5222d', marginRight: 6 }}/>游玩偏好</Text>}>
              <Flex wrap="wrap" gap="small">
                {preferenceOptions.map((tag) => {
                  const isSelected = preferences.includes(tag);
                  return (
                    <CheckableTag
                      key={tag}
                      checked={isSelected}
                      onChange={(checked) => togglePreference(tag, checked)}
                      style={{
                        padding: '6px 16px',
                        fontSize: 14,
                        borderRadius: 16,
                        border: `1px solid ${isSelected ? 'transparent' : '#d9d9d9'}`,
                        background: isSelected ? '#e6f4ff' : '#fafafa',
                        color: isSelected ? '#1677ff' : '#595959',
                        transition: 'all 0.3s',
                      }}
                    >
                      {tag}
                    </CheckableTag>
                  );
                })}
              </Flex>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="extraRequirements"
          label={<Text strong style={{ fontSize: 15 }}>补充要求（可选）</Text>}
          style={{ marginTop: 12 }}
        >
          <Input.TextArea
            rows={4}
            placeholder="例如：带有老人和小孩、需要安排清真餐饮、希望行程不要太紧凑..."
            style={{ borderRadius: 12, padding: 12 }}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 40 }}>
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isGenerating}
            icon={<ShakeOutlined />}
            style={{
              height: 56,
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 28,
              background: 'linear-gradient(90deg, #1677ff 0%, #13c2c2 100%)',
              border: 'none',
              boxShadow: '0 8px 20px rgba(22, 119, 255, 0.25)',
            }}
          >
            一键生成专属行程
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
