# 閺呴缚鍏橀弮鍛邦攽閸斺晜澧滈敍鍫濆礋妞ょ敻娼伴悧鍫礆

閺堫剟銆嶉惄顔芥Ц娑撯偓娑?**monorepo + 閸楁洟銆夐棃銏犵安閻㈩煉绱橲PA閿?* 閻ㄥ嫭娅ら懗鑺ユ⒕鐞涘苯濮幍瀣€囬弸韬测偓?
## 閹垛偓閺堫垱鐖?
- Monorepo: `pnpm workspace` + `turbo`
- Web: React + TypeScript + Vite + Ant Design + Zustand + Axios
- API: Node.js + TypeScript + Fastify + Zod + Pino + LangChain.js閿涘湧rovider 妤犮劍鐏﹂敍?- Shared: 閸撳秴鎮楃粩顖氬彙娴滎偆琚崹瀣剁礄鐠囬攱鐪伴妴浣告惙鎼存柣鈧浇顓搁崚鎺旂波閺嬪嫸绱?
## 閻╊喖缍嶇紒鎾寸€?
```txt
apps/
  web/     閸楁洟銆夐棃銏犲缁?  api/     閺堚偓鐏忓繐鎮楃粩顖涙箛閸?packages/
  shared/  閸撳秴鎮楃粩顖氬彙娴滎偆琚崹瀣╃瑢 schema
  config/  tsconfig/eslint 閸忣剙鍙￠柊宥囩枂
docs/
  architecture.md
  api-spec.md
```

## 閺嶇绺炬禍褍鎼цぐ銏♀偓?
閸欘亝婀佹稉鈧稉顏堛€夐棃銏犲弳閸欙綇绱檂/`閿涘绱濋崷銊┿€夐棃銏犲敶鐎瑰本鍨氭稉澶岊潚閻樿埖鈧礁鍨忛幑顫窗

1. `form`閿涙艾锝為崘娆愭⒕鐞涘矂娓跺Ч?2. `generating`閿涙I 閻㈢喐鍨氭稉顓ㄧ礄鏉╂稑瀹崇仦鏇犮仛閿?3. `result`閿涙氨鏁撻幋鎰波閺嬫粌鐫嶇粈鐚寸礄闁挎氨鍋ｇ€佃壈鍩?+ 閸︽澘娴?+ 濮ｅ繑妫╃悰宀€鈻奸敍?
## API閿涘牊娓剁亸蹇斿复閸欙綇绱?
- `GET /health`
- `POST /api/plan/generate`

> 瑜版挸澧犻梼鑸殿唽閺冪姵鏆熼幑顔肩氨閵嗕焦妫?Prisma閵嗕焦妫?CRUD 閸掓銆?鐠囷附鍎?缂傛牞绶幒銉ュ經閵?
## 韫囶偊鈧喎鎯庨崝?
1. 鐎瑰顥婃笟婵婄

```bash
pnpm install
```

2. 闁板秶鐤嗛悳顖氼暔閸欐﹢鍣?
```bash
cp .env.example .env
```

3. 閸氼垰濮╅崜宥呮倵缁?
```bash
pnpm dev
```

- Web: `http://localhost:5173`
- API: `http://localhost:4000`

## 鐢摜鏁ら崨鎴掓姢

```bash
pnpm dev
pnpm typecheck
pnpm build
pnpm lint
```

## 閸撳秶顏紒鎾寸€敍鍫濆礋妞ょ敻娼伴敍?
- `page/planner-page.tsx`閿涙岸銆夐棃銏㈠Ц閹礁鍨忛幑銏犲弳閸?- `sections/planner-form`閿涙岸娓跺Ч鍌氾綖閸?- `sections/generation-status`閿涙氨鏁撻幋鎰厬閻樿埖鈧?- `sections/trip-result`閿涙氨绮ㄩ弸婊勨偓浣光偓璇茬鐏炩偓
- `sections/*`閿涙碍顩х憴鍫涒偓渚€顣╃粻妞尖偓浣告勾閸ヤ勘鈧焦妫╃粙瀣侀崸?- `store/planner.store.ts`閿涙碍娓剁亸?Zustand 閻樿埖鈧胶顓搁悶?
## 閸氬海顏紒鎾寸€敍鍫熸付鐏?AI 閻㈢喐鍨氶張宥呭閿?
- `modules/planner`閿涙瓪POST /api/plan/generate`
- `application/usecases/generate-plan.usecase.ts`
- `agent/`閿涙rovider閵嗕垢rompt閵嗕垢arser閵嗕辜ools 妤犮劍鐏?- `modules/health`閿涙艾浠存惔閿嬵梾閺?
## 瀹告彃鐣幋?
- 閸楁洟銆夐棃顫唉娴滄帗绁︾粙瀣剁礄鐞涖劌宕?-> 閻㈢喐鍨氭稉?-> 缂佹挻鐏夐敍?- 瀹革缚鏅堕柨姘卞仯鐎佃壈鍩呮稉搴″礁娓氀呯波閺嬫粍膩閸?- 濮ｅ繑妫╃悰宀€鈻奸幎妯哄綌鐠囷附鍎忔稉搴℃勾閸ユ儳宕版担?marker
- 閸氬海顏張鈧亸蹇曟晸閹存劖甯撮崣锝堜粓鐠?- mock/閻喎鐤勭拠閿嬬湴閸掑洦宕查敍鍧刅ITE_USE_MOCK`閿?
## 閸氬海鐢婚崣顖涘⒖鐏炴洜鍋?
1. 閸?`apps/api/src/agent/providers/langchain-agent.provider.ts` 閹恒儱鍙嗛惇鐔风杽濡€崇€风拫鍐暏閵?2. 閸?`apps/api/src/agent/tool.registry.ts` 鐞涖儱鍙忓銉ュ徔鐠嬪啰鏁ら敍鍫濄亯濮樻柣鈧浇鐭剧痪瑁も偓渚€鍘惔妞尖偓渚€顣╃粻妤嬬礆閵?3. 鐏忓棗澧犵粩顖氭勾閸ユ儳宕版担宥囩矋娴犺埖娴涢幑顫礋閻喎鐤勯崷鏉挎禈 SDK閿涘湣apbox/妤傛ê鐥夌粵澶涚礆閵?4. 閻?SSE 婢х偛宸遍悽鐔稿灇娑擃叀绻冪粙瀣讲鐟欏棗瀵查敍鍫濆讲閸?planner 濡€虫健閺傛澘顤?stream 鐠侯垳鏁遍敍澶堚偓?
