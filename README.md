# AngularContainerMf

This is the container of a micro frontend based angular app, it comes configured with the following features:

 ✅  Intuitive project and folder structure.
 
 ✅  Micro Frontend support using Webpack Module Federation
 
 ✅  Internationalization (i18n) support
 
 ✅  Environment specific local storage encryption
 
 ✅  Angular Material
 
 ✅  Keycloak IAM integration
 
 ✅  Configuration for container to remote communication and vice versa
 
 ✅  Global Angular services for:
 
- API Calling
    
- Data provider
    
- Local Storage
    
- Snackbar manipulation
    
- Translation (i18n)
    
- Common Shared functionality
    
✅  Utilities for:

- Centralized API endpoints

- Centralized Constants

- Network interceptors (for spinner and sending auth headers in APIs)

✅  Common UI functionality such as:

- Mat Drawer / Sidenav

- Mat Snackbar

- Mat Dialog

- Cross Micro Frontend routing through the container.

 ✅  Support to import custom web components created as Angular Elements. (Using CUSTOM_ELEMENTS_SCHEMA).
 
 ✅  Environment specific index.html files to manage index level imports.

## Note:
This project must be used along with atleast once child micro-frontend. The reference for which can be found here [Child micro-frontend Project](https://github.com/bansodeashish24/angular-child-mf-1)

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
