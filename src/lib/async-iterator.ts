type SetupFn<T> = (context: { send: (value: T) => any, stop: () => any; }) => any;

export function createAsyncIterator<T>(setupFn: SetupFn<T>) {
  let resolve: (value: { value: T, done?: boolean; }) => any;

  const iterator: AsyncIterator<T> = {
    async next() {
      const resolvers = Promise.withResolvers<{ value: T, done?: boolean; }>();
      resolve = resolvers.resolve;
      return await resolvers.promise;
    }
  };

  function send(value: T) {
    resolve?.({ value, done: false });
  }

  function stop() {
    resolve?.({ done: true } as any);
  }

  setupFn({ send, stop });

  return iterator;
}

createAsyncIterator.withResolvers = <T>() => {
  let send: (value: T) => any;
  let stop: () => any;

  const stream = createAsyncIterator<T>((context) => {
    send = context.send;
    stop = context.stop;
  });

  return {
    stream,
    send: send!,
    stop: stop!
  };
};