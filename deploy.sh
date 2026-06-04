#!/bin/bash
set -e

echo "Building project..."
npm run build

echo "Deploying to Hostinger via FTP..."
curl -T "dist/index.html" "ftp://$FTP_HOST/public_html/index.html" --user "$FTP_USER:$FTP_PASS"

cd dist
for file in $(find . -type f); do
  remote_path="/public_html/$file"
  echo "Uploading $file..."
  curl -T "$file" "ftp://$FTP_HOST$remote_path" --user "$FTP_USER:$FTP_PASS" --ftp-create-dirs
done
cd ..

echo "Deploy complete!"
