import { createReadStream, createWriteStream, unlink } from "node:fs";
import os from "node:os";
import { cwd } from "node:process";
import busboy from "busboy";
import { type Context, JetPlugin } from "jetpath";
import path from "node:path";

export const jetbusboy = new JetPlugin({
  name: "busboyjet",
  version: "1.0.0",
  executor({}) {
    return {
      formData(ctx: Context) {
        return new Promise((res, rej) => {
          const data: Record<string, any> = {};
          try {
            const bb = busboy({ headers: ctx.request.headers });
            bb.on("file", (name: string, file: any, info: any) => {
              const oldPath = path.join(
                os.tmpdir(),
                info.filename + Date.now(),
              );
              info.location = oldPath;
              info.saveTo = (name: string): Promise<string> => {
                const newPath = path.resolve(cwd(), name);
                return new Promise<string>((res, rej) => {
                  var readStream = createReadStream(oldPath);
                  var writeStream = createWriteStream(newPath);
                  readStream.on("error", (e) => {
                    rej(e);
                  });
                  writeStream.on("error", (e) => {
                    rej(e);
                  });
                  readStream.on("close", function () {
                    unlink(oldPath, (_e) => {});
                    res(name);
                  });
                  readStream.pipe(writeStream);
                });
              };
              data[name] = info;
              file.pipe(createWriteStream(oldPath));
            });
            bb.on("field", (name: string, val: any) => {
              data[name] = val !== "undefined" ? val : undefined;
            });
            bb.on("close", () => {
              res(data);
            });
            ctx.request.pipe(bb);
          } catch (error) {
            rej(error);
          }
        });
      },
    };
  },
});
