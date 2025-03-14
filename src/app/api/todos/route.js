import { db } from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

// Get all todos for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await db.todo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

// Create a new todo
export async function POST(request) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const { title, description } = await request.json();
  
      if (!title || typeof title !== "string" || title.length === 0) {
        return NextResponse.json({ error: "Invalid title" }, { status: 400 });
      }
  
      const todo = await db.todo.create({
        data: {
          title,
          description: description || "", 
          userId: session.user.id,
        },
      });
  
      return NextResponse.json(todo, { status: 201 });
    } catch (error) {
      console.error("Error creating todo:", error);
      return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
  }