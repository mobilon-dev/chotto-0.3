/*
  TypeScript types for Chotto theme CSS variables
*/

// Available theme names
export type ThemeName = 'dark' | 'default' | 'green' | 'mobilon1';

// Base color palette types
export type ColorValue = string;
export type FontFamily = string;
export type FontSize = string;
export type FontWeight = string | number;
export type BorderRadius = string;
export type BoxShadow = string;
export type Margin = string;
export type Padding = string;
export type Width = string;
export type Height = string;

// Chotto theme CSS variables interface
export interface ChottoThemeVariables {
  // Container
  '--chotto-theme-font-family': FontFamily;
  '--chotto-theme-container-font-weight': FontWeight;
  '--chotto-theme-container-borders': string;

  // Float Container
  '--chotto-theme-float-container-border-radius-header': BorderRadius;
  '--chotto-theme-float-container-box-shadow': BoxShadow;
  '--chotto-theme-float-container-bg-header': ColorValue;

  // Modal Container
  '--chotto-theme-modal-padding': Padding;
  '--chotto-theme-modal-border-radius': BorderRadius;
  '--chotto-theme-modal-mask-background': ColorValue;
  '--chotto-theme-modal-overlay-shadow': BoxShadow;
  '--chotto-theme-modal-bg': ColorValue;

  // Extended Layout
  '--chotto-theme-layout-extended-third-col-bg': ColorValue;
  '--chotto-theme-layout-extended-second-col-bg': ColorValue;
  '--chotto-theme-layout-extended-first-col-bg': ColorValue;
  '--chotto-theme-layout-extended-first-col-width': Width;
  '--chotto-theme-layout-extended-second-col-width': Width;

  // Base Layout
  '--chotto-theme-layout-base-second-col-bg': ColorValue;
  '--chotto-theme-layout-base-first-col-bg': ColorValue;

  // Feed Layout
  '--chotto-theme-layout-feed-bg': ColorValue;

  // Messages
  '--chotto-theme-message-right-bg': ColorValue;
  '--chotto-theme-message-right-secondary-bg': ColorValue;
  '--chotto-theme-message-left-bg': ColorValue;
  '--chotto-theme-message-left-secondary-bg': ColorValue;
  '--chotto-theme-message-accent-line-color': ColorValue;
  '--chotto-theme-message-focused-color': ColorValue;
  '--chotto-theme-message-margin': Margin;
  '--chotto-theme-message-type-icon-bg-color': ColorValue;
  '--chotto-theme-message-type-icon-color': ColorValue;
  '--chotto-theme-message-popup-info-bg-color': ColorValue;
  '--chotto-theme-message-popup-info-color': ColorValue;
  '--chotto-theme-message-border-radius': BorderRadius;

  // Audio Message
  '--chotto-theme-audio-message-transcript-delimiter-color': ColorValue;
  '--chotto-theme-audio-message-pbc-background-color': ColorValue;
  '--chotto-theme-audio-message-pb-background-color': ColorValue;

  // Call Message
  '--chotto-theme-call-message-phone-icon-missed-color': ColorValue;

  // System Message
  '--chotto-theme-system-message-bg-color': ColorValue;

  // Primary Colors
  '--chotto-theme-primary-color': ColorValue;
  '--chotto-theme-secondary-color': ColorValue;

  // Text Colors
  '--chotto-theme-primary-text-color': ColorValue;
  '--chotto-theme-secondary-text-color': ColorValue;

  // Typography
  '--chotto-theme-header-font': FontFamily;
  '--chotto-theme-header-font-size': FontSize;
  '--chotto-theme-title-font-size': FontSize;
  '--chotto-theme-text-font-size': FontSize;
  '--chotto-theme-additional-text-font-size': FontSize;
  '--chotto-theme-small-text-font-size': FontSize;

  // Font Weights
  '--chotto-theme-header-font-weight': FontWeight;
  '--chotto-theme-title-font-weight': FontWeight;

  // Icon Sizes
  '--chotto-theme-button-icon-size': FontSize;
  '--chotto-theme-text-icon-size': FontSize;
  '--chotto-theme-small-text-icon-size': FontSize;

  // Button Colors
  '--chotto-theme-button-color-active': ColorValue;
  '--chotto-theme-button-color-hover': ColorValue;
  '--chotto-theme-button-color-disabled': ColorValue;

  // Action Button Colors
  '--chotto-theme-action-button-color-active': ColorValue;
  '--chotto-theme-action-button-color-hover': ColorValue;
  '--chotto-theme-action-button-color-disabled': ColorValue;

  // Shadows
  '--chotto-theme-shadow-color': ColorValue;
  '--chotto-theme-shadow-light-color': ColorValue;

  // Status Colors
  '--chotto-theme-status-color-received': ColorValue;
  '--chotto-theme-status-color-read': ColorValue;

  // Item States
  '--chotto-theme-item-background-color-focus': ColorValue;
  '--chotto-theme-item-background-color-hover': ColorValue;
  '--chotto-theme-item-border-color': ColorValue;

  // Unread States
  '--chotto-theme-unread-background-color': ColorValue;
  '--chotto-theme-unread-text-color': ColorValue;

  // Scroll Bar
  '--chotto-theme-scrollbar-bg': ColorValue;
  '--chotto-theme-scrollbar-thumb-bg': ColorValue;

  // Optional variables (only in some themes)
  '--chotto-theme-header-font-color'?: ColorValue;
  '--chotto-theme-small-text-font-weight'?: FontWeight;
  '--chotto-theme-context-menu-font-size'?: FontSize;
  '--chotto-theme-danger-button-color-active'?: ColorValue;
  '--chotto-theme-danger-button-color-hover'?: ColorValue;
  '--chotto-theme-danger-button-color-disabled'?: ColorValue;
}

// Theme configuration interface
export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  description: string;
  variables: ChottoThemeVariables;
}

// Theme registry type
export type ThemeRegistry = Record<ThemeName, ThemeConfig>;

// Utility type for CSS variable names
export type ChottoThemeVariableName = keyof ChottoThemeVariables;

// Utility type for required variables (all themes must have)
export type RequiredChottoThemeVariables = Omit<ChottoThemeVariables, 
  '--chotto-theme-header-font-color' |
  '--chotto-theme-small-text-font-weight' |
  '--chotto-theme-context-menu-font-size' |
  '--chotto-theme-danger-button-color-active' |
  '--chotto-theme-danger-button-color-hover' |
  '--chotto-theme-danger-button-color-disabled'
>;

// Utility type for optional variables (only in some themes)
export type OptionalChottoThemeVariables = Pick<ChottoThemeVariables,
  '--chotto-theme-header-font-color' |
  '--chotto-theme-small-text-font-weight' |
  '--chotto-theme-context-menu-font-size' |
  '--chotto-theme-danger-button-color-active' |
  '--chotto-theme-danger-button-color-hover' |
  '--chotto-theme-danger-button-color-disabled'
>;

// Theme validation result
export interface ThemeValidationResult {
  theme: ThemeName;
  isValid: boolean;
  missingVariables: ChottoThemeVariableName[];
  extraVariables: ChottoThemeVariableName[];
  syntaxErrors: Array<{
    variable: ChottoThemeVariableName;
    error: string;
    line: number;
  }>;
}

// Theme validation summary
export interface ThemeValidationSummary {
  totalThemes: number;
  validThemes: number;
  totalVariables: number;
  totalErrors: number;
  totalWarnings: number;
  results: ThemeValidationResult[];
}
