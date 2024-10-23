import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
      Variables : {
          userId: string
      }
  }>();


  blogRouter.post("/api/v1/blog", (c) => {
    return c.text("Hello Hono!");
  });
  
  blogRouter.put("/api/v1/blog", (c) => {
    return c.text("Hello Hono!");
  });
  
  blogRouter.get("/api/v1/bllog:id", (c) => {
    return c.text("Hello Hono!");
  });
  