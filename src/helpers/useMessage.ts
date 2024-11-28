import { ref } from 'vue';

interface Message {
    text: string
    fileUrl: string
    fileName: string
    fileSize: Number
    fileType: string
}

interface File{
    url: string
    name: string
    size: Number
    type: string
}

const message = ref<Message>({
    text: '',
    fileUrl: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
});

export const useMessage = () => {

    const resetMessage = () => {
        message.value = {
            text: '',
            fileUrl: '',
            fileName: '',
            fileSize: 0,
            fileType: '',
        }
    }

    const setMessageFile = (file : File) => {
        message.value = {
            text: message.value.text,
            fileUrl: file.url,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
        }
    }

    const resetMessageFile = () => {
        message.value = {
            text: message.value.text,
            fileUrl: '',
            fileName: '',
            fileSize: 0,
            fileType: '',
        }
    }

    return {message, resetMessage, setMessageFile, resetMessageFile}
}
