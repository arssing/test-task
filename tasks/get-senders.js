const DonationsArtifact = require("../artifacts/contracts/Donations.sol/Donations.json")

//address in rinkeby: 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3
//use: npx hardhat get-senders --address 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3 --network rinkeby
task("get-senders", "get all senders")
  .addParam("address", "contract address")
  .setAction(async (taskArgs) => {

    const [addr0] = await ethers.getSigners()
    const donatiosContract = new ethers.Contract(
      taskArgs.address,
      DonationsArtifact.abi,
      addr0
    )
    const result = await donatiosContract.getSenders()
    console.log(`Senders: ${result}`)

  })

module.exports = {}