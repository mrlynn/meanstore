Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = false
  config.vm.synced_folder "shared/", "/shared", create: true
  config.vm.synced_folder "dataset/", "/dataset", create: true
  config.vm.synced_folder ".", "/home/vagrant/meanmart-src"

  config.vm.network "forwarded_port", guest: 3307, host: 33007
  config.vm.network "forwarded_port", guest: 27017, host: 37017
  config.vm.network "forwarded_port", guest: 3000, host: 30000
  config.vm.network "forwarded_port", guest: 4022, host: 40022
  config.vm.network "forwarded_port", guest: 3306, host: 33006

  config.vm.define "meanmart" do |server|
    server.vm.provider "virtualbox" do |vb|
       vb.customize ["modifyvm", :id, "--cpus", "2"]
       vb.name = "meanmart"
       vb.memory = 2048
    end
    server.vm.hostname = "meanmart.mongodb.local"
    server.vm.network :private_network, ip: "192.168.14.200"
    server.vm.provision :shell, path: "provision-vagrant.sh", args: ENV['ARGS']

  end
end
