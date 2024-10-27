import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "tanishqkumar-medium-common";

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
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password
            }
        });
    
        const payload = {
            id: user.id,
        };
        const token = await sign(payload, c.env.JWT_SECRET);
    
        return c.json({
            msg: "User successfully created",
            token
        });
    } catch (e: any) {
        if (e.code === 'P2002') {
            c.status(409); // Conflict, unique constraint violation
            return c.json({ error: "Email already exists" });
        }
        console.error("Error details:", e); // Log error for more info
        c.status(403);
        // c.json({e})
        return c.json({ error: "error while signing",
            e
         });
    }
    
});


userRouter.post("/signin", async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid Inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: body.username
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
