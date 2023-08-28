#!/bin/bash

# constants
BOLD='\033[1m'
DIM='\033[2m'
UNDERLINE='\033[4m'
GREEN='\033[0;32m'
BLUE='\033[1;34m'
NC='\033[0m' # No Color

# 0.
clear
echo "${BLUE}Running $(pwd)/scripts/setup.sh...${NC}"
echo
echo "Welcome to DAY's website template,"
cat <<"EOF"
     _           _ _      _   _     
  __| |__ _ _  _| (_)__ _| |_| |_   
 / _` / _` | || | | / _` | ' \  _|_ 
 \__,_\__,_|\_, |_|_\__, |_||_\__(_)
            |__/    |___/           
EOF
echo "Created in 2023 by Evan Kirkiles '24."
echo $DIM"Refer questions to kirkilese@gmail.com"$NC
echo $DIM"Last updated: Monday, August 28, 2023"$NC
echo

# 1. Begin by creating a new Sanity project
echo "${BLUE}[1] Let's get you started with a Sanity project.${NC}"
npx sanity init --bare --dataset-default

# 2. Ask user to input from the above
echo "${BLUE}[2] Great! Now fill in the following information from above: ${NC}"
echo "These fields are used to connect your local site to your Sanity project."
read -p "$(echo $GREEN"?"$NC $BOLD"Project Name: "$NC)" projectname
read -p "$(echo $GREEN"?"$NC $BOLD"Project ID: "$NC)" projectid
read -p "$(echo $GREEN"?"$NC $BOLD"Dataset "$DIM"(production)"$BOLD": "$NC)" dataset
echo
dataset=${dataset:-production}
secret=$(uuidgen)

# 3. We'll now fill out the files
sed -i .bak "s/UNNAMED_DAYLIGHT_APP/${projectname}/g" ./sanity.config.ts
rm ./sanity.config.ts.bak
cat <<EOF >./.env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=${projectid}
NEXT_PUBLIC_SANITY_DATASET=${dataset}
NEXT_PUBLIC_SANITY_API_VERSION=$(date -u +"%Y-%m-%d")
SANITY_WEBHOOK_SECRET=${secret}
SANITY_API_READ_TOKEN=
EOF
echo "${BLUE}[3] The following files have been updated with your Sanity information:"$NC
echo $DIM" - $(pwd)/sanity.config.ts"$NC
echo $DIM" - $(pwd)/.env.local"$NC
echo

# 4. Now, let's make a Vercel project.
echo "${BLUE}[4] Now, let's get a Vercel project set up."$NC
echo "Visit "$BOLD$UNDERLINE"https://vercel.com/new"$NC" and import your git repository to a new project."
echo "Deploy it. It will fail, but that's okay——we need some environment variables."
read -p "$(echo $DIM"Press enter to continue."$NC)"
echo

# 5. Let's integrate Sanity with our Vercel project
echo "${BLUE}[5] We need to integrate our Sanity project with our Vercel project."$NC
echo "Visit "$BOLD$UNDERLINE"https://vercel.com/integrations/sanity"$NC" and follow the instructions to"
echo "add your Sanity project as an integration with your new Vercel project."
echo "This will add some Sanity-specific environment variables to our deployment."
read -p "$(echo $DIM"Press enter to continue."$NC)"
echo

# 6. Let's synchronize the environment variables
echo "${BLUE}[6] Now, there are a couple of environment variable changes we need."$NC
echo " 1. Visit your Vercel project > Settings > Environment Variables in your browser."
echo " 2. Check the \"Automatically expose System Environment Variables\" setting."
echo " 2. Alternatively, add a "$BOLD"NEXT_PUBLIC_SITE_URL"$NC" env variable to Vercel."
echo "    This should be the domain name that you will connect to Vercel for your app."
echo " 3. Add the "$BOLD"NEXT_PUBLIC_SANITY_API_VERSION"$NC" env variable to Vercel from "$DIM"./.env.local"$NC
echo " 4. Add the "$BOLD"SANITY_WEBHOOK_SECRET"$NC" env variable to Vercel from "$DIM"./.env.local"$NC
echo " 5. Add the "$BOLD"SANITY_API_READ_TOKEN"$NC" env variable to "$DIM"./.env.local"$NC" from Vercel"
read -p "$(echo $DIM"Press enter to continue."$NC)"
echo

# 7. Commit changes to re-deploy with updated environment variables
echo "${BLUE}[7] Almost done! Let's get your site deploying before we move on."$NC
echo "I'll make and push a commit to your repository for you to redeploy on Vercel."
read -p "$(echo $DIM"Press enter to continue."$NC)"
git add -A
git commit -m "Daylight setup."
git push origin main
echo

# 8. Create the webhook on Sanity
echo "${BLUE}[8] Last step. Head on over to your Sanity project dashboard."$NC
echo "We're going to add the webhook to automatically regenerate pages when their"
echo "Sanity-backed information changes in the Sanity Studio."
echo " 1. Visit "$BOLD$UNDERLINE"https://www.sanity.io/manage/personal/project/"${projectid}$NC
echo " 2. Go to API -> Create Webhook, and use the following information:"
echo $DIM"   - "$BOLD"Name:"$NC$DIM" Page Revalidation"$NC
echo $DIM"   - "$BOLD"URL:"$NC$DIM" https://"$BLUE"<your-vercel-deployment>"$NC$DIM".vercel.app/api/revalidate"$NC
echo $DIM"   - "$BOLD"Trigger on:"$NC$DIM" Create, Update"$NC
echo $DIM"   - "$BOLD"Filter:"$NC$DIM" _type == \"site_page\" && delta::changedAny(last_revalidated)"$NC
echo $DIM"   - "$BOLD"Projection:"$NC$DIM" {_type, _id, slug}"$NC
echo $DIM"   - "$BOLD"Enable webhook:"$NC$DIM" Checked"$NC
echo $DIM"   - "$BOLD"HTTP Method:"$NC$DIM" POST"$NC
echo $DIM"   - "$BOLD"Secret:"$NC$DIM" "${secret}$NC
echo " 3. Save your webhook."
read -p "$(echo $DIM"Press enter to continue."$NC)"
echo

# 9. Done
echo "${BLUE}[9] Your project should be complete!"$NC
echo "Now run "$DIM"yarn install"$NC" and "$DIM"yarn dev"$NC" to begin local development."
echo "With the local server running, visit "$BOLD$UNDERLINE"http://localhost:3000/studio"$NC" to"
echo "access your Sanity Studio instance. The same endpoint is also accessible on your"
echo "Vercel deployment with your currently-pushed schema."
echo
