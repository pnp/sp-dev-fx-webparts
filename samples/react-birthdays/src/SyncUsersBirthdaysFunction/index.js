const request = require('request-promise');
const sp = require('@pnp/sp').sp;
const Web = require('@pnp/sp').Web;
const SPFetchClient = require("@pnp/nodejs").SPFetchClient;
const moment = require('moment');

const tenantId = GetEnvironmentVariable('TenantId');
const tenantUrl = GetEnvironmentVariable('TenantUrl');
const clientId = GetEnvironmentVariable('GraphClientId');
const clientSecret = GetEnvironmentVariable('GraphClientSecret');
const birthdayListTitle = GetEnvironmentVariable('BirthdayListTitle');

let _context;
let _msgraphToken;
let _deltaLink;
let _appCatalog;

module.exports = async function (context, myTimer) {
    // Main
    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('User Birthdays Sync is running late!');
    }
    context.log(`User Birthdays Sync started at ${timeStamp}`);
    try {
        // onInit function
        await onInit(context, myTimer);
        const result = await ensureBirthdaysList();
        // Read Users
        if (result) {
            await getAllUsers(_deltaLink);
        }
        else {
            context.log(`Error Create or Access Birthday List ${timeStamp}`);
            // process.exit(1);
        }
        // End
        context.log(`User Birthdays Sync ended at ${timeStamp}`);
        process.exit(0);
    }
    catch (error) {
        context.log(error);
        //  process.exit(1);
    }
};
// Get Enviroment Variavel
function GetEnvironmentVariable(name) {
    return process.env[name];
}
// Get MSGraph Token
async function GetMSGraphToken() {
    let access_token = null;

    const payload = `client_id=${clientId}&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=${clientSecret}&grant_type=client_credentials`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
        body: payload,
        json: true
    };
    // Request
    try {
        const result = await request(options)
        if (result && result.access_token) {
            access_token = result.access_token;
        }
    } catch (e) {
        _context.log(`Error getting AccessToken, error: ${e}`);
    }

    return access_token;

}
// Get users
async function GetUsers(uri) {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${_msgraphToken}`
        },
        uri: uri,
        json: true
    };
    return users = request(options)

}
// Get Birthday of User
async function GetUsersBirthday(userId) {
    let results = null;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${_msgraphToken}`
        },
        uri: `https://graph.microsoft.com/v1.0/users/${userId}/birthday`,
        json: true
    };
    try {
        results = await request(options);
    } catch (e) {
        _context.log(`error getting birthday date for user ${userId}`)
    }

    // return value
    return results.value ? results.value : null;

}
// Read all Users
async function getAllUsers(uri) {
    try {
        // get users 'https://graph.microsoft.com/v1.0/users/delta?$select=displayName,jobTitle,mail,Id'; or  nextLink URL
        const _users = await GetUsers(uri);
        // has data?
        if ( _users && _users.value && _users.value.length === 0 ){
            return;
        }
        // get deltaLink for track changes.
        // get nextLink to get next page
        const _nextLink = (typeof _users["@odata.nextLink"] !== undefined) ? _users["@odata.nextLink"] : undefined;
        const _deltaLink = (typeof _users["@odata.deltaLink"] !== undefined) ? _users["@odata.deltaLink"] : undefined;
        // Read Users
        for (const user of _users.value) {
            _context.log(user.displayName);
            // If user was removed from AAD
            try {
                if (user['@removed']) {
                    await deleteUser(user);
                    continue;
                }
                _birthday = await GetUsersBirthday(user.id);
                const _year = moment(_birthday.toString()).format('YYYY');
                // The Birthday Date has year 2000
                if (_year === '2000') {
                    // check if user exists
                    _exists = await checkUserExist(user);
                    if (!_exists) {
                        // Add user to List
                        await addUser(user, _birthday)
                    } else {
                        //Update user
                        await updateUser(user, _birthday)
                    }
                }
            } catch (error) {
                _context.log(`Error Adding or Updating users : ${error} `);
            }
        }
        try {
            // Load next Page
            if (_nextLink) {
                await getAllUsers(_nextLink);
            }
            // deltaLink exist (last request)
            if (_deltaLink) {
                // Save Tenant property with deltaLink for track changes
                await _appCatalog.setStorageEntity("UserBirthdayDeltaLink", _deltaLink, "Users Sync Delta Token");
            }

        } catch (error) {
            _context.log(`Error updating StorageEntity : ${error} `);
        }

    } catch (error) {
        _context.log(`Error on read users : ${error} `);
    }

    return ;
}
// onInit Function
async function onInit(context, myTimer) {
    _context = context;
    try {
        // setup PnPJs
        sp.setup({
            sp: {
                fetchClientFactory: () => {
                    return new SPFetchClient(
                        tenantUrl,
                        clientId,
                        clientSecret);
                },
            },
        });
        // Get MSGraph Token
        _msgraphToken = await GetMSGraphToken();
        // Get last deltaLink from Tenant Property
        _appCatalog = new Web(`${tenantUrl}/sites/appcatalog`);
        const _deltaLinkValue = await _appCatalog.getStorageEntity('UserBirthdayDeltaLink');
        _deltaLink = _deltaLinkValue.Value ? _deltaLinkValue.Value : 'https://graph.microsoft.com/v1.0/users/delta?$select=displayName,jobTitle,mail,Id';
        _context.log(_deltaLink);

    } catch (error) {
        context.log(`Error on onInit function: ${error}`);
    }

    return;
}
// Add User to SP List
async function addUser(user, _birthday) {
    let _item = null;
    try {
        _item = await sp.web.lists.getByTitle(birthdayListTitle).items.add({
            Title: user.displayName,
            jobTitle: user.jobTitle ? user.jobTitle : '',
            email: user.mail ? user.mail : '',
            userAADGUID: user.id,
            Birthday: moment(_birthday.toString()).format('YYYY-MM-DD')
        });
    } catch (e) {
        __context.log(`Èrror adding user ${user.displayName}, error: ${e}`);
    }

    return _item ? _item : null;
}

// Update User Data
async function updateUser(user, _birthday) {
    let _userUpdated = null;
    const _item = await sp.web.lists.getByTitle(birthdayListTitle).items.top(1).filter(`userAADGUID eq '${user.id}'`).get()

    if (_item && _item.length > 0) {
        _userUpdated = await sp.web.lists.getByTitle(birthdayListTitle).items.getById(_item[0].Id).update({
            Title: user.displayName,
            jobTitle: user.jobTitle ? user.jobTitle : '',
            email: user.mail ? user.mail : '',
            userAADGUID: user.id,
            Birthday: moment(_birthday.toString()).format('YYYY-MM-DD')
        });
    }
    // return value
    return _userUpdated ? _userUpdated : null;
}
// check if user Exist in SPList
async function checkUserExist(user) {
    let _item = null;
    try {
        _item = await sp.web.lists.getByTitle(birthdayListTitle).items.top(1).filter(`userAADGUID eq '${user.id}'`).get()
    } catch (e) {
        __context.log(`Error Checking if user ${user.displayName} exists, error: ${e} `);
    }
    // Return Value
    return _item && _item.length > 0 ? true : false;

}
// Delete User from List
async function deleteUser(user) {
    let _item = null;
    try {
        _item = await sp.web.lists.getByTitle(birthdayListTitle).items.top(1).filter(`userAADGUID eq '${user.id}'`).get()
        if (_item && _item.length > 0) {
            try {
                await sp.web.lists.getByTitle(birthdayListTitle).items.getById(_item[0].Id).delete();
            } catch (e) {
                _context.log(`Error deleting user ${user.displayName}, error: ${e}`);
            }
        }
    } catch (e) {
        _context.log(`Error get user ${user.displayName} to delete, error: ${e}`);
    }
}
// this method ensures that the birthdays lists exists, or if it doesn't exist create it

async function ensureBirthdaysList() {

    let _web = new Web(tenantUrl);
    let result = false;

    try {
        const ensureResult = await _web.lists.ensure(birthdayListTitle,
            "Birthdays 2",
            100,
            true);

        // if we've got the list
        if (ensureResult.list != null) {

            // if the list has just been created
            if (ensureResult.created) {
                // we need to add the custom fields to the list
                const jobTitleFieldAddResult = await ensureResult.list.fields.addText(
                    "jobTitle", 100,
                    { Required: false });
                await jobTitleFieldAddResult.field.update({ Title: "Job Title" });
                const emailFieldAddResult = await ensureResult.list.fields.addText(
                    "email", 100,
                    { Required: true });
                await emailFieldAddResult.field.update({ Title: "Email" });
                const BirthdayFieldAddResult = await ensureResult.list.fields.addDateTime(
                    "Birthday",
                   );
                await BirthdayFieldAddResult.field.update({ Title: "Birthday" });
                const userAADGUIDFieldAddResult = await ensureResult.list.fields.addText(
                    "userAADGUID", 100,
                    { Required: true });
                await userAADGUIDFieldAddResult.field.update({ Title: "AAD ID " });
                await ensureResult.list.fields.getByInternalNameOrTitle('Title').update({ Title: 'Display Name' });
                // the list is ready to be used
                result = true;
            } else {
                // the list already exists, check the fields
                try {
                    const jobTitleField = await ensureResult.list.fields.getByInternalNameOrTitle("jobTitle").get();
                    const emailField = await ensureResult.list.fields.getByInternalNameOrTitle("email").get();
                    const BirthdayField = await ensureResult.list.fields.getByInternalNameOrTitle("Birthday").get();
                    const userAADGUIDField = await ensureResult.list.fields.getByInternalNameOrTitle("userAADGUID").get();
                    // if it is ok, then the list is ready to be used
                    result = true;
                } catch (e) {
                    // if any of the fields does not exist, write exception in the _context log
                    _context.log(`The ${birthdayListTitle} list does not match the expected fields definition. error ${e}`);
                    result = false;
                }
            }
        }
    } catch (e) {
        // if we fail to create the list, write an exception in the _context log
        _context.log(`Failed to create birthdays list ${birthdayListTitle}.`);
        result = false;
    }

    return result;
}

