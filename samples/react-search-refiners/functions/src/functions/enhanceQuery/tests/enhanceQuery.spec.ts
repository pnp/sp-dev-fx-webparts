import { Context, HttpMethod, HttpRequest, HttpStatusCode } from 'azure-functions-ts-essentials';
import { TextAnalyticsHelper } from '../../../helpers/TextAnalyticsHelper';
import { run } from '../enhanceQuery';
import * as $ from '../../../../tools/build/helpers';
import * as fs from 'fs';

// Build the process.env object according to Azure Function Application Settings
const localSettingsFile = $.root('./src/local.settings.json');
const settings = JSON.parse(fs.readFileSync(localSettingsFile, { encoding: 'utf8' })
                    .toString()).Values;

Object.keys(settings)
    .map(key => {
        process.env[key] = settings[key];
});

describe('POST /api/query/enhance', () => {

    it('should throw a warning message if the input query is empty', async () => {

        const mockContext: Context = {
            done: (err, response) => {
                expect(err).toBeUndefined();
                expect(response.status).toEqual(HttpStatusCode.InternalServerError);
                expect(response.body.error.message).toBeDefined();
            }
          };

        const mockRequest: HttpRequest = {
            method: HttpMethod.Post,
            headers: { 'content-type': 'application/json' },
            body: {
                rawQuery: ''
            }
        };

        try {
            await run(mockContext, mockRequest);
        } catch (e) {
            fail(e);
        }
    });

    it('should throw an error if the language is not supported', async () => {

        TextAnalyticsHelper.prototype.detectLanguage = jest.fn().mockReturnValue('la');

        const mockContext: Context = {
            done: (err, response) => {
                expect(err).toBeUndefined();
                expect(response.status).toEqual(HttpStatusCode.InternalServerError);
                expect(response.body.error.message).toBeDefined();
            }
          };

        const mockRequest: HttpRequest = {
            method: HttpMethod.Post,
            headers: { 'content-type': 'application/json' },
            body: {
                rawQuery: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
        };

        try {
            await run(mockContext, mockRequest);
        } catch (e) {
            fail(e);
        }
    });
});
