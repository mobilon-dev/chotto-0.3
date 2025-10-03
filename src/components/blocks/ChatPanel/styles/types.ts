/**
 * CSS переменные для компонента ChatPanel
 */
export interface ChatPanelThemeCSSVariables {
  // Main container
  /** Отображение панели чата */
  '--chotto-chatpanel-display': string;
  /** Выравнивание элементов панели чата */
  '--chotto-chatpanel-align-items': string;
  /** Направление флекс-контейнера панели чата */
  '--chotto-chatpanel-flex-direction': string;
  /** Высота панели чата */
  '--chotto-chatpanel-height': string;

  // Header
  /** Отображение заголовка панели чата */
  '--chotto-chatpanel-header-display': string;
  /** Промежуток между элементами заголовка */
  '--chotto-chatpanel-header-gap': string;

  // Title container
  /** Отображение контейнера заголовка */
  '--chotto-chatpanel-title-container-display': string;
  /** Выравнивание по главной оси контейнера заголовка */
  '--chotto-chatpanel-title-container-justify': string;
  /** Выравнивание по поперечной оси контейнера заголовка */
  '--chotto-chatpanel-title-container-align': string;

  // Title
  /** Межбуквенное расстояние заголовка */
  '--chotto-chatpanel-title-letter-spacing': string;

  // Button close
  /** Цвет фона кнопки закрытия */
  '--chotto-chatpanel-button-close-bg': string;
  /** Граница кнопки закрытия */
  '--chotto-chatpanel-button-close-border': string;
  /** Курсор кнопки закрытия */
  '--chotto-chatpanel-button-close-cursor': string;

  // Scrollbar
  /** Ширина полосы прокрутки */
  '--chotto-chatpanel-scrollbar-width': string;
  /** Радиус границы ползунка полосы прокрутки */
  '--chotto-chatpanel-scrollbar-thumb-radius': string;
  /** Радиус границы дорожки полосы прокрутки */
  '--chotto-chatpanel-scrollbar-track-radius': string;

  // Border radius
  /** Радиус границы панели чата */
  '--chotto-chatpanel-border-radius': string;

  // Mobilon1 specific variables
  /** Ширина панели чата */
  '--chotto-chatpanel-width': string;
  /** Позиция панели чата слева */
  '--chotto-chatpanel-left': string;
  /** Отступы панели чата */
  '--chotto-chatpanel-padding': string;
  /** Цвет границы элемента панели чата */
  '--chotto-item-chatpanel-border-color': string;
}
