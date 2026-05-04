#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const file = path.join(root, "examples/federated-multi-attestation-payment.json");
const scenario = JSON.parse(fs.readFileSync(file, "utf8"));

function hash(value) {
  return "sha256:" + crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function main() {
  const attestations = scenario.attestations || [];
  if (attestations.length < 3) {
    throw new Error("Expected at least three independent attestations.");
  }

  const issuers = new Set(attestations.map((item) => item.issuer_peer_id));
  if (issuers.size !== attestations.length) {
    throw new Error("Attestations must come from distinct issuer peers in this demo.");
  }

  const aggregate = {
    scenario_id: scenario.scenario_id,
    subject_agent_id: scenario.subject_agent_id,
    transaction_ref: scenario.transaction_ref,
    attestation_count: attestations.length,
    issuer_peers: Array.from(issuers).sort(),
    attestation_types: attestations.map((item) => item.attestation_type).sort(),
    referenced_event_hashes: attestations.map((item) => item.event_hash),
    reputation_root: scenario.reputation_update.reputation_root
  };

  console.log("Federated multi-attestation aggregation");
  console.log(JSON.stringify(aggregate, null, 2));
  console.log(`aggregate_commitment=${hash(aggregate)}`);
  console.log("Verification note: this demo aggregates commitments only; real deployments must verify signatures, peer status, revocation, evidence access policy, disputes, and anchors.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
