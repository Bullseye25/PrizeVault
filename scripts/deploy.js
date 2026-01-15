import hre from "hardhat";

async function main() {
    console.log("Deploying PrizeVault...");

    // 1. Get the Test USDC Address (Base Sepolia)
    // Official Base Sepolia USDC: 0x036CbD53842c5426634e7929541eC2318f3dCF7e
    const usdcAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

    // 2. Deploy
    const PrizeVault = await hre.ethers.getContractFactory("PrizeVault");
    const vault = await PrizeVault.deploy(usdcAddress);

    await vault.waitForDeployment();

    const address = await vault.getAddress();
    console.log("PrizeVault deployed to:", address);

    // 3. Verification hint
    console.log(`npx hardhat verify --network baseSepolia ${address} ${usdcAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
