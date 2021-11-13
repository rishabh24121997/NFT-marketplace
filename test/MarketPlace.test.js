const MarketPlace = artifacts.require("MarketPlace")
const NewToken = artifacts.require("NewToken")
const RishabhERC20 = artifacts.require("RishabhERC20")

contract("MarketPlace", (accounts) => {
    before(async () => {
        rishabh = await RishabhERC20.deployed()
        newNFT = await NewToken.deployed()
        market = await MarketPlace.deployed()
    })

    it("Gives the owner 1000 RERCs", async () => {
        let balance = await rishabh.balanceOf(accounts[0])
        balance= web3.utils.fromWei(balance, 'ether')
        assert(balance, "1000", "balance must be 1000")
    })

    it("Transfer to another account", async () => {
        let amount = web3.utils.toWei("100", "ether")
        await rishabh.transfer(accounts[1], amount, { from: accounts[0]})
        let balance = await rishabh.balanceOf(accounts[1])
        balance= web3.utils.fromWei(balance, 'ether')
        assert(balance, "100", "balance must be 100")
    })

    it("Creates a token 1", async () => {
        const result = await newNFT.safeMint("Rishabh")
        const event = result.logs[0].args
        const tokenId = event.tokenId.toNumber()
        assert.equal(tokenId,0)
        assert.notEqual(result, null)
    })

    it("Creates a token 2", async () => {
        const result = await newNFT.safeMint("Rahul")
        const event = result.logs[0].args
        const tokenId = event.tokenId.toNumber()
        assert.equal(tokenId,1)
        assert.notEqual(result, null)
    })

    it("Access tokens", async () => {
        let totalNFTs = await newNFT.totalNfts()
        totalNFTs = totalNFTs.toNumber()
        let names = []
        for (let i = 0; i < totalNFTs; i++) {
            names.push(await newNFT.names(i))
        }
        assert.equal(names[0],"Rishabh")
        assert.equal(names[1],"Rahul")
    })

    it("Add Listing", async () => {
        await newNFT.setApprovalForAll(market.address, true)
        await market.addListing(20 ,newNFT.address, 0)
        const listings = await market.listings(newNFT.address, 0)
        assert.notEqual(listings, null)
    })

    it("Check Balances", async () => {
        let balance1 = await rishabh.balanceOf(accounts[0])
        balance1= web3.utils.fromWei(balance1, 'ether')
        assert.equal(balance1, "900")

        let balance2 = await rishabh.balanceOf(accounts[1])
        balance2= web3.utils.fromWei(balance2, 'ether')
        assert.equal(balance2, "100")
    })

    it("Purchase NFT", async () => {
        await rishabh.increaseAllowance(accounts[1], 1000)
        const price = 50
        const tx = await market.purchase(newNFT.address, rishabh.address, 0, price, {from: accounts[1]})
        assert.notEqual(tx, null)
    })
})