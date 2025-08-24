export const ERROR_MESSAGE = {
  title: "エラー",
  message: (
    <>
      エラーが発生しました。
      <br />
      時間をおいてもう一度試してください。
      <br />
      何度もエラーが発生する場合、システム管理者に問い合わせてください。
    </>
  ),
} as const;

abstract class CustomError<T = unknown> extends Error {
  status?: number;
  data: T;

  protected constructor(message: string, status?: number, data?: T) {
    super(message);
    this.name = "CustomError";
    this.status = status;
    this.data = data as T;
  }
}

// 401 Unauthorized
class UnauthorizedError<T = unknown> extends CustomError<T> {
  constructor(message = "Unauthorized", data?: T) {
    super(message, 401, data);
    this.name = "UnauthorizedError";
  }
}

// 403 Forbidden
class ForbiddenError<T = unknown> extends CustomError<T> {
  constructor(message = "Forbidden", data?: T) {
    super(message, undefined, data);
    this.name = "ForbiddenError";
  }
}

// 404 Not Found
class NotFoundError<T = unknown> extends CustomError<T> {
  constructor(message = "Not Found", data?: T) {
    super(message, undefined, data);
    this.name = "NotFoundError";
  }
}

class FailedGetAccessTokenError<T = unknown> extends CustomError<T> {
  constructor(message = "Failed get accessToken", data?: T) {
    super(message, undefined, data);
    this.name = "FailedGetAccessTokenError";
  }
}

class UnknownError<T = unknown> extends CustomError<T> {
  constructor(message = "Unknown Error", data?: T) {
    super(message, undefined, data);
    this.name = "UnknownError";
  }
}

export {
  UnauthorizedError,
  UnknownError,
  ForbiddenError,
  NotFoundError,
  FailedGetAccessTokenError,
};
