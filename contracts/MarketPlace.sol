// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./NewToken.sol";
import "./RishabhERC20.sol";

contract Marketplace {
    mapping (address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) public balances;
    
    struct Listing {
        uint256 price;
        address seller;
    }
    
    function addListing(uint256 price, address contractAdr, uint256 tokenId) public {
        NewToken token = NewToken(contractAdr);
        require(token.balanceOf(msg.sender)>0, "Caller is the owner of the token");
        require(token.isApprovedForAll(msg.sender, address(this)), "Contract must be approved");
        
        listings[contractAdr][tokenId] = Listing(price, msg.sender);
    }
    
    function purchase(address nftAdr, address rercAdr, uint256 tokenId, uint256 amount) public {
        RishabhERC20 rerc = RishabhERC20(rercAdr);
        Listing memory item = listings[nftAdr][tokenId];
        require(rerc.balanceOf(msg.sender) >= amount,"Insufficeient Funds sent");
        balances[item.seller] += rerc.balanceOf(msg.sender);
        
        NewToken nft = NewToken(nftAdr);
        
        require(amount >= item.price);
        rerc.transferFrom(msg.sender, item.seller,amount);
        nft.safeTransferFrom(item.seller, msg.sender, tokenId);
    }
}