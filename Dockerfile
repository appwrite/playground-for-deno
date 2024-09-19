FROM denoland/deno:alpine-1.23.1
WORKDIR /app
COPY . .
RUN deno cache src/mod.ts
CMD deno run -A src/mod.ts