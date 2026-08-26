FROM node:22-bookworm

# Avoid prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install global SPFx toolchain (Heft-based, no gulp)
RUN npm install -g yo@5 \
    @microsoft/generator-sharepoint@1.22.1 \
    && npm cache clean --force

# Create non-root user workspace
WORKDIR /workspace
