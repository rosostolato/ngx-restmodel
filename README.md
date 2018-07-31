# Ngx Restmodel
[![Build Status](https://travis-ci.org/rosostolato/ngx-restmodel.svg?branch=master)](https://travis-ci.org/rosostolato/ngx-restmodel)
[![codecov](https://codecov.io/gh/rosostolato/ngx-restmodel/branch/master/graph/badge.svg)](https://codecov.io/gh/rosostolato/ngx-restmodel)
[![npm version](https://badge.fury.io/js/ngx-restmodel.svg)](http://badge.fury.io/js/ngx-restmodel)
[![devDependency Status](https://david-dm.org/rosostolato/ngx-restmodel/dev-status.svg)](https://david-dm.org/rosostolato/ngx-restmodel?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/rosostolato/ngx-restmodel.svg)](https://github.com/rosostolato/ngx-restmodel/issues)
[![GitHub stars](https://img.shields.io/github/stars/rosostolato/ngx-restmodel.svg)](https://github.com/rosostolato/ngx-restmodel/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rosostolato/ngx-restmodel/master/LICENSE)

## Demo
https://rosostolato.github.io/ngx-restmodel/ <i>not implemented yet</i>

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About
[!Highly Experimental - still on developing]

Request from a restful api and link it to a model.

I am a fun of Restangular but I've got desapointed with the version of Angular 2+. But since on AngularJs, I wish Restangular could bind them methods on prototype and not inside its body. So I tried to create this lib.

It's very experimental and maybe not correctly implemented, but I'm still developing the Idea.
If you liked the idea and want to contribute, please send me an e-mail (I need help).

## Installation

Install through npm:
```
npm install --save ngx-restmodel
```

Then create a service that extends RestBase and implement the desireds methods.

```typescript
import { RestBase, Restful } from '../src/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './models/Post';

@Injectable()
@Restful({
  baseUrl: 'https://jsonplaceholder.typicode.com'
})
export class RestApi extends RestBase {
  constructor (http: HttpClient) {
    super(http);
  }

  // Here you can map the responses direct to your models
  protected mapModel(route: string, data: any) {
    if (route === 'posts') {
      return new Post(data);
    }

    return data;
  }
}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';
import { RestApi } from './restApi.service';
import { Post } from './models/Post';

@Component({
  selector: 'rest-demo-app',
  template: ``
})
export class DemoComponent {
  posts: Post[]

  constructor (private restApi: RestApi) {
  }

  GetPosts() {
    // Route to the desired path
    // Get /posts
    this.restApi.route('posts')
      .getList<Post>()
      .subscribe(response => {
        this.posts = response.getPlain();

        // You can route again just like restangular
        // Get /posts/1/comments
        response[0].route('comments')
          .getList()
          .subscribe(comments => {
          });
      });
  }
}
```

You may also find it useful to view the [demo source](https://github.com/rosostolato/ngx-restmodel/blob/master/demo/demo.component.ts). <i>not implemented yet</i>

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://rosostolato.github.io/ngx-restmodel/docs/ <i>not implemented yet</i>

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
