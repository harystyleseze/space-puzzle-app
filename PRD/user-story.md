1. Token Management:
   Yes, the `GameToken` contract supports all token management functions through the following methods:

```typescript
// Example frontend code for token management
import { useContract, useContractWrite } from "thirdweb/react";

function TokenManagement() {
  const { contract } = useContract("YOUR_GAME_TOKEN_ADDRESS");

  // Mint tokens to player
  const { mutate: mintKeys } = useContractWrite(contract, "mintKeys");
  const handleMint = async (playerAddress: string, amount: number) => {
    try {
      await mintKeys({ args: [playerAddress, amount] });
      toast.success("Successfully minted tokens!");
    } catch (error) {
      toast.error("Failed to mint tokens");
    }
  };

  // Burn tokens from player
  const { mutate: burnKeys } = useContractWrite(contract, "burnKeys");
  const handleBurn = async (playerAddress: string, amount: number) => {
    try {
      await burnKeys({ args: [playerAddress, amount] });
      toast.success("Successfully burned tokens!");
    } catch (error) {
      toast.error("Failed to burn tokens");
    }
  };

  // Check player's balance
  const { data: balance } = useContractRead(contract, "keyBalance", [
    playerAddress,
  ]);
}
```

2. Reward Configuration:
   Yes, the `RewardPool` contract handles rewards through these methods:

```typescript
// Example frontend code for reward management
function RewardManagement() {
  const { contract } = useContract("YOUR_REWARD_POOL_ADDRESS");

  // Claim daily reward
  const { mutate: claimReward } = useContractWrite(
    contract,
    "claimDailyReward"
  );
  const handleClaim = async () => {
    try {
      await claimReward();
      toast.success("Successfully claimed daily reward!");
    } catch (error) {
      toast.error("Failed to claim reward");
    }
  };

  // Check if can claim reward
  const { data: canClaim } = useContractRead(contract, "canClaimReward", [
    playerAddress,
  ]);

  // Get next reward amount
  const { data: nextReward } = useContractRead(
    contract,
    "getNextRewardAmount",
    [playerAddress]
  );

  // Get consecutive days
  const { data: consecutiveDays } = useContractRead(
    contract,
    "getConsecutiveDays",
    [playerAddress]
  );
}
```

3. Achievement Management:
   Yes, the `SpacePuzzleNFT` contract supports achievement management:

```typescript
// Example frontend code for achievement management
function AchievementManagement() {
  const { contract } = useContract("YOUR_SPACE_PUZZLE_NFT_ADDRESS");

  // Create new achievement
  const { mutate: createAchievement } = useContractWrite(
    contract,
    "createAchievement"
  );
  const handleCreateAchievement = async () => {
    try {
      await createAchievement({
        args: [
          "Master Explorer", // name
          "Complete 100 space puzzles", // description
          5, // rarity (1-5)
          1000, // required score
          10, // required level
        ],
      });
      toast.success("Successfully created achievement!");
    } catch (error) {
      toast.error("Failed to create achievement");
    }
  };

  // Mint achievement to player
  const { mutate: mintAchievement } = useContractWrite(
    contract,
    "mintAchievement"
  );
  const handleMintAchievement = async (
    playerAddress: string,
    achievementId: number
  ) => {
    try {
      await mintAchievement({ args: [playerAddress, achievementId] });
      toast.success("Successfully minted achievement!");
    } catch (error) {
      toast.error("Failed to mint achievement");
    }
  };

  // Get player achievements
  const { data: achievements } = useContractRead(
    contract,
    "getPlayerAchievements",
    [playerAddress]
  );
}
```

4. User Management:
   Yes, the `GameToken` contract handles role management:

```typescript
// Example frontend code for role management
function RoleManagement() {
  const { contract } = useContract("YOUR_GAME_TOKEN_ADDRESS");

  // Grant roles
  const { mutate: grantGameRole } = useContractWrite(contract, "grantGameRole");
  const { mutate: grantMinterRole } = useContractWrite(
    contract,
    "grantMinterRole"
  );

  const handleGrantRole = async (
    address: string,
    roleType: "game" | "minter"
  ) => {
    try {
      if (roleType === "game") {
        await grantGameRole({ args: [address] });
      } else {
        await grantMinterRole({ args: [address] });
      }
      toast.success(`Successfully granted ${roleType} role!`);
    } catch (error) {
      toast.error(`Failed to grant ${roleType} role`);
    }
  };

  // Revoke roles
  const { mutate: revokeGameRole } = useContractWrite(
    contract,
    "revokeGameRole"
  );
  const { mutate: revokeMinterRole } = useContractWrite(
    contract,
    "revokeMinterRole"
  );

  const handleRevokeRole = async (
    address: string,
    roleType: "game" | "minter"
  ) => {
    try {
      if (roleType === "game") {
        await revokeGameRole({ args: [address] });
      } else {
        await revokeMinterRole({ args: [address] });
      }
      toast.success(`Successfully revoked ${roleType} role!`);
    } catch (error) {
      toast.error(`Failed to revoke ${roleType} role`);
    }
  };

  // Check roles
  const { data: hasGameRole } = useContractRead(contract, "hasGameRole", [
    address,
  ]);
  const { data: hasMinterRole } = useContractRead(contract, "hasMinterRole", [
    address,
  ]);
  const { data: hasAdminRole } = useContractRead(contract, "hasAdminRole", [
    address,
  ]);
}
```

Here's a complete example component that brings it all together:

```typescript
import { useContract, useContractWrite, useContractRead } from "thirdweb/react";
import { toast } from "sonner";

export function GameManagement() {
  const { contract: tokenContract } = useContract("YOUR_GAME_TOKEN_ADDRESS");
  const { contract: rewardContract } = useContract("YOUR_REWARD_POOL_ADDRESS");
  const { contract: nftContract } = useContract(
    "YOUR_SPACE_PUZZLE_NFT_ADDRESS"
  );

  // Token Management Functions
  const { mutate: mintKeys } = useContractWrite(tokenContract, "mintKeys");
  const { mutate: burnKeys } = useContractWrite(tokenContract, "burnKeys");

  // Reward Management Functions
  const { mutate: claimReward } = useContractWrite(
    rewardContract,
    "claimDailyReward"
  );

  // Achievement Management Functions
  const { mutate: createAchievement } = useContractWrite(
    nftContract,
    "createAchievement"
  );
  const { mutate: mintAchievement } = useContractWrite(
    nftContract,
    "mintAchievement"
  );

  // Role Management Functions
  const { mutate: grantGameRole } = useContractWrite(
    tokenContract,
    "grantGameRole"
  );
  const { mutate: revokeGameRole } = useContractWrite(
    tokenContract,
    "revokeGameRole"
  );

  return (
    <div className="space-y-4">
      {/* Token Management UI */}
      <div>
        <h2>Token Management</h2>
        <button onClick={() => mintKeys({ args: [playerAddress, amount] })}>
          Mint Tokens
        </button>
        <button onClick={() => burnKeys({ args: [playerAddress, amount] })}>
          Burn Tokens
        </button>
      </div>

      {/* Reward Management UI */}
      <div>
        <h2>Rewards</h2>
        <button onClick={() => claimReward()}>Claim Daily Reward</button>
      </div>

      {/* Achievement Management UI */}
      <div>
        <h2>Achievements</h2>
        <button
          onClick={() =>
            createAchievement({
              args: ["Achievement Name", "Description", 5, 1000, 10],
            })
          }
        >
          Create Achievement
        </button>
        <button
          onClick={() =>
            mintAchievement({
              args: [playerAddress, achievementId],
            })
          }
        >
          Mint Achievement
        </button>
      </div>

      {/* Role Management UI */}
      <div>
        <h2>Role Management</h2>
        <button onClick={() => grantGameRole({ args: [address] })}>
          Grant Game Role
        </button>
        <button onClick={() => revokeGameRole({ args: [address] })}>
          Revoke Game Role
        </button>
      </div>
    </div>
  );
}
```

All these functions are properly implemented in the smart contracts and can be called from the frontend. A few important notes:

1. Make sure to replace `YOUR_*_ADDRESS` with actual contract addresses
2. Handle errors appropriately in production
3. Add loading states for better UX
4. Add proper input validation
5. Implement proper access control checks in the UI
6. Use proper TypeScript types for better type safety
7. Add proper event listeners to handle transaction success/failure
8. Implement proper error messages for failed transactions
