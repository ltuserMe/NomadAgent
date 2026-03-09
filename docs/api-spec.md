# API 鐟欏嫭鐗?
## GET /health

閸濆秴绨查敍?
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-03-06T08:00:00.000Z"
  }
}
```

## POST /api/plan/generate

鐠囬攱鐪版担鎿勭窗

```json
{
  "destination": "閸栨ぞ鍚?,
  "startDate": "2026-04-12",
  "endDate": "2026-04-14",
  "transport": "閸忣剙鍙℃禍銈夆偓?,
  "hotelPreference": "缂佸繑绁归崹瀣幁鎼?,
  "preferences": ["閼奉亞鍔ф搴″帨", "閸樺棗褰堕弬鍥у"],
  "extraRequirements": "閸戝繐鐨幑顫"
}
```

閸濆秴绨叉担鎿勭窗

```json
{
  "success": true,
  "data": {
    "plan": {
      "overview": {},
      "budget": {},
      "weather": {},
      "mapSpots": [],
      "days": []
    }
  }
}
```
