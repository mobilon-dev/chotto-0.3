import {Action} from './components'

export interface audioMessage { 
    messageId: string
    position: string
    time: string
    timestamp: Number
    url: string
    status: string
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
  }

  export interface callMessage { 
    messageId: string
    position: string
    time: string
    timestamp: Number
    status: string
    isMissedCall?: Boolean
    callDuration?: string
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
  }

  export interface dateMessage { 
    messageId: string
    text: string
    timestamp: Number
  }

  export interface fileMessage { 
    messageId: string
    filename: string
    position: string
    time: string
    timestamp: Number
    url: string
    status: string
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
  }

  export interface imageMessage { 
    messageId: string
    position: string
    time: string
    timestamp: Number
    url: string
    alt?: string
    status: string
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
  }

  export interface systemMessage { 
    messageId: string
    text: string
    timestamp: Number
  }

  export interface textMessage { 
    messageId: string
    text: string
    position: string
    status: string
    time: string
    timestamp: Number
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
  }

  export interface typingMessage { 
    avatar?: string
    subText?: string 
  }

  export interface videoMessage { 
    messageId: string
    position: string
    status: string
    time: string
    timestamp: Number
    url: string
    alt?: string
    avatar?: string
    subText?: string 
    actions?: Action[]
    views?: Number
  }