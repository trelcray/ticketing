import { Router } from "express";

const router = Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signOutRouter };