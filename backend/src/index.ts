import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  
  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password
    }
  })

  const payload = {
    id : user.id
    // exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
  }
  const token = await sign(payload, c.env.JWT_SECRET)

  return c.json({
    msg:"User succesfully created", 
    token});
});

app.post("/api/v1/signin", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/bllog:id", (c) => {
  return c.text("Hello Hono!");
});

export default app;

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYmNjZWZlZDItMGIxYy00NGMzLTgwN2YtM2M1YWUzNDhjY2FiIiwidGVuYW50X2lkIjoiNTA1MjczNThhOTI5MDY5ZWMwZWU5MTYxMDk1M2I5ZGQ1N2I4OWYxYjY4ZWI1ZWFiMjBhYjhjZWM2NWM0ODQ2NiIsImludGVybmFsX3NlY3JldCI6IjM1YjQ2ZGNlLWU0OTAtNGQ2ZS1iOWYxLTJkYjY5OTY4MTIwNyJ9.HlWkrxclB1QTO7JB-pViWXh8QEfg27yxEnUZ0uASXTs"
//DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"

//neon= postgresql://learning_owner:9CEp4bgmqHKZ@ep-plain-feather-a5t5xydq.us-east-2.aws.neon.tech/learning?sslmode=require
