#!/usr/bin/env bash
#
# Bash script for provisioning the MeanMart ECommerce Vagrant Instance

set -e
set -x

function config(){
	date > /etc/vagrant_provisioned_at
	export CLIENT_IP_ADDR=`ifconfig  | grep 'inet addr:'| grep -v '127.0.0.1' | cut -d: -f2 | awk '{ print $1}' | tail -1`
	export CLIENT_FQDN=`hostname`
	export CLIENT_NAME=`hostname | cut -d. -f 1 | tr '[:upper:]' '[:lower:]'`
	echo "Configuring /etc/hosts ..."
	sudo echo "127.0.0.1 localhost localhost.localdomain localhost4 localhost4.localdomain4" > /etc/hosts
	sudo echo "::1       localhost localhost.localdomain localhost6 localhost6.localdomain6" >> /etc/hosts
	sudo echo "$CLIENT_IP_ADDR    $CLIENT_FQDN $CLIENT_NAME" >> /etc/hosts
	# disable THP
	sudo echo -e "never" > /sys/kernel/mm/transparent_hugepage/enabled
	sudo echo -e "never" > /sys/kernel/mm/transparent_hugepage/defrag
	# disable mongod upstart service
	# sudo echo 'manual' | sudo tee /etc/init/mongod.override
}

function prep_env() {
	echo "Setting up MEANMart Application..."

	mkdir -p /home/vagrant/meanmart
	cd /home/vagrant/meanmart

	echo "Cloning meanstore repository..."
	sudo apt-get install -y git
	git clone https://github.com/mrlynn/meanstore.git
	cd /home/vagrant/meanmart/meanstore

	mkdir -p log/hackathon
	sudo chmod -R 777 log
	mkdir -p ./pids
	sudo chmod -R 777 pids

	cp config/pp-config.js.example config/pp-config.js
	cp config/smtp-config.js.example config/smtp-config.js
	cp .env.hackathon.example .env.hackathon
	echo "Installing Node Libraries..."
	npm install
	npm install -g pm2
	npm install faker
	# for some reason unicode doesn't install properly as part of the mass installation - try again.
	npm install unicode
	echo
	echo "..----------------....----------------....----------------....-----------------."
	echo "|..--------------..||..--------------..||..--------------..||..--------------..|"
	echo "|.|.____....____.|.||.|.._________...|.||.|......__......|.||.|.____.._____..|.|"
	echo "|.||_...\../..._||.||.|.|_...___..|..|.||.|...../..\.....|.||.||_...\|_..._|.|.|"
	echo "|.|..|...\/...|..|.||.|...|.|_..\_|..|.||.|...././\.\....|.||.|..|...\.|.|...|.|"
	echo "|.|..|.|\../|.|..|.||.|...|.._|.._...|.||.|.../.____.\...|.||.|..|.|\.\|.|...|.|"
	echo "|.|._|.|_\/_|.|_.|.||.|.._|.|___/.|..|.||.|._/./....\.\_.|.||.|._|.|_\...|_..|.|"
	echo "|.||_____||_____||.||.|.|_________|..|.||.||____|..|____||.||.||_____|\____|.|.|"
	echo "|.|..............|.||.|..............|.||.|..............|.||.|..............|.|"
	echo "|.'--------------'.||.'--------------'.||.'--------------'.||.'--------------'.|"
	echo ".'----------------'..'----------------'..'----------------'..'----------------'"
	echo "..----------------....----------------....----------------....----------------."
	echo "|..--------------..||..--------------..||..--------------..||..--------------..|"
	echo "|.|.____....____.|.||.|......__......|.||.|.._______.....|.||.|.._________...|.|"
	echo "|.||_...\../..._||.||.|...../..\.....|.||.|.|_...__.\....|.||.|.|.._..._..|..|.|"
	echo "|.|..|...\/...|..|.||.|...././\.\....|.||.|...|.|__).|...|.||.|.|_/.|.|.\_|..|.|"
	echo "|.|..|.|\../|.|..|.||.|.../.____.\...|.||.|...|..__./....|.||.|.....|.|......|.|"
	echo "|.|._|.|_\/_|.|_.|.||.|._/./....\.\_.|.||.|.._|.|..\.\_..|.||.|...._|.|_.....|.|"
	echo "|.||_____||_____||.||.||____|..|____||.||.|.|____|.|___|.|.||.|...|_____|....|.|"
	echo "|.|..............|.||.|..............|.||.|..............|.||.|..............|.|"
	echo "|.'--------------'.||.'--------------'.||.'--------------'.||.'--------------'.|"
	echo ".'----------------'..'----------------'..'----------------'..'----------------'"
	echo
	echo "DONE: Setting up MEANMart Application"

}

function update_repo(){
	echo "Install MongoDB Enterprise Repository"
	echo "deb http://repo.mongodb.com/apt/ubuntu trusty/mongodb-enterprise/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
	echo "Update Repositoryies"
	sudo apt-get update -y
	echo "Installing MongoDB Enterprise Dependencies"
	sudo apt-get install -y libgssapi-krb5-2 libsasl2-2 libssl1.0.0 libstdc++6 snmp
    echo "DONE: Install MongoDB Enterprise"
}

function install_mongod(){
	  echo "Install MongoDB Enterprise..."
	  sudo apt-get install -y --force-yes mongodb-enterprise sasl2-bin
	  sudo sh -c "killall mongod; true"
	  sudo mkdir -p /data
	  sudo chmod -R 777 /data
	  mkdir -p /data/db
	  echo "Set LC_ALL=C to .profile"
	  sudo echo "export LC_ALL=C" >> /home/vagrant/.profile
	  echo "DONE: Install MongoDB Enterprise"
}

function install_mongosqld() {
	echo "Installing BI Connector"
	sudo apt-get install -y wget
	mkdir /home/vagrant/meanmart/bi
	cd /home/vagrant/meanmart/bi
	wget https://info-mongodb-com.s3.amazonaws.com/mongodb-bi/v2/mongodb-bi-linux-x86_64-ubuntu1404-v2.0.0.tgz
	tar xvf mongodb-bi-linux-x86_64-ubuntu1404-v2.0.0.tgz
	cd mongodb-bi-linux-x86_64-ubuntu1404-v2.0.0
	sudo install -m755 bin/mongo* /usr/local/bin/
	echo "Done: Installing BI Connector"
}

function install_mysqlclient() {
	echo "Install MySQL client"
	sudo apt-get install mysql-client -y --force-yes
	echo "Done: Install MySQL client"
}

function startup_mongodb() {
	echo "Startup MongoDB"
	sudo sed -i "s/bindIp/#bindIp/g" /etc/mongod.conf
	sudo service mongod start
	echo "Done: Startup MongoDB"
}

function install_nodejs() {
	echo "Installing NodeJS..."
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get install -y nodejs
	echo "DONE: Installing NodeJS"

}

function generate_data() {
	echo "Generating data..."
	cd /home/vagrant/meanmart/meanstore
	node data/fake-refrigerators.js
	node data/fake-televisions.js
	node data/fake-cameras.js
	node data/fake-printers.js
	node data/fake-apparel.js
	node data/fake-users.js
	node data/fake-events.js
	#node data/fake-stores.js
	node data/category-seeder.js
	pm2 start startup.json
	echo "DONE: Generating data"
}

function create_schema() {
	echo "Create DRDL Files from MongoDB Collections..."
	mkdir -p /home/vagrant/meanmart/bi/schema
	cd /home/vagrant/meanmart/bi
	/usr/local/bin/mongodrdl --host localhost -d hackathon -c products -o schema/products_schema.drdl
	/usr/local/bin/mongodrdl --host localhost -d hackathon -c categories -o schema/categories_schema.drdl
	/usr/local/bin/mongodrdl --host localhost -d hackathon -c users -o schema/users_schema.drdl
	echo "DONE: Creating DRDL Files"
}

function startup_mongosqld() {
	echo "Starting BI Connector SQL Proxy..."
	sudo /usr/local/bin/mongosqld --schemaDirectory schema --mongo-uri localhost > /dev/null 2>&1 &
	echo "DONE: Starting BI Connector"

}

config
install_nodejs
prep_env
update_repo
install_mongod
install_mongosqld
install_mysqlclient
startup_mongodb
generate_data
create_schema
startup_mongosqld

echo "DONE"
