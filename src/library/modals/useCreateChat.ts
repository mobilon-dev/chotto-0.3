import { useModal } from './modal-wrapper/useModal';
import Modal from './modal-wrapper/Modal.vue';

export const useModalCreateChat = async (title: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./CreateChat.vue'),
    attrs: {
      title, 
    },
    Modal,
    modalAttrs: {

    },
  });
  console.log('data', data);
  return data;
}
