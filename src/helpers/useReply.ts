import { ref } from 'vue';

const replyMessageIds = ref<string[]>([])

export const useReply = (outId : string) => {

    const index = ref<number>(0)

    let foundMessage = replyMessageIds.value.find((id) => id == outId)
    if (foundMessage != undefined){
        index.value = replyMessageIds.value.indexOf(foundMessage)
    } 
    else {
        replyMessageIds.value.push(outId)
        index.value = replyMessageIds.value.length - 1
    }
    
/**================================================================ */

    const setReplyId = (messageId : string) => {
        replyMessageIds.value[index.value] = messageId
    }

    function getReplyId () {
        return replyMessageIds.value[index.value]
    }

    return {
        setReplyId,
        getReplyId,
    }
}
