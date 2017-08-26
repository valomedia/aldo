# aldo

Collecting faces for fun and profit!

Aldo is the development base for a new yet-to-be named project by valo.media UG 
(haftungsbeschränkt), whose purpose is to aid media agencies with the management 
of their pages and advertising campaigns on Facebook.

## Project status

Aldo is pre-alpha software.  You will encounter build failures and breaking 
changes.  Do not use this software in a production environment.

## Setup instructions

Set up a Linux build server.  These instructions are for Ubuntu, but they should 
work in a similar fashion for all unix systems.  This guide assumes you have at 
least ubuntu-standard and build-essential installed.

1. [Install 
   node](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).
2. Make sure you installed node correctly:
    * Running ```$ node -v``` should display ```v4.0.0``` or 
      greater.
    * Running ```$ npm -v``` should display version 
      ```3.0.0``` or greater.
3. Create a directory to run Aldo from and change into it by 
   running ```$ mkdir -p /srv/www && cd /srv/www```.
4. Download aldo and change to its directory by running ```$ 
   git clone https://github.com/valomedia/aldo && cd 
   aldo```.
5. Install npm packages and run Aldo by running ```$ npm 
   install && npm start```.
6. To quit Aldo hit ```^c```.

When Aldo is running a browser should automatically open and display the user 
interface.  If you are running Aldo on a headless server, point your browser to 
:3000 to see the interface.  Please remember, that this software is not ready 
for production.

There are serveral ways to run Aldo, depending on what you want to do with it.

* ```$ npm run lint``` will run a TypeScript linter against 
  the code base.
* ```$ npm run compile``` will compile Aldo.
* ```$ npm run compile:w``` will compile Aldo and 
  automatically recompile when the code has changed.
* ```$ npm run sass``` will render the stylesheets for Aldo.
* ```$ npm run sass:w``` will render the stylesheets for 
  Aldo and automatically rerender them when the style is 
  changed.
* ```$ npm run build``` will build Aldo.
* ```$ npm run build:w``` will build Aldo and automatically 
  rebuild when anything gets changed.
* ```$ npm run serve``` will run the server, allowing you to 
  use a version of Aldo you previously compiled.
* ```$ npm start``` will compile Aldo and run the server, 
  automatically rebuilding and restarting when you make 
  changes.  It is recommended to use this setting for 
  development work.

