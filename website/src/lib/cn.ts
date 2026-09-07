export type ClassValue = string | false | null | undefined;

export const cn = (...classes: ClassValue[]): string =>
  classes.filter((className): className is string => Boolean(className)).join(' ');
