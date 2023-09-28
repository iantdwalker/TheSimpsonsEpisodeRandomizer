export default function createStyleForDisplay(
  style: string,
  breakpoint: string,
): string {
  switch (breakpoint) {
    case "sm":
      return `${style}-sm`;
    case "md":
      return `${style}-md`;
    case "lg":
    case "xl":
    case "xxl":
      return `${style}-lgPlus`;
    default:
      return style;
  }
}
