# Microsoft Azure Storage SDK for Node.js 

[![NPM version](https://badge.fury.io/js/azure-storage.svg)](http://badge.fury.io/js/azure-storage) [![Build Status](https://travis-ci.org/Azure/azure-storage-node.svg?branch=master)](https://travis-ci.org/Azure/azure-storage-node)
[![Coverage Status](https://coveralls.io/repos/Azure/azure-storage-node/badge.svg?branch=master&service=github)](https://coveralls.io/github/Azure/azure-storage-node?branch=master)

This project provides a Node.js package that makes it easy to consume and manage Microsoft Azure Storage Services.

> If you are looking for the Node.js SDK for other Azure services, visit [https://github.com/Azure/azure-sdk-for-node](https://github.com/Azure/azure-sdk-for-node).

# Features

- Tables
  - Create/Delete Tables
  - Query/Create/Read/Update/Delete Entities
- Blobs
  - Create/Delete Containers
  - Create/Read/Update/Delete Blobs
- Files
  - Create/Delete Shares
  - Create/Delete Directories
  - Create/Read/Update/Delete Files
- Queues
  - Create/Delete Queues
  - Insert/Peek Queue Messages
  - Advanced Queue Operations
- Service Properties
  - Get Service Properties
  - Set Service Properties

Please check details on [API reference documents](http://azure.github.io/azure-storage-node).

# Getting Started

## Install

```shell
npm install azure-storage
```

## Usage

```Javascript
var azure = require('azure-storage');
```

When using the Storage SDK, you must provide connection information for the storage account to use. This can be provided using:

* Environment variables - **AZURE_STORAGE_ACCOUNT** and **AZURE_STORAGE_ACCESS_KEY**, or **AZURE_STORAGE_CONNECTION_STRING**.

* Constructors - For example, `var tableSvc = azure.createTableService(accountName, accountKey);`

### Table Storage

To ensure a table exists, call **createTableIfNotExists**:

```Javascript
var azure = require('azure-storage');
var tableService = azure.createTableService();
tableService.createTableIfNotExists('mytable', function(error, result, response) {
  if (!error) {
    // result contains true if created; false if already exists
  }
});
```
A new entity can be added by calling **insertEntity**:

```Javascript
var azure = require('azure-storage');
var tableService = azure.createTableService();
var entGen = azure.TableUtilities.entityGenerator;
var entity = {
  PartitionKey: entGen.String('part2'),
  RowKey: entGen.String('row1'),
  boolValueTrue: entGen.Boolean(true),
  boolValueFalse: entGen.Boolean(false),
  intValue: entGen.Int32(42),
  dateValue: entGen.DateTime(new Date(Date.UTC(2011, 10, 25))),
  complexDateValue: entGen.DateTime(new Date(Date.UTC(2013, 02, 16, 01, 46, 20)))
};
tableService.insertEntity('mytable', entity, function(error, result, response) {
  if (!error) {
    // result contains the ETag for the new entity
  }
});
```


Instead of creating entities manually, you can use **entityGenerator**:

```Javascript
var azure = require('azure-storage');
var entGen = azure.TableUtilities.entityGenerator;
var task = {
  PartitionKey: entGen.String('hometasks'),
  RowKey: entGen.String('1'),
  description: entGen.String('take out the trash'),
  dueDate: entGen.DateTime(new Date(Date.UTC(2015, 6, 20))),
};
```

The method **retrieveEntity** can then be used to fetch the entity that was just inserted:

```Javascript
var azure = require('azure-storage');
var tableService = azure.createTableService();
tableService.retrieveEntity('mytable', 'part2', 'row1', function(error, result, response) {
  if (!error) {
    // result contains the entity
  }
});
```

Use **TableQuery** to build complex queries:

```Javascript
var azure = require('azure-storage');
var tableService = azure.createTableService();
var query = new azure.TableQuery()
  .top(5)
  .where('PartitionKey eq ?', 'part2');

tableSvc.queryEntities('mytable', query, null, function(error, result, response) {
  if (!error) {
    // result.entries contains entities matching the query
  }
});
```

### Blob Storage

The **createContainerIfNotExists** method can be used to create a
container in which to store a blob:

```Javascript
var azure = require('azure-storage');
var blobService = azure.createBlobService();
blobService.createContainerIfNotExists('taskcontainer', {
  publicAccessLevel: 'blob'
}, function(error, result, response) {
  if (!error) {
    // if result = true, container was created.
    // if result = false, container already existed.
  }
});
```

To upload a file (assuming it is called task1-upload.txt and it is placed in the same folder as the script below), the method **createBlockBlobFromLocalFile** can be used.

```Javascript
var azure = require('azure-storage');
var blobService = azure.createBlobService();

blobService.createBlockBlobFromLocalFile('mycontainer', 'taskblob', 'task1-upload.txt', function(error, result, response) {
  if (!error) {
    // file uploaded
  }
});
```


For page blobs, use **createPageBlobFromLocalFile**. There are other methods for uploading blobs also, such as **createBlockBlobFromText** or **createPageBlobFromStream**.

There are also several ways to download block and page blobs. For example, **getBlobToStream** downloads the blob to a stream:
  
```Javascript
var blobService = azure.createBlobService();
var fs = require('fs');
blobService.getBlobToStream('mycontainer', 'taskblob', fs.createWriteStream('output.txt'), function(error, result, response) {
  if (!error) {
    // blob retrieved
  }
});
```

To create a Shared Access Signature (SAS), use the **generateSharedAccessSignature** method. Additionally you can use the **date** helper functions to easily create a SAS that expires at some point relative to the current time.

```Javascript
var azure = require('azure-storage');
var blobService = azure.createBlobService();

var startDate = new Date();
var expiryDate = new Date(startDate);
expiryDate.setMinutes(startDate.getMinutes() + 100);
startDate.setMinutes(startDate.getMinutes() - 100);

var sharedAccessPolicy = {
  AccessPolicy: {
    Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
    Start: startDate,
    Expiry: expiryDate
  },
};

var token = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
var sasUrl = blobService.getUrl(containerName, blobName, token);
```

### Queue Storage

The **createQueueIfNotExists** method can be used to ensure a queue exists:

```Javascript
var azure = require('azure-storage');
var queueService = azure.createQueueService();
queueService.createQueueIfNotExists('taskqueue', function(error) {
  if (!error) {
    // Queue exists
  }
});
```

The **createMessage** method can then be called to insert the message into the queue:

```Javascript
var queueService = azure.createQueueService();
queueService.createMessage('taskqueue', 'Hello world!', function(error) {
  if (!error) {
    // Message inserted
  }
});
```

It is then possible to call the **getMessage** method, process the message and then call **deleteMessage** inside the callback. This two-step process ensures messages don't get lost when they are removed from the queue.

```Javascript
var queueService = azure.createQueueService(),
  queueName = 'taskqueue';
queueService.getMessages(queueName, function(error, serverMessages) {
  if (!error) {
    // Process the message in less than 30 seconds, the message
    // text is available in serverMessages[0].messageText

    queueService.deleteMessage(queueName, serverMessages[0].messageId, serverMessages[0].popReceipt, function(error) {
      if (!error) {
        // Message deleted
      }
    });
  }
});
```

### File Storage

The **createShareIfNotExists** method can be used to create a
share in which to store a file or a directory of files:

```Javascript
var azure = require('azure-storage');
var fileService = azure.createFileService();
fileService.createShareIfNotExists('taskshare', function(error, result, response) {
  if (!error) {
    // if result = true, share was created.
    // if result = false, share already existed.
  }
});
```

To create a directory, the method **createDirectoryIfNotExists** can be used.

```Javascript
var azure = require('azure-storage');
var fileService = azure.createFileService();

fileService.createDirectoryIfNotExists('taskshare', 'taskdirectory', function(error, result, response) {
  if (!error) {
    // if result = true, share was created.
    // if result = false, share already existed.
  }
});
```

To upload a file (assuming it is called task1-upload.txt and it is placed in the same folder as the script below), the method **createFileFromLocalFile** can be used.

```Javascript
var azure = require('azure-storage');
var fileService = azure.createFileService();

fileService.createFileFromLocalFile('taskshare', 'taskdirectory', 'taskfile', 'task1-upload.txt', function(error, result, response) {
  if (!error) {
    // file uploaded
  }
});
```

There are other methods for uploading files also, such as **createFileFromText** or **createFileFromStream**.

There are also several ways to download files. For example, **getFileToStream** downloads the file to a stream:
  
```Javascript
var fileService = azure.createFileService();
var fs = require('fs');
fileService.getFileToStream('taskshare', 'taskdirectory', 'taskfile', fs.createWriteStream('output.txt'), function(error, result, response) {
  if (!error) {
    // file retrieved
  }
});
```

### Service Properties 

The **getServiceProperties** method can be used to fetch the logging, metrics and CORS settings on your storage account:

```Javascript  
var azure = require('azure-storage');
var blobService = azure.createBlobService();

blobService.getServiceProperties(function(error, result, response) {  
  if (!error) {
     var serviceProperties = result;
     // properties are fetched
  } 
});  
```

The **setServiceProperties** method can be used to modify the logging, metrics and CORS settings on your storage account:

```Javascript  
var azure = require('azure-storage');
var blobService = azure.createBlobService();

var serviceProperties = generateServiceProperties(); 

blobService.setServiceProperties(serviceProperties, function(error, result, response) {  
  if (!error) {
    // properties are set
  }
});  

function generateServiceProperties() {
  return serviceProperties = {
    Logging: {
      Version: '1.0',
      Delete: true,
      Read: true,
      Write: true,
      RetentionPolicy: {
        Enabled: true,
        Days: 10,
      },
    },
    HourMetrics: {
      Version: '1.0',
      Enabled: true,
      IncludeAPIs: true,
      RetentionPolicy: {
        Enabled: true,
        Days: 10,
      },
    },
    MinuteMetrics: {
      Version: '1.0',
      Enabled: true,
      IncludeAPIs: true,
      RetentionPolicy: {
        Enabled: true,
        Days: 10,
      },
    },
    Cors: {
      CorsRule: [
        {
          AllowedOrigins: ['www.azure.com', 'www.microsoft.com'],
          AllowedMethods: ['GET', 'PUT'],
          AllowedHeaders: ['x-ms-meta-data*', 'x-ms-meta-target*', 'x-ms-meta-xyz', 'x-ms-meta-foo'],
          ExposedHeaders: ['x-ms-meta-data*', 'x-ms-meta-source*', 'x-ms-meta-abc', 'x-ms-meta-bcd'],
          MaxAgeInSeconds: 500,
        },
        {
          AllowedOrigins: ['www.msdn.com', 'www.asp.com'],
          AllowedMethods: ['GET', 'PUT'],
          AllowedHeaders: ['x-ms-meta-data*', 'x-ms-meta-target*', 'x-ms-meta-xyz', 'x-ms-meta-foo'],
          ExposedHeaders: ['x-ms-meta-data*', 'x-ms-meta-source*', 'x-ms-meta-abc', 'x-ms-meta-bcd'],
          MaxAgeInSeconds: 500,
        },
      ],
    },
  };
}
```

When modifying the service properties, you can fetch the properties and then modify the them to prevent overwriting the existing settings.

```Javascript
var azure = require('azure-storage');
var blobService = azure.createBlobService();

blobService.getServiceProperties(function(error, result, response) {  
  if (!error) {
    var serviceProperties = result;
     
    // modify the properties

    blobService.setServiceProperties(serviceProperties, function(error, result, response) {  
      if (!error) {
        // properties are set
      }
    });
  } 
});
```

## Code Samples

How-Tos focused around accomplishing specific tasks are available on the [Microsoft Azure Node.js Developer Center](http://azure.microsoft.com/en-us/develop/nodejs/).

* [How to use the Blob Service from Node.js](http://azure.microsoft.com/en-us/documentation/articles/storage-nodejs-how-to-use-blob-storage/)

* [How to use the Table Service from Node.js](http://azure.microsoft.com/en-us/documentation/articles/storage-nodejs-how-to-use-table-storage/)

* [How to use the Queue Service from Node.js](http://azure.microsoft.com/en-us/documentation/articles/storage-nodejs-how-to-use-queues/)

# Running Tests

Unit tests can then be run from the module's root directory using:

```shell
npm test
```

Running test is also supported by Grunt by:

```shell
grunt # mochaTest as the default task
```

By default the unit tests are ran with Nock recording data. To run tests against real storage account, please set environment variable to turn off Nock by:

```
set NOCK_OFF=true
```

and set up the following environment variables for storage account credentials by 

```Batchfile
set AZURE_STORAGE_CONNECTION_STRING="valid storage connection string"
```
or 
```Batchfile
set AZURE_STORAGE_ACCOUNT="valid storage account name"
set AZURE_STORAGE_ACCESS_KEY="valid storage account key"
```

To record the data in a test pass against real storage account for future Nock usage:

```Batchfile
set AZURE_NOCK_RECORD=true
```

In order to be able to use a proxy like fiddler, an additional environment variable should be set up:

```Batchfile
set HTTP_PROXY=http://127.0.0.1:8888
```

On Linux, please use `export` other than `set` to set the variables.

# JsDoc

JsDoc can be generated by `grunt jsdoc`.

To load the docs by devserver after generation, run `grunt doc` and then browse the docs at [http://localhost:8888](http://localhost:8888).

# Need Help?

Be sure to check out the Microsoft Azure [Developer Forums on MSDN](http://go.microsoft.com/fwlink/?LinkId=234489) if you have trouble with the provided code or use StackOverflow.

# Learn More

- [Microsoft Azure Node.js Developer Center](http://azure.microsoft.com/en-us/develop/nodejs/)
- [Azure Storage Team Blog](http://blogs.msdn.com/b/windowsazurestorage/)

# Contribute

We gladly accept community contributions.

- Issues: Please report bugs using the Issues section of GitHub
- Forums: Interact with the development teams on StackOverflow or the Microsoft Azure Forums
- Source Code Contributions: If you would like to become an active contributor to this project please follow the instructions provided in [Microsoft Azure Projects Contribution Guidelines](http://azure.github.com/guidelines.html).

For general suggestions about Microsoft Azure please use our [UserVoice forum](http://feedback.azure.com/forums/34192--general-feedback).
