export interface FeedObject { 
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
    actions?: Action[]
    views?: Number
    callDuration?: string
    isMissedCall?: Boolean
  }

export interface Action{
    action: string
    title: string
    icon?: string
    prime?: string  
}

//аналог TypingMessage - убрать?
export interface FeedTyping {
    title?: string
    avatar?: string
  }
  
export interface FeedUnreadButton{
    color: string
    unreadAmount: Number
  }