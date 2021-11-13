const NewToken = artifacts.require("NewToken")

contract("NewToken", (accounts) => {
    before(async () => {
        newNFT = await NewToken.deployed()
    })

    // it("Address is not empty", async () => {
    //     const address = newNFT.address
    //     console.log(address)
    //     assert.notEqual(address, '')
    // })

    // it("Has Name", async () => {
    //     const name = await newNFT.name()
    //     assert.equal(name,"NewToken")
    // })

    // it("Has Symbol", async () => {
    //     const symbol = await newNFT.symbol()
    //     assert.equal(symbol,"NTN")
    // })

    // it("Creates a new token", async () => {
    //     const result = await newNFT.safeMint("Ravi")
    //     const event = result.logs[0].args
    //     // const balance = await newNFT.balanceOf(event.tokenId)
    //     // console.log(result)
    //     //console.log(balance)
    //     assert.notEqual(result, null)
    // })
})
    