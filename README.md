# Chat Application

A project for the Distributed Artificial Intelligence and Intelligent Agents course (FTN, University of Novi Sad), built using Java EE technologies and Angular.

## Setup ##
* Java Enterprise Application
  * Download Wildfly 11 application server
  * Replace existing standalone-full-ha.xml file with the one provided [here](https://github.com/tamararankovic/chat_zadatak/tree/master/wildfly-configuration)
  * For the non-master cluster node you must provide master node name in the ```connection.properties``` file
  * Publish chat-ear.ear to ```/standalone/deployments``` folder
* Angular Application
  * Download Node.js (version 14.15.0 used for development)
  * Install Angular CLI (version 10.2.0 used for dvelopment)
  * Navigate to ```chat-client``` project and type: ```npm install```
  
## Start the application ##

* Java Enterprise Application

  * Navigate to ```/bin``` folder of Wildfly and type:
  #### Windows ####
  ```
  standalone.bat -c standalone-full-ha.xml
  ```
  #### Linux ####
  ```
  ./standalone.sh -c standalone-full-ha.xml
* Angular Application

  * Navigate to ```chat-client``` project and type:
  </br>
  
  ```
  ng serve
  ```
