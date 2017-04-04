// 
// Copyright (c) Microsoft and contributors.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

/**
* Demonstrates how to define a customized retry policy.
* 
* In this sample, we define a customized retry policy which retries on the "The specified container is being deleted"
* exception besides the server exceptions.
* 
* Note that only in the cloud(not the storage emulator), "The specified container is being deleted" exceptions will be
* sent if users immediately recreate a container after delete it.
*/

var fs = require('fs');
if (!fs.existsSync) {
  fs.existsSync = require('path').existsSync;
}

var azure;
if (fs.existsSync('absolute path to azure-storage.js')) {
  azure = require('absolute path to azure-storage');
} else {
  azure = require('azure-storage');
}

var RetryPolicyFilter = azure.RetryPolicyFilter;
var LocationMode = azure.StorageUtilities.LocationMode;

var container = 'customretrypolicysample';

var blobService;

function setRetryPolicy() {
  console.log('Starting continuationSample.');

  // Step 1 : Set the retry policy to customized retry policy which will
  // not retry on any failing status code other than the excepted one.
  var retryOnContainerBeingDeleted = new RetryPolicyFilter();
  retryOnContainerBeingDeleted.retryCount = 5;
  retryOnContainerBeingDeleted.retryInterval = 5000;

  retryOnContainerBeingDeleted.shouldRetry = function(statusCode, retryData) {
    console.log(' Made the request at ' + new Date().toUTCString() + ', received StatusCode: ' + statusCode);

    retryInfo = {};

    // retries on any bad status code other than 409 
    if (statusCode >= 300 && statusCode != 409 && statusCode != 500) {
      retryInfo.retryable = false;
    } else {
      var currentCount = (retryData && retryData.retryCount) ? retryData.retryCount : 0;

      var retryInfo = {
        retryInterval: this.retryInterval + 2000 * currentCount,
        retryable: currentCount < this.retryCount,
      };
    }

    return retryInfo;
  };

  blobService = azure.createBlobService().withFilter(retryOnContainerBeingDeleted);

  // optionally set a proxy
  /*var proxy = {
    protocol: 'http:',
    host: '127.0.0.1',
    port: 8888
  };

  blobService.setProxy(proxy);*/
  

  // Step 2: Create the container
  createContainer(function () {

    // Step 3: Fetch attributes from the container using LocationMode.SECONDARY_THEN_PRIMARY
    fetchAttributesContainer(function () {

      // Step 4: Lease the container
      leaseContainer(function () {

        // Step 5: Lease the container again, retrying until it succeeds
        leaseContainer(function () {
          
          // Step 6: Delete the container
          deleteContainer(function () {
            console.log('Ending continuationSample.');
          });
        });
      });
    });
  });
}

function createContainer (callback) {
  console.log('Entering createContainer.');

  // Create the container.
  blobService.createContainerIfNotExists(container, function (error, containerResult) {
    if (error) {
      console.log(error);
    } else {
      console.log(' Container info ');
      console.log(containerResult);
      console.log('Created the container ' + container);
      callback();
    }
  });
}

function fetchAttributesContainer (callback) {
  console.log('Entering fetchAttributesContainer.');
    
  var options = {
    locationMode: LocationMode.SECONDARY_THEN_PRIMARY
  };

  // Get the properties of the container.
  blobService.getContainerProperties(container, options, function(error) {
    if (error) {
      console.log(error);
    } else {
      console.log('Downloaded container properties from ' + container);
      callback();
    }
  });
}

function leaseContainer(callback) {
  console.log('Entering leaseContainer.');

  // Try to acquire the lease.
  blobService.acquireLease(container, null, {leaseDuration: 15}, function (error, lease) {
    if (error) {
      console.log(error);
    }
    else {
      console.log('Acquired lease from ' + container + ' with leaseid' + lease.id);
      callback();
    }
  });
}

function deleteContainer (callback) {
  console.log('Entering deleteContainer.');

  // Break the lease.
  blobService.breakLease(container, null, {leaseBreakPeriod: 0}, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log(' Broke the lease on the container ' + container);
    }

    // Delete the container.
    blobService.deleteContainer(container, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Deleted the container ' + container);
        callback();
      }
    });
  });
}

setRetryPolicy();
