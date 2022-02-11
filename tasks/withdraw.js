const DonationsArtifact = require("../artifacts/contracts/Donations.sol/Donations.json")

//address in rinkeby: 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3
//use: --contractaddress 0x5e700d4a22fd43e1a0b185b68c937b09bb2752c3 --address <address-to-withdraw> --amount 0.01 --network rinkeby

task("withdraw", "Withdraw amount to address")
  .addParam("contractaddress", "contract address with we will interact")
  .addParam("address", "address to withdraw")
  .addParam("amount", "amount to withdraw")
  .setAction(async (taskArgs) => {

    const [owner] = await ethers.getSigners()
    const donatiosContract = new ethers.Contract(
      taskArgs.contractaddress,
      DonationsArtifact.abi,
      owner
    )
    const balanceBefore = await ethers.provider.getBalance(taskArgs.contractaddress)
    const balanceBeforeAddr2 = await ethers.provider.getBalance(taskArgs.address)

    console.log(`Contract balance before:${ethers.utils.formatEther(balanceBefore)} ETH`)
    console.log(`Address balance before:${ethers.utils.formatEther(balanceBeforeAddr2)} ETH`)

    const result = await donatiosContract.withdraw(
        taskArgs.address,
        ethers.utils.parseEther(taskArgs.amount)
    )
    await result.wait()

    console.log("The withdraw has been sent")
    console.log(`Hash: ${result.hash}`)

    const balanceAfter = await ethers.provider.getBalance(taskArgs.contractaddress)
    const balanceAfterAddr2 = await ethers.provider.getBalance(taskArgs.address)

    console.log(`Contract balance after:${ethers.utils.formatEther(balanceAfter)} ETH`)
    console.log(`Address balance after:${ethers.utils.formatEther(balanceAfterAddr2)} ETH`)

  })