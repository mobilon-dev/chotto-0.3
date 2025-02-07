import {
    createApp,
    defineComponent,
    h,
    App,
    ref,
    defineAsyncComponent,
} from 'vue'

export function useModal<T>({component, attrs, Modal, modalAttrs}): Promise<any> {
    return new Promise((resolve) => {
        const modalDiv = document.createElement('div')
        document.body.appendChild(modalDiv)

        const Data = ref({})
        const closeHandler = () => {
            app.unmount()
            document.body.removeChild(modalDiv)
        }

        const submitHandler = () => {
            closeHandler()
            // console.log('ddd', Data.value)
            resolve(Data.value as any)
        }

        const changeDataHandler = (data: Object) => {
            Object.keys(data).forEach(key => {
                Data.value[key] = data[key]
            })
        }

        const ModalWrapper = defineComponent({
            render() {
                return h(
                    Modal as any,
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
