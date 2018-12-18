import { Context, HttpMethod, HttpRequest, HttpResponse, HttpStatusCode } from 'azure-functions-ts-essentials';
import * as fs from 'fs';
import * as path from 'path';
import { LuisHelper } from '../../helpers/LuisHelper';
import { TextAnalyticsHelper } from '../../helpers/TextAnalyticsHelper';
import { ILuisGetIntentResponse } from '../../models/ILuisGetIntentResponse';
import { LuisIntents, ILuisMappingsDefinition } from './config/ILuisMappingsDefinition';
import { INlpResponse } from '../../models/INlpResponse';

/**
 * Routes the request to the default controller using the relevant method.
 */
export async function run(context: Context, req: HttpRequest): Promise<HttpResponse> {

  let res: HttpResponse;

  switch (req.method) {
    case HttpMethod.Get:
        break;

    case HttpMethod.Post:

      // The user raw query from the search box
      const rawQuery = req.body
      ? req.body.rawQuery
      : undefined;

      // The UI language from the front-end component (i.e SPFx)
      const uiLanguage = req.body
      ? req.body.uiLanguage
      : undefined;

      // Check if we should use the staging model for LUIS
      const isStaging = req.body
      ? req.body.isStaging
      : true;

      const textAnalyticsSubscriptionKey = process.env['TextAnalytics_SubscriptionKey'];
      const textAnalyticsAzureRegion = process.env['TextAnalytics_AzureRegion'];
      const luisSubscriptionKey = process.env['LUIS_SubscriptionKey'];
      const luisAuthoringKey = process.env['LUIS_AuthoringKey'];
      const luisAzureRegion = process.env['LUIS_AzureRegion'];
      const bingSpellCheckSubscriptionKey = process.env['Bing_SpellCheckApiKey'];
      const luisMappingFile = process.env['LUIS_MappingsFile'];

      // Instanciates helpers
      const textAnalyticsHelper = new TextAnalyticsHelper(textAnalyticsSubscriptionKey, textAnalyticsAzureRegion);
      const luisHelper = new LuisHelper(luisSubscriptionKey, luisAuthoringKey, luisAzureRegion, bingSpellCheckSubscriptionKey);

      try {

        // Optimize the query
        const response = await enhanceQuery(
                                  rawQuery,
                                  uiLanguage,
                                  isStaging,
                                  luisMappingFile,
                                  luisHelper,
                                  textAnalyticsHelper);

        res = {
          status: HttpStatusCode.OK,
          body: response
        };

      } catch (error) {
        res = {
          status: HttpStatusCode.InternalServerError,
          body: {
            error: {
              type: 'function_error',
              message: error.message
            }
          }
        };
      }

      break;
    case HttpMethod.Patch:
      break;
    case HttpMethod.Delete:
      break;

    default:
      res = {
              status: HttpStatusCode.MethodNotAllowed,
              body: {
                error: {
                  type: 'not_supported',
                  message: `Method ${req.method} not supported.`
                }
              }
            };
  }

  return res;
}

/**
 * Transform the raw query to an optimzed SharePoint search query using intent recognition an entities extraction
 * @param rawQuery the user raw query
 * @param uiLanguage the UI language from the front-end component
 * @param luisMappingFile the LUIS mappings file path for entities
 * @param luisHelper the LUIS helper instance
 * @param textAnalyticsHelper the text analytics helepr instance
 */
export async function enhanceQuery(
                        rawQuery: string,
                        uiLanguage: string,
                        isStaging: boolean,
                        luisMappingFile: string,
                        luisHelper: LuisHelper,
                        textAnalyticsHelper: TextAnalyticsHelper): Promise<INlpResponse> {

  // Function app JSON default response
  let response: INlpResponse;

  if (rawQuery) {

    // Default values
    let debugDetectedLanguage = 'Not recognized (use UI language)';
    let sharePointsearchQuery = rawQuery;

    // Get LUIS mappings from the configuration file
    const mappingFile = fs.readFileSync(path.resolve(__dirname, `./${luisMappingFile}`), { encoding: 'utf8' });
    const mappingsData = JSON.parse(mappingFile.toString()) as ILuisMappingsDefinition;
    const apps = mappingsData.apps;

    try {

      // Detect the query language
      let detectedLanguage = await textAnalyticsHelper.detectLanguage(rawQuery);

      // tslint:disable-next-line:curly
      if (detectedLanguage) {
        debugDetectedLanguage = detectedLanguage;
      // tslint:disable-next-line:curly
      } else {
        detectedLanguage = uiLanguage;
      }

      // Select the right LUIS model according to the language
      const luisModel = apps.filter(app => {
        return app.language === detectedLanguage;
      })[0];

      // If there is a LUIS model for this language
      if (luisModel) {

        luisHelper.appId = luisModel.appId;
        luisHelper.appVersion =  luisModel.version;
        luisHelper.isStaging = isStaging;

        // Get the top user intent using LUIS
        const luisResponse: ILuisGetIntentResponse = await luisHelper.getIntentFromQuery(rawQuery);

        // Check if the query has been corrected by the Bing spell checker
        if (luisResponse.alteredQuery)
            sharePointsearchQuery = luisResponse.alteredQuery;

        // Get the user intents from LUIS
        switch (luisResponse.topScoringIntent.intent) {

          case LuisIntents.SearchByKeywords:

              // Get only recognized entities values
              // Do here whatever you want with your custom entities and intents
              // For this sample, only builtin entities are retrieved
              sharePointsearchQuery = luisResponse.entities.map((e) => {
                return e.entity;
              }).join(" ");

            break;

          case LuisIntents.None:
              break;

          default:
            break;
        }

        // Build the response
        response = {
          alteredQuery: luisResponse.alteredQuery,
          topScoringIntent: {
            detectedIntent: luisResponse.topScoringIntent.intent,
            confidence: luisResponse.topScoringIntent.score,
          },
          detectedLanguage : debugDetectedLanguage,
          entities: luisResponse.entities,
          enhancedQuery: sharePointsearchQuery
        }; 

      // tslint:disable-next-line:curly
      } else {
        throw new Error(`The language '${detectedLanguage}' is not supported by this method`);
      }

    } catch (error) {
      throw error;
    }

  // tslint:disable-next-line:curly
  } else {
    throw new Error("You can't submit an empty query!");
  }

  return response;
}
