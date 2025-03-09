# Space Puzzle Game Smart Contracts Documentation

## Contract Overview

1. **GameToken (KEY)**: ERC20 token for in-game keys and rewards
2. **RewardPool**: Manages daily rewards and consecutive play bonuses
3. **SpacePuzzleNFT (SPACE)**: Handles achievement NFTs and tracking

## Initial Setup Sequence

### 1. Administrative Setup (Contract Owner)

#### GameToken Setup

```solidity
// Deploy GameToken
GameToken token = new GameToken();

// Grant roles to game contract/operators
token.grantRole(GAME_ROLE, gameContractAddress);
token.grantRole(MINTER_ROLE, gameContractAddress);
```

#### RewardPool Setup

```solidity
// Deploy RewardPool with GameToken address
RewardPool rewardPool = new RewardPool(gameTokenAddress);

// Fund the reward pool
// First approve tokens
gameToken.approve(rewardPoolAddress, amount);
// Then fund
rewardPool.fundRewardPool(amount);
```

#### SpacePuzzleNFT Setup

```solidity
// Deploy NFT contract
SpacePuzzleNFT nft = new SpacePuzzleNFT();

// Create achievements
nft.createAchievement(
    "First Win",
    "Win your first game",
    1, // rarity (1-5)
    100, // required score
    1 // required level
);
```

### 2. Game Contract Integration Points

#### Key Management

```solidity
// Mint keys to players for winning games
gameToken.mintKeys(playerAddress, amount);

// Burn keys when used in game
gameToken.burnKeys(playerAddress, amount);

// Check if player has enough keys
bool hasKeys = gameToken.hasEnoughKeys(playerAddress, requiredAmount);
```

## Player Interactions

### 1. Key Token Operations

#### Tokenize Game Keys

```solidity
// Convert in-game keys to tokens (3 keys = 1 token)
// Maximum 100 keys per transaction
// 10-minute cooldown between operations
gameToken.tokenizeKeys(amount);

// Event emitted: KeysTokenized(address player, uint256 amount)
```

#### Detokenize Keys

```solidity
// Convert tokens back to in-game keys
gameToken.detokenizeKeys(amount);

// Event emitted: KeysDetokenized(address player, uint256 amount)
```

#### Check Balances

```solidity
// Get key token balance
uint256 balance = gameToken.keyBalance(playerAddress);

// Check if player has enough keys
bool hasEnough = gameToken.hasEnoughKeys(playerAddress, amount);
```

### 2. Daily Rewards

#### Claim Daily Rewards

```solidity
// Check if can claim
bool canClaim = rewardPool.canClaimReward(playerAddress);

// Get next reward amount
uint256 nextReward = rewardPool.getNextRewardAmount(playerAddress);

// Claim daily reward
rewardPool.claimDailyReward();

// Event emitted: RewardClaimed(address player, uint256 amount, uint256 consecutiveDays)
```

#### View Reward Stats

```solidity
// Get consecutive days claimed
uint256 streak = rewardPool.getConsecutiveDays(playerAddress);

// Get last claim time
uint256 lastClaim = rewardPool.getLastClaimTime(playerAddress);
```

### 3. Achievements

#### View Achievements

```solidity
// Get all player achievements
uint256[] memory achievements = nft.getPlayerAchievements(playerAddress);

// Check if achievement is unlocked
bool isUnlocked = nft.isAchievementUnlocked(playerAddress, achievementId);
```

## Administrative Functions

### GameToken Administration

```solidity
// Pause all token operations
gameToken.pause();

// Unpause token operations
gameToken.unpause();
```

### RewardPool Administration

```solidity
// Fund the reward pool
// First approve tokens
gameToken.approve(rewardPoolAddress, amount);
// Then fund
rewardPool.fundRewardPool(amount);

// Event emitted: RewardPoolFunded(address funder, uint256 amount)
```

### Achievement Administration

```solidity
// Create new achievement
uint256 achievementId = nft.createAchievement(
    "Achievement Name",
    "Achievement Description",
    rarity, // 1-5
    requiredScore,
    requiredLevel
);

// Event emitted: NewAchievementAdded(uint256 id, string name, uint256 rarity)

// Mint achievement to player
nft.mintAchievement(playerAddress, achievementId);

// Event emitted: AchievementUnlocked(address player, uint256 achievementId, uint256 tokenId)
```

## Important Constants

### GameToken

- `KEY_TO_TOKEN_RATE = 9`: Conversion rate for tokenization
- `MAX_TOKENIZE_AMOUNT = 100`: Maximum keys per tokenization
- `TOKENIZE_COOLDOWN = 10 minutes`: Cooldown between tokenizations

### RewardPool

- `DAILY_RESET_TIME = 24 hours`: Time between reward claims
- `baseReward = 5 * 10**18`: Base reward amount (5 tokens)

## Execution Flow Examples

### New Player Onboarding

1. Player connects wallet
2. Can immediately claim first daily reward
3. Receives achievement NFT for first game
4. Can start earning and tokenizing keys

### Daily Player Loop

1. Claim daily reward (increases consecutive days multiplier)
2. Play games to earn keys
3. Tokenize keys when desired (with cooldown)
4. Unlock achievements based on progress

### Game Completion Flow

1. Game contract checks if player has required keys
2. Burns keys for game entry
3. After game completion:
   - Mints reward keys
   - Checks and awards achievements
   - Updates player stats

### Achievement Unlock Sequence

1. Game/Admin checks achievement requirements
2. Verifies achievement not already unlocked
3. Mints achievement NFT to player
4. Updates player achievement records

## Security Considerations

1. Only owner can pause/unpause token operations
2. Only game contract can mint/burn keys
3. Cooldown periods prevent abuse
4. Achievement minting controlled by owner
5. Reward claims have 24-hour cooldown
6. Consecutive days reset after 48 hours
