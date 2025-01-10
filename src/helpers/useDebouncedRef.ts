import { customRef } from 'vue'

function useDebouncedRef(value : any, delay = 500) {
  let timeout : number | undefined
  return customRef((track, trigger) => {
    return {
      get() {
        track() // подпишемся на чтение
        return value
      },
      set(newValue) {
        if (!timeout){
          timeout = window.setTimeout(() => {
            value = newValue
            trigger() // уведомим, что значение изменилось
            timeout = undefined
          }, delay)
        }
      }
    }
  })
}

export default useDebouncedRef