# 📝 QuickQuiz — 智能题库与在线测验系统

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

> **安全认证 · 智能组卷 · 错题本反馈**

QuickQuiz 是一个基于前后端分离架构的个人题库管理与在线测验平台。核心致力于提供便捷的题目录入体验和科学的复习机制，帮助用户高效构建和管理个人知识库，随时随地进行自我测试。

---

## ✨ 核心功能

- 🔐 **安全认证**：基于 Spring Security + JWT 的无状态用户登录与注册。
- 📚 **题库管理**：支持单选题、多选题、判断题等多种题型的结构化录入与灵活编辑。
- 🧠 **智能组卷**：支持按知识点标签筛选、随机抽题进行模拟测验。
- 📈 **数据反馈**：自动记录错题（错题本），并提供基础的学习进度与成绩视图。

---

## 🚀 快速启动

### 1. 环境准备

请确保你的电脑上已安装以下环境：

- JDK 17
- Node.js（v18+）
- MySQL（v8.0+）

### 2. 后端部署

1. 在 MySQL 中创建名为 `quickquiz_db` 的数据库：

   ```sql
   CREATE DATABASE quickquiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

---

## 🖼️ 界面预览

<img width="639" height="941" alt="5aed737eaffad6539ec7d6dc9180b4d8" src="https://github.com/user-attachments/assets/259b4b9c-10e8-4e45-a9dd-610444b27710" />
<img width="2560" height="1155" alt="ea76d0c0d1fccf67986ec6a42c824738" src="https://github.com/user-attachments/assets/6d225e4f-509b-4264-93a7-9490ac649806" />
<img width="2544" height="1201" alt="ac99aae8d1be88ab5937bcd725daa739" src="https://github.com/user-attachments/assets/819f3cbb-2043-40ba-89d5-c8b775416485" />
<img width="2560" height="1199" alt="17a352961f133b5e879582838a629acd" src="https://github.com/user-attachments/assets/170383e8-64d9-4df1-9a03-317f9e52e32e" />

---

## 📂 项目结构

```text
QuickQuiz/
├── quickquiz-frontend/      # 前端（React 18 + Vite + Tailwind CSS）
│   └── src/                 # pages / components / router / context / layouts
├── QuickQuiz-backend/       # 后端（Spring Boot 3 + Spring Security + JPA）
│   └── src/main/java/...    # controller / dto / entity / exception / ai / ocr 等
├── docker/                  # docker-compose、前后端 Dockerfile 与 nginx.conf
├── docs/                    # stable-runbook、架构图与题库课程资料
├── output/playwright/       # Playwright 测试输出
└── README.md
```

---

## 🛠️ 技术栈

### 前端（Frontend）

- **核心框架**: React 18 + Vite
- **UI & 样式**: Tailwind CSS v4
- **路由与状态**: React Router DOM + Zustand（待定）

### 后端（Backend）

- **核心框架**: Java 17 + Spring Boot 3.2.5
- **安全鉴权**: Spring Security + JWT（JSON Web Token）
- **持久层框架**: Spring Data JPA / Hibernate
- **数据库**: MySQL 8.x + HikariCP

---

## 📖 Stable Runbook

本地开发、Docker 健康检查、CORS 与 API base URL 相关说明，见 [docs/stable-runbook.md](docs/stable-runbook.md)。

---

## 🖼️ 动态系统架构图

![QuickQuiz 动态系统架构图](docs/architecture/dynamic-archify-architecture.gif)

- [打开交互式动态架构图](docs/architecture/dynamic-archify-architecture.html)
- [查看架构源数据](docs/architecture/dynamic-archify-architecture.json)
