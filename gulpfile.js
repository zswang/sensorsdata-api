/*jshint globalstrict: true*/
/*global require*/

'use strict'

const gulp = require('gulp')
const typescript = require('gulp-typescript')
const linenum = require('gulp-linenum')
const jdists = require('gulp-jdists')
const replace = require('gulp-replace')
const examplejs = require('gulp-examplejs')
const rename = require('gulp-rename')
const merge2 = require('merge2')
const packageInfo = require('./package')

gulp.task('build', function() {
  const tsResult = gulp
    .src('./src/*.ts')
    .pipe(
      linenum({
        prefix: packageInfo.name + '/src/index.ts:',
      })
    )
    .pipe(jdists())
    .pipe(gulp.dest('./lib'))
    .pipe(
      typescript({
        moduleResolution: 'node',
        module: 'commonjs',
        target: 'es2015',
        declaration: true,
      })
    )

  return merge2([
    tsResult.dts.pipe(gulp.dest('./lib')),
    tsResult.js
      .pipe(
        replace(
          /^(\s*)var extendStatics/m,
          '\n$1/* istanbul ignore next */\n$&'
        )
      )
      .pipe(gulp.dest('./lib')),
  ])
})

gulp.task('example', function() {
  return gulp
    .src(`src/index.ts`)
    .pipe(
      jdists({
        trigger: 'example',
      })
    )
    .pipe(
      examplejs({
        header: `
const sa = require('../')
const http = require('http')
const url = require('url')
const server = http.createServer((req, res) => {
  let urlInfo = url.parse(req.url)
  switch (urlInfo.pathname) {
    case '/api/user/analytics/report':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(JSON.stringify({"series":[],"rows":[],"num_rows":0,"report_update_time":"2018-06-11 20:45:50.934","data_update_time":"1970-01-01 08:00:00.000","data_sufficient_update_time":"1970-01-01 08:00:00.000","truncated":false}))
      return
    case '/api/sql/query':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(
        [
          {
            distinct_id: '999999-0000-8888-000000',
            event: 'index_leave',
          },
          {
            distinct_id: '999999-0000-8888-000000',
            event: '$pageview',
          },
          {
            distinct_id: '999999-0000-8888-000001',
            event: 'index_leave',
          },
          {
            distinct_id: '999999-0000-8888-000001',
            event: '$pageview',
          },
        ]
          .map(item => JSON.stringify(item))
          .join('\\n')
      )
      setTimeout(() => {
        server.close()
      })
      return
  }
  res.writeHead(404)
  res.end('Not Found')
})
server.listen(3636)
      `,
      })
    )
    .pipe(
      rename({
        extname: '.js',
      })
    )
    .pipe(gulp.dest('test'))
})

gulp.task('dist', ['build'])
