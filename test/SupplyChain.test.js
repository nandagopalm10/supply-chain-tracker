const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
  let supplyChain;
  const [manufacturer, distributor, retailer] = accounts;
  
  beforeEach(async () => {
    supplyChain = await SupplyChain.new();
  });
  
  it("should register a participant", async () => {
    await supplyChain.registerParticipant("Manufacturer Co.", "Manufacturer", { from: manufacturer });
    const participant = await supplyChain.participants(manufacturer);
    assert.equal(participant.isRegistered, true);
  });
  
  it("should create a product", async () => {
    await supplyChain.registerParticipant("Manufacturer Co.", "Manufacturer", { from: manufacturer });
    await supplyChain.createProduct("Laptop", { from: manufacturer });
    
    const product = await supplyChain.products(1);
    assert.equal(product.name, "Laptop");
    assert.equal(product.status, 0); // Created status
  });
  
  it("should transfer ownership", async () => {
    // Register participants
    await supplyChain.registerParticipant("Manufacturer Co.", "Manufacturer", { from: manufacturer });
    await supplyChain.registerParticipant("Distributor Co.", "Distributor", { from: distributor });
    
    // Create product
    await supplyChain.createProduct("Laptop", { from: manufacturer });
    
    // Transfer ownership
    await supplyChain.transferOwnership(1, distributor, { from: manufacturer });
    
    const product = await supplyChain.products(1);
    assert.equal(product.currentOwner, distributor);
  });
});