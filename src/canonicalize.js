'use strict';

// RFC 8785 JCS-compatible canonical JSON serialization.
// Objects: keys sorted by Unicode code point (equivalent to JS default sort for ASCII keys).
// Arrays: order preserved. Undefined and null values omitted per AFT-002 canonical rules.

function canonicalize(value) {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') {
    if (!isFinite(value)) throw new Error(`Non-finite number cannot be canonicalized: ${value}`);
    return JSON.stringify(value);
  }
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) {
    return '[' + value.map(canonicalize).join(',') + ']';
  }
  if (typeof value === 'object') {
    const sorted = Object.keys(value)
      .filter(k => value[k] !== undefined && value[k] !== null)
      .sort((a, b) => {
        // Unicode code point sort — same as lexicographic for BMP/ASCII keys.
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
          const diff = a.codePointAt(i) - b.codePointAt(i);
          if (diff !== 0) return diff;
        }
        return a.length - b.length;
      });
    return '{' + sorted.map(k => JSON.stringify(k) + ':' + canonicalize(value[k])).join(',') + '}';
  }
  throw new Error(`Unsupported type in canonical JSON: ${typeof value}`);
}

module.exports = { canonicalize };
