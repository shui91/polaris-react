import {
  findFirstFocusableNode,
  FOCUSABLE_SELECTOR,
} from '@shopify/javascript-utilities/focus';

export function handleMouseUpByBlurring({
  currentTarget,
}: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  currentTarget.blur();
}

export function nextFocusableNode(
  node: HTMLElement,
): HTMLElement | Element | null {
  let nextElement = node.nextElementSibling;

  while (nextElement) {
    if (nextElement.matches(FOCUSABLE_SELECTOR)) return nextElement;

    if (nextElement instanceof HTMLElement) {
      const innerFocusableElement = findFirstFocusableNode(nextElement);
      if (innerFocusableElement) return innerFocusableElement;
    }

    nextElement = nextElement.nextElementSibling;
  }

  return nextElement;
}

export function focusNextFocusableNode(node: HTMLElement) {
  const nextFocusable = nextFocusableNode(node);
  if (nextFocusable && nextFocusable instanceof HTMLElement) {
    nextFocusable.focus();
    return true;
  }

  return false;
}
