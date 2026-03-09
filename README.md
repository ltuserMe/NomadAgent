# NomadAgent 智能旅行规划平台

NomadAgent 是一个前后端分离的旅行规划系统：
- 前端负责收集用户出行条件、展示预算与每日行程、地图联动交互。
- 后端负责接收规划请求、组装提示词、通过 Agent Provider 生成结构化方案并返回。

## 技术栈（用到什么）

### 前端（`apps/web`）
- React 18
- TypeScript
- Vite
- Ant Design
- Zustand
- Axios
- Day.js

### 后端（`apps/api`）
- Node.js
- Fastify
- TypeScript
- Zod
- Pino
- LangChain（Provider 架构，当前使用 `langchain` provider）

### 共享与工程化
- pnpm workspace
- Turbo
- `packages/shared`（前后端共享类型）
- `packages/config`（TS/ESLint 配置）

## 目录结构

```txt
apps/
  web/                       # 前端应用
    src/
      page/planner-page.tsx
      sections/
        planner-form/
        trip-result/
        budget-summary/
        day-plan-section/
        map-section/
      hooks/
      store/
      services/
  api/                       # 后端应用
    src/
      server.ts
      app.ts
      modules/
        planner/
        health/
      agent/
        agent.service.ts
        prompt.builder.ts
        output.parser.ts
        tool.registry.ts
        providers/
          base-agent.provider.ts
          langchain-agent.provider.ts
      common/
        middleware/error-handler.ts
packages/
  shared/
  config/
docs/
  architecture.md
  api-spec.md
```

## 前后端核心文件说明

### 前端关键文件
- `apps/web/src/page/planner-page.tsx`：页面状态入口（表单、生成中、结果态切换）。
- `apps/web/src/sections/planner-form/planner-form-section.tsx`：用户输入表单（目的地、日期、预算、偏好）。
- `apps/web/src/sections/budget-summary/budget-summary-section.tsx`：预算明细展示。
- `apps/web/src/sections/day-plan-section/day-plan-section.tsx`：每日行程与景点列表。
- `apps/web/src/sections/map-section/map-section.tsx`：地图点位展示与高亮联动。
- `apps/web/src/services/planner.api.ts`：前端请求后端 API。
- `apps/web/src/store/planner.store.ts`：全局状态（视图状态、进度、地图高亮等）。

### 后端关键文件
- `apps/api/src/server.ts`：服务启动入口。
- `apps/api/src/app.ts`：Fastify 实例与插件装配。
- `apps/api/src/modules/planner/planner.controller.ts`：规划接口路由处理。
- `apps/api/src/agent/agent.service.ts`：Provider 选择与调用入口。
- `apps/api/src/agent/providers/langchain-agent.provider.ts`：规划结果生成逻辑（当前默认 Provider）。
- `apps/api/src/agent/prompt.builder.ts`：提示词构建。
- `apps/api/src/agent/output.parser.ts`：输出结构解析。
- `apps/api/src/agent/tool.registry.ts`：工具注册（占位实现）。
- `apps/api/src/common/middleware/error-handler.ts`：统一错误处理。

## 本地运行

1. 安装依赖

```bash
pnpm install
```

2. 配置环境变量

```bash
cp .env.example .env
```

3. 启动开发环境（前后端并行）

```bash
pnpm dev
```

默认地址：
- Web: `http://localhost:5173`
- API: `http://localhost:4000`

## 常用命令

```bash
pnpm dev
pnpm typecheck
pnpm build
pnpm lint
```

## API

- `GET /health`：健康检查
- `POST /api/plan/generate`：生成旅行方案

## 当前实现说明

- 后端已采用 Provider 架构，当前默认 `LangChainAgentProvider`。
- `tool.registry` 目前为占位工具，后续可接入真实地图、天气、酒店与预算服务。
- 前端地图是可替换实现，可进一步接入高德/Mapbox 等 SDK。
