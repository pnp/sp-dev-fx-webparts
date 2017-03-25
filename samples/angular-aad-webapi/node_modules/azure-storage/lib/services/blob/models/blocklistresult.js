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
var xmlbuilder = azureCommon.xmlbuilder;
var Constants = azureCommon.Constants;

/**
* Builds an XML representation for a block list.
*
* @param  {array}  The block list.
* @return {string} The XML block list.
*/
exports.serialize = function (blockListJs) {
  var blockListDoc = xmlbuilder.create();
  blockListDoc = blockListDoc.begin(Constants.BlobConstants.BLOCK_LIST_ELEMENT, { version: '1.0', encoding: 'utf-8' });

  if (blockListJs.LatestBlocks) {
    blockListJs.LatestBlocks.forEach(function (block) {
      blockListDoc = blockListDoc.ele(Constants.BlobConstants.LATEST_ELEMENT)
        .txt(new Buffer(block).toString('base64'))
        .up();
    });
  }

  if (blockListJs.CommittedBlocks) {
    blockListJs.CommittedBlocks.forEach(function (block) {
      blockListDoc = blockListDoc.ele(Constants.BlobConstants.COMMITTED_ELEMENT)
        .txt(new Buffer(block).toString('base64'))
        .up();
    });
  }

  if (blockListJs.UncommittedBlocks) {
    blockListJs.UncommittedBlocks.forEach(function (block) {
      blockListDoc = blockListDoc.ele(Constants.BlobConstants.UNCOMMITTED_ELEMENT)
        .txt(new Buffer(block).toString('base64'))
        .up();
    });
  }

  return blockListDoc.doc().toString();
};

exports.parse = function (blockListXml) {
  var blockListResult = {};

  if (blockListXml.CommittedBlocks && blockListXml.CommittedBlocks.Block) {
    blockListResult.CommittedBlocks = blockListXml.CommittedBlocks.Block;
    if (!_.isArray(blockListResult.CommittedBlocks)) {
      blockListResult.CommittedBlocks = [blockListResult.CommittedBlocks];
    }
  }

  if (blockListXml.UncommittedBlocks && blockListXml.UncommittedBlocks.Block) {
    blockListResult.UncommittedBlocks = blockListXml.UncommittedBlocks.Block;
    if (!_.isArray(blockListResult.UncommittedBlocks)) {
      blockListResult.UncommittedBlocks = [blockListResult.UncommittedBlocks];
    }
  }

  return blockListResult;
};