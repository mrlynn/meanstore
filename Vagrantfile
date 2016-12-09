# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 27017, host: 37017
  config.vm.network "forwarded_port", guest: 3000, host: 30000
  config.vm.network "forwarded_port", guest: 4022, host: 40022

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  #config.vm.network "private_network", ip: "10.11.12.13"
  #config.vm.network "private_network", ip: "10.11.12.13"


  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
   config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
     vb.memory = "8192"
   end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.

$script = <<SCRIPT
echo Preparing for deployment...

date > /etc/vagrant_provisioned_at

echo "Installing Prerequisites..."
sudo apt-get install -y g++
sudo apt-get install -y build-essential

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

echo "deb http://repo.mongodb.com/apt/ubuntu trusty/mongodb-enterprise/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list

sudo apt-get update

sudo apt-get install -y mongodb-enterprise
echo "Take a breather while MongoDB Starts up..."

sleep 10

sudo service mongod start

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

echo "Installing git..."
sudo apt-get install -y git

echo "Installing nodejs..."
sudo apt-get install -y nodejs

echo "Setting up MEANMart Application..."
mkdir -p /home/vagrant/meanmart
cd /home/vagrant/meanmart

echo "Cloning meanstore repository..."
git clone -b meanmart https://github.com/mrlynn/meanstore.git
cd /home/vagrant/meanmart/meanstore

mkdir -p log/hackathon
mkdir -p ./pids

cp config/pp-config.js.example config/pp-config.js
cp config/smtp-config.js.example config/smtp-config.js
npm install
npm install -g pm2
npm install faker
# for some reason unicode doesn't install properly as part of the mass installation - try again.
npm install unicode
echo
echo " .----------------.  .----------------.  .----------------.  .-----------------."
echo "| .--------------. || .--------------. || .--------------. || .--------------. |"
echo "| | ____    ____ | || |  _________   | || |      __      | || | ____  _____  | |"
echo "| ||_   \  /   _|| || | |_   ___  |  | || |     /  \     | || ||_   \|_   _| | |"
echo "| |  |   \/   |  | || |   | |_  \_|  | || |    / /\ \    | || |  |   \ | |   | |"
echo "| |  | |\  /| |  | || |   |  _|  _   | || |   / ____ \   | || |  | |\ \| |   | |"
echo "| | _| |_\/_| |_ | || |  _| |___/ |  | || | _/ /    \ \_ | || | _| |_\   |_  | |"
echo "| ||_____||_____|| || | |_________|  | || ||____|  |____|| || ||_____|\____| | |"
echo "| |              | || |              | || |              | || |              | |"
echo "| '--------------' || '--------------' || '--------------' || '--------------' |"
echo " '----------------'  '----------------'  '----------------'  '----------------'"
echo " .----------------.  .----------------.  .----------------.  .----------------."
echo "| .--------------. || .--------------. || .--------------. || .--------------. |"
echo "| | ____    ____ | || |      __      | || |  _______     | || |  _________   | |"
echo "| ||_   \  /   _|| || |     /  \     | || | |_   __ \    | || | |  _   _  |  | |"
echo "| |  |   \/   |  | || |    / /\ \    | || |   | |__) |   | || | |_/ | | \_|  | |"
echo "| |  | |\  /| |  | || |   / ____ \   | || |   |  __ /    | || |     | |      | |"
echo "| | _| |_\/_| |_ | || | _/ /    \ \_ | || |  _| |  \ \_  | || |    _| |_     | |"
echo "| ||_____||_____|| || ||____|  |____|| || | |____| |___| | || |   |_____|    | |"
echo "| |              | || |              | || |              | || |              | |"
echo "| '--------------' || '--------------' || '--------------' || '--------------' |"
echo " '----------------'  '----------------'  '----------------'  '----------------'"
echo 

echo "Generating data..."
node data/fake-refrigerators.js
node data/fake-televisions.js
node data/fake-cameras.js
node data/fake-apparel.js
node data/category-seeder.js
pm2 start startup.json

SCRIPT

config.vm.synced_folder ".", "/home/vagrant/meanmart-src"
config.vm.network "private_network", ip: "192.168.66.10"

config.vm.provider "virtualbox" do |vb|
    # Don't boot with headless mode
    # vb.gui = true

    # Set the name of the VM
    vb.name = "meanmart-box"

    # Use VBoxManage to customize the VM. For example, to change memory and
    # allow symlinks to be created in the shared folder (ex: node_modules):
    vb.customize ["modifyvm", :id, "--memory", "1024"]
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/meanmart", "1"]
  end

config.vm.provision "shell", inline: $script

end