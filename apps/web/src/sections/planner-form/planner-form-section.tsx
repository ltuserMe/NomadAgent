import dayjs from 'dayjs';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { EnvironmentOutlined, SettingOutlined } from '@ant-design/icons';
import type { GeneratePlanRequest } from '@travel/shared';
import { useGeneratePlan } from '../../hooks/useGeneratePlan';
import { usePlannerForm } from '../../hooks/usePlannerForm';

const { Text } = Typography;

type PlannerFormValues = {
  destination: string;
  dateRange: [dayjs.Dayjs, dayjs.Dayjs];
  transport: string;
  hotelPreference: string;
  preferences: GeneratePlanRequest['preferences'];
  extraRequirements?: string;
};

export function PlannerFormSection() {
  const { form, initialValues } = usePlannerForm();
  const { generatePlan } = useGeneratePlan();

  const dateRange = Form.useWatch('dateRange', form);
  const days = Array.isArray(dateRange)
    ? Math.max(dateRange[1].diff(dateRange[0], 'day') + 1, 1)
    : 0;

  const onFinish = (values: PlannerFormValues) => {
    generatePlan({
      destination: values.destination,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
      transport: values.transport,
      hotelPreference: values.hotelPreference,
      preferences: values.preferences,
      extraRequirements: values.extraRequirements,
    });
  };

  return (
    <Card className="planner-shell-card">
      <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
        <Card className="planner-group-card" bodyStyle={{ padding: 16 }}>
          <Space style={{ marginBottom: 8 }}>
            <EnvironmentOutlined />
            <Text strong>目的地与日期</Text>
          </Space>
          <Divider style={{ margin: '8px 0 14px' }} />
          <Row gutter={12}>
            <Col xs={24} md={8}>
              <Form.Item
                label="目的地城市"
                name="destination"
                rules={[{ required: true, message: '请输入目的地' }]}
              >
                <Input prefix={<EnvironmentOutlined />} placeholder="例如：北京" />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                label="开始日期 - 结束日期"
                name="dateRange"
                rules={[{ required: true, message: '请选择日期范围' }]}
              >
                <DatePicker.RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="旅行天数">
                <div className="planner-days-pill">{days || '-'} 天</div>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card className="planner-group-card" bodyStyle={{ padding: 16 }}>
          <Space style={{ marginBottom: 8 }}>
            <SettingOutlined />
            <Text strong>偏好设置</Text>
          </Space>
          <Divider style={{ margin: '8px 0 14px' }} />
          <Row gutter={12}>
            <Col xs={24} md={8}>
              <Form.Item
                label="交通方式"
                name="transport"
                rules={[{ required: true, message: '请选择交通方式' }]}
              >
                <Select
                  options={[{ value: '公共交通' }, { value: '打车+步行' }, { value: '自驾' }]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="住宿偏好"
                name="hotelPreference"
                rules={[{ required: true, message: '请选择住宿偏好' }]}
              >
                <Select
                  options={[
                    { value: '经济型酒店' },
                    { value: '舒适型酒店' },
                    { value: '高档型酒店' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="旅行偏好"
                name="preferences"
                rules={[{ required: true, message: '请至少选择一个偏好' }]}
              >
                <Checkbox.Group>
                  <Space wrap>
                    <Checkbox value="历史文化">历史文化</Checkbox>
                    <Checkbox value="自然风光">自然风光</Checkbox>
                    <Checkbox value="美食">美食</Checkbox>
                    <Checkbox value="购物">购物</Checkbox>
                    <Checkbox value="艺术">艺术</Checkbox>
                    <Checkbox value="休闲">休闲</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card className="planner-group-card" bodyStyle={{ padding: 16 }}>
          <Text strong>额外要求</Text>
          <Divider style={{ margin: '8px 0 14px' }} />
          <Form.Item name="extraRequirements" style={{ marginBottom: 0 }}>
            <Input.TextArea
              rows={4}
              placeholder="例如：想去看升旗、减少换乘、对海鲜过敏等。"
            />
          </Form.Item>
        </Card>

        <div className="planner-form-action">
          <Button htmlType="submit" type="primary" size="large" className="planner-generate-btn">
            生成计划
          </Button>
        </div>
      </Form>
    </Card>
  );
}
