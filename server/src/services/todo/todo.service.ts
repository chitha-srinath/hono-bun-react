import { Todo } from "../../types/todo.types";
import { NotFoundError } from "../../errors/custom.errors";
import { TodoUpdateFields } from "../../enums/todo.enum";
import { ERROR_MESSAGES } from "../../constants/error.constants";
import { CreateTodoInput } from "@/validation/schemas";

// TodoService handles todo business logic
export class TodoService {
  // In-memory storage for todos (in a real app, this would be a database)
  private todos: Todo[] = [];
  private nextId = 1;

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    return this.todos;
  }

  // Get todo by ID
  async getTodoById(id: number): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundError(ERROR_MESSAGES.TODO.NOT_FOUND);
    }
    return todo;
  }

  // Create a new todo
  async createTodo(payload: CreateTodoInput): Promise<Todo> {
    const newTodo: Todo = {
      id: this.nextId++,
      title: payload.title,
      description: payload.description || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.todos.push(newTodo);
    return newTodo;
  }

  // Update a todo
  async updateTodo(
    id: number,
    updates: Partial<Pick<Todo, TodoUpdateFields>>
  ): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new NotFoundError(ERROR_MESSAGES.TODO.NOT_FOUND);
    }

    // Merge updates with existing todo
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return this.todos[todoIndex];
  }

  // Delete a todo
  async deleteTodo(id: number): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new NotFoundError(ERROR_MESSAGES.TODO.NOT_FOUND);
    }

    const deletedTodo = this.todos.splice(todoIndex, 1)[0];
    return deletedTodo;
  }

  // Toggle todo completion status
  async toggleTodo(id: number): Promise<Todo> {
    const todo = await this.getTodoById(id);
    return await this.updateTodo(id, { completed: !todo.completed });
  }
}

// Export singleton instance
export const todoService = new TodoService();
