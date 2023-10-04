export default function createStyleForDisplay(
  style: string,
  breakpoint: string
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

export function getImageSizeForDisplay(breakpoint: string): number {
  switch (breakpoint) {
    case "sm":
      return 300;
    case "md":
      return 325;
    case "lg":
    case "xl":
    case "xxl":
      return 350;
    default:
      return 250;
  }
}
