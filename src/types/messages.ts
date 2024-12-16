import { IAction } from './components'
import { IDialog } from './components'

export interface IAudioMessage {
  messageId: string
  position: string
  time: string
  url: string
  status: string
  avatar?: string
  subText?: string
  actions?: IAction[]
  views?: number,
  text?: string,
  transcript?: {
    text: string;
  };
  reply?: {
    type: string
    text: string
  }
}

export interface ICallMessage {
  messageId: string
  position: string
  time: string
  // status: string   //??? 
  url?: string
  isMissedCall?: Boolean
  callDuration?: string
  avatar?: string
  subText?: string
  actions?: IAction[]
  views?: number
  transcript?: {
    dialog: IDialog[];
  };
}



export interface IDateMessage {
  messageId?: string
  text: string
}

export interface IFileMessage {
  messageId: string
  filename: string
  position: string
  time: string
  url: string
  status: string
  avatar?: string
  subText?: string
  actions?: IAction[]
  views?: number,
  text?: string,
  reply?: {
    messageId: string
    type: string
    text: string
  }
}

export interface IImageMessage {
  messageId: string
  position: string
  time: string
  url: string
  alt?: string
  status: string
  avatar?: string
  subText?: string
  actions?: IAction[]
  views?: number,
  text?: string,
  reply?: {
    messageId: string
    type: string
    text: string
  }
}

export interface ISystemMessage {
  messageId: string
  text: string
}

export interface ITextMessage {
  messageId: string
  text: string
  position: string
  status: string
  time: string
  avatar?: string
  subText?: string
  actions?: IAction[]
  views?: number,
  reply?: {
    messageId: string
    type: string
    text: string
  }
}

export interface ITypingMessage {
  avatar?: string
  subText?: string
}

export interface IVideoMessage {
  messageId: string
  position: string
  status: string
  time: string
  url: string
  alt?: string
  avatar?: string
  subText?: string
  actions?: IAction[]
  views?: number,
  text?: string,
  reply?: {
    messageId: string
    type: string
    text: string
  }
}
