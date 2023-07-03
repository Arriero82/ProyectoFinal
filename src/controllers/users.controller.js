import { Router } from "express";
import UserManager from "../dao/mongo/users.mongo.js";
import passport from "passport";
//import { createHash, isValidPass } from "../utils/cryptPassword.js";

const User = new UserManager();

const router = Router();

/* router.post("/", async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const newUserInfo = {
      name,
      lastname,
      email,
      password: createHash(password),
    };

    const newUser = await User.create(newUserInfo);
    res.status(201).json({ msg: newUser });
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      return res.status(400).json({ error: `email is in use` });
    res.status(500).json({ error: "internal error" });
  }
}); */

router.get('/', async (req, res) => {
  try {
    const users = await User.get()
    const response = users.map(({ name, lastname, email, role }) => ({
      name,
      lastname,
      email,
      role
    }));
    res.json({ response });
  } catch (error) {
    throw error
  }
})

router.delete('/', async (req, res) => {
  try {
    const cutOffDate = new Date();
    cutOffDate.setHours(cutOffDate.getHours() - 48)
    const usersToDelete = await User.getByFilter({connection: { $lt: cutOffDate }})
    const emails = usersToDelete.map(user => user.email);
    await User.deleteMany({ connection: { $lt: cutOffDate } })
    return res.redirect(`/mail/deleteusers?email=${encodeURIComponent(JSON.stringify(emails))}`);  
  } catch (error) {
    throw error
  }
})

router.patch('/role', async (req, res) => {
  try {
    const {email, newRole} = req.body
    await User.updateRole(email, newRole)
  } catch (error) {
    throw error
  }
})

router.delete('/delete', async (req, res) => {
  try {
    const email = req.body.email
    console.log(email);
    await User.deleteOne(email)
  } catch (error) {
    throw error
  }
})

//rutas para passport
router.post(
  "/",
  passport.authenticate(
    "register",
    { failureRedirect: "/failRegister" }),
    async (req, res) => {
      try {
        res.json({ msg: "user has been saved" });
      } catch (error) {
        console.log(error);
        if (error.code === 11000)
          return res.status(400).json({ error: `email is in use` });
        res.status(500).json({ error: "internal error" });
      }
    }
);

router.get("/failRegister", async (req, res) => {
  console.log("registration failed");
  res.status(500).json({ error: "internal error" });
});

export default router;
