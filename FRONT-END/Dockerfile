FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts ./

# ✅ Disable husky via environment AND ignore scripts
ENV HUSKY=0

# ✅ Use --ignore-scripts to prevent prepare script from running
RUN npm install --ignore-scripts

# Manually run scripts if needed (except husky)
# e.g., RUN npm run build

COPY src ./src
COPY index.html ./
COPY public ./public

EXPOSE 5173

CMD ["npm", "run", "dev"]
