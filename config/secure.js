use hackathon
db.createUser(
  {
    user: "sepia",
    pwd: "S0ber4llD4y",
    roles: [ { role: "readWrite", db: "hackathon" },{ role: "dbAdmin", db: "hackathon" } ]
  }
)
