const DonationsArtifact = require("../artifacts/contracts/Donations.sol/Donations.json")

//address in rinkeby: 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3
//use: npx hardhat get-donation --contractaddress 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3 --address 0x4516bD19A8b4D5701b84Facb0E2b53afB6739706 --network rinkeby
task("get-donation", "get donation by address")
  .addParam("contractaddress", "contract address")
  .addParam("address", "sender address")
  .setAction(async (taskArgs) => {

    const [addr0] = await ethers.getSigners()
    const donatiosContract = new ethers.Contract(
      taskArgs.contractaddress,
      DonationsArtifact.abi,
      addr0
    )
    const result = await donatiosContract.getDonation(taskArgs.address)
    console.log(`${taskArgs.address} sent: ${ethers.utils.formatEther(result)} ETH`)

  })

module.exports = {}