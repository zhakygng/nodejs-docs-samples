/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This application demonstrates how to perform basic operations on metrics with
 * the Google Stackdriver Monitoring API.
 *
 * For more information, see the README.md under /monitoring and the
 * documentation at https://cloud.google.com/monitoring/docs.
 */

'use strict';

const Monitoring = require(`@google-cloud/monitoring`);

// [START monitoring_list_descriptors]
function listMetricDescriptors (projectId) {
  // Instantiates a client
  const client = Monitoring.v3().metricServiceClient();

  const request = {
    // Specifies the project on which to execute the request
    name: client.projectPath(projectId)
  };

  // Lists metric descriptors
  return client.listMetricDescriptors(request)
    .then((results) => {
      const descriptors = results[0];

      console.log('Metric Descriptors:');
      descriptors.forEach((descriptor) => console.log(descriptor.name));

      return descriptors;
    });
}
// [END monitoring_list_descriptors]

// [START monitoring_list_resources]
function listMonitoredResourceDescriptors (projectId) {
  // Instantiates a client
  const client = Monitoring.v3().metricServiceClient();

  const request = {
    // Specifies the project on which to execute the request
    name: client.projectPath(projectId)
  };

  // Lists monitored resource descriptors
  return client.listMonitoredResourceDescriptors(request)
    .then((results) => {
      const descriptors = results[0];

      console.log('Metric Descriptors:');
      descriptors.forEach((descriptor) => console.log(descriptor.name));

      return descriptors;
    });
}
// [END monitoring_list_resources]

const cli = require(`yargs`)
  .demand(1)
  .command(
    `list`,
    `Lists metric descriptors.`,
    {},
    (opts) => listMetricDescriptors(opts.projectId)
  )
  .command(
    `list-resources`,
    `Lists monitored resource descriptors.`,
    {},
    (opts) => listMonitoredResourceDescriptors(opts.projectId)
  )
  .options({
    projectId: {
      alias: 'p',
      default: process.env.GCLOUD_PROJECT,
      global: true,
      requiresArg: true,
      type: 'string'
    }
  })
  .example(`node $0 list`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/monitoring/docs`);

if (module === require.main) {
  cli.help().strict().argv;
}
