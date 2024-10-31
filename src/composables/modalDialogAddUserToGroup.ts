import { ModalsContainer, useModal } from 'vue-final-modal'

import {
  SelectUser,
} from "../components/modals";

export function useAddUserToGroupDialog() {
  let closeDialog: any;
  const openDialog = (title: string, users: object[], onSuccess: any) => {
    const { open, close } = useModal({
      component: SelectUser,
      attrs: {
        title,
        users,
        async onConfirm(selectedUsers: any) {
          await onSuccess({users: selectedUsers});
          close();
        },
      },
      /*
      slots: {
        default: '<p>UseModal: The content of the modal</p>',
      },
      */     
    });
    closeDialog = close;
    open();
  }

  return {
    openDialog,
    closeDialog,
  }
}
