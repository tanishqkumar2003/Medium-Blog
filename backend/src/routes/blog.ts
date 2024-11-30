import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "tanishqkumar-medium-common";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
        authorId: userId,
        published: body.published,
        author: body.name
      }
    })
    return c.json({
      message: "Blog created Successfully",
      id: post.id,
      name: post.authorId
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


blogRouter.put("/update", async (c) => {
  const body = await c.req.json();
  // const { success } = updateBlogInput.safeParse(body);
  // if (!success) {
  //   c.status(411);
  //   return c.json({
  //     message: "Invalid Inputs"
  //   })
  // }
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
        published: body.published
      }
    })
    return c.json({
      message: "Blog Updated Successfully",
      blog
    })
  } catch (error) {
    c.status(403);
    return c.json({
      message: "error upadting post"
    })
  }
});


blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true
      },
      select: {
        content: true,
        title: true,
        id: true,
        published: true,
        createdAt: true,
        author: {
          select: {
            name: true
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


blogRouter.get("/:id", async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
        published: true
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json(post);
  } catch (error) {
    return c.json({
      message: "Error fetching the blog"
    })
  }
});


blogRouter.post('/myblog', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId')

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId
      },
      select: {
        content: true,
        title: true,
        id: true,
        published: true,
        createdAt: true,
        author: {
          select: {
            name: true
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


blogRouter.get('/search/:param?', async (c) => {
  const param = c.req.param('param') || 'a';
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  if (typeof param !== 'string') {
    c.status(400)
    return c.json({ message: 'Invalid query' });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [     // OR is used to search in multiple feilds
          {
            title: {
              contains: param,
              mode: 'insensitive', // optional: case-insensitive search
            },
          },
          {
            content: {
              contains: param,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt:true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({
      message: "search success",
      posts
    });
  } catch (error) {
    console.error('Error searching posts:', error);
  }
})


blogRouter.delete("/:id", async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.delete({
      where: {
        id
      },
    });
    return c.json(post);
  } catch (error) {
    return c.json({
      message: "Error fetching the blog"
    })
  }
});


blogRouter.post("/ai", async (c) => {
  try {
    // Check if Content-Type is application/json
    const contentType = c.req.header("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      return c.json({ error: "Content-Type must be application/json" }, 400);
    }

    // Try to parse the body as JSON
    let body;
    try {
      body = await c.req.json();
    } catch (error) {
      return c.json({ error: "Invalid JSON format" }, 400);
    }

    const { prompt } = body;

    if (!prompt) {
      return c.json({ error: "Prompt is required" }, 400);
    }

    const genAI = new GoogleGenerativeAI("AIzaSyAH8VAK17gFZfDrQM97D8GDqNz2fEPspSw");


    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generateContent = async (prompt: string) => {
      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error) {
        console.error("Error generating content:", error);
        throw error; // Re-throw the error for handling in other files
      }
    };
    const generatedContent = await generateContent(prompt);

    return c.json({ content: generatedContent });
  } catch (error) {
    console.error("Error in /ai route:", error);
    return c.json({ error: "Failed to generate content" }, 500);
  }
});