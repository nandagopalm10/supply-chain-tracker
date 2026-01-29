// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum ProductStatus { Created, InTransit, Delivered }
    
    struct Product {
        uint256 id;
        string name;
        address manufacturer;
        address currentOwner;
        ProductStatus status;
        uint256 createdAt;
        uint256 updatedAt;
        string[] locations;
    }
    
    struct Participant {
        address addr;
        string name;
        string role; // Manufacturer, Distributor, Retailer, Customer
        bool isRegistered;
    }
    
    mapping(uint256 => Product) public products;
    mapping(address => Participant) public participants;
    uint256 public productCount;
    
    event ProductCreated(uint256 indexed id, string name, address manufacturer);
    event StatusUpdated(uint256 indexed id, ProductStatus status, string location);
    event OwnershipTransferred(uint256 indexed id, address from, address to);
    event ParticipantRegistered(address indexed addr, string name, string role);
    
    modifier onlyRegistered() {
        require(participants[msg.sender].isRegistered, "Not registered");
        _;
    }
    
    modifier onlyProductOwner(uint256 _productId) {
        require(products[_productId].currentOwner == msg.sender, "Not product owner");
        _;
    }
    
    // Register a participant
    function registerParticipant(string memory _name, string memory _role) public {
        require(!participants[msg.sender].isRegistered, "Already registered");
        
        participants[msg.sender] = Participant({
            addr: msg.sender,
            name: _name,
            role: _role,
            isRegistered: true
        });
        
        emit ParticipantRegistered(msg.sender, _name, _role);
    }
    
    // Create a new product
    function createProduct(string memory _name) public onlyRegistered {
        productCount++;
        
        products[productCount] = Product({
            id: productCount,
            name: _name,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            status: ProductStatus.Created,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            locations: new string[](0)
        });
        
        products[productCount].locations.push("Manufacturing Facility");
        
        emit ProductCreated(productCount, _name, msg.sender);
        emit StatusUpdated(productCount, ProductStatus.Created, "Manufacturing Facility");
    }
    
    // Update product status
    function updateStatus(uint256 _productId, ProductStatus _status, string memory _location) 
        public 
        onlyRegistered 
        onlyProductOwner(_productId) 
    {
        Product storage product = products[_productId];
        product.status = _status;
        product.updatedAt = block.timestamp;
        product.locations.push(_location);
        
        emit StatusUpdated(_productId, _status, _location);
    }
    
    // Transfer ownership
    function transferOwnership(uint256 _productId, address _newOwner) 
        public 
        onlyRegistered 
        onlyProductOwner(_productId) 
    {
        require(participants[_newOwner].isRegistered, "New owner not registered");
        
        Product storage product = products[_productId];
        address previousOwner = product.currentOwner;
        product.currentOwner = _newOwner;
        product.updatedAt = block.timestamp;
        
        emit OwnershipTransferred(_productId, previousOwner, _newOwner);
    }
    
    // Get product details
    function getProduct(uint256 _productId) public view returns (
        uint256 id,
        string memory name,
        address manufacturer,
        address currentOwner,
        ProductStatus status,
        uint256 createdAt,
        uint256 updatedAt,
        string[] memory locations
    ) {
        Product memory product = products[_productId];
        return (
            product.id,
            product.name,
            product.manufacturer,
            product.currentOwner,
            product.status,
            product.createdAt,
            product.updatedAt,
            product.locations
        );
    }
    
    // Get participant count
    function getParticipantCount() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < productCount; i++) {
            if (participants[address(uint160(i))].isRegistered) {
                count++;
            }
        }
        return count;
    }
}