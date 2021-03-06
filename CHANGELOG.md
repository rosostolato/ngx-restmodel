# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.4"></a>
## [0.1.4](https://github.com/rosostolato/ngx-restmodel/compare/v0.1.3...v0.1.4) (2018-09-28)


### Bug Fixes

* **base:** base cannot be in prototype ([e1eab3a](https://github.com/rosostolato/ngx-restmodel/commit/e1eab3a))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/rosostolato/ngx-restmodel/compare/v0.1.2...v0.1.3) (2018-09-28)


### Bug Fixes

* **restmodel:** fix bug with extended models - issue [#2](https://github.com/rosostolato/ngx-restmodel/issues/2) ([e5e306d](https://github.com/rosostolato/ngx-restmodel/commit/e5e306d))
* **restmodel:** fixed inheriting prototype [#3](https://github.com/rosostolato/ngx-restmodel/issues/3) ([44a4bdb](https://github.com/rosostolato/ngx-restmodel/commit/44a4bdb))
* **restModel:** remove route methods from restModel type ([7d6061f](https://github.com/rosostolato/ngx-restmodel/commit/7d6061f))
* forgotten method ([4c85e59](https://github.com/rosostolato/ngx-restmodel/commit/4c85e59))


### Features

* **httpMethods:** enum as string ([a5ba9b0](https://github.com/rosostolato/ngx-restmodel/commit/a5ba9b0))
* **restModel:** JsonIgnore decorator ([2038bb8](https://github.com/rosostolato/ngx-restmodel/commit/2038bb8))
* **route:** default template is any ([7aa1d51](https://github.com/rosostolato/ngx-restmodel/commit/7aa1d51))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/rosostolato/ngx-restmodel/compare/v0.1.1...v0.1.2) (2018-08-17)


### Bug Fixes

* **observable:** http methods obversables returning errors ([83b8901](https://github.com/rosostolato/ngx-restmodel/commit/83b8901))
* **responseInterceptor:** missing call ([df2b6fc](https://github.com/rosostolato/ngx-restmodel/commit/df2b6fc))


### Features

* **demo:** improved demo app ([799d470](https://github.com/rosostolato/ngx-restmodel/commit/799d470))
* **Http:** reduce some codes with rxjs pipes ([56cc762](https://github.com/rosostolato/ngx-restmodel/commit/56cc762))
* **mapModel:** pass the current method on params ([59b28fa](https://github.com/rosostolato/ngx-restmodel/commit/59b28fa))
* **response:** renamed FullResponse to response only ([5ccb4eb](https://github.com/rosostolato/ngx-restmodel/commit/5ccb4eb))
* **RestModel:** RestModelBase extends RestRoute for methods sharing ([3d1c218](https://github.com/rosostolato/ngx-restmodel/commit/3d1c218))
* **test:** cover almost 100% of code ([993011c](https://github.com/rosostolato/ngx-restmodel/commit/993011c))
* **tests:** improove code coverage ([46eb968](https://github.com/rosostolato/ngx-restmodel/commit/46eb968))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/rosostolato/ngx-restmodel/compare/v0.1.0...v0.1.1) (2018-08-14)


### Bug Fixes

* **restModel:** I forgot to change on restModel ([7379bef](https://github.com/rosostolato/ngx-restmodel/commit/7379bef))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.9...v0.1.0) (2018-08-14)



<a name="0.0.9"></a>
## [0.0.9](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.8...v0.0.9) (2018-08-14)


### Bug Fixes

* **requestInterceptor:** it needs to create a new HttpRequest object, because it's immutable ([a98b240](https://github.com/rosostolato/ngx-restmodel/commit/a98b240))



<a name="0.0.8"></a>
## [0.0.8](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.7...v0.0.8) (2018-08-14)


### Bug Fixes

* **RestBase:** Base should keep the originals properties, no copying ([e6f672a](https://github.com/rosostolato/ngx-restmodel/commit/e6f672a))
* **Route:** params and headers were not in request ([085f547](https://github.com/rosostolato/ngx-restmodel/commit/085f547))



<a name="0.0.7"></a>
## [0.0.7](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.6...v0.0.7) (2018-08-10)


### Bug Fixes

* **readme:** Now all demo links are working ([6188851](https://github.com/rosostolato/ngx-restmodel/commit/6188851))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.4...v0.0.6) (2018-08-10)


### Bug Fixes

* **http:** fix http verbos ([53ed63d](https://github.com/rosostolato/ngx-restmodel/commit/53ed63d))
* **test:** post test ([eeca740](https://github.com/rosostolato/ngx-restmodel/commit/eeca740))
* **test:** post test ([86ff926](https://github.com/rosostolato/ngx-restmodel/commit/86ff926))


### Features

* **RestBase:** Add requestInterceptor, response and fullResponseInterc. ([cdd0f86](https://github.com/rosostolato/ngx-restmodel/commit/cdd0f86))



<a name="0.0.5"></a>
## [0.0.5](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.4...v0.0.5) (2018-08-10)


### Bug Fixes

* **http:** fix http verbos ([53ed63d](https://github.com/rosostolato/ngx-restmodel/commit/53ed63d))
* **test:** post test ([eeca740](https://github.com/rosostolato/ngx-restmodel/commit/eeca740))
* **test:** post test ([86ff926](https://github.com/rosostolato/ngx-restmodel/commit/86ff926))



<a name="0.0.4"></a>
## [0.0.4](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.3...v0.0.4) (2018-07-31)
- Reimplemented all classes withou extending
- Much better now


<a name="0.0.3"></a>
## [0.0.3](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.2...v0.0.3) (2018-07-31)
- Fixed some bugs



<a name="0.0.2"></a>
## [0.0.2](https://github.com/rosostolato/ngx-restmodel/compare/v0.0.1...v0.0.2) (2018-07-30)
- Implemented Route and methods



<a name="0.0.1"></a>
## 0.0.1 (2018-07-30)
- First commit
