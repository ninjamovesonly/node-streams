import http from "http";
import { Readable } from "stream";
import { randomUUID } from "crypto";

function* run() {
  for (let idx = 0; idx <= 99; idx++) {
    const data = {
      id: randomUUID(),
      name: `John-${idx}`,
      at: Date.now(),
    };
    yield data;
  }
}

function handler(request, response) {
  const readableStream = Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat("\n"));
      }

      this.push(null);
    },
  });

  readableStream.pipe(response);
}

http
  .createServer(handler)
  .listen(3091)
  .on("listening", () => console.log("server is running in port 3091"));
