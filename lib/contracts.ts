import { ethers } from "ethers"

// Contract ABIs (simplified for example)
const gameTokenAbi = [
  "function tokenizeKeys(uint256 amount) external",
  "function detokenizeKeys(uint256 amount) external",
  "function keyBalance(address player) external view returns (uint256)",
  "function mintKeys(address player, uint256 amount) external",
  "function burnKeys(address player, uint256 amount) external",
  "function pause() external",
  "function unpause() external",
  "function grantRole(bytes32 role, address account) external",
  "function revokeRole(bytes32 role, address account) external",
]

const rewardPoolAbi = [
  "function claimDailyReward() external",
  "function canClaimReward(address player) external view returns (bool)",
  "function getNextRewardAmount(address player) external view returns (uint256)",
  "function getConsecutiveDays(address player) external view returns (uint256)",
  "function fundRewardPool(uint256 amount) external",
  "function setBaseReward(uint256 _baseReward) external",
  "function setMaxConsecutiveDays(uint256 _maxConsecutiveDays) external",
]

const spacePuzzleNftAbi = [
  "function getPlayerAchievements(address player) external view returns (uint256[])",
  "function isAchievementUnlocked(address player, uint256 achievementId) external view returns (bool)",
  "function createAchievement(string memory name, string memory description, uint256 rarity, uint256 requiredScore, uint256 requiredLevel) external",
  "function unlockAchievement(address player, uint256 achievementId, uint256 score, uint256 level) external",
]

// Contract addresses
export const CONTRACT_ADDRESSES = {
  gameToken: "0x1cB328e8cc735000C5bdfF117Abf89709d93E995",
  rewardPool: "0xd34ADC4cdB838454d5961B042d8c554C8c10d5bb",
  spacePuzzleNFT: "0xdA642E774b6e75Af7Ef3D20828653617052eD9B9",
}

// Contract interfaces
export class GameContracts {
  provider: ethers.providers.Web3Provider
  signer: ethers.Signer
  gameToken: ethers.Contract
  rewardPool: ethers.Contract
  spacePuzzleNFT: ethers.Contract

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider
    this.signer = provider.getSigner()

    this.gameToken = new ethers.Contract(CONTRACT_ADDRESSES.gameToken, gameTokenAbi, this.signer)

    this.rewardPool = new ethers.Contract(CONTRACT_ADDRESSES.rewardPool, rewardPoolAbi, this.signer)

    this.spacePuzzleNFT = new ethers.Contract(CONTRACT_ADDRESSES.spacePuzzleNFT, spacePuzzleNftAbi, this.signer)
  }

  // GameToken methods
  async tokenizeKeys(amount: number) {
    return await this.gameToken.tokenizeKeys(amount)
  }

  async detokenizeKeys(amount: number) {
    return await this.gameToken.detokenizeKeys(amount)
  }

  async getKeyBalance(address: string) {
    return await this.gameToken.keyBalance(address)
  }

  // RewardPool methods
  async claimDailyReward() {
    return await this.rewardPool.claimDailyReward()
  }

  async canClaimReward(address: string) {
    return await this.rewardPool.canClaimReward(address)
  }

  async getNextRewardAmount(address: string) {
    return await this.rewardPool.getNextRewardAmount(address)
  }

  async getConsecutiveDays(address: string) {
    return await this.rewardPool.getConsecutiveDays(address)
  }

  // SpacePuzzleNFT methods
  async getPlayerAchievements(address: string) {
    return await this.spacePuzzleNFT.getPlayerAchievements(address)
  }

  async isAchievementUnlocked(address: string, achievementId: number) {
    return await this.spacePuzzleNFT.isAchievementUnlocked(address, achievementId)
  }
}

