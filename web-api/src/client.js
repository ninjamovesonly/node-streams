import { get } from "http";
import { Transform, Writable } from "stream";

const url = "http://localhost:3091";

const getHttpStream = () =>
  new Promise((resolve) => get(url, (response) => resolve(response)));

const stream = await getHttpStream();

stream.pipe(
  Transform({
    transform(chunk, enc, cb) {
      console.log("chunk ", JSON.parse(chunk));
      cb(null, chunk);
    },
  })
);
