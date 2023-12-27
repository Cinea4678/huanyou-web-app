import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import RelativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(LocalizedFormat)
dayjs.extend(RelativeTime)
dayjs.locale("zh-cn")
