# Space Puzzle Game - Smart Contract Documentation

## Overview

The Space Puzzle Game consists of three main smart contracts that work together to provide tokenization, rewards, and achievements:

1. `GameToken (KEY)`: ERC20 token for in-game keys
2. `RewardPool`: Daily rewards distribution system
3. `SpacePuzzleNFT (SPACE)`: Achievement NFT system

## Contract Addresses (Core Testnet)

- GameToken: `0x46B0cFbf0786D48D2A97ae628d3E76cB8e1943B9`
- RewardPool: `0x905e29f9F5c4298339B3A0a6989119340d9059F3`
- SpacePuzzleNFT: `0xb19355A7E708883Df704998A3FAd5a506fFE1880`

## Stakeholders

1. Players
2. Game Administrators
3. Contract Owner
4. Reward Pool Funders

## 1. GameToken (KEY) Contract

### Features

- Tokenization of in-game keys
- Detokenization back to in-game keys
- Transfer and trading capabilities
- Role-based access control

### Requirements

- MetaMask wallet
- CORE tokens for gas fees
- Connection to Core Testnet (Chain ID: 1114)

### Functions for Players

1. **Tokenize Keys**

   ```solidity
   function tokenizeKeys(uint256 amount) external
   ```

   - Limits: 1-100 keys per transaction
   - Cooldown: 1 hour between tokenizations
   - Requirements:
     - Valid amount (1-100)
     - Cooldown period passed
   - Emits: `KeysTokenized` event

2. **Detokenize Keys**

   ```solidity
   function detokenizeKeys(uint256 amount) external
   ```

   - Requirements:
     - Sufficient token balance
     - Amount > 0
   - Emits: `KeysDetokenized` event

3. **Check Balance**
   ```solidity
   function keyBalance(address player) external view returns (uint256)
   ```
   - View function to check token balance

### Functions for Game Administrators

1. **Mint Keys**

   ```solidity
   function mintKeys(address player, uint256 amount) external
   ```

   - Requires: GAME_ROLE
   - Used for: Game rewards, special events

2. **Burn Keys**
   ```solidity
   function burnKeys(address player, uint256 amount) external
   ```
   - Requires: GAME_ROLE
   - Used for: In-game key usage

### Functions for Contract Owner

1. **Pause/Unpause**

   ```solidity
   function pause() external
   function unpause() external
   ```

   - Requires: DEFAULT_ADMIN_ROLE
   - Used for: Emergency stops

2. **Role Management**
   ```solidity
   function grantRole(bytes32 role, address account) external
   function revokeRole(bytes32 role, address account) external
   ```
   - Available Roles:
     - DEFAULT_ADMIN_ROLE
     - GAME_ROLE
     - MINTER_ROLE

## 2. RewardPool Contract

### Features

- Daily reward distribution
- Consecutive day multipliers
- Reward pool funding
- Automatic reward calculation

### Requirements

- GameToken contract deployed
- Sufficient tokens in reward pool
- Player wallet connected

### Functions for Players

1. **Claim Daily Reward**

   ```solidity
   function claimDailyReward() external
   ```

   - Requirements:
     - 24 hours since last claim
     - Sufficient tokens in pool
   - Emits: `RewardClaimed` event

2. **Check Reward Status**
   ```solidity
   function canClaimReward(address player) external view returns (bool)
   function getNextRewardAmount(address player) external view returns (uint256)
   function getConsecutiveDays(address player) external view returns (uint256)
   ```

### Functions for Reward Pool Funders

1. **Fund Pool**
   ```solidity
   function fundRewardPool(uint256 amount) external
   ```
   - Requirements:
     - Approved token transfer
     - Amount > 0
   - Emits: `RewardPoolFunded` event

### Functions for Contract Owner

1. **Configure Rewards**
   ```solidity
   function setBaseReward(uint256 _baseReward) external
   function setMaxConsecutiveDays(uint256 _maxConsecutiveDays) external
   ```
   - Requires: Owner access
   - Used for: Adjusting reward parameters

## 3. SpacePuzzleNFT Contract

### Features

- Achievement NFTs
- Achievement tracking
- Rarity levels
- Achievement requirements

### Requirements

- Connected wallet
- Meet achievement criteria
- Game administrator approval

### Functions for Players

1. **View Achievements**
   ```solidity
   function getPlayerAchievements(address player) external view returns (uint256[])
   function isAchievementUnlocked(address player, uint256 achievementId) external view returns (bool)
   ```

### Functions for Game Administrators

1. **Create Achievement**

   ```solidity
   function createAchievement(
       string memory name,
       string memory description,
       uint256 rarity,
       uint256 requiredScore,
       uint256 requiredLevel
   ) external
   ```

   - Requires: Owner access
   - Emits: `NewAchievementAdded` event

2. **Unlock Achievement**
   ```solidity
   function unlockAchievement(
       address player,
       uint256 achievementId,
       uint256 score,
       uint256 level
   ) external
   ```
   - Requirements:
     - Achievement exists
     - Not already unlocked
     - Meet score/level requirements
   - Emits: `AchievementUnlocked` event

## User Flows

### Player Flow

1. **Initial Setup**

   - Install MetaMask
   - Connect to Core Testnet
   - Get CORE tokens for gas

2. **Key Management**

   - Play game to earn keys
   - Tokenize keys (1-100 at a time)
   - Trade keys with other players
   - Detokenize keys when needed

3. **Daily Rewards**

   - Check reward availability
   - Claim daily reward
   - Build consecutive day streak
   - View reward history

4. **Achievements**
   - Play game to meet requirements
   - Check achievement progress
   - Receive NFTs for unlocked achievements
   - View achievement collection

### Game Administrator Flow

1. **Setup**

   - Receive GAME_ROLE access
   - Configure achievement parameters

2. **Management**

   - Create new achievements
   - Monitor player progress
   - Unlock achievements for players
   - Manage key minting/burning

3. **Maintenance**
   - Monitor reward pool balance
   - Track achievement statistics
   - Handle player issues

### Contract Owner Flow

1. **Initial Setup**

   - Deploy contracts
   - Configure initial parameters
   - Grant administrative roles

2. **Ongoing Management**
   - Monitor contract health
   - Adjust reward parameters
   - Handle emergency situations
   - Manage access control

### Reward Pool Funder Flow

1. **Setup**

   - Acquire KEY tokens
   - Approve RewardPool contract

2. **Operations**
   - Monitor pool balance
   - Fund pool as needed
   - Track reward distribution

## Integration Requirements

### Frontend Integration

1. **Web3 Provider**

   ```javascript
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   ```

2. **Contract Initialization**

   ```javascript
   const gameHelper = new GameContractHelper(provider);
   await gameHelper.init(DEPLOYED_ADDRESSES);
   ```

3. **Event Handling**
   ```javascript
   gameHelper.setupEventListeners({
     onKeysTokenized: (player, amount) => {},
     onKeysDetokenized: (player, amount) => {},
     onRewardClaimed: (player, amount, consecutiveDays) => {},
     onAchievementAdded: (id, name, rarity) => {},
   });
   ```

### Network Requirements

- Network: Core Testnet
- Chain ID: 1114
- RPC URL: https://rpc.test2.btcs.network
- Explorer: https://scan.test2.btcs.network

This documentation provides a comprehensive guide for all stakeholders to interact with the Space Puzzle Game smart contracts. Each contract serves a specific purpose in the ecosystem, and together they create a complete blockchain-based gaming experience with tokenization, rewards, and achievements.
