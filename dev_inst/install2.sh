#!/bin/bash

sudo dpkg -i 0/*
sudo dpkg -i 0/*
sudo dpkg -i 1/*
sudo dpkg -i 2/*
sudo dpkg -i 2/*
sudo dpkg -i 3/*
sudo dpkg -i 4/*
sudo dpkg -i 4/*
sudo dpkg -i 5/*
sudo dpkg -i 6/*
mkdir /var/www/html/medicaltecsrl
mkdir /var/www/html/medicaltecsrl/ssl
if [ "$1" = "compilar" ]; then
sudo wget https://www.orthanc-server.com/downloads/get.php?path=/plugin-mysql/OrthancMySQL-2.0.tar.gz
sudo tar -xvzf get.php?path=%2Fplugin-mysql%2FOrthancMySQL-2.0.tar.gz
sudo rm get.php\?path\=%2Fplugin-mysql%2FOrthancMySQL-2.0.tar.gz
sudo mv /etc/orthanc/orthanc.json /etc/orthanc/orthanc.json.bkp
sudo cp orthanc.json /etc/orthanc/orthanc.json
cd OrthancMySQL-2.0/
sudo mkdir BuildMySQL
cd BuildMySQL
cmake ../MySQL/ -DCMAKE_BUILD_TYPE=Release \
                  -DALLOW_DOWNLOADS=ON \
                  -DUSE_SYSTEM_GOOGLE_TEST=OFF \
                  -DUSE_SYSTEM_ORTHANC_SDK=OFF
make
sudo ln -s $RUTA/OrthancMySQL-2.0/BuildMySQL/libOrthancMySQLIndex.so.2.0 /usr/share/orthanc/plugins/libOrthancMySQLIndex.so
sudo ln -s $RUTA/OrthancMySQL-2.0/BuildMySQL/libOrthancMySQLStorage.so.2.0 /usr/share/orthanc/plugins/libOrthancMySQLStorage.so
else
sudo tar -xvzf make.tar.gz
cd OrthancMySQL-2.0/
cd BuildMySQL
sudo make
fi
