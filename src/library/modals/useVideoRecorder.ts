import { useModal } from './modal-wrapper/useModal';
import Modal from './modal-wrapper/ModalNoFooter.vue';

export const useModalVideoRecorder = async (theme?: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./ModalVideoRecorder.vue'),
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
