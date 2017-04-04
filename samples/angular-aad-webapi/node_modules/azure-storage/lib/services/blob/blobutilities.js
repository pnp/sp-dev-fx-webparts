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

// Expose 'BlobUtilities'.
exports = module.exports;

/**
* Defines constants, enums, and utility functions for use with the Blob service.
* @namespace BlobUtilities
*/
var BlobUtilities = {
  /**
  * Permission types
  *
  * @const
  * @enum {string}
  */
  SharedAccessPermissions: {
    ADD: 'a',
    READ: 'r',
    WRITE: 'w',
    DELETE: 'd',
    LIST: 'l'
  },

  /**
  * Blob listing details.
  *
  * @const
  * @enum {string}
  */
  BlobListingDetails: {
    SNAPSHOTS: 'snapshots',
    METADATA: 'metadata',
    UNCOMMITTED_BLOBS: 'uncommittedblobs',
    COPY: 'copy'
  },

  /**
  * Deletion options for blob snapshots
  *
  * @const
  * @enum {string}
  */
  SnapshotDeleteOptions: {
    SNAPSHOTS_ONLY: 'only',
    BLOB_AND_SNAPSHOTS: 'include'
  },

  /**
  * Type of block list to retrieve
  *
  * @const
  * @enum {string}
  */
  BlockListFilter: {
    ALL: 'all',
    COMMITTED: 'committed',
    UNCOMMITTED: 'uncommitted'
  },

  /**
  * Blobs and container public access types.
  *
  * @const
  * @enum {string}
  */
  BlobContainerPublicAccessType: {
    OFF: null,
    CONTAINER: 'container',
    BLOB: 'blob'
  },

  /**
  * Describes actions that can be performed on a page blob sequence number.
  * @const
  * @enum
  */
  SequenceNumberAction: {
    MAX: 'max',
    UPDATE: 'update',
    INCREMENT: 'increment'
  }
};

module.exports = BlobUtilities;