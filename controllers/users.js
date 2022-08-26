const users = {};

const handlers = {
  createUser: (req, res) => {
    const username = req.body.username;
    if (username in users)
      return res.status(400).send("Username already exist");

    const user = {
      id: Date.now(),
      username: req.body.username,
      password: req.body.password,
      balance: 0,
    };

    users[username] = user;
    return res.send(user);
  },
  getUsers: (req, res) => {
    return res.send(users);
  },

  checkBalance: (req, res) => {
    const username = req.params.username;
    if (!username in users)
      return res.status(404).send("Username does not exist");
    const user = users[username];
    return res.send({ balance: user.balance });
  },

  deposit: (req, res) => {
    const username = req.params.username;
    const amount = parseInt(req.body.amount);
    if (!amount || amount <= 0) return res.status(400).send("invalid amount");
    if (!(username in users))
      return res.status(404).send("Username does not exist");
    const user = users[username];
    user.balance += amount;
    return res.send({ message: "deposit successful", balance: user.balance });
  },

  withdrawal: (req, res) => {
    const username = req.params.username;
    const amount = req.body.amount;
    if (!(username in users))
      return res.status(404).send("Username does not exist");
    const user = users[username];
    if (amount <= 0) return res.status(400).send("invalid amount");
    if (amount > user.balance)
      return res.status(400).send("Insufficient balancce");
    user.balance -= amount;
    return res.send({
      message: "withdrawal successful",
      balance: user.balance,
    });
  },

  transfer: (req, res) => {
    const username = req.params.username;
    const amount = req.body.amount;
    const reciepientUsername = req.body.reciepientUsername;
    if (!(username in users))
      return res.status(404).send("Username does not exist");

    if (!(reciepientUsername in users))
      return res.status(404).send("reciepient does not exist");

    const user = users[username];
    const reciepient = users[reciepientUsername];

    if (amount <= 0) return res.status(400).send("invalid amount");

    if (amount > user.balance)
      return res.status(400).send("Insufficient balancce");

    // this 2 transactions should be atomic
    user.balance -= amount;
    reciepient.balance += amount;

    return res.send({ message: "transer successful", balance: user.balance });
  },
};

module.exports = handlers;
