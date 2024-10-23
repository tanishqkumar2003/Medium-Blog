import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        })

        const payload = {
            id: user.id
            // exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
        }
        const token = await sign(payload, c.env.JWT_SECRET)

        return c.json({
            msg: "User succesfully created",
            token
        });
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});


userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!user) {
            c.status(411);
            return c.json({
                message: "User not found"
            })
        }

        const payload = {
            id: user.id
            // exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
        }
        const token = await sign(payload, c.env.JWT_SECRET)

        return c.json({
            msg: "User logged in successfully",
            token
        });
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});
