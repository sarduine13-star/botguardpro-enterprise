#!/usr/bin/env bash

################################################################################
# BotGuardPro Cloudflare setup script (no jq required)
################################################################################

if [ "$#" -ne 2 ]; then
  echo "Usage: bash setup-botguardpro.sh <CLOUDFLARE_API_TOKEN> <CLOUDFLARE_ZONE_ID>"
  exit 1
fi

API_TOKEN="$1"
ZONE_ID="$2"
WORKER_NAME="botguardproxy"
CF_API="https://api.cloudflare.com/client/v4"

echo "🔐 Fetching DNS records..."
RESPONSE=$(curl -s -X GET "$CF_API/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json")

echo "$RESPONSE" | grep -o '"id":"[^"]*' | awk -F':' '{print $2}' | sed 's/"//g' | while read rec_id; do
  TYPE=$(echo "$RESPONSE" | grep -o "\"type\":\"[^\"]*\",\"name\":\"[^\"]*\",\"content\":\"[^\"]*\"" | head -n1 | sed 's/.*"type":"\([^"]*\)".*/\1/')
  NAME=$(echo "$RESPONSE" | grep -o "\"name\":\"[^\"]*\",\"content\":\"[^\"]*\"" | head -n1 | sed 's/.*"name":"\([^"]*\)".*/\1/')
  CONTENT=$(echo "$RESPONSE" | grep -o "\"content\":\"[^\"]*\"" | head -n1 | sed 's/.*"content":"\([^"]*\)".*/\1/')

  echo "🔁 Proxying: $TYPE $NAME → $CONTENT"
  curl -s -X PUT "$CF_API/zones/$ZONE_ID/dns_records/$rec_id" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"$TYPE\",\"name\":\"$NAME\",\"content\":\"$CONTENT\",\"proxied\":true}"
done

echo "🚀 Deploying Worker..."

read -r -d '' WORKER_CODE << 'EOF2'
addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  url.hostname = "sarduine13-star.github.io";
  return event.respondWith(fetch(url.toString(), event.request));
});
EOF2

curl -s -X PUT "$CF_API/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/javascript" \
  --data-binary "$WORKER_CODE"

echo "🔗 Binding Worker to routes..."

curl -s -X POST "$CF_API/zones/$ZONE_ID/workers/routes" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"pattern\":\"botguardpro.com/*\",\"script\":\"$WORKER_NAME\"}"

curl -s -X POST "$CF_API/zones/$ZONE_ID/workers/routes" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"pattern\":\"www.botguardpro.com/*\",\"script\":\"$WORKER_NAME\"}"

echo "✅ Setup complete!"
