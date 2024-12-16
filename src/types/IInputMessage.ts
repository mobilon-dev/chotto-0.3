import { Reply } from "./messages";

export interface IInputMessage {
  type: string
  text?: string
  url?: string
  filename?: string
  size?: string
  reply?: Reply
}
