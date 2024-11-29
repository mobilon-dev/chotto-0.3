export interface FeedObject { 
    messageId: String
    type: String
    text?: String
    position?: String
    status?: String
    time?: String
    url?: String
    alt?: String
    filename?: String
    avatar?: String
    subtext?: String 
    actions?: Action[]
    views?: Number
    callDuration?: String
    isMissedCall?: Boolean
  }
  
export interface Action{
    action: String
    title: String
    icon?: String
    prime?: String  
}

//аналог TypingMessage - убрать?
export interface FeedTyping {
    title?: String
    avatar?: String
  }
  
export interface FeedUnreadButton{
    color: string
    unreadAmount: Number
  }