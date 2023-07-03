import { Router } from "express";
import UserManager from "../dao/mongo/users.mongo.js";
import { createHash, isValidPass } from "../utils/cryptPassword.utils.js";
import passport from "passport";

const User = new UserManager();

const router = Router();


/* router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(email);
    if (!user)
      return res  
        .status(401)
        .json({ error: `username and password don't match` });
    const isValidPassword = isValidPass(user, password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ error: `username and password don't match` });

    req.session.user = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };
    user.email !== "adminCoder@coder.com"
      ? (req.session.user.role = "usuario")
      : (req.session.user.role = "admin");

    return res.redirect("/api/profile");
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
});
 */

router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/failLogin", session: false }),
  async (req, res) => {
    try {
      if (!req.user)
        return res.status(400).json({ msg: "user not registered" });
      req.session.user = {
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email,
        role: req.user.role
      };

      const userId = req.user.id;
      const currentDate = new Date();

      await User.updateConnection(userId, currentDate)
      /* req.user.email !== "adminCoder@coder.com"
        ? (req.session.user.role = "user")
        : (req.session.user.role = "admin"); */
      const user = req.session.user 
      res.json({user})
    } catch (error) {
      res.status(500).json({ error: `Internal server error` });
    }
  }
);

router.get("/failLogin", (req, res) => {
  res.json({ msg: `session couldn't start` });
});

router.get( 
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  async (req, res) => {}
);  

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
  };
/*   req.user.email !== "adminCoder@coder.com"
  ? (req.session.user.role = "user")
  : (req.session.user.role = "admin"); */
  res.redirect('/profile')
})

router.get("/logout", (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) return res.status(400).json({ error });
      res.redirect("/login");
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  } 
});

router.patch("/forgotPass", async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const expiration = req.query.expiration

    const now = Date.now()
    const onehourmiliseconds = 60*60*1000;

    if((expiration - now) > onehourmiliseconds) return res.json({ msg: "link has expired, you need to generate a new one" });
    
    const user = await User.findOne({email});
  
    const isValidPassword = isValidPass(user, password);
 
    if (isValidPassword)
      return res
        .status(401)
        .json({ error: `password needs to be different` });

    const encryptedPass = createHash(password);

    await User.updateOne(email, encryptedPass);

    res.json({ msg: "password has been updated" });
  } catch (error) { 
    res.status(500).json({ error: `Internal server error` });
  }
});

router.post("/passrecovery", async (req, res) => {
  try {
    const { email } = req.body; 
    const user = await User.findOne({email});
    if (!user)
      return res  
        .status(401)
        .json({ error: `email doesn't exist, please register` });
    return res.redirect(`/mail/recovery?email=${encodeURIComponent(JSON.stringify(email))}`);

  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
});

export default router;
