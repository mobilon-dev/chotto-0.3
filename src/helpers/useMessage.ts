import { ref } from 'vue';

const message = ref('');

export const useMessage = () => {
    return message
}
