### This is a review of Angular progressive web application.

1. set up `ng add @angular/pwa@14.2.0`
2. service worker
3. Run build command `npm run build`
4. Run express server `node server.js`
5. Run express server using different port number in CMD promot
```
set PORT=port_number
node server.js
```
7. [ngsw-config configuartion](https://angular.io/guide/service-worker-config)
8. Add `ng add @angular-eslint/schematics` and run `ng lint`
9. Run `ng update` for checking update
10. `cli\node_modules\.bin\ng new --help`, use `--create-application=false`
11. `ng generate application some_project_name`
```
ng new some_project_name --create-application=false
cd some_project_name
ng generate application some_app_name_1
ng generate application some_app_name_2
ng generate application some_app_name_3
```
12. `ng generate library some_lib_name`
```html
<button>
  <ng-content></ng-content>
</button>
```
13. Angular elements `npm install --save @angular/elements@14.2.12`
14. custom element
15. domSanitizer
