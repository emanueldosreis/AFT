// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

/// @title AFTBond
/// @notice Illustrative bond contract. Not audited and not production-ready.
/// @dev Stores only bond state and reason hashes. Private dispute evidence must remain off-chain.
contract AFTBond {
    enum BondStatus {
        None,
        Staked,
        Slashed,
        Released
    }

    struct Bond {
        bytes32 agentIdHash;
        address staker;
        uint256 amount;
        uint256 slashedAmount;
        BondStatus status;
        uint64 stakedAt;
        uint64 updatedAt;
    }

    address public immutable arbiter;
    mapping(bytes32 => Bond) private bonds;

    event BondStaked(bytes32 indexed bondId, bytes32 indexed agentIdHash, address indexed staker, uint256 amount);
    event BondSlashed(bytes32 indexed bondId, uint256 amount, address indexed beneficiary, bytes32 reasonHash);
    event BondReleased(bytes32 indexed bondId, address indexed recipient, uint256 amount);

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "AFT: not arbiter");
        _;
    }

    constructor() {
        arbiter = msg.sender;
    }

    function stakeBond(bytes32 bondId, bytes32 agentIdHash) external payable {
        require(bondId != bytes32(0), "AFT: empty bond id");
        require(agentIdHash != bytes32(0), "AFT: empty agent id hash");
        require(msg.value > 0, "AFT: empty stake");
        require(bonds[bondId].status == BondStatus.None, "AFT: bond exists");

        bonds[bondId] = Bond({
            agentIdHash: agentIdHash,
            staker: msg.sender,
            amount: msg.value,
            slashedAmount: 0,
            status: BondStatus.Staked,
            stakedAt: uint64(block.timestamp),
            updatedAt: uint64(block.timestamp)
        });

        emit BondStaked(bondId, agentIdHash, msg.sender, msg.value);
    }

    function slashBond(bytes32 bondId, uint256 amount, address payable beneficiary, bytes32 reasonHash) external onlyArbiter {
        Bond storage bond = bonds[bondId];
        require(bond.status == BondStatus.Staked, "AFT: not staked");
        require(amount > 0 && amount <= bond.amount - bond.slashedAmount, "AFT: invalid amount");
        require(beneficiary != address(0), "AFT: empty beneficiary");
        require(reasonHash != bytes32(0), "AFT: empty reason hash");

        bond.slashedAmount += amount;
        bond.updatedAt = uint64(block.timestamp);
        if (bond.slashedAmount == bond.amount) {
            bond.status = BondStatus.Slashed;
        }

        (bool ok, ) = beneficiary.call{value: amount}("");
        require(ok, "AFT: transfer failed");

        emit BondSlashed(bondId, amount, beneficiary, reasonHash);
    }

    function releaseBond(bytes32 bondId, address payable recipient) external onlyArbiter {
        Bond storage bond = bonds[bondId];
        require(bond.status == BondStatus.Staked, "AFT: not releasable");
        require(recipient != address(0), "AFT: empty recipient");

        uint256 remaining = bond.amount - bond.slashedAmount;
        bond.status = BondStatus.Released;
        bond.updatedAt = uint64(block.timestamp);

        (bool ok, ) = recipient.call{value: remaining}("");
        require(ok, "AFT: transfer failed");

        emit BondReleased(bondId, recipient, remaining);
    }

    function getBond(bytes32 bondId) external view returns (Bond memory) {
        return bonds[bondId];
    }
}
