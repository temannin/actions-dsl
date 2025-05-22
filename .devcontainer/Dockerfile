FROM ubuntu:latest

RUN apt update -y

RUN apt-get install -y \
  bash \
  zsh \
  nano \
  vim \
  less \
  git \
  lsof \
  procps \
  htop

RUN apt-get install -y \
  build-essential \
  net-tools \
  iputils-ping \
  curl \
  wget \
  unzip \
  ca-certificates

RUN curl -fsSL https://deno.land/install.sh | sh -s -- -y
