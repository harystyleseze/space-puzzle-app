1. `GameToken` - For tokenization, detokenization, and key management
2. `RewardPool` - For daily rewards and reward pool interactions
3. `SpacePuzzleNFT` - For achievements and NFT interactions

Read file: space-puzzle-contracts/artifacts/contracts/GameToken.sol/GameToken.json

```javascript:space-puzzle-contracts/scripts/extract_abis.js
const fs = require('fs');
const path = require('path');

const contracts = [
    'GameToken',
    'RewardPool',
    'SpacePuzzleNFT'
];

function extractABI(contractName) {
    const artifactPath = path.join(
        __dirname,
        '..',
        'artifacts',
        'contracts',
        `${contractName}.sol`,
        `${contractName}.json`
    );

    const abiPath = path.join(
        __dirname,
        '..',
        'abi',
        `${contractName}.json`
    );

    const artifact = require(artifactPath);
    const abi = {
        abi: artifact.abi
    };

    fs.writeFileSync(
        abiPath,
        JSON.stringify(abi, null, 2)
    );

    console.log(`Extracted ABI for ${contractName}`);
}

// Create abi directory if it doesn't exist
const abiDir = path.join(__dirname, '..', 'abi');
if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
}

// Extract ABIs
contracts.forEach(extractABI);
```

Now you can run this script to extract the ABIs:

```bash
cd space-puzzle-contracts && node scripts/extract_abis.js
```

1. `GameToken.json`:

   - Tokenization functions (`tokenizeKeys`, `detokenizeKeys`)
   - Key management (`mintKeys`, `burnKeys`, `keyBalance`)
   - Role management functions
   - ERC20 standard functions (transfer, approve, etc.)

2. `RewardPool.json`:

   - Daily reward claiming (`claimDailyReward`)
   - Reward pool funding (`fundRewardPool`)
   - Reward status checks (`canClaimReward`, `getNextRewardAmount`)
   - Consecutive days tracking

3. `SpacePuzzleNFT.json`:
   - Achievement management (`createAchievement`, `mintAchievement`)
   - Achievement status checks (`isAchievementUnlocked`, `getPlayerAchievements`)
   - ERC721 standard functions (transfer, approve, etc.)

To use these in your frontend:

```javascript
import GameTokenABI from "../abi/GameToken.json";
import RewardPoolABI from "../abi/RewardPool.json";
import SpacePuzzleNFTABI from "../abi/SpacePuzzleNFT.json";

const gameToken = new ethers.Contract(
  GAME_TOKEN_ADDRESS,
  GameTokenABI.abi,
  signer
);
const rewardPool = new ethers.Contract(
  REWARD_POOL_ADDRESS,
  RewardPoolABI.abi,
  signer
);
const nft = new ethers.Contract(NFT_ADDRESS, SpacePuzzleNFTABI.abi, signer);
```

You don't need the interfaces and library ABIs for frontend interaction.

1. **Interfaces (IGameToken, IRewardPool, ISpacePuzzleNFT)**:

   - Interfaces are just contract definitions used during development
   - The actual implementation contracts (GameToken, RewardPool, SpacePuzzleNFT) already include all the interface functions in their ABIs
   - When you inherit from an interface, all its functions become part of the implementing contract's ABI

2. **Libraries (GameTypes)**:
   - Libraries are internal helper code
   - They don't have external functions that need to be called directly from the frontend
   - The contract functions that use these libraries already include all necessary data structures in their function parameters and return types

The three ABIs you have now (`GameToken.json`, `RewardPool.json`, and `SpacePuzzleNFT.json`) contain everything you need:

1. `GameToken.json`:

   - All ERC20 functions (transfer, approve, etc.)
   - All tokenization functions (tokenizeKeys, detokenizeKeys)
   - All role management functions
   - All events

2. `RewardPool.json`:

   - All reward claiming functions
   - All reward pool management functions
   - All events

3. `SpacePuzzleNFT.json`:
   - All ERC721 functions
   - All achievement management functions
   - All events
