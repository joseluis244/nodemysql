#!/bin/bash
RUTA=$(pwd)
sudo apt-get update -y
sudo apt-get install orthanc -y
sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo apt-get install mysql-server -y
sudo apt-get install build-essential unzip cmake mercurial \
       	       	       uuid-dev libcurl4-openssl-dev liblua5.3-dev \
       	       	       libgtest-dev libpng-dev libsqlite3-dev libssl-dev libjpeg-dev \
		       zlib1g-dev libdcmtk-dev libboost-all-dev libwrap0-dev \
                       libcharls-dev libjsoncpp-dev libpugixml-dev locales -y
sudo apt-get install libmysqlclient-dev -y
sudo wget https://www.orthanc-server.com/downloads/get.php?path=/plugin-mysql/OrthancMySQL-2.0.tar.gz
sudo tar -xvzf get.php?path=%2Fplugin-mysql%2FOrthancMySQL-2.0.tar.gz
sudo rm get.php\?path\=%2Fplugin-mysql%2FOrthancMySQL-2.0.tar.gz
cd OrthancMySQL-2.0/
sudo mkdir BuildMySQL
cd BuildMySQL
cmake ../MySQL/ -DSTATIC_BUILD=ON -DCMAKE_BUILD_TYPE=Release
make
sudo ln -s $RUTA/OrthancMySQL-2.0/BuildMySQL/libOrthancMySQLIndex.so /usr/share/orthanc/plugins/libOrthancMySQLIndex.so
sudo ln -s $RUTA/OrthancMySQL-2.0/BuildMySQL/libOrthancMySQLStorage.so /usr/share/orthanc/plugins/libOrthancMySQLStorage.so