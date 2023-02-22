run-p type-check build-only
mkdir ./member.tinytown.online
cp -r ./dist/. ./member.tinytown.online
tar -czf app.tar.gz ./member.tinytown.online/.
scp app.tar.gz tinytown@api.tinytown.online:/home/tinytown
# ssh tinytown@api.tinytown.online /home/tinytown/shop/deploy_web_app.sh
rm -R member.tinytown.online
rm app.tar.gz