// try {
//   process.stdin.on("data", (data) => {
//     console.log("terminal data in -> ", data);
//     process.stdout.write(data.toString().toUpperCase());
//   });

//   // stdin.resume();

//   // const stdout = process.stdout.on("data", (data) => {
//   //   process.stdout.write(data.toString().toUpperCase());
//   // });

//   // stdin.pipe(stdout);
// } catch (err) {
//   console.error("error... ", err);
// }

process.stdout.write(crypto.randomBytes(1e9));
