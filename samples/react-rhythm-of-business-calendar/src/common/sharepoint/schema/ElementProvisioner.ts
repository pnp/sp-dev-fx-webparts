/* eslint-disable no-bitwise */
import { find, first } from "lodash";
import { Guid } from "@microsoft/sp-core-library";
import { SPComponentLoader } from '@microsoft/sp-loader';
import { getGUID } from "@pnp/common/util";
import { sp, SPBatch, PrincipalType, PrincipalSource } from "@pnp/sp";
import "@pnp/sp/fields";
import { IFields, UrlFieldFormatType, AddFieldOptions, IFieldInfo, IFieldCreationProperties, DateTimeFieldFormatType, FieldTypes } from "@pnp/sp/fields/types";
import "@pnp/sp/lists";
import { IList, IListInfo } from "@pnp/sp/lists/types";
import "@pnp/sp/site-groups";
import { IGroupAddResult } from "@pnp/sp/site-groups/types";
import "@pnp/sp/security";
import { IBasePermissions, PermissionKind } from "@pnp/sp/security/types";
import "@pnp/sp/taxonomy";
import "@pnp/sp/webs";
import { IWeb } from "@pnp/sp/webs/types";
import { User, ErrorHandler, mapGetOrAdd, siteCollectionTermGroupName } from "common";
import { RoleType, IListDefinition, IFieldDefinition, FieldType, RoleOperation, IListPermissions, IUserRole, WriteAccess, ReadAccess, ISiteGroup, IViewDefinition, IElementDefinitions, DraftVisibilityType, IPermissionLevel, LookupListId, TermGroupId, TermSetId, TermStoreId, AnchorTermId, DefaultTerm, ReputationSiteFields, ParentList, ListTemplateType } from './IElementDefinitions';

const AutomaticListFields = {
    allLists: ["Created", "Modified", "Author", "Editor"],
    [ListTemplateType.GenericList]: [] as string[],
    [ListTemplateType.EventsList]: ["Category", "EventDate", "EndDate", "Location", "fAllDayEvent", "fRecurrence", "EventType", "UID", "RecurrenceID", "MasterSeriesItemID", "RecurrenceData"],
    [ListTemplateType.DocumentLibrary]: ["_ExtendedDescription", "CheckoutUser"],
    [ListTemplateType.PictureLibrary]: ["Comments", "ImageCreateDate", "Keywords", "AlternateThumbnailUrl"] as string[],
    [ListTemplateType.UserInformation]: [] as string[]
};

class ResolvedUserRole {
    constructor(
        public readonly userRole: IUserRole,
        public readonly principalId: number,
        public readonly roleDefinitionId: number
    ) { }
}

export class ElementProvisioner {
    private readonly _ensureFieldsPromiseCache: Map<string, Promise<IFieldInfo>>;

    constructor() {
        this._ensureFieldsPromiseCache = new Map<string, Promise<IFieldInfo>>();
    }

    public async ensureElements(elementDefinitions: IElementDefinitions, web?: IWeb): Promise<void> {
        try {
            const { permissionLevels, siteGroups, siteFields, lists } = elementDefinitions;
            web = web || sp.web;

            if (permissionLevels) {
                await Promise.all(permissionLevels.map(level => this._ensurePermissionLevel(web, level)));
            }

            if (siteGroups) {
                await Promise.all(siteGroups.map(siteGroup => this._ensureSiteGroup(web, siteGroup)));
            }

            if (siteFields) {
                await Promise.all(siteFields.map(siteField => this._ensureField(web, web.fields, siteField)));
            }

            if (lists) {
                await this._ensureListsRespectingDependencies(web, lists);
            }
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    public async ensureList(listDefinition: IListDefinition, web?: IWeb): Promise<void> {
        web = web || sp.web;

        try {
            await this._ensureListsRespectingDependencies(web, [listDefinition]);
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    public async ensureField(fieldDefinition: IFieldDefinition, listDefinition: IListDefinition, web?: IWeb): Promise<void> {
        web = web || sp.web;
        const list = web.lists.getByTitle(listDefinition.title);

        try {
            const retrieveLookupListIdBatch = web.createBatch();
            this._retrieveLookupListId(web, fieldDefinition, retrieveLookupListIdBatch);
            await retrieveLookupListIdBatch.execute();

            await this._retrieveTaxonomyIds(web, fieldDefinition);

            await this._ensureField(web, list.fields, fieldDefinition);
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    public async updateField(fieldDefinition: IFieldDefinition, listDefinition: IListDefinition, web?: IWeb): Promise<void> {
        web = web || sp.web;
        const list = web.lists.getByTitle(listDefinition.title);
        const eh = new ErrorHandler();
        const batch = web.createBatch();
        this._updateField(fieldDefinition, list.fields, batch, eh);
        await batch.execute();
        eh.throwIfError();
    }

    public async deleteField(fieldDefinition: IFieldDefinition, listDefinition: IListDefinition, web?: IWeb): Promise<void> {
        web = web || sp.web;
        const list = web.lists.getByTitle(listDefinition.title);
        const field = list.fields.getByInternalNameOrTitle(fieldDefinition.name);

        try {
            try {
                await field(); // check if the field exists before attempting to delete
            } catch (e) {
                return; // field does not exist
            }

            await field.delete();
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    public async addOrUpdateView(viewDefinition: IViewDefinition, listDefinition: IListDefinition, web?: IWeb): Promise<void> {
        web = web || sp.web;
        const list = web.lists.getByTitle(listDefinition.title);

        try {
            await list.views.getByTitle(viewDefinition.title)
                .delete()
                .catch(() => { }); // if view doesn't exist, swallow the exception
            await this._createView(web, list, viewDefinition);
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    public async deleteSiteField(fieldDefinition: IFieldDefinition, web?: IWeb): Promise<void> {
        web = web || sp.web;

        try {
            await web.fields.getByInternalNameOrTitle(fieldDefinition.name)
                .delete()
                .catch(() => { }); // if column doesn't exist, swallow the exception
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    public async deleteView(viewTitle: string, listDefinition: IListDefinition, web?: IWeb): Promise<void> {
        web = web || sp.web;
        const list = web.lists.getByTitle(listDefinition.title);

        try {
            await list.views.getByTitle(viewTitle).delete();
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    public async configurePermissions(listDefinition: IListDefinition, web?: IWeb, forcePermissionReset: boolean = false): Promise<void> {
        web = web || sp.web;

        try {
            await this._configurePermissions(listDefinition, web, forcePermissionReset);
        } catch (e) {
            ErrorHandler.throw(e);
        }
    }

    private async _ensureListsRespectingDependencies(web: IWeb, listDefinitions: IListDefinition[]): Promise<void> {
        for (const list of listDefinitions) {
            if (list.dependencies && list.dependencies.length > 0) {
                await this._ensureListsRespectingDependencies(web, list.dependencies);
            }

            await this._ensureList(web, list);
        }
    }

    private async _ensureList(web: IWeb, listDefinition: IListDefinition): Promise<void> {
        const {
            title, description, template, readSecurity, writeSecurity, enableModeration,
            enableVersioning, enableMinorVersions, majorVersionLimit, majorWithMinorVersionsLimit, draftVersionVisibility
        } = listDefinition;

        const listSettings: Partial<IListInfo> = {
            EnableModeration: enableModeration,
            EnableVersioning: enableVersioning,
            ReadSecurity: readSecurity || ReadAccess.ByAll,
            WriteSecurity: writeSecurity || WriteAccess.ByAll,
            DraftVersionVisibility: enableModeration ? (draftVersionVisibility || DraftVisibilityType.Reader) : undefined,
            EnableMinorVersions: enableVersioning ? enableMinorVersions : undefined,
            MajorVersionLimit: majorVersionLimit || undefined,
            MajorWithMinorVersionsLimit: majorWithMinorVersionsLimit || undefined
        };

        const listEnsureResult = await web.lists.ensure(title, description, template, false, listSettings);

        if (listEnsureResult.created)
            await this._configureList(web, listDefinition, listEnsureResult.list);
    }

    private async _configureList(web: IWeb, listDefinition: IListDefinition, list: IList): Promise<void> {
        const siteFields = listDefinition.siteFields || [];
        const siteGroups = listDefinition.siteGroups || [];
        const fields = listDefinition.fields || [];
        const views = listDefinition.views || [];

        const retrieveLookupListIdsBatch = web.createBatch();
        const retrieveLookupListIdsPromises = fields.map(field => this._retrieveLookupListId(web, field, retrieveLookupListIdsBatch));
        await retrieveLookupListIdsBatch.execute();
        await Promise.all(retrieveLookupListIdsPromises);

        await Promise.all(fields.map(field => this._retrieveTaxonomyIds(web, field)));

        await Promise.all(siteGroups.map(siteGroup => this._ensureSiteGroup(web, siteGroup)));
        const siteFieldResults = await Promise.all(siteFields.map(field => this._ensureField(web, web.fields, field)));

        const eh = new ErrorHandler();
        const fieldsBatch = web.createBatch();
        fields.forEach(field => this._createField(field, list.fields, fieldsBatch, eh));
        siteFieldResults.forEach(field => this._addSiteField(field, list.fields, fieldsBatch, eh));

        await fieldsBatch.execute();
        eh.throwIfError();

        await this._configureRatings(listDefinition, list, web);

        for (const view of views) {
            await this._createView(web, list, view);
        }

        await this._configurePermissions(listDefinition, web, false);
        await this._createPrepopulatedListItems(listDefinition, list, web);
    }

    private async _configureRatings(listDefinition: IListDefinition, list: IList, web: IWeb): Promise<void> {
        const { title, ratingSettings } = listDefinition;

        if (ratingSettings === 'Ratings' || ratingSettings === 'Likes') {
            await SPComponentLoader.loadScript('/_layouts/15/init.js', { globalExportsName: '$_global_init' });
            await SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', { globalExportsName: 'Sys' });
            await SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', { globalExportsName: 'SP' });
            await SPComponentLoader.loadScript('/_layouts/15/SP.js', { globalExportsName: 'SP' });

            const siteFieldResults = await Promise.all(ReputationSiteFields.map(field => this._ensureField(web, web.fields, field)));

            const eh = new ErrorHandler();
            const batch = web.createBatch();
            siteFieldResults.forEach(field => this._addSiteField(field, list.fields, batch, eh));
            await batch.execute();
            eh.throwIfError();

            const context = new SP.ClientContext((await web()).Url);
            const rootFolder = context.get_web().get_lists().getByTitle(title).get_rootFolder();
            const properties = rootFolder.get_properties();
            properties.set_item("Ratings_VotingExperience", ratingSettings);
            rootFolder.update();

            await new Promise((resolve, reject) => {
                context.executeQueryAsync(resolve, (sender: any, args: SP.ClientRequestFailedEventArgs) => {
                    reject(args.get_message());
                });
            });
        }
    }

    private async _createView(web: IWeb, list: IList, view: IViewDefinition): Promise<void> {
        const viewSettings = {
            RowLimit: view.rowLimit === undefined ? 30 : view.rowLimit,
            Paged: view.paged === undefined ? true : view.paged,
            DefaultView: view.default === undefined ? false : view.default,
            ViewQuery: view.query || ''
        };

        const viewAddResult = await list.views.add(view.title, false, viewSettings);

        const eh = new ErrorHandler();
        const batch = web.createBatch();
        const batchedFields = viewAddResult.view.fields.inBatch(batch);

        batchedFields.removeAll().catch(eh.catch);
        view.fields.forEach(field => batchedFields.add(field).catch(eh.catch));

        await batch.execute();

        eh.throwIfError();
    }

    private async _configurePermissions(listDefinition: IListDefinition, web: IWeb, forcePermissionReset: boolean): Promise<void> {
        const { permissions } = listDefinition;

        const eh = new ErrorHandler();
        const batch = web.createBatch();
        const list = web.lists.getByTitle(listDefinition.title).inBatch(batch);

        if (forcePermissionReset) {
            list.resetRoleInheritance().catch(eh.catch);
        }

        if (permissions) {
            const [
                roles,
                adminRoleDefinition,
                currentUser
            ] = await Promise.all([
                Promise.all(this._resolveUserRoles(web, permissions)),
                web.roleDefinitions.getByType(RoleType.Administrator)(),
                web.currentUser()
            ]);

            list.breakRoleInheritance(permissions.copyRoleAssignments, false).catch(eh.catch);

            roles.filter(role => !!role.roleDefinitionId).forEach(role => {
                const assignments = list.roleAssignments.inBatch(batch);

                switch (role.userRole.operation) {
                    case RoleOperation.Add:
                        assignments.add(role.principalId, role.roleDefinitionId).catch(eh.catch);
                        break;
                    case RoleOperation.Remove:
                        assignments.remove(role.principalId, role.roleDefinitionId).catch(eh.catch);
                        break;
                }
            });

            list.roleAssignments.inBatch(batch).remove(currentUser.Id, adminRoleDefinition.Id).catch(eh.catch);
        }

        await batch.execute();
        eh.throwIfError();
    }

    private async _ensureField(web: IWeb, fields: IFields, fieldDefinition: IFieldDefinition): Promise<IFieldInfo> {
        const name = fieldDefinition.name;
        const cacheKey = fields.toUrlAndQuery() + name;

        return mapGetOrAdd(this._ensureFieldsPromiseCache, cacheKey, async () => {
            try {
                return await fields.getByInternalNameOrTitle(name)();
            } catch (e) {
                const eh = new ErrorHandler();
                const batch = web.createBatch();
                this._createField(fieldDefinition, fields, batch, eh);
                await batch.execute();
                eh.throwIfError();
                return fields.getByInternalNameOrTitle(name)();
            }
        });
    }

    private _updateField(fieldDefinition: IFieldDefinition, fields: IFields, batch: SPBatch, eh: ErrorHandler) {
        const name = fieldDefinition.name;
        const displayName = fieldDefinition.displayName || name;
        const description = fieldDefinition.description || '';
        const required = fieldDefinition.required || false;

        const field = fields.getByInternalNameOrTitle(name);
        const batchedField = field.inBatch(batch);

        const properties = {
            Title: displayName,
            Description: description,
            Required: required
        };
        const fieldType = this._getFieldType(fieldDefinition);

        batchedField.update(properties, fieldType).catch(eh.catch);

        if (fieldDefinition.type === FieldType.Choice) {
            batchedField.update({ Choices: { results: fieldDefinition.choices } }, fieldType).catch(eh.catch);
        }
    }

    private _createField(fieldDefinition: IFieldDefinition, fields: IFields, batch: SPBatch, eh: ErrorHandler) {
        const name = fieldDefinition.name;

        // we allow the Title field to be updated
        if (name === "Title") {
            this._updateField(fieldDefinition, fields, batch, eh);
            return;
        }

        // we do not allow creating or changing built-in fields
        if (AutomaticListFields.allLists.includes(name) ||
            AutomaticListFields[fieldDefinition[ParentList].template].includes(name)) {
            return;
        }

        const batchedFields = fields.inBatch(batch);

        const displayName = fieldDefinition.displayName || name;
        const description = fieldDefinition.description || '';
        const defaultValue = fieldDefinition.default || '';
        const required = fieldDefinition.required || false;
        const hidden = fieldDefinition.hidden || false;
        const readonly = fieldDefinition.readonly || false;
        const uniqueValues = fieldDefinition.uniqueValues || false;
        const indexed = fieldDefinition.indexed || uniqueValues; // turning on Unique Values requires that the column also be indexed
        const hideInDisplayForm = fieldDefinition.hideInDisplayForm || false;
        const hideInNewForm = fieldDefinition.hideInNewForm || false;
        const hideInEditForm = fieldDefinition.hideInEditForm || false;

        const baseProperties: IFieldCreationProperties = {
            Description: description,
            DefaultValue: defaultValue,
            Hidden: hidden,
            ReadOnlyField: readonly,
            Required: required,
            EnforceUniqueValues: uniqueValues,
            Indexed: indexed
        };

        const boolProp = (propName: string, val: boolean, emitOnFalse: boolean = true) => {
            if (val || emitOnFalse)
                return `${propName}="${val ? "TRUE" : "FALSE"}"`;
            else
                return '';
        };
        const requiredProp = () => boolProp("Required", required);
        const hiddenProp = () => boolProp("Hidden", hidden);
        const readonlyProp = () => boolProp("ReadOnly", readonly);

        switch (fieldDefinition.type) {
            case FieldType.Text:
                if (fieldDefinition.multi) {
                    const richText = fieldDefinition.richText || false;
                    const unlimitedLengthInDocumentLibraryProp = () => boolProp("UnlimitedLengthInDocumentLibrary", fieldDefinition.unlimitedLengthInDocumentLibrary);
                    if (richText === 'enhanced') {
                        const schemaMultilineEnhancedRichText =
                            `<Field ID="{${getGUID()}}" DisplayName="${name}" Description="${description}"
                                Type="Note" RichText="TRUE" RichTextMode="FullHtml" ${unlimitedLengthInDocumentLibraryProp()}
                                ${requiredProp()} ${hiddenProp()} ${readonlyProp()}>
                                <Default>${defaultValue}</Default>
                            </Field>`;
                        batchedFields.createFieldAsXml(schemaMultilineEnhancedRichText).catch(eh.catch);
                    } else {
                        batchedFields.addMultilineText(name, 3, richText, false, false, false, baseProperties).catch(eh.catch);
                    }
                }
                else {
                    batchedFields.addText(name, fieldDefinition.maxLength, baseProperties).catch(eh.catch);
                }
                break;

            case FieldType.DateTime:
                batchedFields.addDateTime(name, fieldDefinition.dateTimeFormat, undefined, undefined, baseProperties).catch(eh.catch);
                break;

            case FieldType.Number: {
                const numberBaseProperties = {
                    ...baseProperties,
                    ShowAsPercentage: fieldDefinition.showAsPercentage || false
                };
                batchedFields.addNumber(name, fieldDefinition.min, fieldDefinition.max, numberBaseProperties).catch(eh.catch);
                break;
            }

            case FieldType.Hyperlink:
                batchedFields.addUrl(name, UrlFieldFormatType.Hyperlink, baseProperties).catch(eh.catch);
                break;

            case FieldType.Picture:
                batchedFields.addUrl(name, UrlFieldFormatType.Image, baseProperties).catch(eh.catch);
                break;

            case FieldType.Currency:
                batchedFields.addCurrency(name, fieldDefinition.min, fieldDefinition.max, fieldDefinition.currencyLocaleId, baseProperties).catch(eh.catch);
                break;

            case FieldType.Calculated: {
                switch (fieldDefinition.outputType) {
                    case FieldType.Text:
                        batchedFields.addCalculated(name, fieldDefinition.formula, DateTimeFieldFormatType.DateOnly, FieldTypes.Text, baseProperties).catch(eh.catch);
                        break;
                    case FieldType.Number: {
                        const calculatedNumberBaseProperties = {
                            ...baseProperties,
                            ShowAsPercentage: fieldDefinition.showAsPercentage || false
                        };
                        batchedFields.addCalculated(name, fieldDefinition.formula, DateTimeFieldFormatType.DateOnly, FieldTypes.Number, calculatedNumberBaseProperties).catch(eh.catch);
                        break;
                    }
                    case FieldType.Currency: {
                        const calculatedCurrencyBaseProperties = {
                            ...baseProperties,
                            CurrencyLocaleId: fieldDefinition.currencyLocaleId || undefined
                        };
                        batchedFields.addCalculated(name, fieldDefinition.formula, DateTimeFieldFormatType.DateOnly, FieldTypes.Currency, calculatedCurrencyBaseProperties).catch(eh.catch);
                        break;
                    }
                    case FieldType.DateTime:
                        batchedFields.addCalculated(name, fieldDefinition.formula, fieldDefinition.dateFormat, FieldTypes.DateTime, baseProperties).catch(eh.catch);
                        break;
                    case FieldType.Boolean:
                        batchedFields.addCalculated(name, fieldDefinition.formula, DateTimeFieldFormatType.DateOnly, FieldTypes.Boolean, baseProperties).catch(eh.catch);
                        break;
                }
                break;
            }

            case FieldType.Boolean: {
                const schemaBoolean =
                    `<Field ID="{${getGUID()}}" DisplayName="${name}" Description="${description}"
                        Type="Boolean" ${requiredProp()} ${hiddenProp()} ${readonlyProp()}>
                        <Default>${defaultValue === 'Yes' ? 1 : 0}</Default>
                    </Field>`;
                batchedFields.createFieldAsXml(schemaBoolean).catch(eh.catch);
                break;
            }
            case FieldType.Choice: {
                const schemaChoice =
                    `<Field ID="{${getGUID()}}" DisplayName="${name}" Description="${description}"
                        Type="${fieldDefinition.multi ? "MultiChoice" : "Choice"}"
                        ${requiredProp()} ${hiddenProp()} ${readonlyProp()}>
                        <CHOICES>
                            ${fieldDefinition.choices.map(choice => `<CHOICE>${choice}</CHOICE>`).join('')}
                        </CHOICES>
                        <Default>${defaultValue}</Default>
                    </Field>`;
                batchedFields.createFieldAsXml(schemaChoice).catch(eh.catch);
                break;
            }
            case FieldType.Lookup: {
                const multProp = () => boolProp("Mult", fieldDefinition.multi, false);
                const listId = fieldDefinition[LookupListId].toString();
                const schemaLookup =
                    `<Field ID="{${getGUID()}}" DisplayName="${name}" Description="${description}"
                        Type="${fieldDefinition.multi ? "LookupMulti" : "Lookup"}" List="{${listId}}" ShowField="${fieldDefinition.showField || 'ID'}"
                        ${requiredProp()} ${hiddenProp()} ${readonlyProp()} ${multProp()}>
                    </Field>`;
                batchedFields.createFieldAsXml(schemaLookup).catch(eh.catch);
                break;
            }

            case FieldType.User: {
                const multProp = () => boolProp("Mult", fieldDefinition.multi, false);
                const schemaUser =
                    `<Field ID="{${getGUID()}}" DisplayName="${name}" Description="${description}"
                        Type="${fieldDefinition.multi ? "UserMulti" : "User"}" List="UserInfo" ShowField="ImnName"
                        UserSelectionMode="${fieldDefinition.userSelectionMode}" UserSelectionScope="0"
                        ${requiredProp()} ${hiddenProp()} ${readonlyProp()} ${multProp()}
                    />`;
                batchedFields.createFieldAsXml(schemaUser).catch(eh.catch);
                break;
            }

            case FieldType.Taxonomy: {
                const multProp = () => boolProp("Mult", fieldDefinition.multi, false);
                const allowFillIn = fieldDefinition.allowFillIn || false;
                const defaultTermId = fieldDefinition[DefaultTerm] || '';
                const schemaTaxonomy =
                    `<Field ID="{${getGUID()}}" DisplayName="${name}" Description="${description}"
                        Type="${fieldDefinition.multi ? "TaxonomyFieldTypeMulti" : "TaxonomyFieldType"}"
                        ${requiredProp()} ${hiddenProp()} ${readonlyProp()} ${multProp()}>
                        <Customization>
                            <ArrayOfProperty>
                                <Property>
                                    <Name>TextField</Name>
                                    <Value
                                        xmlns:q6="http://www.w3.org/2001/XMLSchema"
                                        p4:type="q6:string"
                                        xmlns:p4="http://www.w3.org/2001/XMLSchema-instance"
                                    >{${getGUID()}}</Value>
                                </Property>
                                <Property>
                                    <Name>Open</Name>
                                    <Value
                                        xmlns:q5="http://www.w3.org/2001/XMLSchema"
                                        p4:type="q5:boolean"
                                        xmlns:p4="http://www.w3.org/2001/XMLSchema-instance"
                                    >${allowFillIn}</Value>
                                </Property>
                            </ArrayOfProperty>
                        </Customization>
                        <Default>${defaultTermId}</Default>
                    </Field>`;
                batchedFields.createFieldAsXml(schemaTaxonomy).catch(eh.catch);
                break;
            }

            case FieldType.Thumbnail: {
                const schemaThumbnail =
                    `<Field ID="{${getGUID()}}" DisplayName="${name}" Description="${description}"
                        Type="Thumbnail" 
                        ${requiredProp()} ${hiddenProp()} ${readonlyProp()}
                    />`;
                batchedFields.createFieldAsXml(schemaThumbnail).catch(eh.catch);
                break;
            }

            default: break;
        }

        const batchedField = fields.getByInternalNameOrTitle(name).inBatch(batch);

        if (displayName !== name)
            batchedField.update({ Title: displayName }, this._getFieldType(fieldDefinition)).catch(eh.catch);
        if (hideInDisplayForm)
            batchedField.setShowInDisplayForm(!hideInDisplayForm).catch(eh.catch);
        if (hideInNewForm)
            batchedField.setShowInNewForm(!hideInNewForm).catch(eh.catch);
        if (hideInEditForm)
            batchedField.setShowInEditForm(!hideInEditForm).catch(eh.catch);
        if (fieldDefinition.type === FieldType.Taxonomy) {
            const termStoreId = fieldDefinition[TermStoreId].toString();
            const termSetId = fieldDefinition[TermSetId].toString();
            const anchorTermId = fieldDefinition[AnchorTermId]?.toString() || undefined;
            const properties = { SspId: termStoreId, TermSetId: termSetId, TargetTemplate: '', AnchorId: anchorTermId };
            batchedField.update(properties, this._getFieldType(fieldDefinition)).catch(eh.catch);
        }
    }

    private _addSiteField(fieldToAdd: IFieldInfo, fields: IFields, batch: SPBatch, eh: ErrorHandler) {
        fields.inBatch(batch).createFieldAsXml({ SchemaXml: fieldToAdd.SchemaXml, Options: AddFieldOptions.AddFieldInternalNameHint }).catch(eh.catch);
    }

    private async _createPrepopulatedListItems(listDefinition: IListDefinition, list: IList, web: IWeb): Promise<void> {
        const eh = new ErrorHandler();
        const itemBatch = web.createBatch();
        const items = (listDefinition.listItems || []);

        items.forEach(item => {
            list.items.inBatch(itemBatch).add(item).catch(eh.catch);
        });

        await itemBatch.execute();

        eh.throwIfError();
    }

    private _getFieldType(fieldDefinition: IFieldDefinition): string {
        switch (fieldDefinition.type) {
            case FieldType.Text:
                return fieldDefinition.multi ? "SP.FieldMultiLineText" : "SP.FieldText";
            case FieldType.DateTime:
                return "SP.FieldDateTime";
            case FieldType.Number:
                return "SP.FieldNumber";
            case FieldType.Hyperlink:
            case FieldType.Picture:
                return "SP.FieldUrl";
            case FieldType.Currency:
                return "SP.FieldCurrency";
            case FieldType.Calculated:
                return "SP.FieldCalculated";
            case FieldType.Boolean:
                return "SP.Field";
            case FieldType.Choice:
                return fieldDefinition.multi ? "SP.FieldMultiChoice" : "SP.FieldChoice";
            case FieldType.Lookup:
                return "SP.FieldLookup";
            case FieldType.User:
                return "SP.FieldUser";
            case FieldType.Taxonomy:
                return "SP.Taxonomy.TaxonomyField";
            case FieldType.Thumbnail:
                return "SP.Thumbnail";
            case FieldType.AverageRating:
                return "SP.FieldAverageRating";
            case FieldType.Guid:
                return "SP.FieldGuid";
            case FieldType.Integer:
                throw new Error("Cannot create fields of type Integer");
            case FieldType.Recurrence:
                throw new Error("Cannot create fields of type Recurrence");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            default: { const missing: never = fieldDefinition; }
        }
    }

    private async _ensureSiteGroup(web: IWeb, siteGroup: ISiteGroup): Promise<void> {
        try {
            await web.siteGroups.getByName(siteGroup.name)();
        } catch (e) {
            await this._createSiteGroup(web, siteGroup);
        }
    }

    private async _createSiteGroup(web: IWeb, siteGroup: ISiteGroup): Promise<IGroupAddResult> {
        const properties = {
            Title: siteGroup.name,
            Description: siteGroup.description || '',
            AllowMembersEditMembership: siteGroup.allowMembersEditMembership || false,
            AllowRequestToJoinLeave: siteGroup.allowRequestToJoinLeave || false,
            AutoAcceptRequestToJoinLeave: siteGroup.autoAcceptRequestToJoinLeave || false,
            OnlyAllowMembersViewMembership: siteGroup.onlyAllowMembersViewMembership || false,
            RequestToJoinLeaveEmailSetting: siteGroup.requestToJoinLeaveEmailSetting || ''
        };

        return await web.siteGroups.add(properties);
    }

    private _resolveUserRoles(web: IWeb, permissions: IListPermissions): Promise<ResolvedUserRole>[] {
        return permissions.userRoles.map(async userRole => {
            let principalId: number;

            switch (userRole.userType) {
                case 'ownerGroup':
                    principalId = (await web.associatedOwnerGroup()).Id;
                    break;
                case 'memberGroup':
                    principalId = (await web.associatedMemberGroup()).Id;
                    break;
                case 'visitorGroup':
                    principalId = (await web.associatedVisitorGroup()).Id;
                    break;
                case 'custom': {
                    const principals = await sp.utility.searchPrincipals(userRole.customName, PrincipalType.All, PrincipalSource.All, '', 1);
                    const principal = principals[0];
                    const user = User.fromPrincipalInfo(principal);

                    if (principal.PrincipalType === PrincipalType.User) {
                        const result = await web.ensureUser(user.login);
                        user.updateId(result.data.Id);
                    } else {
                        user.updateId(principal.PrincipalId);
                    }

                    principalId = user.id;
                    break;
                }
            }

            let definition = null;
            if (typeof userRole.roleType === "string")
                definition = await web.roleDefinitions.getByName(userRole.roleType)();
            else if (userRole.roleType !== RoleType.None)
                definition = await web.roleDefinitions.getByType(userRole.roleType)();

            return new ResolvedUserRole(userRole, principalId, definition?.Id);
        });
    }

    private async _ensurePermissionLevel(web: IWeb, levelDefinition: IPermissionLevel): Promise<void> {
        const { name, description, copyFrom, permissions } = levelDefinition;

        let basePermissions: IBasePermissions = null;
        if (copyFrom) {
            const roleDefinition = await web.roleDefinitions.getByType(copyFrom).get();
            basePermissions = this._buildBasePermissions(permissions, roleDefinition.BasePermissions);
        } else {
            basePermissions = this._buildBasePermissions(permissions);
        }

        try {
            // check for an existing permission level with the same name and update it
            const existingRoleDefinition = await web.roleDefinitions.getByName(name)();

            basePermissions = {
                Low: basePermissions.Low | existingRoleDefinition.BasePermissions.Low,
                High: basePermissions.High | existingRoleDefinition.BasePermissions.High,
            };

            await web.roleDefinitions.getByName(name).update({
                Description: description,
                BasePermissions: basePermissions
            });
        } catch {
            // no existing permission level exists with this name, so create a new one
            await web.roleDefinitions.add(name, description, 0, basePermissions);
        }
    }

    private _buildBasePermissions(permissions: PermissionKind[], basePerm?: IBasePermissions): IBasePermissions {
        const newPerm: IBasePermissions = {
            Low: basePerm ? basePerm.Low : 0,
            High: basePerm ? basePerm.High : 0
        };

        permissions.forEach(permission => {
            if (permission === PermissionKind.FullMask) {
                newPerm.Low = newPerm.High = 0xFFFFFFFF;
            } else if (permission === PermissionKind.EmptyMask) {
                // do nothing
            } else {
                const mask = 0x1 << (permission - 1);
                if (permission <= 32)
                    newPerm.Low |= mask;
                else // if (permission > 32)
                    newPerm.High |= mask;
            }
        });

        return newPerm;
    }

    private _retrieveLookupListId(web: IWeb, fieldDefinition: IFieldDefinition, batch: SPBatch): Promise<void> {
        if (fieldDefinition.type === FieldType.Lookup && !fieldDefinition[LookupListId]) {
            const list = web.lists.getByTitle(fieldDefinition.lookupListTitle);
            return list.inBatch(batch)().then(result => {
                fieldDefinition[LookupListId] = Guid.parse(result.Id);
            }, ErrorHandler.throw);
        }
    }

    private async _retrieveTaxonomyIds(web: IWeb, fieldDefinition: IFieldDefinition) {
        if (fieldDefinition.type === FieldType.Taxonomy) {
            const termStore = await sp.termStore();
            fieldDefinition[TermStoreId] = Guid.parse(termStore.id);

            let termGroupId = Guid.tryParse(fieldDefinition.termGroup);
            if (!termGroupId && !fieldDefinition[TermGroupId]) {
                const displayName = fieldDefinition.termGroup === 'sitecollection' ? siteCollectionTermGroupName((await web()).Url) : fieldDefinition.termGroup;
                const groups = sp.termStore.groups.filter(`DisplayName eq '${displayName}'`);
                const termGroups = await groups();
                termGroupId = Guid.parse(first(termGroups).id);
            }
            fieldDefinition[TermGroupId] = termGroupId;

            let termSetId = Guid.tryParse(fieldDefinition.termSet);
            if (!termSetId && !fieldDefinition[TermSetId]) {
                const sets = sp.termStore.groups.getById(termGroupId.toString()).sets;
                const termSets = await sets();
                termSetId = Guid.parse(find(termSets, ts => ts.localizedNames.some(ln => ln.name === fieldDefinition.termSet)).id);
            }
            fieldDefinition[TermSetId] = termSetId;

            if (fieldDefinition.anchorTerm) {
                let anchorTermId = Guid.tryParse(fieldDefinition.anchorTerm);
                if (!anchorTermId && !fieldDefinition[AnchorTermId]) {
                    const children = sp.termStore.groups.getById(termGroupId.toString()).sets.getById(termSetId.toString()).children;
                    const terms = await children();
                    anchorTermId = Guid.parse(find(terms, ts => ts.labels.some(l => l.name === fieldDefinition.anchorTerm)).id);
                }
                fieldDefinition[AnchorTermId] = anchorTermId;
            }

            if (fieldDefinition.default) {
                let defaultTermId = Guid.tryParse(fieldDefinition.default);
                let defaultTermLabel = fieldDefinition.default;
                if (!fieldDefinition[DefaultTerm]) {
                    const children = sp.termStore.groups.getById(termGroupId.toString()).sets.getById(termSetId.toString()).children;
                    const terms = await children();
                    if (defaultTermId)
                        defaultTermLabel = find(find(terms, ts => Guid.parse(ts.id).equals(defaultTermId)).labels, l => l.isDefault).name;
                    else
                        defaultTermId = Guid.parse(find(terms, ts => ts.labels.some(l => l.name === defaultTermLabel)).id);
                }
                fieldDefinition[DefaultTerm] = `-1;#${defaultTermLabel}|${defaultTermId.toString()}`;
            }
        }
    }
}