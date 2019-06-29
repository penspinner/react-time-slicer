const inDOM = typeof window !== 'undefined';
// @ts-ignore
const inNative = typeof global !== 'undefined';
// @ts-ignore
const globalObject = inDOM ? window : inNative ? global : undefined;

export default globalObject;
