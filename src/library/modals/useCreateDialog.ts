import { useModal } from './modal-wrapper/useModal';
import Modal from './modal-wrapper/ModalNoFooter.vue';

export const useModalCreateDialog = async (title: string, name: string, contacts, channels, filter: Function, theme?: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./CreateDialog.vue'),
    attrs: {
      title, 
      name,
      contacts,
      channels,
      filter,
    },
    Modal,
    modalAttrs: {
      theme,
    },
  });
  // console.log('data', data);
  return data;
}
