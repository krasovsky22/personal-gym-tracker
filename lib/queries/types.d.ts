export type QueryResultType<T extends {}> = Promise<{
  success: boolean;
  data?: T;
}>;
