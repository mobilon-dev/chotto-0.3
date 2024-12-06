import { ref } from 'vue';

interface Message {
    id: string
    text: string
    file?: UploadedFile
}

interface UploadedFile{
    url: string
    name: string
    size: Number
    type: string
}

const messages = ref<Message[]>([])

export const useMessage = (outId : string) => {

    const index = ref<number>(0)

    let foundMessage = messages.value.find(({id}) => id == outId)
    if (foundMessage != undefined){
        index.value = messages.value.indexOf(foundMessage)
    } 
    else {
        messages.value.push({
            id: outId,
            text: '',
            file: undefined,
        })
        index.value = messages.value.length - 1
    }
    
/**================================================================ */

    const resetMessage = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: '',
            file: undefined,
        }
    }

    const setMessageText = (text : string) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: text,
            file: getMessage().file,
        }
    }

    const setMessageFile = (file : UploadedFile) => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: file,
        }
    }

    const resetMessageFile = () => {
        messages.value[index.value] = {
            id: getMessage().id,
            text: getMessage().text,
            file: undefined,
        }
    }

    function getMessage () {
        return messages.value[index.value]
    }

    return { getMessage, resetMessage, setMessageFile, resetMessageFile, setMessageText }
}
