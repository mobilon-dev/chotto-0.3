import { useModal } from './modal-wrapper/useModal';
import Modal from './modal-wrapper/Modal.vue';

export const useModalSelectUser2 = async (title, users) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./SelectUser2.vue'),
    attrs: {
      title, 
      users,
    },
    Modal,
    modalAttrs: {
      
    },
  });
  console.log('data', data);
  return data;
}
