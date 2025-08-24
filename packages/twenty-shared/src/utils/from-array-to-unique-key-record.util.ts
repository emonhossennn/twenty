import { type StringPropertyKeys } from '@/utils/trim-and-remove-duplicated-whitespaces-from-object-string-properties';
import { isDefined } from '@/utils/validation';

/**
 * Converts an array of objects into a record keyed by a unique property.
 *
 * Previous implementation recreated the accumulator object on each iteration
 * using object spread, resulting in `O(n^2)` complexity and unnecessary
 * allocations. This version mutates a single accumulator object instead,
 * dramatically improving performance for large arrays while retaining the
 * duplicate-key protection.
 */
export const fromArrayToUniqueKeyRecord = <T extends Record<string, any>>({
  array,
  uniqueKey,
}: {
  array: T[];
  uniqueKey: StringPropertyKeys<T>;
}): Record<string, T> => {
  const record: Record<string, T> = {};

  for (const occurrence of array) {
    const currentUniqueKey = occurrence[uniqueKey] as string;

    if (isDefined(record[currentUniqueKey])) {
      throw new Error(
        `Should never occur, flat array contains twice the same unique key ${occurrence[uniqueKey]}`,
      );
    }

    record[currentUniqueKey] = occurrence;
  }

  return record;
};
