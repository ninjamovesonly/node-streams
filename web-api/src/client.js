import { get } from "http";
import { Transform, Writable } from "stream";
import { createWriteStream } from "fs";

const url = "http://localhost:3091";

const getHttpStream = () =>
  new Promise((resolve) => get(url, (response) => resolve(response)));

const stream = await getHttpStream();

stream
  .pipe(
    Transform({
      objectMode: true,
      transform(chunk, enc, cb) {
        const item = JSON.parse(chunk);

        const myNum = /\d+/.exec(item.name)[0];
        const isEven = myNum % 2 === 0;
        item.name = item.name.concat(isEven ? " is even" : " is odd");

        cb(null, JSON.stringify(item));
      },
    })
  )
  .filter((chunk) => chunk.includes("even"))
  .map((chunk) => chunk.toUpperCase() + "\n")
  .pipe(createWriteStream("response.log", { flag: "a" }));
// .pipe(
//   Writable({
//     objectMode: true,
//     write(chunk, enc, cb) {
//       console.log("chunk...", chunk);
//       return cb();
//     },
//   })
// );
// .pipe(process.stdout);
