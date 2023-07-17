import express, { Request, Response } from "express";
import { PrismaClient } from "./generated/client";
const prisma = new PrismaClient();

const port: number = parseInt(process.env.PORT!);

const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json({ message: books });
});

app.post("/", async (req: Request, res: Response) => {
  const { name, price } = req.body;
  await prisma.book.create({
    data: {
      name,
      price,
    },
  });
  res.json({ message: "done" });
});

app.delete("/", async (req: Request, res: Response) => {
  const { id } = req.body;
  await prisma.book.delete({
    where: {
      id,
    },
  });
  res.json({ message: "done" });
});

app.listen(port, () => {
  console.log(`node app started on port : ${port}`);
});
