import { ref } from 'vue';
import { Reply } from '../types';

interface Message {
    id: string
    text: string
    file?: UploadedFile
    reply?: Reply
    forceSend: boolean
    isRecording: boolean
}

interface UploadedFile{
    url: string
    name?: string
    size?: number
    type?: string
}

const messages = ref<Message[]>([])

export const useMessage = (outId : string) => {

    const index = ref<number>(0)

    const foundMessage = messages.value.find(({id}) => id == outId)
    if (foundMessage != undefined){
        index.value = messages.value.indexOf(foundMessage)
    } 
    else {
        messages.value.push({
            id: outId,
            text: '',
            file: undefined,
            forceSend: false,
            isRecording: false
        })
        index.value = messages.value.length - 1
    }
    
/**================================================================ */

    const resetMessage = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: '',
            file: undefined,
            reply: undefined,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    const setMessageText = (text : string) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: text,
            file: getMessage().file,
            reply: getMessage().reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    const setMessageFile = (file : UploadedFile) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: file,
            reply: getMessage().reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    const resetMessageFile = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: undefined,
            reply: getMessage().reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    const setReply = (reply : Reply) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: getMessage().file,
            reply: reply,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    const resetReply = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: getMessage().file,
            reply: undefined,
            forceSend: false,
            isRecording: getMessage().isRecording,
        }
    }

    function getMessage () {
        return messages.value[index.value]
    }

    const setForceSendMessage = (val : boolean) => {
        messages.value[index.value].forceSend = val
    } 

    const setRecordingMessage = (val : boolean) => {
        messages.value[index.value].isRecording = val
    } 

    return {
        getMessage,
        resetMessage,
        setMessageFile,
        resetMessageFile,
        setMessageText,
        setReply,
        resetReply,
        setForceSendMessage,
        setRecordingMessage,
    }
}
