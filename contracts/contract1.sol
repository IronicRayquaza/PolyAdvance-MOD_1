// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract contract1 is ERC721A {
    address public owner;

    // Maximum number of tokens that can be minted
    uint256 public constant MAX_QUANTITY = 5;

    // Base URL for the NFTs
    string private constant BASE_URL =
        "https://gateway.pinata.cloud/ipfs/QmXfEJU9kDprKfxT6evBqPxeCAqGW2Vref9dgv9A2UKs4s/";

    // URL for the prompt description
    string public constant PROMPT = "Nature Images";

    constructor() ERC721A("Contract1", "IR") {
        owner = msg.sender;
    }

    // Modifier that only allows the owner to execute a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action!");
        _;
    }

    // Function to mint NFTs which only the owner can perform
    function mint(uint256 quantity) external payable onlyOwner {
        require(
            totalSupply() + quantity <= MAX_QUANTITY,
            "You cannot mint more than the maximum quantity"
        );
        _mint(msg.sender, quantity);
    }

    // Override the _baseURI function to return the base URL for the NFTs
    function _baseURI() internal pure override returns (string memory) {
        return BASE_URL;
    }

    // Return the URL for the prompt description
    function getPromptDescription() external pure returns (string memory) {
        return PROMPT;
    }
}
