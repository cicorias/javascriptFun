#!/bin/bash

#create pem file
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./ssl/azure.pem -out ./ssl/azure.pem

#upload the resulting file to azure Management
openssl pkcs12 -export -out ./ssl/azure.pfx -in ./ssl/azure.pem -name "AZMonitor"

#cer file
openssl x509 -inform pem -in ./ssl/azure.pem -outform der -out ./ssl/azure.cer