'use strict'

const path = require('path')
const { spawn } = require('child_process')
const { merge } = require('lol/js/object')

const EXCEPTIONS = {
  "**/*.js": {
    contentType: "application/javascript"
  },
  "**/*.css": {
    contentType: "text/css"
  },
  "**/*.bin": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.awd": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.ktx": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.dds": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  },
  "**/*.pvr": {
    contentType: "application/octet-stream",
    contentEncoding: "gzip"
  }
}

function exec( command, options = { stdio: 'pipe' } ) {
  let cmd  = '/bin/bash'
  let args = [ '-c', command ]
  if (process.platform === 'win32') {
    cmd  = 'cmd'
    args = [ '/c', command ]
  }

  return new Promise((resolve, reject) => {
    const ps = spawn( cmd, args, options )

    var data = Buffer.from('')

    ps.stdout.on('data', function(d) {
      data = Buffer.concat([ data, d ])
      console.log(d.toString('utf-8'))
    })

    ps.on('error', (error) => {
      console.log( error )
      if (options.throwOnError) {
        reject( error )
      }
    })

    ps.on('exit', (code, signal) => {
      resolve({ code, signal, data })
    })
  })
}

function execParallel( commands ) {
  return Promise.all(commands.map((c) => {
    if (typeof c === 'string') {
      return exec( c )
    }
    return exec( c.command, c.options )
  }))
}

async function execSerie( commands ) {
  for (var i = 0; i < commands.length; i++) {
    if (typeof commands[i] === 'string') {
      await exec( commands[i] )
    } else {
      await exec( commands[i].command, commands[i].options )
    }
  }
}

/**
 * GZIP files
 * @param {Object} options
 * @param {String} options.dir_path
 * @param {Object} options.exceptions
 * @returns {Promise<any>}
 */
function gzip( options ) {

  const cmds = []

  const FL = new wk.FileList.FileList

  for (const key in options.exceptions) {
    if (options.exceptions[key].contentEncoding && options.exceptions[key].contentEncoding.match(/gzip/gi)) {
      FL.include(path.join(options.dir_path, key ))
    }
  }

  FL.forEach((f) => {

    const filename = path.basename(f)

    cmds.push({
      cwd: path.dirname(f),
      // command: `gzip -9 -c ${filename} > ${filename}`
      command: `gzip -9 ${filename}`
    })

    cmds.push({
      cwd: path.dirname(f),
      command: `mv ${filename}.gz ${filename}`
    })

  })

  if (process.env.DEBUG) {
    console.log( cmds );
  } else {
    return execSerie( cmds ).then((response) => {
      console.log('[DEPLOY]', 'Files gzipped')
      return response
    })
  }

}

/**
 * Push objects
 * @param {Object} options
 * @param {String} options.dir_path
 * @param {String} options.bucket
 * @param {String} options.profile
 * @param {String} options.region
 * @param {Object} options.exceptions
 * @returns {Promise<any>}
 */
function push_objects( options ) {

  const excludes = Object.keys(options.exceptions).map(function(exception) {
    return '--exclude="'+ exception +'"'
  }).join(' ')

  const cmd = [
    'aws s3',
    'sync',
    options.dir_path,
    `s3://${options.bucket}`,
    '--acl public-read',
    '--output json',
    '--delete',
    `--profile ${options.profile}`,
    `--region ${options.region}`,
    excludes
  ]

  if (process.env.DEBUG) {
    console.log( cmd.join(' ') );
  } else {
    return exec(cmd.join(' ')).then((response) => {
      console.log('[DEPLOY]', 'Objects pushed')
      return response
    })
  }

}

/**
 * Push exceptions
 * @param {Object} options
 * @param {String} options.dir_path
 * @param {String} options.bucket
 * @param {String} options.profile
 * @param {String} options.region
 * @param {Object} options.exceptions
 * @returns {Promise<any>}
 */
function push_exception( options ) {
  const requests = []
  let request    = []

  for (const key in options.exceptions) {
    request = [
      'aws s3',
      'sync',
      options.dir_path,
      `s3://${options.bucket}`,
      '--acl public-read',
      '--output json',
      `--profile ${options.profile}`,
      `--region ${options.region}`
    ]

    if (options.exceptions[key].contentEncoding) {
      request.push( `--content-encoding "${options.exceptions[key].contentEncoding}"` )
    }

    if (options.exceptions[key].contentType) {
      request.push( `--content-type "${options.exceptions[key].contentType}"` )
    }

    request.push(
      '--exclude "*"',
      `--include "${key}"`
    )

    requests.push( request.join(' ') )
  }

  if (process.env.DEBUG) {
    console.log(requests);
  } else {
    execParallel(requests).then((responses) => {
      console.log('[DEPLOY]', 'Exceptions pushed')
      return responses
    })
  }

}

async function list_objects( options ) {
  const dirs = options.bucket.split('/')
  const bucket = dirs.shift()
  const delimiter = dirs.join('/')

  const cmd = [
    'aws s3api',
    'list-objects-v2',
    `--bucket ${bucket}`,
    `--delimiter ${delimiter}`,
    `--profile ${options.profile}`,
    `--region ${options.region}`
  ]

  if (process.env.DEBUG) {
    console.log(requests);
  } else {
    return exec(cmd.join(' ')).then((response) => {
      console.log('[DEPLOY]', 'List fetched')
      return response
    })
  }
}

async function backup_objects( options ) {
  let result = await list_objects( options )
  const list = JSON.parse(result.data.toString('utf-8'))
}

/**
 * @param {Object} options
 * @param {String} options.dir_path
 * @param {String} options.bucket
 * @param {String} options.profile
 * @param {String} options.region
 * @param {String} [options.current_path]
 * @param {Object} [options.exceptions]
 * @param {Object} [options.cloudfront]
 * @param {String} options.cloudfront.distribution_id
 * @param {String[]} options.cloudfront.paths
 */
async function invalidate_paths( options ) {
  const cmd = [
    "aws cloudfront",
    "create-invalidation",
    `--distribution-id ${options.cloudfront.distribution_id}`,
    `--paths ${options.cloudfront.paths}`,
    `--profile ${options.profile}`,
    `--region ${options.region}`
  ]

  if (process.env.DEBUG) {
    console.log( cmd.join(' ') );
  } else {
    return exec(cmd.join(' ')).then((response) => {
      console.log('[DEPLOY]', 'Create a new invalidation')
      return response
    })
  }
}

/**
 * @param {Object} options
 * @param {String} options.dir_path
 * @param {String} options.bucket
 * @param {String} options.profile
 * @param {String} options.region
 * @param {String} [options.current_path]
 * @param {Object} [options.exceptions]
 * @param {Object} [options.cloudfront]
 * @param {String} options.cloudfront.distribution_id
 * @param {String[]} options.cloudfront.paths
 */
async function deploy(options = {}) {
  options.exceptions = merge({}, EXCEPTIONS, options.exceptions || {})

  if (options.current_path != null) {
    options.bucket = path.join(options.bucket, options.current_path)
  }

  await push_objects( options )
  await push_exception( options )
}

module.exports = {
  push_objects,
  push_exception,
  list_objects,
  invalidate_paths,
  deploy,
  gzip
}