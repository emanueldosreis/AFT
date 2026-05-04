// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

/// @title AFTDisputeRegistry
/// @notice Illustrative dispute commitment registry. Not audited and not production-ready.
/// @dev Stores hashes and status only. Private dispute evidence must remain off-chain.
contract AFTDisputeRegistry {
    enum DisputeStatus {
        None,
        Open,
        UnderReview,
        Challenged,
        Resolved,
        Withdrawn,
        Rejected
    }

    struct Dispute {
        bytes32 eventHash;
        bytes32 agentIdHash;
        bytes32 counterpartyHash;
        bytes32 evidenceHash;
        bytes32 statusCommitment;
        DisputeStatus status;
        address opener;
        uint64 openedAt;
        uint64 updatedAt;
    }

    address public immutable arbiter;
    mapping(bytes32 => Dispute) private disputes;

    event DisputeOpened(bytes32 indexed disputeId, bytes32 indexed eventHash, bytes32 indexed agentIdHash, address opener);
    event DisputeStatusUpdated(bytes32 indexed disputeId, DisputeStatus status, bytes32 statusCommitment);
    event DisputeResolved(bytes32 indexed disputeId, DisputeStatus status, bytes32 statusCommitment);

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "AFT: not arbiter");
        _;
    }

    constructor() {
        arbiter = msg.sender;
    }

    function openDispute(
        bytes32 disputeId,
        bytes32 eventHash,
        bytes32 agentIdHash,
        bytes32 counterpartyHash,
        bytes32 evidenceHash,
        bytes32 statusCommitment
    ) external {
        require(disputeId != bytes32(0), "AFT: empty dispute id");
        require(eventHash != bytes32(0), "AFT: empty event hash");
        require(agentIdHash != bytes32(0), "AFT: empty agent id hash");
        require(evidenceHash != bytes32(0), "AFT: empty evidence hash");
        require(statusCommitment != bytes32(0), "AFT: empty status commitment");
        require(disputes[disputeId].status == DisputeStatus.None, "AFT: dispute exists");

        disputes[disputeId] = Dispute({
            eventHash: eventHash,
            agentIdHash: agentIdHash,
            counterpartyHash: counterpartyHash,
            evidenceHash: evidenceHash,
            statusCommitment: statusCommitment,
            status: DisputeStatus.Open,
            opener: msg.sender,
            openedAt: uint64(block.timestamp),
            updatedAt: uint64(block.timestamp)
        });

        emit DisputeOpened(disputeId, eventHash, agentIdHash, msg.sender);
    }

    function updateDisputeStatus(bytes32 disputeId, DisputeStatus status, bytes32 statusCommitment) external onlyArbiter {
        require(status != DisputeStatus.None && status != DisputeStatus.Resolved, "AFT: invalid status");
        require(statusCommitment != bytes32(0), "AFT: empty status commitment");
        Dispute storage dispute = disputes[disputeId];
        require(dispute.status != DisputeStatus.None, "AFT: missing dispute");
        require(dispute.status != DisputeStatus.Resolved, "AFT: already resolved");

        dispute.status = status;
        dispute.statusCommitment = statusCommitment;
        dispute.updatedAt = uint64(block.timestamp);

        emit DisputeStatusUpdated(disputeId, status, statusCommitment);
    }

    function resolveDispute(bytes32 disputeId, DisputeStatus finalStatus, bytes32 statusCommitment) external onlyArbiter {
        require(
            finalStatus == DisputeStatus.Resolved || finalStatus == DisputeStatus.Withdrawn || finalStatus == DisputeStatus.Rejected,
            "AFT: invalid final status"
        );
        require(statusCommitment != bytes32(0), "AFT: empty status commitment");
        Dispute storage dispute = disputes[disputeId];
        require(dispute.status != DisputeStatus.None, "AFT: missing dispute");
        require(dispute.status != DisputeStatus.Resolved, "AFT: already resolved");

        dispute.status = finalStatus;
        dispute.statusCommitment = statusCommitment;
        dispute.updatedAt = uint64(block.timestamp);

        emit DisputeResolved(disputeId, finalStatus, statusCommitment);
    }

    function getDispute(bytes32 disputeId) external view returns (Dispute memory) {
        return disputes[disputeId];
    }
}
