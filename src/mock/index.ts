export function mockApiResp<T>(data: T): API.ApiResponse<T> {
  return { code: 10000, data: data, msg: "成功" }
}
