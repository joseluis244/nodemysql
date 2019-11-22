#!/bin/bash
RUTA=$(pwd)
sudo apt-get update -y
sudo apt-get install orthanc -y
sudo apt-get install nodejs -y
sudo apt-get install libssl1.0-dev -y
sudo apt-get install nodejs-dev -y
sudo apt-get install node-gyp -y
sudo apt-get install npm -y
sudo apt-get install mysql-server -y
sudo apt install nginx -y
sudo apt-get install build-essential unzip cmake mercurial \
       	       	       uuid-dev libcurl4-openssl-dev liblua5.3-dev \
       	       	       libgtest-dev libpng-dev libsqlite3-dev libssl-dev libjpeg-dev \
		       zlib1g-dev libdcmtk-dev libboost-all-dev libwrap0-dev \
                       libcharls-dev libjsoncpp-dev libpugixml-dev locales -y
sudo apt-get install libmysqlclient-dev -y
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
/*sudo chmod 777 ../$RUTA*/
sudo chmod 777 $RUTA
sudo chmod 777 $RUTA/OrthancMySQL-2.0
sudo chmod 777 $RUTA/OrthancMySQL-2.0/BuildMySQL