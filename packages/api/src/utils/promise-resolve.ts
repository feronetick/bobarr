function invert<TResult>(
  promise: Promise<TResult[] | TResult>
): Promise<TResult> {
  return new Promise((res, rej) => promise.then(rej, res));
}
