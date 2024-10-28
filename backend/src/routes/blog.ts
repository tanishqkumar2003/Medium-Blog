import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "tanishqkumar-medium-common";


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string,
  }
}>();


blogRouter.use('/*', async (c, next) => {
  console.log(c.req)
  const jwt = c.req.header('authorization');
  if (!jwt || !jwt.startsWith('Bearer ')) {
    c.status(403);
    return c.json({
      message: "Invalid Header"
    })
  }

  const token = jwt.split(' ')[1];
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  try {
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    //@ts-ignore
    c.set('userId', payload.id);
    c.json({
      id: payload.id
    })
    await next();
  } catch (error) {
    return c.json({
      message: "error in jwt verification"
    })
  }
})


blogRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Inputs"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId')

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })
    return c.json({
      message: "Blog created Successfully",
      id: post.id
    })
  } catch (error) {
    c.status(403);
    return c.json({
      message: "error creating post",
      error: error,
      user: userId
    })
  }
});


blogRouter.put("/blog", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Inputs"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId")
  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
    return c.json({
      message: "Blog Updated Successfully"
    })
  } catch (error) {
    c.status(403);
    return c.json({
      message: "error creating post"
    })
  }
});

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        content:true,
        title: true,
        id:true,
        
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json(posts);
  } catch (error) {
    return c.json({
      message: "Error fetching the blog"
    })
  }
})


blogRouter.get("/blog:id", async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    });
    return c.json(post);
  } catch (error) {
    return c.json({
      message: "Error fetching the blog"
    })
  }
});


// Add Pagination for better UI

