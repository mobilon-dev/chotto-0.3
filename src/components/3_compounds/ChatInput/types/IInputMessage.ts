import { Reply } from "../../../2_feed_elements/types/messages";

export interface IInputMessage {
  type: string
  text?: string
  url?: string
  filename?: string
  size?: string
  reply?: Reply
}
