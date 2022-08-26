const handlers = require("../controllers/users");
const { createUser, getUsers, deposit, withdrawal, checkBalance, transfer } =
  handlers;

describe("handlers", () => {
  it("should return empty users object", () => {
    const req = {};
    const res = {
      text: {},
      send: function (input) {
        this.text = input;
      },
    };

    getUsers(req, res);
    expect(res.text).toEqual({});
  });

  it("should create users", () => {
    const req1 = { body: { username: "user1", password: "complexpassword" } };
    const res1 = {
      data: {},
      send: function (input) {
        this.data = input;
      },
    };
    createUser(req1, res1);
    expect(res1.data).toHaveProperty("username");
    expect(res1.data).toHaveProperty("balance");

    // creating a second user so I can test the transfer function
    const req2 = { body: { username: "user2", password: "complexpass" } };
    const res2 = {
      data: {},
      send: function (input) {
        this.data = input;
      },
    };
    createUser(req2, res2);
    expect(res2.data).toHaveProperty("username");
    expect(res2.data).toHaveProperty("balance");
  });

  it("should get all users", () => {
    const req = {};
    const res = {
      data: {},
      send: function (input) {
        this.data = input;
      },
    };
    getUsers(req, res);
    expect(res.data).toHaveProperty("user1");
    expect(res.data).toHaveProperty("user2");
    expect(res.data.user1).toHaveProperty("balance");
    expect(res.data.user2).toHaveProperty("balance");
  });

  it("should deposit into users account", () => {
    const req = { body: { amount: 1000 }, params: { username: "user1" } };
    const res = {
      data: {},
      send: function (input) {
        this.data = input;
      },
    };
    deposit(req, res);
    expect(res.data).toHaveProperty("balance");
    expect(res.data.balance).toEqual(1000);
  });

  it("should withdraw from users account", () => {
    const req = { body: { amount: 500 }, params: { username: "user1" } };
    const res = {
      data: {},
      send: function (input) {
        this.data = input;
      },
    };
    withdrawal(req, res);
    expect(res.data).toHaveProperty("balance");
    expect(res.data.balance).toEqual(500);
  });

  it("should check users account balance", () => {
    const req = { params: { username: "user1" } };
    const res = {
      data: {},
      send: function (input) {
        this.data = input;
      },
    };
    checkBalance(req, res);
    expect(res.data).toHaveProperty("balance");
    expect(res.data.balance).toEqual(500);
  });

  it("should transer from user1 to user2", () => {
    const req = {
      params: { username: "user1" },
      body: { amount: 200, reciepientUsername: "user2" },
    };
    const res = {
      data: {},
      send: function (input) {
        this.data = input;
      },
    };
    transfer(req, res);
    expect(res.data).toHaveProperty("balance");
    expect(res.data.balance).toEqual(300);
  });
});
