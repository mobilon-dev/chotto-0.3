import { useModal } from './useModal';
import Modal from '../components/1_atoms/ModalNoFooter/ModalNoFooter.vue';

export const useModalVideoRecorder = async (theme?: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('../components/3_compounds/ModalVideoRecorder/ModalVideoRecorder.vue'),
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
