/* Hit Ctrl+D (or Cmd+D) in SPEditor to run. Check the browser console. */
import { spfi, SPBrowser } from "@pnp/sp/presets/all";

const sp = spfi().using(
  SPBrowser({ baseUrl: window._spPageContextInfo.webAbsoluteUrl }),
);

(async () => {
  "use strict";

  const POLLS_LIST = "Polls";
  const ANSWERS_LIST = "Poll Answers";
  const LIST_TEMPLATE_GENERIC_LIST = 100;
  const RESTRICT_DELETE_BEHAVIOR = 2;
  // SharePoint's PermissionKind.ManageLists enum value.
  const MANAGE_LISTS_PERMISSION = 12;
  const created = [];
  const existing = [];

  const log = (...args) => console.log("[Dynamic Poll setup]", ...args);
  const fail = (message, cause) => {
    console.error("[Dynamic Poll setup] " + message, cause || "");
    throw new Error(message);
  };

  async function getListIfItExists(sp, title) {
    try {
      return await sp.web.lists.getByTitle(title).select("Id", "Title")();
    } catch (error) {
      const status = error && (error.status || error.statusCode);
      if (status === 404) {
        return undefined;
      }
      throw error;
    }
  }

  async function requireManageListsPermission(sp) {
    if (typeof sp.web.currentUserHasPermissions !== "function") {
      fail(
        "The loaded PnP JS build cannot check Manage Lists permission. Load the full PnP JS library and retry.",
      );
    }

    const canManageLists = await sp.web.currentUserHasPermissions(
      MANAGE_LISTS_PERMISSION,
    );
    if (!canManageLists) {
      fail(
        "You need the SharePoint 'Manage Lists' permission on this site to run this setup.",
      );
    }
  }

  async function createPollsList(sp) {
    const listInfo = await sp.web.lists.add(
      POLLS_LIST,
      "Stores poll questions and their active periods.",
      LIST_TEMPLATE_GENERIC_LIST,
      false,
    );
    const list = sp.web.lists.getById(listInfo.Id);

    await list.fields.createFieldAsXml(
      '<Field Type="Text" DisplayName="Question" Name="Question" Required="TRUE" />',
    );
    await list.fields.createFieldAsXml(
      '<Field Type="MultiChoice" DisplayName="Options" Name="Options" Required="TRUE" Mult="TRUE" FillInChoice="TRUE" Format="Checkboxes"><CHOICES /></Field>',
    );
    await list.fields.createFieldAsXml(
      '<Field Type="DateTime" DisplayName="StartDate" Name="StartDate" Required="TRUE" Format="0" />',
    );
    await list.fields.createFieldAsXml(
      '<Field Type="DateTime" DisplayName="EndDate" Name="EndDate" Required="TRUE" Format="0" />',
    );
    await list.fields.createFieldAsXml(
      '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive" Required="TRUE" Default="0" />',
    );

    created.push(POLLS_LIST);
    return { Id: listInfo.Id };
  }

  async function createAnswersList(sp, pollsId) {
    const listInfo = await sp.web.lists.add(
      ANSWERS_LIST,
      "Stores votes for poll questions.",
      LIST_TEMPLATE_GENERIC_LIST,
      false,
    );
    const list = sp.web.lists.getById(listInfo.Id);
    const pollsGuid = String(pollsId).replace(/[{}]/g, "");

    const pollFieldInfo = await list.fields.createFieldAsXml(
      `<Field Type="Lookup" DisplayName="Poll" Name="Poll" List="{${pollsGuid}}" ShowField="ID" Required="TRUE" />`,
    );
    const pollField = list.fields.getById(pollFieldInfo.Id);

    // SharePoint requires an indexed lookup before it can enforce Restrict.
    await pollField.update({ Indexed: true });
    await pollField.update({
      IsRelationship: true,
      RelationshipDeleteBehavior: RESTRICT_DELETE_BEHAVIOR,
    });
    await list.fields.createFieldAsXml(
      '<Field Type="Text" DisplayName="Answer" Name="Answer" Required="TRUE" />',
    );

    created.push(ANSWERS_LIST);
  }

  try {
    await requireManageListsPermission(sp);

    let polls = await getListIfItExists(sp, POLLS_LIST);
    if (polls) {
      existing.push(POLLS_LIST);
      log(`'${POLLS_LIST}' already exists; leaving it untouched.`);
    } else {
      log(`Creating '${POLLS_LIST}'...`);
      polls = await createPollsList(sp);
    }

    const answers = await getListIfItExists(sp, ANSWERS_LIST);
    if (answers) {
      existing.push(ANSWERS_LIST);
      log(`'${ANSWERS_LIST}' already exists; leaving it untouched.`);
    } else {
      log(`Creating '${ANSWERS_LIST}'...`);
      await createAnswersList(sp, polls.Id);
    }

    log("Setup complete.", {
      created: created.length ? created : "none",
      alreadyExisted: existing.length ? existing : "none",
    });
  } catch (error) {
    console.error("[Dynamic Poll setup] Setup did not finish.", {
      created: created.length ? created : "none",
      alreadyExisted: existing.length ? existing : "none",
      error,
    });
    throw error;
  }
})();
