const {Router} = require("express");
const {createUser, login} = require("../controller/userController")

const router = Router();

router.post("/users",createUser);
router.post('/login',login)


module.exports = router;