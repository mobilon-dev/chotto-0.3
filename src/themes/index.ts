/**
 * Chotto Themes - Main export file
 * 
 * This file exports all theme-related types, constants, and utilities
 * for the Chotto theme system.
 */

// Types
export type {
  ThemeName,
  ChottoThemeVariables,
  ThemeConfig,
  ThemeRegistry,
  ChottoThemeVariableName,
  RequiredChottoThemeVariables,
  OptionalChottoThemeVariables,
  ThemeValidationResult,
  ThemeValidationSummary
} from './types';

// Constants
export {
  THEME_NAMES,
  THEME_DISPLAY_NAMES,
  THEME_DESCRIPTIONS,
  THEME_VARIABLE_PREFIX,
  REQUIRED_THEME_VARIABLES,
  OPTIONAL_THEME_VARIABLES,
  ALL_THEME_VARIABLES,
  THEME_FILE_PATHS,
  DEFAULT_THEME,
  THEME_VALIDATION_CONFIG
} from './constants';

// Re-export theme styles
import './index.scss';
