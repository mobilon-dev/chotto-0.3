import { useModal } from './modal-wrapper/useModal';

export const useModalCreateChat2 = async (title: string) => {
  const data = await useModal({
    //в component должен быть встроен emit change(key: value)
    component: import('./CreateChat2.vue'),
    attrs: {
      title, 
    },
  });
  // console.log('data', data);
  return data;
}
