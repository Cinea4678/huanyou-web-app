import { AxiosError, AxiosResponse } from "axios"
import router from "@/utils/router.ts"
import { message } from "ant-design-vue"

interface Return {
  code: number
  msg: string
  data?: object
}

function handleError(err: AxiosError, operation: string) {
  console.error(err)
  if (err instanceof AxiosError) {
    if (err.response) {
      if (err.response.status == 401) {
        message.warning(`您未登录或登录失效，带您去登录。`).then()
        router.push("/login").then(() => {})
      } else if (err.response.data && err.response.data["msg"] != undefined) {
        message.warning(`${operation}失败：${err.response.data["msg"]}`).then()
      } else if (err.response.status == 403) {
        message.warning(`接口拒绝访问`).then()
      } else {
        message.warning(`${operation}失败：服务器内部错误`).then()
      }
    } else if (err.request) {
      message.warning(`${operation}失败：网络错误`).then()
    } else {
      message.warning(`${operation}失败：浏览器错误`).then()
    }
  }
}

/**
 * Axios的错误处理可以提取出来公共的方法。
 * @param result 在这里调用axios的函数
 * @param operation 操作名称
 * @param callback 成功的回调
 * @param allFinishCallback 所有操作结束后的回调
 */
export function doAxios(result: Promise<AxiosResponse<Return>>, operation: string, callback: (data: any) => void, allFinishCallback?: () => void) {
  result
    .then((res: AxiosResponse) => {
      if (res.data.code && res.data.code === 10000) {
        callback(res.data.data)
      } else {
        if (res.data.code) {
          message.warning(`${operation}失败：${res.data.msg}`).then()
          if (res.data.code == 4001) {
            router.push("/login").then(() => location.reload())
          }
        } else {
          message.warning(`${operation}失败：服务器内部错误`).then()
        }
      }
    })
    .catch((err: unknown) => {
      if (err instanceof AxiosError) {
        handleError(err, operation)
      }
    })
    .finally(() => {
      if (allFinishCallback) {
        allFinishCallback()
      }
    })
}

/**
 * Axios的错误处理可以提取出来公共的方法。
 * @param result 在这里调用axios的函数
 * @param operation 操作名称
 * @param callback 成功的回调
 * @param allFinishCallback 所有操作结束后的回调
 */
export async function doAxiosAsync(result: Promise<AxiosResponse<Return>>, operation: string, callback: (data: any) => Promise<void>, allFinishCallback?: () => Promise<void>) {
  try {
    const res = await result
    if (res.data.code && res.data.code === 10000) {
      await callback(res.data.data ?? null)
    } else {
      if (res.data.code) {
        message.warning(`${operation}失败：${res.data.msg}`).then()
        if (res.data.code == 4001) {
          router.push("/login").then(() => location.reload())
        }
      } else {
        message.warning(`${operation}失败：服务器内部错误`).then()
      }
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      handleError(err, operation)
    }
  } finally {
    if (allFinishCallback) {
      await allFinishCallback()
    }
  }
}

/**
 Axios的错误处理可以提取出来公共的方法。本版本是常规异步编程的版本
 @param result 在这里调用axios的函数
 @param operation 操作名称
 */
export async function doAxiosAsyncFull<T>(result: Promise<AxiosResponse<Return>>, operation: string): Promise<T> {
  try {
    const res = await result
    if (res.data.code && res.data.code === 10000) {
      return res.data.data as T
    } else {
      if (res.data.code) {
        message.warning(`${operation}失败：${res.data.msg}`).then()
        if (res.data.code == 4001) {
          router.push("/login").then(() => location.reload())
        }
      } else {
        message.warning(`${operation}失败：服务器内部错误`).then()
      }
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      handleError(err, operation)
    }
    throw err
  }
  throw new Error("请求失败")
}
