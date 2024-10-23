import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt'
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
	Variables : {
		userId: string
	}
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/user", blogRouter)

app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  //@ts-ignore
	c.set('userId', payload.id);
	await next()
})


export default app;

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYmNjZWZlZDItMGIxYy00NGMzLTgwN2YtM2M1YWUzNDhjY2FiIiwidGVuYW50X2lkIjoiNTA1MjczNThhOTI5MDY5ZWMwZWU5MTYxMDk1M2I5ZGQ1N2I4OWYxYjY4ZWI1ZWFiMjBhYjhjZWM2NWM0ODQ2NiIsImludGVybmFsX3NlY3JldCI6IjM1YjQ2ZGNlLWU0OTAtNGQ2ZS1iOWYxLTJkYjY5OTY4MTIwNyJ9.HlWkrxclB1QTO7JB-pViWXh8QEfg27yxEnUZ0uASXTs"
//DIRECT_URL="<YOUR_DATABASE_CONNECTION_STRING>"

//neon= postgresql://learning_owner:9CEp4bgmqHKZ@ep-plain-feather-a5t5xydq.us-east-2.aws.neon.tech/learning?sslmode=require
