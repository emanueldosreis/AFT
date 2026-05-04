// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

/// @title AFTRegistry
/// @notice Illustrative AFT registry. Not audited and not production-ready.
/// @dev Stores only hashes, status values, addresses, and timestamps. Do not store sensitive data.
contract AFTRegistry {
    enum AgentStatus {
        Unknown,
        Active,
        Paused,
        Suspended,
        Revoked,
        Retired
    }

    struct AgentRecord {
        address controller;
        bytes32 profileHash;
        AgentStatus status;
        uint64 updatedAt;
    }

    struct CredentialRecord {
        bool registered;
        bool revoked;
        uint64 registeredAt;
        uint64 revokedAt;
    }

    mapping(bytes32 => AgentRecord) private agents;
    mapping(bytes32 => mapping(bytes32 => CredentialRecord)) private credentials;

    event AgentRegistered(bytes32 indexed agentIdHash, address indexed controller, bytes32 profileHash);
    event AgentStatusUpdated(bytes32 indexed agentIdHash, AgentStatus status);
    event AgentProfileHashUpdated(bytes32 indexed agentIdHash, bytes32 profileHash);
    event CredentialHashRegistered(bytes32 indexed agentIdHash, bytes32 indexed credentialHash);
    event CredentialHashRevoked(bytes32 indexed agentIdHash, bytes32 indexed credentialHash);

    modifier onlyController(bytes32 agentIdHash) {
        require(agents[agentIdHash].controller == msg.sender, "AFT: not controller");
        _;
    }

    function registerAgent(bytes32 agentIdHash, bytes32 profileHash) external {
        require(agentIdHash != bytes32(0), "AFT: empty agent id hash");
        require(profileHash != bytes32(0), "AFT: empty profile hash");
        require(agents[agentIdHash].controller == address(0), "AFT: already registered");

        agents[agentIdHash] = AgentRecord({
            controller: msg.sender,
            profileHash: profileHash,
            status: AgentStatus.Active,
            updatedAt: uint64(block.timestamp)
        });

        emit AgentRegistered(agentIdHash, msg.sender, profileHash);
    }

    function updateAgentStatus(bytes32 agentIdHash, AgentStatus status) external onlyController(agentIdHash) {
        require(status != AgentStatus.Unknown, "AFT: invalid status");
        agents[agentIdHash].status = status;
        agents[agentIdHash].updatedAt = uint64(block.timestamp);
        emit AgentStatusUpdated(agentIdHash, status);
    }

    function updateProfileHash(bytes32 agentIdHash, bytes32 profileHash) external onlyController(agentIdHash) {
        require(profileHash != bytes32(0), "AFT: empty profile hash");
        agents[agentIdHash].profileHash = profileHash;
        agents[agentIdHash].updatedAt = uint64(block.timestamp);
        emit AgentProfileHashUpdated(agentIdHash, profileHash);
    }

    function registerCredentialHash(bytes32 agentIdHash, bytes32 credentialHash) external onlyController(agentIdHash) {
        require(credentialHash != bytes32(0), "AFT: empty credential hash");
        CredentialRecord storage record = credentials[agentIdHash][credentialHash];
        require(!record.registered, "AFT: credential exists");

        record.registered = true;
        record.revoked = false;
        record.registeredAt = uint64(block.timestamp);

        emit CredentialHashRegistered(agentIdHash, credentialHash);
    }

    function revokeCredentialHash(bytes32 agentIdHash, bytes32 credentialHash) external onlyController(agentIdHash) {
        CredentialRecord storage record = credentials[agentIdHash][credentialHash];
        require(record.registered, "AFT: credential missing");
        require(!record.revoked, "AFT: already revoked");

        record.revoked = true;
        record.revokedAt = uint64(block.timestamp);

        emit CredentialHashRevoked(agentIdHash, credentialHash);
    }

    function getAgent(bytes32 agentIdHash) external view returns (AgentRecord memory) {
        return agents[agentIdHash];
    }

    function getCredential(bytes32 agentIdHash, bytes32 credentialHash) external view returns (CredentialRecord memory) {
        return credentials[agentIdHash][credentialHash];
    }
}
