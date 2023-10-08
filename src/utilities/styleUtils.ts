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

export function getImageHeightForDisplay(breakpoint: string): number {
  switch (breakpoint) {
    case "sm":
      return 350;
    case "md":
      return 400;
    case "lg":
    case "xl":
    case "xxl":
      return 250;
    default:
      return 250;
  }
}

export function useImageCoverForDisplay(breakpoint: string): boolean {
  switch (breakpoint) {
    case "sm":
      return false;
    case "md":
      return false;
    case "lg":
    case "xl":
    case "xxl":
      return false;
    default:
      return false;
  }
}
