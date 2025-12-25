const ALLOWED_UPDATES = [
  "password",
  "phoneNumber",
  "age",
  "gender",
  "photoURL",
  "bio",
  "skills",
];

module.exports = (req, res, next) => {
  const updates = Object.keys(req.body);

  const isAllowed = updates.every((update) => ALLOWED_UPDATES.includes(update));
  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }
  if (!isAllowed) {
    return res.status(400).json({ message: "Invalid update request" });
  }
  next();
};
