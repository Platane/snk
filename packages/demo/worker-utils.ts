type API = Record<string, (...args: any[]) => any>;

const symbol = "worker-rpc__";

export const createRpcServer = (api: API) =>
  self.addEventListener("message", async (event) => {
    if (event.data?.symbol === symbol) {
      try {
        const res = await api[event.data.methodName](...event.data.args);
        self.postMessage({ symbol, key: event.data.key, res });
      } catch (error: any) {
        postMessage({ symbol, key: event.data.key, error: error.message });
      }
    }
  });

export const createRpcClient = <API_ extends API>(worker: Worker) => {
  const originalTerminate = worker.terminate;
  worker.terminate = () => {
    worker.dispatchEvent(new Event("terminate"));
    originalTerminate.call(worker);
  };

  return new Proxy(
    {} as {
      [K in keyof API_]: (
        ...args: Parameters<API_[K]>
      ) => Promise<Awaited<ReturnType<API_[K]>>>;
    },
    {
      get:
        (_, methodName) =>
        (...args: any[]) =>
          new Promise((resolve, reject) => {
            const key = Math.random().toString();

            const onTerminate = () => {
              worker.removeEventListener("terminate", onTerminate);
              worker.removeEventListener("message", onMessageHandler);
              reject(new Error("worker terminated"));
            };

            const onMessageHandler = (event: MessageEvent) => {
              if (event.data?.symbol === symbol && event.data.key === key) {
                if (event.data.error) reject(event.data.error);
                else if (event.data.res) resolve(event.data.res);

                worker.removeEventListener("terminate", onTerminate);
                worker.removeEventListener("message", onMessageHandler);
              }
            };

            worker.addEventListener("message", onMessageHandler);
            worker.addEventListener("terminate", onTerminate);
            worker.postMessage({ symbol, key, methodName, args });
          }),
    }
  );
};
