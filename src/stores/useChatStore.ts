import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatsStore = defineStore('chats', () => {
	const chats: any = ref([])

	function setUnreadCounter(chatId: string, countUnread: number) {
		// console.log('setUnreadCounter', chatId, countUnread)
		// console.log(chats.value, 'chats')
		// @TODO fix any
		const chat: any = chats.value.find((c:any) => c.chatId === chatId)
		if (chat) {
			console.log('if chat found')
			chat.countUnread = countUnread
		}
	}

  function addChat(chat: any){
    chats.value.push(chat);
  }

	return { chats, setUnreadCounter, addChat }
})
