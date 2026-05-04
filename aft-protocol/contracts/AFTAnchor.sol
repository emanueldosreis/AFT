// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

/// @title AFTAnchor
/// @notice Illustrative event batch anchor. Not audited and not production-ready.
/// @dev Stores commitments only. Event bodies and private evidence must remain off-chain.
contract AFTAnchor {
    struct BatchAnchor {
        bytes32 batchRoot;
        bytes32 previousBatchRoot;
        bytes32 metadataHash;
        bytes32 merkleAlgorithm;
        bytes32 hashAlgorithm;
        uint64 eventCount;
        uint64 anchoredAt;
        address submitter;
    }

    mapping(bytes32 => BatchAnchor) private batches;

    event EventBatchAnchored(
        bytes32 indexed batchId,
        bytes32 indexed batchRoot,
        bytes32 previousBatchRoot,
        uint64 eventCount,
        address indexed submitter
    );

    function anchorEventBatch(
        bytes32 batchId,
        bytes32 batchRoot,
        bytes32 previousBatchRoot,
        bytes32 metadataHash,
        bytes32 merkleAlgorithm,
        bytes32 hashAlgorithm,
        uint64 eventCount
    ) external {
        require(batchId != bytes32(0), "AFT: empty batch id");
        require(batchRoot != bytes32(0), "AFT: empty root");
        require(metadataHash != bytes32(0), "AFT: empty metadata hash");
        require(merkleAlgorithm != bytes32(0), "AFT: empty merkle algorithm");
        require(hashAlgorithm != bytes32(0), "AFT: empty hash algorithm");
        require(eventCount > 0, "AFT: empty batch");
        require(batches[batchId].anchoredAt == 0, "AFT: batch exists");

        batches[batchId] = BatchAnchor({
            batchRoot: batchRoot,
            previousBatchRoot: previousBatchRoot,
            metadataHash: metadataHash,
            merkleAlgorithm: merkleAlgorithm,
            hashAlgorithm: hashAlgorithm,
            eventCount: eventCount,
            anchoredAt: uint64(block.timestamp),
            submitter: msg.sender
        });

        emit EventBatchAnchored(batchId, batchRoot, previousBatchRoot, eventCount, msg.sender);
    }

    function getBatchRoot(bytes32 batchId) external view returns (bytes32) {
        return batches[batchId].batchRoot;
    }

    function getBatch(bytes32 batchId) external view returns (BatchAnchor memory) {
        return batches[batchId];
    }

    function verifyBatchMetadataFields(
        bytes32 batchId,
        bytes32 expectedBatchRoot,
        bytes32 expectedPreviousBatchRoot,
        bytes32 expectedMetadataHash,
        bytes32 expectedMerkleAlgorithm,
        bytes32 expectedHashAlgorithm,
        uint64 expectedEventCount
    ) external view returns (bool) {
        BatchAnchor memory batch = batches[batchId];
        return batch.batchRoot == expectedBatchRoot
            && batch.previousBatchRoot == expectedPreviousBatchRoot
            && batch.metadataHash == expectedMetadataHash
            && batch.merkleAlgorithm == expectedMerkleAlgorithm
            && batch.hashAlgorithm == expectedHashAlgorithm
            && batch.eventCount == expectedEventCount;
    }
}
