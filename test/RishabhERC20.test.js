const RishabhERC20 = artifacts.require("RishabhERC20")

contract("RishabhERC20", (accounts) => {
    before(async () => {
        rishabh = await RishabhERC20.deployed()
    })

    // it("Gives the owner 1000 RERCs", async () => {
    //     let balance = await rishabh.balanceOf(accounts[0])
    //     balance= web3.utils.fromWei(balance, 'ether')
    //     assert(balance, "1000", "balance must be 1000")
    // })

    // it("Transfer to another account", async () => {
    //     let amount = web3.utils.toWei("100", "ether")
    //     await rishabh.transfer(accounts[1], amount, { from: accounts[0]})
    //     let balance = await rishabh.balanceOf(accounts[1])
    //     balance= web3.utils.fromWei(balance, 'ether')
    //     assert(balance, "100", "balance must be 100")
    // })
})