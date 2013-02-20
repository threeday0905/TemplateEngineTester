TemplateEngineTester
====================

There are so many client-side html render solutions, like: handlebar.js, xslt parse, string concat, etc..
This application is use to test the performance on those solutions. It can also run the live sample demo on those solutions.

index.html <- This application can output the report within the performance data on each solutions.
demo.thml <- This applicaiton can running the sample demo, and output the relad datas on each solutions.



Live Demo
====================
http://store.digitalriver.com/store/rivtw011/static/file.TemplateEngine_PerformanceTest
http://store.digitalriver.com/store/rivtw011/static/file.TemplateEngine_SampleTest



Note
====================
Since this application will use AJAX to access the necessary template text file, 
so it can't directly running on the local file system.



Encompasses Solution
====================
I had added some client-side html render solution samples on this project as below list:

[XML]
  1. XSLT Process
  2. jQuery + native code

[Native Code]
  1. Array join
  2. String concat
  3. String plus

[Library]
  1. handlebars.js
  2. underscore.js
  3. dust.js
  4. mustache.js
  5. pure.js
  6. doT.js
  7. jQote2.js
  8. jQuery template.js
