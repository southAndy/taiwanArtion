import dayjs from 'dayjs'

// 定義展覽資料的介面
interface Exhibition {
  startDate: string
  hitRate?: number
  // 其他屬性可以後續添加
}

function sortByDate(a: Exhibition, b: Exhibition) {
  return dayjs(b.startDate).diff(dayjs(a.startDate))
}

function sortByHitRate(a: Exhibition, b: Exhibition) {
  return (b.hitRate || 0) - (a.hitRate || 0)
}

export { sortByDate, sortByHitRate }
export type { Exhibition }
