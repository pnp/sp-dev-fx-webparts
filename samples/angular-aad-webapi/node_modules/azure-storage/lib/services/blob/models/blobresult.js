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

// Module dependencies.
var _ = require('underscore');

var azureCommon = require('./../../../common/common');
var azureutil = azureCommon.util;
var Constants = azureCommon.Constants;
var HeaderConstants = Constants.HeaderConstants;

/**
* Creates a new BlobResult object.
* @class
* The BlobResult class is used to store the blob information.
* 
 * @property  {string}                      container                             The container name.
 * @property  {string}                      blob                                  The blob name.
 * @property  {object}                      metadata                              The metadata key/value pair.
 * @property  {string}                      etag                                  The etag.
 * @property  {string}                      lastModified                          The date/time that the blob was last modified.
 * @property  {string}                      contentLength                         The size of the blob in bytes.
 * @property  {string}                      blobType                              The blob type.
 * @property  {string}                      requestId                             The request id.
 * @property  {string}                      sequenceNumber                        The current sequence number for a page blob.
 * @property  {string}                      contentRange                          The content range
 * @property  {object}                      contentSettings                       The content settings.
 * @property  {string}                      contentSettings.contentType           The content type.
 * @property  {string}                      contentSettings.contentEncoding       The content encoding.
 * @property  {string}                      contentSettings.contentLanguage       The content language.
 * @property  {string}                      contentSettings.cacheControl          The cache control.
 * @property  {string}                      contentSettings.contentDisposition    The content disposition.
 * @property  {string}                      contentSettings.contentMD5            The content MD5 hash.
 * @property  {object}                      lease                                 The lease information.
 * @property  {string}                      lease.id                              The lease id.
 * @property  {string}                      lease.status                          The lease status.
 * @property  {string}                      lease.state                           The lease state.
 * @property  {string}                      lease.duration                        The lease duration.
 * @property  {object}                      copy                                  The copy information.
 * @property  {string}                      copy.id                               The copy id.
 * @property  {string}                      copy.status                           The copy status.
 * @property  {string}                      copy.completionTime                   The copy completion time. 
 * @property  {string}                      copy.statusDescription                The copy status description.
 * @property  {string}                      copy.progress                         The copy progress.
 * @property  {string}                      copy.source                           The copy source.
 * 
* @constructor
* @param {string} [container]  The container name.
* @param {string} [blob]       The blob name.
*/
function BlobResult(container, blob) {
  if (container) {
    this.container = container;
  }

  if (blob) {
    this.blob = blob;
  }
}

BlobResult.parse = function (blobXml) {
  var blobResult = new BlobResult();
  
  for (var propertyName in blobXml) {
    if (blobXml.hasOwnProperty(propertyName)) {
      if (propertyName === 'Properties') {
        //  Lift out the properties onto the main object to keep consistent across all APIs like: getBlobProperties
        azureutil.setPropertyValueFromXML(blobResult, blobXml[propertyName], true);
      } else if (propertyName === 'Metadata') {
        var resultPropertyName = azureutil.normalizePropertyNameFromXML(propertyName);
        blobResult[resultPropertyName] = {};
        azureutil.setPropertyValueFromXML(blobResult[resultPropertyName], blobXml[propertyName], false);
      } else {
        blobResult[propertyName.toLowerCase()] = blobXml[propertyName];
      }
    }
  }

  return blobResult;
};

var headersForProperties = {
  'lastModified': 'LAST_MODIFIED',
  'etag': 'ETAG',
  'sequenceNumber': 'SEQUENCE_NUMBER',
  'blobType': 'BLOB_TYPE',
  'contentLength': 'CONTENT_LENGTH',
  'blobContentLength': 'BLOB_CONTENT_LENGTH',
  'contentRange': 'CONTENT_RANGE',
  'committedBlockCount': 'BLOB_COMMITTED_BLOCK_COUNT',
  'requestId': 'REQUEST_ID',
  
  'range': 'RANGE',
  'blobRange': 'STORAGE_RANGE',
  'getContentMd5': 'RANGE_GET_CONTENT_MD5',
  'acceptRanges': 'ACCEPT_RANGES',
  'appendOffset': 'BLOB_APPEND_OFFSET',
  
  // ContentSettings
  'contentSettings.contentType': 'CONTENT_TYPE',
  'contentSettings.contentEncoding': 'CONTENT_ENCODING',
  'contentSettings.contentLanguage': 'CONTENT_LANGUAGE',
  'contentSettings.cacheControl': 'CACHE_CONTROL',
  'contentSettings.contentDisposition': 'CONTENT_DISPOSITION',
  'contentSettings.contentMD5': 'CONTENT_MD5',

  // Lease
  'lease.id': 'LEASE_ID',
  'lease.status': 'LEASE_STATUS',
  'lease.duration': 'LEASE_DURATION',
  'lease.state': 'LEASE_STATE',

  // Copy
  'copy.id': 'COPY_ID',
  'copy.status': 'COPY_STATUS',
  'copy.source': 'COPY_SOURCE',
  'copy.progress': 'COPY_PROGRESS',
  'copy.completionTime': 'COPY_COMPLETION_TIME',
  'copy.statusDescription': 'COPY_STATUS_DESCRIPTION'
};

BlobResult.prototype.getPropertiesFromHeaders = function (headers) {
  var self = this;

  var setBlobPropertyFromHeaders = function (blobProperty, headerProperty) {
    if (!azureutil.tryGetValueChain(self, blobProperty.split('.'), null) && headers[headerProperty.toLowerCase()]) {
      azureutil.setObjectInnerPropertyValue(self, blobProperty.split('.'), headers[headerProperty.toLowerCase()]);
      
      if (blobProperty === 'copy.progress') {
        var info = azureutil.parseCopyProgress(self.copy.progress);
        self.copy.bytesCopied = parseInt(info.bytesCopied);
        self.copy.totalBytes = parseInt(info.totalBytes);
      }
    }
  };

  _.chain(headersForProperties).pairs().each(function (pair) {
    var property = pair[0];
    var header = HeaderConstants[pair[1]];
    setBlobPropertyFromHeaders(property, header);
  });
};

/**
* This method sets the HTTP headers and is used by all methods except setBlobProperties and commitBlocks. Those 2 methods will set the x-ms-* headers using setPropertiesFromBlob.
* @ignore
*/
BlobResult.setHeadersFromBlob = function (webResource, blob) {
  var setHeaderPropertyFromBlob = function (headerProperty, blobProperty) {
    var blobPropertyValue = azureutil.tryGetValueChain(blob, blobProperty.split('.'), null);
    if (blobPropertyValue) {
      webResource.withHeader(headerProperty, blobPropertyValue);
    }
  };

  if (blob) {
    // Content-Type
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_TYPE, 'contentSettings.contentType');

    // Content-Encoding
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_ENCODING, 'contentSettings.contentEncoding');

    // Content-Language
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_LANGUAGE, 'contentSettings.contentLanguage');

    // Content-Disposition
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_DISPOSITION, 'contentSettings.contentDisposition');

    // Cache-Control
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CACHE_CONTROL, 'contentSettings.cacheControl');

    // Blob's Content-MD5
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_MD5, 'contentSettings.contentMD5');

    // Content-Length
    setHeaderPropertyFromBlob(HeaderConstants.CONTENT_LENGTH, 'contentLength');

    // transactional Content-MD5
    setHeaderPropertyFromBlob(HeaderConstants.CONTENT_MD5, 'transactionalContentMD5');

    // Range
    if (!azureutil.objectIsNull(blob.rangeStart)) {
      var range = 'bytes=' + blob.rangeStart + '-';

      if (!azureutil.objectIsNull(blob.rangeEnd)) {
        range += blob.rangeEnd;
      }

      webResource.withHeader(HeaderConstants.RANGE, range);
    }

    // Blob Type
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_TYPE, 'blobType');

    // Lease id
    setHeaderPropertyFromBlob(HeaderConstants.LEASE_ID, 'leaseId');

    // Sequence number
    setHeaderPropertyFromBlob(HeaderConstants.SEQUENCE_NUMBER, 'sequenceNumber');
    setHeaderPropertyFromBlob(HeaderConstants.SEQUENCE_NUMBER_ACTION, 'sequenceNumberAction');

    if (blob.metadata) {
      webResource.addOptionalMetadataHeaders(blob.metadata);
    }
  }
};

/**
* This method sets the x-ms-* headers and is used by setBlobProperties and commitBlocks. All other methods will set the regular HTTP headers using setHeadersFromBlob.
* @ignore
*/
BlobResult.setPropertiesFromBlob = function (webResource, blob) {
  var setHeaderPropertyFromBlob = function (headerProperty, blobProperty) {
    var propertyValue = azureutil.tryGetValueChain(blob, blobProperty.split('.'), null);
    if (propertyValue) {
      webResource.withHeader(headerProperty, propertyValue);
    }
  };

  if (blob) {
    // Content-Type
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_TYPE, 'contentSettings.contentType');

    // Content-Encoding
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_ENCODING, 'contentSettings.contentEncoding');

    // Content-Language
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_LANGUAGE, 'contentSettings.contentLanguage');

    // Content-Disposition
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_DISPOSITION, 'contentSettings.contentDisposition');

    // Cache-Control
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CACHE_CONTROL, 'contentSettings.cacheControl');

    // Content-MD5
    setHeaderPropertyFromBlob(HeaderConstants.BLOB_CONTENT_MD5, 'contentSettings.contentMD5');

    // Lease id
    setHeaderPropertyFromBlob(HeaderConstants.LEASE_ID, 'leaseId');

    if (blob.metadata) {
      webResource.addOptionalMetadataHeaders(blob.metadata);
    }
  }
};

module.exports = BlobResult;
