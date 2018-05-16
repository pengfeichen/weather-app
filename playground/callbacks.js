var getUser = (id, callback) => {
  user = {
    id,
    name: 'pf'
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(888, (user) => {
  console.log(user);
})