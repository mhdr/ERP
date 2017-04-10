#!/bin/sh

service erpserver stop
cp build/libs/erpserver*.jar /var/erpserver
service erpserver start
tail -f /var/erpserver/erp.log