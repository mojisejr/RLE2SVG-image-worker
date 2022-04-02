const { ethers } = require("hardhat");
const { hat_traits } = require("../traits/Hat_traits");
const { eye_traits } = require("../traits/Eyes_traits");
const { mouth_traits } = require("../traits/Mouth_traits");
const { body_traits } = require("../traits/Body_traits");
const { burn_trait } = require("../traits/Burn_trait");

async function main() {
  let contract = await ethers.getContractFactory("PunkKub");
  let punkkub = await contract.deploy();
  await punkkub.deployed();

  console.log("deployed address: ", punkkub.address);

  const [owner, minter] = await ethers.getSigners();
  await punkkub.connect(owner).addTraitType(0, burn_trait);
  await punkkub.connect(owner).addTraitType(1, hat_traits);
  await punkkub.connect(owner).addTraitType(2, eye_traits);
  await punkkub.connect(owner).addTraitType(3, mouth_traits);
  await punkkub.connect(owner).addTraitType(4, body_traits);

  await punkkub.connect(minter).mintPunkKub();
  await punkkub.connect(minter).mintPunkKub();

  const uri = await punkkub.tokenURI(2);
  console.log("token uri", uri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
