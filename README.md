# Ngx Restmodel
[![Build Status](https://travis-ci.org/rosostolato/ngx-restmodel.svg?branch=master)](https://travis-ci.org/rosostolato/ngx-restmodel)
[![codecov](https://codecov.io/gh/rosostolato/ngx-restmodel/branch/master/graph/badge.svg)](https://codecov.io/gh/rosostolato/ngx-restmodel)
[![npm version](https://badge.fury.io/js/ngx-restmodel.svg)](http://badge.fury.io/js/ngx-restmodel)
[![devDependency Status](https://david-dm.org/rosostolato/ngx-restmodel/dev-status.svg)](https://david-dm.org/rosostolato/ngx-restmodel?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/rosostolato/ngx-restmodel.svg)](https://github.com/rosostolato/ngx-restmodel/issues)
[![GitHub stars](https://img.shields.io/github/stars/rosostolato/ngx-restmodel.svg)](https://github.com/rosostolato/ngx-restmodel/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rosostolato/ngx-restmodel/master/LICENSE)

## Demo
https://rosostolato.github.io/ngx-restmodel/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

Request from a restful api and link it to a model

## Installation

Install through npm:
```
npm install --save ngx-restmodel
```

Then include in your apps module:

```typescript
import { NgModule } from '@angular/core';
import { RestmodelModule } from 'ngx-restmodel';

@NgModule({
  imports: [
    RestmodelModule.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<hello-world></hello-world>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/rosostolato/ngx-restmodel/blob/master/demo/demo.component.ts).

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://rosostolato.github.io/ngx-restmodel/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
