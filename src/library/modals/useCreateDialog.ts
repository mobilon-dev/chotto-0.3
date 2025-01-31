import { useModal } from './modal-wrapper/useModalNoFooter';

export const useModalCreateDialog = async (title: string, name: string, contacts, channels) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./CreateDialog.vue'),
    attrs: {
      title, 
      name,
      contacts,
      channels,
    },
  });
  // console.log('data', data);
  return data;
}
