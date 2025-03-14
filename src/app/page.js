"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2, PenSquare } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deleteTodo, setDeleteTodo] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/todos");
          if (res.ok) {
            const data = await res.json();
            setTodos(data);
          } else {
            toast("Failed to fetch todos");
          }
        } catch (error) {
          console.error("Error fetching todos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTodos();
  }, [status]);

  // Handle adding a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setUpdating(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo,
          description: newDescription,
        }),
      });

      if (res.ok) {
        const todo = await res.json();
        setTodos([todo, ...todos]);
        setNewTodo("");
        setNewDescription("");
        toast("Todo added successfully");
      } else {
        toast("Failed to add todo");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Handle toggling a todo's completion status
  const handleToggleTodo = async (id, completed) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (res.ok) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Handle deleting a todo
  const confirmDeleteTodo = async () => {
    if (!deleteTodo) return;
  
    try {
      const res = await fetch(`/api/todos/${deleteTodo.id}`, { method: "DELETE" });
  
      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== deleteTodo.id));
        toast("Todo deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setDeleteTodo(null); 
    }
  };
  

  // Handle editing a todo
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editText.trim() || !editingTodo) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/todos/${editingTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editText,
          description: editDescription,
        }),
      });

      if (res.ok) {
        setTodos(
          todos.map((todo) =>
            todo.id === editingTodo.id
              ? {
                  ...todo,
                  title: editText,
                  description: editDescription,
                }
              : todo
          )
        );

        toast("Todo updated successfully");
        setEditingTodo(null);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Start editing a todo
  const startEdit = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.title);
    setEditDescription(todo.description || "");
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
        <main className="max-w-3xl mx-auto py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Todo App</h1>
              <div className="flex items-center gap-2">
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized // Add this to avoid the image domain error
                  />
                )}
                <span>{session?.user?.name}</span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Add New Todo</CardTitle>
                <CardDescription>What do you need to do today?</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTodo} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Enter a new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                  <Textarea
                    placeholder="Add description (optional)"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={3}
                  />
                  <Button type="submit" disabled={updating || !newTodo.trim()}>
                    {updating ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Add Todo
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Todos</CardTitle>
                <CardDescription>
                  You have {todos.length} todo{todos.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {todos.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No todos yet. Add one above!
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {todos.map((todo) => (
                      <li
                        key={todo.id}
                        className="flex flex-col p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={todo.completed}
                              onCheckedChange={() =>
                                handleToggleTodo(todo.id, todo.completed)
                              }
                              id={`todo-${todo.id}`}
                            />
                            <label
                              htmlFor={`todo-${todo.id}`}
                              className={`font-medium ${
                                todo.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }`}
                            >
                              {todo.title}
                            </label>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => startEdit(todo)}
                                >
                                  <PenSquare className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Todo</DialogTitle>
                                  <DialogDescription>
                                    Make changes to your todo item.
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={handleEditSubmit}
                                  className="space-y-4 mt-4"
                                >
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="title"
                                      className="text-sm font-medium"
                                    >
                                      Title
                                    </label>
                                    <Input
                                      id="title"
                                      value={editText}
                                      onChange={(e) =>
                                        setEditText(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="description"
                                      className="text-sm font-medium"
                                    >
                                      Description
                                    </label>
                                    <Textarea
                                      id="description"
                                      value={editDescription}
                                      onChange={(e) =>
                                        setEditDescription(e.target.value)
                                      }
                                      rows={3}
                                    />
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      disabled={!editText.trim() || updating}
                                    >
                                      {updating ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                      ) : null}
                                      Add Todo Save changes
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => setDeleteTodo(todo)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. Do you really
                                    want to delete this todo?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setDeleteTodo(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => confirmDeleteTodo()}
                                  >
                                    Yes, Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        {todo.description && (
                          <div className="mt-2 pl-8 text-sm text-gray-500">
                            {todo.description}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
