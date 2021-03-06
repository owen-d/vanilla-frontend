FROM ubuntu:18.04

WORKDIR /src

RUN apt-get update && apt-get install -y \
  software-properties-common build-essential less vim git mysql-server mysql-client p7zip-full curl
  # php php-simplexml php-gd php-mysql php-mbstring

RUN LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php && apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y php5.6 php5.6-simplexml php5.6-gd php5.6-mysql php5.6-mbstring

RUN git clone https://github.com/MarkusNemesis/VanillaWoWDB2.git aowow
RUN git clone https://github.com/brotalnia/database dumprepo

# Itemisation patch
# 1.2 = 0
# 1.3 = 1
# 1.4 = 2
# 1.5 = 3
# 1.6 = 4
# 1.7 = 5
# 1.8 = 6
# 1.9 = 7
# 1.10 = 8
# 1.11 = 9
# 1.12 = 10
ENV PATCH=10

# more recent dumps have some sql incompatibilities.
ENV DUMP_FILE=world_full_08_june_2018

RUN sed "s/\['patch'\] = 5/\['patch'\] = ${PATCH}/" <aowow/configs/config.php.in >aowow/configs/config.php

RUN mkdir init && cd init && 7z e ../dumprepo/${DUMP_FILE}.7z


# https://github.com/moby/moby/issues/34390
VOLUME /var/lib/mysql

RUN  sed -i'.bak' -e 's/\[mysqld\]/\[mysqld\]\nsql-mode        = ""/' /etc/mysql/mysql.conf.d/mysqld.cnf

RUN mkdir -p /etc/apache2/conf.d && echo "ServerName localhost" >> /etc/apache2/conf-available/servername.conf && a2enconf servername && a2enmod php5.6
RUN rm -r /var/www/html && cp -r /src/aowow /var/www/html && chmod -R 777 /var/www/html

EXPOSE 80
# big startup costs because it has difficulty storing data in a non-volume and if you include the volume in the dockerfile,
# it gets dropped when distributing
CMD service mysql start && \
  echo "CREATE DATABASE mangos; CREATE DATABASE realmd; CREATE USER 'mangos'@'localhost'; GRANT ALL PRIVILEGES ON * . * TO 'mangos'@'localhost';" | mysql && \
  echo "CREATE TABLE mangos.aowow_comments_wh (id SMALLINT, userid SMALLINT, post_date DATE, commentbody TEXT, replyto SMALLINT, type SMALLINT, typeid SMALLINT);" | mysql && \
  echo "CREATE TABLE mangos.aowow_comments_alkz (id SMALLINT, userid SMALLINT, post_date DATE, commentbody TEXT, replyto SMALLINT, type SMALLINT, typeid SMALLINT);" | mysql && \
  mysql mangos < ./init/${DUMP_FILE}.sql && \
  mysql mangos < ./aowow/tools/sql/aowow/aowow.sql && \
  mysql mangos < ./aowow/tools/sql/aowow/aowow_zones.sql && \
  mysql mangos < ./aowow/tools/sql/aowow/faction.sql && \
  mysql realmd < ./aowow/tools/sql/realmd/realmd.sql && \
  echo starting apache... && \
  /usr/sbin/apachectl -DFOREGROUND

