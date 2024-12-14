// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract SimpleSupplyChain {
    struct Product {
        uint256 id;
        string name;
        address manufacturer;
        uint256 timestamp;
        string[] locations;
        address[] handlers;
    }

    mapping (uint256 => Product) public products;
    uint256 public  productCounter;

    event ProductCreated(uint256 id, string name, address manufacturer, uint256 timestamp);
    event ProductUpdated(uint256 id, string location, address handler, uint256 timestamp);

    function createProduct(string memory name) public {
        productCounter++;
        Product storage newProduct = products[productCounter];

        newProduct.id = productCounter;
        newProduct.name = name;
        newProduct.manufacturer = msg.sender;
        newProduct.timestamp = block.timestamp;

        emit ProductCreated(productCounter, name, msg.sender, block.timestamp);
    }

    // Update product location
    function updateProduct(uint256 productId, string memory location) public {
        require(products[productId].id != 0, "Product does not exist");

        Product storage product = products[productId];
        product.locations.push(location);
        product.handlers.push(msg.sender);

        emit ProductUpdated(productId, location, msg.sender, block.timestamp);
    }

    // Fetch product details
    function getProduct(uint256 productId)
        public
        view
        returns (
            string memory name,
            address manufacturer,
            uint256 timestamp,
            string[] memory locations,
            address[] memory handlers
        )
    {
        require(products[productId].id != 0, "Product does not exist");

        Product storage product = products[productId];
        return (
            product.name,
            product.manufacturer,
            product.timestamp,
            product.locations,
            product.handlers
        );
    }

     // Get all products created by an account
    function getProductsByAccount(address account) public view returns (Product[] memory) {
        uint256 count = 0;

        for (uint256 i = 1; i <= productCounter; i++) {
            if (products[i].manufacturer == account) {
                count++;
            }
        }

        Product[] memory accountProducts = new Product[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= productCounter; i++) {
            if (products[i].manufacturer == account) {
                accountProducts[index] = products[i];
                index++;
            }
        }

        return accountProducts;
    }
}