#!/usr/bin/env bash
set -eu

npm run lint
npm run test-node
npm run test-headless