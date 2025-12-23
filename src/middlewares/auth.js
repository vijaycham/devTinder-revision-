const adminAuth = (req, res, next) => {
  console.log("Admin Auth check is getting checked");
  let token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(403).send("Forbidden");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("User Auth check is getting checked");
  let token = "xyzccc";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {adminAuth, userAuth};