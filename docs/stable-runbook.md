# QuickQuiz Stable Runbook

## Local development

- Backend default API: `http://localhost:8080/api`
- Frontend default dev server: `http://localhost:5173`
- In non-`prod` profiles, the backend allows CORS from `http://localhost:5173` and `http://127.0.0.1:5173` when `CORS_ALLOWED_ORIGINS` is not set.
- Frontend requests default to relative `/api`. For a direct backend URL, set `VITE_API_BASE_URL`, for example:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

## Docker deployment

- `docker/docker-compose.yml` starts MySQL, backend, and nginx frontend.
- Backend health check uses `/actuator/health`; keep `spring-boot-starter-actuator` in the backend dependencies.
- Docker backend runs with `SPRING_PROFILES_ACTIVE=prod`; set `CORS_ALLOWED_ORIGINS` only if the frontend is served from another origin.

## Verification

These commands may write build output or dependency caches. If C drive usage is a concern, confirm the expected cache/write impact first.

```bash
cd QuickQuiz-backend && ./mvnw test
cd quickquiz-frontend && npm run build
cd docker && docker compose config
```
