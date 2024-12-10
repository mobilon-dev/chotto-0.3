import { IAudioMessage, ICallMessage, IDateMessage, IFileMessage, IImageMessage, ISystemMessage, ITextMessage, ITypingMessage, IVideoMessage } from "./messages"

export interface IFeedObject {
  messageId: string
  type: string
  text?: string
  position?: string
  status?: string
  time?: string
  url?: string
  alt?: string
  filename?: string
  avatar?: string
  subtext?: string
  actions?: IAction[]
  views?: Number
  callDuration?: string
  isMissedCall?: Boolean
}

export type TFeedObject =
  IAudioMessage |
  ICallMessage |
  IDateMessage |
  IFileMessage |
  IImageMessage |
  ISystemMessage |
  ITextMessage |
  ITypingMessage |
  IVideoMessage

export interface IAction {
  action: string
  title: string
  icon?: string
  prime?: string
}

//аналог TypingMessage - убрать?
export interface IFeedTyping {
  title?: string
  avatar?: string
}

export interface IFeedUnreadButton {
  // color: string
  unreadAmount: Number
}

export interface IDialog {
  time: string,
  text: string,
  position: string
} 
