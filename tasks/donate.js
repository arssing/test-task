const DonationsArtifact = require("../artifacts/contracts/Donations.sol/Donations.json")

//address in rinkeby: 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3
//use: npx hardhat donate --address 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3 --value 0.005 --network rinkeby
task("donate", "Donate value to address")
  .addParam("address", "contract address")
  .addParam("value", "value to donate (in ETH)")
  .setAction(async (taskArgs) => {

    const [addr0, addr1] = await ethers.getSigners()
    const donatiosContract = new ethers.Contract(
      taskArgs.address,
      DonationsArtifact.abi,
      addr0
    )
    const balanceBefore = await ethers.provider.getBalance(taskArgs.address)
    console.log(`Contract balance before transaction:${ethers.utils.formatEther(balanceBefore)} ETH`)

    const result = await donatiosContract.deposit(
      {value:ethers.utils.parseEther(taskArgs.value)}
    )
    await result.wait()

    console.log("The donation has been sent")
    console.log(`Sender: ${addr1.address}`)
    console.log(`Hash: ${result.hash}`)

    const balanceAfter = await ethers.provider.getBalance(taskArgs.address)
    console.log(`Contract balance after transaction:${ethers.utils.formatEther(balanceAfter)} ETH`)
  })

module.exports = {}