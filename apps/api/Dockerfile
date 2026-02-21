# A build context a monorepo gyökere (docker-compose.yml build.context: .)
FROM node:22-alpine
WORKDIR /app

# Prisma schema másolása (gyökérből, mivel a build context a monorepo gyökere)
COPY prisma ./prisma

# API függőségek
COPY apps/api/package*.json ./
RUN npm install

# Prisma client generálása
RUN npx prisma generate --schema=./prisma/schema.prisma

# API forráskód
COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./

EXPOSE 3001
# TODO: Éles deploynál 'npm run build && npm start' – fejlesztéshez tsx elég
CMD ["npx", "tsx", "src/index.ts"]
