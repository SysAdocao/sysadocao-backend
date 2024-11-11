import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import AppError from "@/errors/AppError"
import { env } from "@/env"

export const errorHandling = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    })
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation error.",
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== "production") {
    console.error("[ERROR] => ", error)
  }

  return response.status(500).json({ message: "Internal server error." })
}
