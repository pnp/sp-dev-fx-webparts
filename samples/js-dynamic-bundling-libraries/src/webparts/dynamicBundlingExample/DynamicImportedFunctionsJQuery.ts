/*
This file demonstrates how we can separate functionality that might not need to be loaded with the SPFx Web Part or Extension immediately, but be bundled into a separate .js file and loaded dynamically.

We will be bundling jQuery in the imported .ts file.
This demonstrates how if we have the need to bundle a third party library, such as jQuery, we can delay the loading of it as well as any additional functionality until aboslutely needed.

This example will add a CSS class to the <body> element, write a message to the console and inject some HTML letting us know that jQuery has been loaded.
*/

import * as $ from 'jquery';
require('./DynamicImportedFunctionsJQuery.scss');

export default class DynamicFunctionsJQuery {
    public static executeDynamicLoadJQuery():void {
        console.log('Dynamic Functionality with jQuery has been imported');
        $('body').addClass('jQueryImported');
        
    }

    public static addToDOM(webpart:HTMLElement){
        //console.log(webpart);
        var item = webpart.getElementsByClassName('insertHTML')[0];
        item.innerHTML = `
        <div class="injectedContent">
        <span class="">jQuery has been dynamically imported.</span>
        </div>
        `
    }

}


