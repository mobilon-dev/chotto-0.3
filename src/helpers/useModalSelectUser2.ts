import { useModal } from './useModal';
import Modal from '../components/atoms/Modal/Modal.vue';

export const useModalSelectUser2 = async (title, users, theme) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('../components/molecules/SelectUser2/SelectUser2.vue'),
    attrs: {
      title, 
      users,
    },
    Modal,
    modalAttrs: {
      theme,
    },
  });
  console.log('data', data);
  return data;
}
