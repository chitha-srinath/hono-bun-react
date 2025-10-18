import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ERROR_MESSAGES } from "../constants/error.constants";
import { SUCCESS_MESSAGES } from "../constants/success.constants";
import { todoService } from "../services/todo/todo.service";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../types/response.types";
import { Todo } from "../types/todo.types";
import {
  CreateTodoInput,
  UpdateTodoInput,
  createTodoSchema,
  idSchema,
  updateTodoSchema,
} from "../validation/schemas";

// Initialize the todo router
const todoRouter = new Hono();

// Get all todos
todoRouter.get("/", async (c) => {
  try {
    const todos: Todo[] = await todoService.getAllTodos();
    return c.json(
      createSuccessResponse(SUCCESS_MESSAGES.TODO.RETRIEVED_ALL, { todos })
    );
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json(createErrorResponse(ERROR_MESSAGES.TODO.FETCH_FAILED), 500);
  }
});

// Get todo by ID
todoRouter.get("/:id", zValidator("param", idSchema), async (c) => {
  try {
    const param = c.req.param("id");
    if (param === undefined) {
      return c.json(createErrorResponse(ERROR_MESSAGES.TODO.NOT_FOUND), 400);
    }
    const id = parseInt(param, 10);

    const todo: Todo = await todoService.getTodoById(id);
    return c.json(
      createSuccessResponse(SUCCESS_MESSAGES.TODO.RETRIEVED, { todo })
    );
  } catch (error) {
    console.error("Error fetching todo:", error);
    return c.json(createErrorResponse(ERROR_MESSAGES.TODO.NOT_FOUND), 404);
  }
});

// Create a new todo
todoRouter.post("/", zValidator("json", createTodoSchema), async (c) => {
  try {
    const payload = c.req.valid("json");

    const todo: Todo = await todoService.createTodo(payload);
    return c.json(
      createSuccessResponse(SUCCESS_MESSAGES.TODO.CREATED, { todo }),
      201
    );
  } catch (error) {
    console.error("Error creating todo:", error);
    return c.json(createErrorResponse(ERROR_MESSAGES.TODO.CREATE_FAILED), 500);
  }
});

// Update a todo
todoRouter.put(
  "/:id",
  zValidator("param", idSchema),
  zValidator("json", updateTodoSchema),
  async (c) => {
    try {
      const param = c.req.param("id");
      if (param === undefined) {
        return c.json(createErrorResponse(ERROR_MESSAGES.TODO.NOT_FOUND), 400);
      }
      const id = parseInt(param, 10);
      const updates = c.req.valid("json");

      const todo: Todo = await todoService.updateTodo(id, updates);

      return c.json(
        createSuccessResponse(SUCCESS_MESSAGES.TODO.UPDATED, { todo })
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      return c.json(
        createErrorResponse(ERROR_MESSAGES.TODO.UPDATE_FAILED),
        500
      );
    }
  }
);

// Delete a todo
todoRouter.delete("/:id", zValidator("param", idSchema), async (c) => {
  try {
    const param = c.req.param("id");
    if (param === undefined) {
      return c.json(createErrorResponse(ERROR_MESSAGES.TODO.NOT_FOUND), 400);
    }
    const id = parseInt(param, 10);

    const todo: Todo = await todoService.deleteTodo(id);
    return c.json(
      createSuccessResponse(SUCCESS_MESSAGES.TODO.DELETED, { todo })
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    return c.json(createErrorResponse(ERROR_MESSAGES.TODO.DELETE_FAILED), 500);
  }
});

// Toggle todo completion status
todoRouter.patch("/:id/toggle", zValidator("param", idSchema), async (c) => {
  try {
    const param = c.req.param("id");
    if (param === undefined) {
      return c.json(createErrorResponse(ERROR_MESSAGES.TODO.NOT_FOUND), 400);
    }
    const id = parseInt(param, 10);

    const todo: Todo = await todoService.toggleTodo(id);
    return c.json(
      createSuccessResponse(SUCCESS_MESSAGES.TODO.TOGGLED, { todo })
    );
  } catch (error) {
    console.error("Error toggling todo:", error);
    return c.json(createErrorResponse(ERROR_MESSAGES.TODO.TOGGLE_FAILED), 500);
  }
});

export default todoRouter;
