/**
 * Theme constants and configuration
 */

import type { ThemeName } from './types';

// Available theme names
export const THEME_NAMES: ThemeName[] = ['dark', 'default', 'green', 'mobilon1'] as const;

// Theme display names
export const THEME_DISPLAY_NAMES: Record<ThemeName, string> = {
  dark: 'Dark Theme',
  default: 'Default Theme', 
  green: 'Green Theme',
  mobilon1: 'Mobilon Theme'
} as const;

// Theme descriptions
export const THEME_DESCRIPTIONS: Record<ThemeName, string> = {
  dark: 'Dark theme with neutral colors and emerald accents',
  default: 'Default light theme with clean design',
  green: 'Green theme with emerald color palette',
  mobilon1: 'Mobilon brand theme with custom styling'
} as const;

// CSS variable prefix
export const THEME_VARIABLE_PREFIX = '--chotto-theme' as const;

// Required CSS variables (must be present in all themes)
export const REQUIRED_THEME_VARIABLES = [
  '--chotto-theme-font-family',
  '--chotto-theme-container-font-weight',
  '--chotto-theme-container-borders',
  '--chotto-theme-float-container-border-radius-header',
  '--chotto-theme-float-container-box-shadow',
  '--chotto-theme-float-container-bg-header',
  '--chotto-theme-modal-padding',
  '--chotto-theme-modal-border-radius',
  '--chotto-theme-modal-mask-background',
  '--chotto-theme-modal-overlay-shadow',
  '--chotto-theme-modal-bg',
  '--chotto-theme-layout-extended-third-col-bg',
  '--chotto-theme-layout-extended-second-col-bg',
  '--chotto-theme-layout-extended-first-col-bg',
  '--chotto-theme-layout-extended-first-col-width',
  '--chotto-theme-layout-extended-second-col-width',
  '--chotto-theme-layout-base-second-col-bg',
  '--chotto-theme-layout-base-first-col-bg',
  '--chotto-theme-layout-feed-bg',
  '--chotto-theme-message-right-bg',
  '--chotto-theme-message-right-secondary-bg',
  '--chotto-theme-message-left-bg',
  '--chotto-theme-message-left-secondary-bg',
  '--chotto-theme-message-accent-line-color',
  '--chotto-theme-message-focused-color',
  '--chotto-theme-message-margin',
  '--chotto-theme-message-type-icon-bg-color',
  '--chotto-theme-message-type-icon-color',
  '--chotto-theme-message-popup-info-bg-color',
  '--chotto-theme-message-popup-info-color',
  '--chotto-theme-message-border-radius',
  '--chotto-theme-audio-message-transcript-delimiter-color',
  '--chotto-theme-audio-message-pbc-background-color',
  '--chotto-theme-audio-message-pb-background-color',
  '--chotto-theme-call-message-phone-icon-missed-color',
  '--chotto-theme-system-message-bg-color',
  '--chotto-theme-primary-color',
  '--chotto-theme-secondary-color',
  '--chotto-theme-primary-text-color',
  '--chotto-theme-secondary-text-color',
  '--chotto-theme-header-font',
  '--chotto-theme-header-font-color',
  '--chotto-theme-header-font-size',
  '--chotto-theme-title-font-size',
  '--chotto-theme-text-font-size',
  '--chotto-theme-additional-text-font-size',
  '--chotto-theme-small-text-font-size',
  '--chotto-theme-header-font-weight',
  '--chotto-theme-title-font-weight',
  '--chotto-theme-button-icon-size',
  '--chotto-theme-text-icon-size',
  '--chotto-theme-small-text-icon-size',
  '--chotto-theme-button-color-active',
  '--chotto-theme-button-color-hover',
  '--chotto-theme-button-color-disabled',
  '--chotto-theme-action-button-color-active',
  '--chotto-theme-action-button-color-hover',
  '--chotto-theme-action-button-color-disabled',
  '--chotto-theme-shadow-color',
  '--chotto-theme-shadow-light-color',
  '--chotto-theme-status-color-received',
  '--chotto-theme-status-color-read',
  '--chotto-theme-item-background-color-focus',
  '--chotto-theme-item-background-color-hover',
  '--chotto-theme-item-border-color',
  '--chotto-theme-unread-background-color',
  '--chotto-theme-unread-text-color',
  '--chotto-theme-scrollbar-bg',
  '--chotto-theme-scrollbar-thumb-bg'
] as const;



// All CSS variables
export const ALL_THEME_VARIABLES = [
  ...REQUIRED_THEME_VARIABLES,
] as const;

// Theme file paths
export const THEME_FILE_PATHS: Record<ThemeName, string> = {
  dark: 'src/themes/dark/vars.scss',
  default: 'src/themes/default/vars.scss',
  green: 'src/themes/green/vars.scss',
  mobilon1: 'src/themes/mobilon1/vars.scss'
} as const;

// Default theme
export const DEFAULT_THEME: ThemeName = 'default';

// Theme validation settings
export const THEME_VALIDATION_CONFIG = {
  strictMode: true,
  allowOptionalVariables: true,
  validateSyntax: true,
  checkConsistency: true
} as const;
