import { Router } from "express";
import { currentUser } from "@tvztickets/common";
import { requireAuth } from "@tvztickets/common";

const router = Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };