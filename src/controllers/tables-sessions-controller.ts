import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class TablesSessionsController {
  async index(_: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSession>("tables_sessions")
        .select()
        .orderBy("closed_at");

      return response.json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const sessions = await knex<TableSession>("tables_sessions")
        .select()
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (sessions && !sessions.closed_at) {
        throw new AppError("Mesa já está aberta");
      }

      await knex<TableSession>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id deve ser um numero" })
        .parse(request.params.id);

      const session = await knex<TableSession>("tables_sessions")
        .select()
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("Mesa não foi aberta!");
      }

      if (session.closed_at) {
        throw new AppError("Mesa já foi fechada!");
      }

      await knex<TableSession>("tables_sessions")
        .update({
          closed_at: knex.fn.now(),
        })
        .where({ id });

      return response.json({ message: "Mesa encerrada com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
