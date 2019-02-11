# Docker file specification
#################################
#
# This docker file, install all sources for puppeteer and run the auto-login config for vtex
# Before run all commands for the needing proccees
# 
FROM node:8-slim

RUN apt-get update
RUN apt-get install sudo
 
RUN adduser --disabled-password --gecos '' docker
RUN adduser docker sudo
RUN useradd -ms /bin/bash docker
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
 
USER docker

COPY ./ /project

USER docker

WORKDIR /project/react

RUN echo "Start Vtex proccess to link the current project"

RUN echo "Install dependencies and generate coverage"
RUN sudo yarn

RUN sudo yarn run coverage
RUN chown -R docker:docker node_modules/sonar-scanner/bin/sonar-scanner
RUN sudo node_modules/sonar-scanner/bin/sonar-scanner

