// SPDX-License-Identifier : MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NewToken is ERC721, Ownable {
    string[] public names;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NewToken", "NTN") {}

    function safeMint(string memory name) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        names.push(name);
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }
    
    function totalNfts() public view returns (uint256) {
        uint256 nftNumber = _tokenIdCounter.current();
        return nftNumber;
    }
}