import {Router} from "express"

const router = Router();

const delay = () => new Promise(resolve => setTimeout(resolve, 3000))

router.get("/emoticon-average", async (_, res) => {
  // Get the average value of emoticons using the Mongo aggregation pipeline
  await delay();
  res.json({average: 0, total: 0})
})


router.get("/nps-groups", async (_, res) => {
  // Get the number of NPS responses per group using the Mongo aggregation pipeline
  await delay();
  res.json({promoters: 0, detractors: 0, passives: 0, total: 0})
})



router.get("/nps-score", async (_, res) => {
  // BONUS! Calculate NPS score from nps groups
  await delay();
  res.json({score: 0})
})


export default router;
