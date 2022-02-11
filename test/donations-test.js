const {expect} = require("chai");
const {ethers, waffle} = require("hardhat");

const provider = waffle.provider;

describe("Donations contract", function () {

    let Donations;
    let donationsContract;
    let owner;
    let addr1;
    let addr2;
    let addrs;
 
    beforeEach(async function () {

        Donations = await ethers.getContractFactory("Donations");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        donationsContract = await Donations.deploy();
    });

    it("Test deposit() function", async function () {
        const deposit1Value = ethers.utils.parseEther('0.1');
        const deposit2Value = ethers.utils.parseEther('0.2');
        const endSum = ethers.utils.parseEther('0.3');
        await donationsContract.connect(addr1).deposit({value: deposit1Value});
        await donationsContract.connect(addr1).deposit({value: deposit2Value});

        const addr1Deposit = await donationsContract.connect(addr1).getDonation(addr1.address);
        
        expect(addr1Deposit).to.equal(endSum);
    });

    it("Test withdraw() by owner", async function () {
        const depositValue = ethers.utils.parseEther('0.2');
        const withdrawValue = ethers.utils.parseEther('0.1');
        const endBalance = ethers.utils.parseEther('10000.1');
        await donationsContract.connect(addr1).deposit({value: depositValue});
        
        const tx = await donationsContract.connect(owner).withdraw(addr2.address, withdrawValue);
        const balanceAddr2 = await provider.getBalance(addr2.address);
        expect(balanceAddr2).to.equal(endBalance);
    });

    it("Test getSenders()", async function () {
        const depositValue = ethers.utils.parseEther('0.2');

        await donationsContract.connect(addr1).deposit({value: depositValue});
        await donationsContract.connect(addr2).deposit({value: depositValue});

        const tx = await donationsContract.connect(addr1).getSenders();
        expect(addr1.address).to.equal(tx[0]);
        expect(addr2.address).to.equal(tx[1]);
    });

    it("Test withdraw() not by an owner", async function () {
        await expect(
            donationsContract.connect(addr1).withdraw(addr1.address, ethers.utils.parseEther('0.1'))
        ).to.be.revertedWith("You are not an owner!");
    });

    it("withdraw() with too big amount", async function () {
        await expect(
            donationsContract.connect(owner).withdraw(addr1.address, ethers.utils.parseEther('0.1'))
        ).to.be.revertedWith("Amount is too big");
    });

});
