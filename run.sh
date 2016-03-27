# http://wagunblog.com/wp/?p=1823

npm install

# install gulp globally
npm install gulp -g
 
# install gulp for project
npm install gulp --save-dev

# for uglify, concat
npm install --save-dev gulp-uglify gulp-concat  

# for sass, minify-css
npm install gulp-sass --save-dev
npm install --save-dev gulp-minify-css

# for running gulp-webserver
npm install --save-dev gulp-webserver

# for opening browser
npm install --save-dev gulp-open

# for cleaning 
npm install --save-dev gulp-clean

# run all task
npm run build

# npm install -g rimraf semver npmlog browserify reactify watchify uglify-js react

# for dev
#watchify -v -d -t [ reactify --es6 ] main.js -o src/build/js/compiled.js
#watchify -v -d -t [ reactify --es6 ] main.js -o src/build/js/compiled.js
#    "build": "gulp; NODE_ENV=development browserify -t [ reactify --es6 ] main.js > src/build/js/compiled.js; gulp server"
# for prod
#    "build": "gulp; NODE_ENV=production browserify -t [ reactify --es6 ] main.js | uglifyjs > src/build/js/compiled.js; gulp server"

npm run start

