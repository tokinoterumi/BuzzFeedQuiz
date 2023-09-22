import express, { Request, Response } from "express"
import axios, { AxiosResponse } from "axios"
import { QuizData } from "./interfaces"
import * as dotenv from "dotenv"

dotenv.config()

const PORT = 8000
const app = express()

app.get("/quiz-item", async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const response: AxiosResponse = await axios.get(process.env.URL, {
      headers: {
        "X-Cassandra-Token": process.env.TOKEN,
        accept: "application/json",
      },
    })

    if (response.status === 200) {
      const quizItem: QuizData = await response.data.data[
        "03026213-5107-4835-afb1-31b4494bbba1"
      ]
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
      res.send(quizItem)
    }
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT, () => console.log(`I am running on port ${PORT}!`))
