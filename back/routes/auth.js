const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", (req, res) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.status(500).json({ msg: "Las contraseñas no coinciden" });

  const salt = bcrypt.genSaltSync(256);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  req.body.password = hashedPassword;

  User.create(req.body)
    .then(() => {
      res.status(201).json({ msg: "Usuario creado con éxito" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Tu usuario no se pudo crear" });
    });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ msg: "Email no es valido" });

  let validPassword = bcrypt.compareSync(req.body.password, user.password);

  if (!validPassword)
    return res.status(500).json({ msg: "La contraseña es incorrecta" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 8600
  });

  delete user._doc.password;
  res.status(200).json({ user, token });
});

module.exports = router;
