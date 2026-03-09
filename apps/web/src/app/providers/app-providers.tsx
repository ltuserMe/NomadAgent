import { ConfigProvider, theme } from 'antd';
import type { PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#6270ff',
          borderRadius: 12,
          colorBgLayout: '#e7ebf5',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
