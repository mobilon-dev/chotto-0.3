import { useModal } from './useModal';
import Modal from '../components/atoms/ModalNoFooter.vue';

export const useModalVideoRecorder = async (theme?: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('../components/organisms/ModalVideoRecorder.vue'),
    attrs: {
    },
    Modal,
    modalAttrs: {
      theme,
    },
  });
  //console.log('data', data);
  return data;
}
