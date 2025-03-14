import { db } from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

// Get a specific todo
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } =await params;

    const todo = await db.todo.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 });
  }
}

// Update a todo
export async function PATCH(request, { params }) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const { id } =await params;
      const { title, description, completed } = await request.json();
  
      // Validate todo exists and belongs to user
      const existingTodo = await db.todo.findUnique({
        where: {
          id,
          userId: session.user.id,
        },
      });
  
      if (!existingTodo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
      }
  
      // Update todo
      const updatedTodo = await db.todo.update({
        where: {
          id,
        },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(completed !== undefined && { completed }),
        },
      });
  
      return NextResponse.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }
  }

// Delete a todo
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } =await params;

    // Validate todo exists and belongs to user
    const existingTodo = await db.todo.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Delete todo
    await db.todo.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}