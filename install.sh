#!/bin/bash

sudo apt-get update -y
sudo apt-get install orthanc nodejs npm mysql-server build-essential unzip cmake mercurial \ uuid-dev libcurl4-openssl-dev liblua5.3-dev \ libgtest-dev libpng-dev libsqlite3-dev libssl-dev libjpeg-dev \ zlib1g-dev libdcmtk-dev libboost-all-dev libwrap0-dev \ libcharls-dev libjsoncpp-dev libpugixml-dev locales -y
sudo wget https://www.orthanc-server.com/downloads/get.php?path=/plugin-mysql/OrthancMySQL-2.0.tar.gz
sudo tar -xvzf OrthancMySQL-2.0.tar.gz