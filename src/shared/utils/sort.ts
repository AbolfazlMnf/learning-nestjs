import { Sort } from '../dtos/query-dto';

export const functionSort = (
  sort?: Sort,
): Record<string, 1 | -1> | Record<string, never> => {
  if (!sort) {
    return {};
  }
  switch (sort) {
    case Sort.Title:
      return { title: 1 };
    case Sort.CreatedAt:
      return { createdAt: -1 };
    case Sort.UpdatedAt:
      return { updatedAt: -1 };
    case Sort.LastName:
      return { lastName: 1 };
    default:
      return {};
  }
};
