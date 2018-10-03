/*
This file demonstrates how we can separate functionality that might not need to be loaded with the SPFx Web Part or Extension immediately, but be bundled into a separate .js file and loaded dynamically.

This function will write a message to the console when it is dynamcially loaded.
*/


export default class DynamicFunctions {
    public static executeDynamicLoad():void {
        console.log('Dynamic Functionality has been imported');
    }

}


