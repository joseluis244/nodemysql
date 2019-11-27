#!/bin/bash


if [ "$1" = "nossl" ]; then
    sudo cp nginx/default /etc/nginx/sites-available/default
    sudo cp nginx/nginxconf.conf /etc/nginx/conf.d/nginxconf.conf
else
    sudo cp nginx/nginxconfssl.conf /etc/nginx/conf.d/nginxconf.conf
fi
