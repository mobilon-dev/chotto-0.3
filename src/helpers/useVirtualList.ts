import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export interface VirtualItem<T> {
  id: string | number
  data: T
  offset: number
  index: number
}

export interface UseVirtualListOptions {
  itemHeight: number
  overscan?: number
  containerHeight?: number
}

export function useVirtualList<T>(
  items: T[],
  options: UseVirtualListOptions,
  getId: (item: T, index: number) => string | number = (_, index) => index
) {
  const { itemHeight, overscan = 5, containerHeight: initialHeight = 0 } = options
  
  const scrollTop = ref(0)
  const containerHeight = ref(initialHeight)
  const containerRef = ref<HTMLElement>()
  
  // Общая высота всех элементов
  const totalHeight = computed(() => items.length * itemHeight)
  
  // Вычисляем видимые элементы
  const visibleItems = computed(() => {
    if (!containerHeight.value || items.length === 0) return []
    
    const startIndex = Math.max(0, Math.floor(scrollTop.value / itemHeight) - overscan)
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop.value + containerHeight.value) / itemHeight) + overscan
    )
    
    const visibleItems: VirtualItem<T>[] = []
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push({
        id: getId(items[i], i),
        data: items[i],
        offset: i * itemHeight,
        index: i
      })
    }
    
    return visibleItems
  })
  
  // Обработчик скролла
  const handleScroll = () => {
    if (!containerRef.value) return
    scrollTop.value = containerRef.value.scrollTop
  }
  
  // Прокрутка к элементу по индексу
  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!containerRef.value) return
    
    const targetScrollTop = index * itemHeight
    containerRef.value.scrollTo({
      top: targetScrollTop,
      behavior
    })
  }
  
  // Прокрутка к элементу по ID
  const scrollToId = (id: string | number, behavior: ScrollBehavior = 'smooth') => {
    const index = items.findIndex((item, idx) => getId(item, idx) === id)
    if (index !== -1) {
      scrollToIndex(index, behavior)
    }
  }
  
  // Прокрутка в конец
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (!containerRef.value) return
    
    containerRef.value.scrollTo({
      top: totalHeight.value,
      behavior
    })
  }
  
  // Прокрутка в начало
  const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
    if (!containerRef.value) return
    
    containerRef.value.scrollTo({
      top: 0,
      behavior
    })
  }
  
  // Проверка, находится ли элемент в видимой области
  const isItemVisible = (index: number) => {
    if (!containerHeight.value) return false
    
    const itemTop = index * itemHeight
    const itemBottom = itemTop + itemHeight
    const viewportTop = scrollTop.value
    const viewportBottom = scrollTop.value + containerHeight.value
    
    return itemTop < viewportBottom && itemBottom > viewportTop
  }
  
  // Получение индекса элемента в центре видимой области
  const getCenterIndex = () => {
    if (!containerHeight.value) return 0
    
    const centerScrollTop = scrollTop.value + containerHeight.value / 2
    return Math.floor(centerScrollTop / itemHeight)
  }
  
  // Обновление размеров контейнера
  const updateContainerHeight = () => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight
    }
  }
  
  // Инициализация
  onMounted(() => {
    updateContainerHeight()
    
    // Добавляем обработчик изменения размера окна
    const resizeObserver = new ResizeObserver(() => {
      updateContainerHeight()
    })
    
    if (containerRef.value) {
      resizeObserver.observe(containerRef.value)
    }
    
    // Очистка при размонтировании
    onUnmounted(() => {
      resizeObserver.disconnect()
    })
  })
  
  return {
    // Refs
    containerRef,
    scrollTop: readonly(scrollTop),
    containerHeight: readonly(containerHeight),
    
    // Computed
    totalHeight,
    visibleItems,
    
    // Methods
    handleScroll,
    scrollToIndex,
    scrollToId,
    scrollToBottom,
    scrollToTop,
    isItemVisible,
    getCenterIndex,
    updateContainerHeight
  }
} 