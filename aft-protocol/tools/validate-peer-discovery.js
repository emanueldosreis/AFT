#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    if (entry.isFile() && entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateSignature(sig, label) {
  for (const field of ["alg", "kid", "key_version", "pqc_profile", "signature_value", "verification_method", "signature_created_at"]) {
    assert(sig && Object.prototype.hasOwnProperty.call(sig, field), `${label}: missing signature.${field}`);
  }
}

function validatePeerDiscovery(file) {
  const doc = readJson(file);
  const required = [
    "aft_version",
    "peer_id",
    "peer_name",
    "peer_type",
    "status",
    "service_endpoints",
    "supported_event_types",
    "supported_credentials",
    "supported_crypto_profiles",
    "pqc_readiness_level",
    "anchoring",
    "conformance",
    "privacy",
    "revocation",
    "created_at",
    "updated_at",
    "signatures"
  ];

  for (const field of required) assert(Object.prototype.hasOwnProperty.call(doc, field), `${file}: missing ${field}`);
  assert(/^did:[a-z0-9]+:.+|aft:peer:[A-Za-z0-9._:-]+$/.test(doc.peer_id), `${file}: peer_id must be DID-like or aft:peer`);
  assert(Array.isArray(doc.peer_type) && doc.peer_type.length > 0, `${file}: peer_type must be a non-empty array`);
  assert(doc.privacy.pii_on_chain === false, `${file}: pii_on_chain must be false`);
  assert(doc.service_endpoints.events.startsWith("https://"), `${file}: events endpoint must be HTTPS`);
  assert(doc.service_endpoints.revocation.startsWith("https://"), `${file}: revocation endpoint must be HTTPS`);
  assert(Array.isArray(doc.signatures) && doc.signatures.length > 0, `${file}: signatures must be non-empty`);
  doc.signatures.forEach((sig, index) => validateSignature(sig, `${file}: signatures[${index}]`));
  return doc.peer_id;
}

function validateAllJson() {
  const files = walk(root);
  for (const file of files) readJson(file);
  console.log(`Parsed ${files.length} JSON files successfully.`);
}

function main() {
  if (process.argv.includes("--all-json")) validateAllJson();

  const examples = [
    "examples/peer-discovery-payment-processor.json",
    "examples/peer-discovery-agent-marketplace.json",
    "examples/peer-discovery-reputation-provider.json"
  ];

  const peers = examples.map((relative) => validatePeerDiscovery(path.join(root, relative)));
  console.log(`Validated ${peers.length} peer discovery documents:`);
  for (const peer of peers) console.log(`- ${peer}`);
  console.log("Note: this tool performs dependency-free structural checks, not full JSON Schema validation.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
