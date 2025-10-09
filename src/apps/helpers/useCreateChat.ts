import { useModal } from '../../hooks/useModal';
import Modal from '../../components/2_modals/Modal/Modal.vue';

export const useModalCreateChat = async (title: string, theme: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('../../components/2_modals/CreateChat/CreateChat.vue'),
    attrs: {
      title, 
    },
    Modal,
    modalAttrs: {
      theme,
    },
  });
  console.log('data', data);
  return data;
}
