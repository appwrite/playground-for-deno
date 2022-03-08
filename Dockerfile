FROM denoland/deno:alpine-1.10.3
WORKDIR /app
COPY . .
RUN deno cache src/mod.ts
CMD deno run -A src/mod.ts