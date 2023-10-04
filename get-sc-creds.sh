get_path="$NEXT_PUBLIC_SITE_URL/api/get-sc-creds?BUILD_SECRET=$BUILD_SECRET"
response=$(curl -s $get_path)
# If we got a valid response, then export to process
if [[ "$response" == *"SUSPENSE_CACHE_"* ]]; then
  echo "Got valid suspense cache credentials."
  export $(echo $response | xargs) >/dev/null 2>&1
fi
