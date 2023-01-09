import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";

const CACHE_DIR = path.join(__dirname, "cache", "http");
fs.mkdirSync(CACHE_DIR, { recursive: true });

const createMutex = () => {
  let locked = false;
  const q: any[] = [];

  const update = () => {
    if (locked) return;

    if (q[0]) {
      locked = true;
      q.shift()(() => {
        locked = false;
        update();
      });
    }
  };

  const request = () =>
    new Promise<() => void>((resolve) => {
      q.push(resolve);
      update();
    });

  return request;
};

const mutex = createMutex();

export const httpGet = async (url: string | URL): Promise<string> => {
  const cacheKey = url
    .toString()
    .replace(/https?:\/\//, "")
    .replace(/[^\w=&\?\.]/g, "_");

  const cacheFilename = path.join(CACHE_DIR, cacheKey);

  if (fs.existsSync(cacheFilename))
    return new Promise((resolve, reject) =>
      fs.readFile(cacheFilename, (err, data) =>
        err ? reject(err) : resolve(data.toString())
      )
    );

  const release = await mutex();

  try {
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 429 || res.statusText === "Too Many Requests") {
        const delay = +(res.headers.get("retry-after") ?? 300) * 1000;

        console.log("Too Many Requests", delay);

        await wait(delay);

        console.log("waited long enough");

        return httpGet(url);
      }

      console.error(url, res.status, res.statusText);
      throw new Error("res not ok");
    }

    const text = await res.text();

    fs.writeFileSync(cacheFilename, text);

    // await wait(Math.random() * 200 + 100);

    return text;
  } finally {
    release();
  }
};

const wait = (delay = 0) => new Promise((r) => setTimeout(r, delay));
