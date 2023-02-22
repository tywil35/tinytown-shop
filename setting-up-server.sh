sudo apt update
sudo apt install -y ufw mysql-server nginx
sudo apt install certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm install -g pm2
sudo ufw enable
sudo systemctl enable nginx
sudo ufw allow 'Nginx Full'
nano /etc/nginx/nginx.conf
sudo nano /etc/nginx/sites-available/api.tinytown.online 
sudo nano /etc/nginx/sites-available/member.tinytown.online 
sudo mkdir /var/www/tinytown
sudo chmod g+rw /var/www/tinytown
sudo nginx -t
sudo mysql_secure_installation
sudo certbot --nginx -d api.tinytown.online -d member.tinytown.online
sudo systemctl status certbot.timer
sudo certbot renew --dry-run

member
server {
            listen 80;
            listen [::]:80;
            server_name member.tinytown.online;
            root /var/www/tinytown/member.tinytown.online;
            index index.html;
            location / {
                try_files $uri $uri/ /index.html;
            }
}

api
server {
            listen 80;
            listen [::]:80;
            server_name api.tinytown.online;
            location / {
                proxy_pass http://localhost:8079;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
}


STARTAPI
tar -xzf ./api.tar.gz -C .
cd api
npm install
#pm2 start ./build/index.js -i max --name tiny_town_shop_api
pm2 reload tiny_town_shop_api --update-env

WEBAPP
cd /home/tinytown/shop
rm -R /var/www/tinytown/member.tinytown.online
tar -xzf ./app.tar.gz -C /var/www/tinytown


CREATE USER 'tinytown_db_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'kwVSNzal4Gjh9pVpETD8sA==';
GRANT ALL PRIVILEGES ON tinytown_shop_db.* TO 'tinytown_db_user'@'localhost';

sudo mysqladmin -p -u tinytown_db_user version