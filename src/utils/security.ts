/**
 * Web Code & Content Protection System
 * Developed by MRS Engineers BD for All Calculator
 *
 * Protects client-side source code, prevents accidental inspection,
 * disables context menu, blocks developer shortcut combinations,
 * and safeguards proprietary assets against trivial scraping.
 */

export const initSecurityProtection = (): void => {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click Context Menu (except in input / textarea for pasting)
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const isInputField =
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable);

    if (!isInputField) {
      e.preventDefault();
      return false;
    }
  });

  // 2. Block Developer Shortcuts & Source Viewing Key Combinations
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;

    // F12 -> Developer Tools
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U or Cmd+Option+U -> View Page Source
    if (
      (isCtrlOrMeta && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) ||
      (e.metaKey && e.altKey && (e.key === 'u' || e.key === 'U'))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Option+I -> Inspect Element
    if (
      (isCtrlOrMeta && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) ||
      (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I'))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+J / Cmd+Option+J -> Open Console
    if (
      (isCtrlOrMeta && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) ||
      (e.metaKey && e.altKey && (e.key === 'j' || e.key === 'J'))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+C / Cmd+Option+C -> Inspect Element Selector
    if (
      (isCtrlOrMeta && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) ||
      (e.metaKey && e.altKey && (e.key === 'c' || e.key === 'C'))
    ) {
      // Allow standard Ctrl+C copy inside inputs or when text is selected!
      if (!isCtrlOrMeta || e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    // Ctrl+S / Cmd+S -> Save Webpage Source
    if (isCtrlOrMeta && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // 3. Disable Dragging of Images & Assets
  document.addEventListener('dragstart', (e: DragEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // 4. Console Security Banner
  try {
    const bannerStyle =
      'background: #1e3a8a; color: #ffffff; font-size: 14px; font-weight: bold; padding: 8px 14px; border-radius: 6px;';
    const warningStyle =
      'color: #dc2626; font-size: 13px; font-weight: bold; line-height: 1.5;';
    const infoStyle =
      'color: #475569; font-size: 11px;';

    console.log('%c🔒 All Calculator Security System', bannerStyle);
    console.log(
      '%c⚠️ WARNING: This source code is proprietary and protected by copyright.\nUnauthorized inspection, cloning, reverse-engineering, or scraping is strictly forbidden.',
      warningStyle
    );
    console.log(
      '%c© ' + new Date().getFullYear() + ' MRS Engineers BD. All rights reserved.',
      infoStyle
    );
  } catch {
    // Silently ignore
  }
};
