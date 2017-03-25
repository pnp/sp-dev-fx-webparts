#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SSL_DIR="$DIR/../certs"
CERT_NAME="server"

# Set the wildcarded domain we want to use
DOMAIN="gulp-connect"

# A blank passphrase
PASSPHRASE="gulp"

# Set our CSR variables
SUBJ="
C=US
ST=MN
O=
localityName=
commonName=$DOMAIN
organizationalUnitName=
emailAddress=
"

# Generate our Private Key, CSR and Certificate
openssl genrsa -out "$SSL_DIR/$CERT_NAME.key" 2048
openssl req -new -subj "$(echo -n "$SUBJ" | tr "\n" "/")" -key "$SSL_DIR/$CERT_NAME.key" -out "$SSL_DIR/$CERT_NAME.csr" -passin pass:$PASSPHRASE
openssl x509 -req -days 1461 -in "$SSL_DIR/$CERT_NAME.csr" -signkey "$SSL_DIR/$CERT_NAME.key" -out "$SSL_DIR/$CERT_NAME.crt"

# Not needed anymore
rm -rf "$SSL_DIR/$CERT_NAME.csr"