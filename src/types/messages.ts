import {Action} from './components'

  export interface IAudioMessage { 
    messageId: string
    position: string
    time: string
    url: string
    status: string
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
  }

  export interface ICallMessage { 
    messageId: string
    position: string
    time: string
    status: string
    url?: string
    isMissedCall?: Boolean
    callDuration?: string
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
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
    actions?: Action[]
    views?: Number
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
    actions?: Action[]
    views?: Number
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
    actions?: Action[]
    views?: Number
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
    actions?: Action[]
    views?: Number
  }