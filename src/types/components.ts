import { IAudioMessage, ICallMessage, IDateMessage, IFileMessage, IImageMessage, IKeyBoard, ILinkPreview, ISystemMessage, ITextMessage, ITypingMessage, IVideoMessage, Reply } from "./messages"

export interface IFeedObject {
  messageId: string
  type: string
  header?: string
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
  views?: number
  callDuration?: string
  isMissedCall?: boolean
  reply?: Reply
  linkPreview?: ILinkPreview
  keyboard?: IKeyBoard[]
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

export interface IFeedTyping {
  title?: string
  avatar?: string
}

export interface IFeedUnreadButton {
  // color: string
  unreadAmount: number
}

export interface IDialog {
  time: string,
  text: string,
  position: string
} 

export interface IFilePreview {
  previewUrl?: string
  isImage: boolean  
  isVideo: boolean
  isAudio: boolean
  fileName?: string
  fileSize: string
}

export interface IChatDialog {
  branchId: string;
  dialogId: string;
  attributeId: string;
  channelId: string;
  icon?: string;
  name: string;
  fullname: string;
  countUnread: number;
  'lastActivity.time': string;
  'lastActivity.timestamp': number;
  isSelected: boolean;
  colorUnread?: string;
}

export interface IChatItem {
  chatId: number;
  name: string;
  avatar?: string;
  countUnread: number;
  lastMessage: string;
  'lastActivity.time': string;
  'lastActivity.timestamp': string;
  isFixedBottom: boolean;
  isFixedTop?: boolean;
  status: string;
  'lastMessage.status': string;
  actions?: IAction[];
  typing: boolean;
  metadata: string;
  dialogsExpanded: boolean;
  dialogs?: IChatDialog[];
  isSelected: boolean;
}