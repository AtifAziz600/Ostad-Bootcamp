async function showName() {
  let name = await getName()
  console.log(name);
}

showName();