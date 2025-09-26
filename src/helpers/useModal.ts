import {
    createApp,
    defineComponent,
    h,
    App,
    ref,
    defineAsyncComponent,
    Component,
} from 'vue'

export function useModal({component, attrs, Modal, modalAttrs}: {
    component: Promise<Component>;
    attrs: Record<string, unknown>;
    Modal: Component;
    modalAttrs: Record<string, unknown>;
}): Promise<Record<string, unknown>> {
    return new Promise((resolve) => {
        const modalDiv = document.createElement('div')
        document.body.appendChild(modalDiv)

        const Data = ref<Record<string, unknown>>({})
        const closeHandler = () => {
            app.unmount()
            document.body.removeChild(modalDiv)
        }

        const submitHandler = () => {
            closeHandler()
            // console.log('ddd', Data.value)
            resolve(Data.value)
        }

        const changeDataHandler = (data: Record<string, unknown>) => {
            Object.keys(data).forEach(key => {
                Data.value[key] = data[key]
            })
        }

        const ModalWrapper = defineComponent({
            render() {
                return h(
                    Modal,
                    {
                        ...modalAttrs,
                        onClose: closeHandler,
                        onSubmit: submitHandler,
                    },
                    {
                        default: () =>
                            h(
                                defineAsyncComponent(() => component),
                                {
                                    ...attrs,
                                    onChange: changeDataHandler,
                                    onSubmit: submitHandler,
                                    onClose: closeHandler,
                                }
                            ),
                    }
                )
            },
        })

        const app: App = createApp(ModalWrapper)
        app.mount(modalDiv)
    })
}
