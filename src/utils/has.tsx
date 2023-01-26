/**
 * Проверяет, является ли указанное свойство собственным свойством объекта
 */
export function has<N extends string>(
  obj: unknown,
  propertyName: N
): obj is {
  [K in N]: unknown;
} {
  return (
    Object(obj) === obj &&
    Object.prototype.hasOwnProperty.call(obj, propertyName)
  );
}
