FROM denoland/deno:alpine-1.23.1@sha256:ae21c7a5fa00ee598b5a9e504d7097c95c275420646a4466869a398027ba90ed
WORKDIR /app
COPY . .
RUN deno cache src/mod.ts
CMD deno run -A src/mod.ts