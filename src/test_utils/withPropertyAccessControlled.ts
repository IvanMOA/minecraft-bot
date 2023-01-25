export function withPropertyAccessControlled<
  T extends Record<any, any>,
  K extends keyof T
>(proxiable: T, property: K) {
  const propertyValues: any[] = [];
  let entitiesPropertyTimesAccessed = 0;
  const proxy = new Proxy(proxiable, {
    get: function (object, prop) {
      if (prop === property) {
        entitiesPropertyTimesAccessed += 1;
        return propertyValues[entitiesPropertyTimesAccessed - 1];
      }
      // @ts-ignore
      return object[prop];
    },
  });
  const returnValue = {
    add(value: T[K]) {
      propertyValues.push(value);
      return returnValue;
    },
    finish() {
      return proxy;
    },
  };
  return returnValue;
}
