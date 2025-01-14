const main = async () => {
  const contractFactory = await ethers.getContractFactory("DataConsumerV3");
  const contract = await contractFactory.deploy();

  console.log("Contract deployed to: ", contract.target);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
