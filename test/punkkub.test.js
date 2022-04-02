const { expect } = require("chai");
const { ethers } = require("hardhat");
const { hat_traits } = require("../traits/Hat_traits");
const { eye_traits } = require("../traits/Eyes_traits");
const { mouth_traits } = require("../traits/Mouth_traits");
const { body_traits } = require("../traits/Body_traits");
const { burn_trait } = require("../traits/Burn_trait");

let contract;
let punkkub;
let minter;
let owner;

describe("Punkkub on chain test", () => {
  before(async () => {
    contract = await ethers.getContractFactory("PunkKub");
    punkkub = await contract.deploy();
    await punkkub.deployed();

    const signers = await ethers.getSigners();

    owner = signers[0];
    minter = signers[1];

    console.log("deployed address: ", punkkub.address);
  });
  it("1) Should be able to add new Traits to the contract", async () => {
    await punkkub.addTraitType(0, burn_trait);
    await punkkub.addTraitType(1, hat_traits);
    await punkkub.addTraitType(2, eye_traits);
    await punkkub.addTraitType(3, mouth_traits);
    await punkkub.addTraitType(4, body_traits);
  });

  it("2) Should be able to mint punkKub now!", async () => {
    await punkkub.connect(minter).mintPunkKub();
    await punkkub.connect(minter).mintPunkKub();
    const supply = await punkkub.totalSupply();
    console.log("total supply: ", supply.toString());
    expect(supply.toString()).to.equal("2");
  });

  it("3) Should be able to display minted tokenURI", async () => {
    try {
      const uri = await punkkub.tokenURI(2);

      console.log("tokenURI: ", uri.toString());

      expect(uri.toString()).to.not.equal("");
    } catch (error) {
      console.log(error);
    }
  });
});
