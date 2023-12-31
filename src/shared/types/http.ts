type ValidationError = Array<{ input: string; message: string }>

export interface Error {
  status: boolean | 401
  message?: string
  errors?: ValidationError
}

export interface Response {
  status: boolean
}

export interface ResponseWithData<T> extends Response {
  data: T
}

export interface ResponseWithMessage extends Response {
  message: string
}

export interface ResponseWithPagination<T>
  extends Response,
    ResponseWithData<T> {
  pagination: {
    per_page: number
    current_page: number
    last_page: number
    total: number
  }
}
