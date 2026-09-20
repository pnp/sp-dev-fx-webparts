# Dynamic Poll list setup

`create-poll-lists.js` provisions the two SharePoint lists needed by the React
Dynamic Poll web part in the site currently open in SPEditor.

## Run it

1. Open the target SharePoint site in Edge.
2. Copy the complete contents of `create-poll-lists.js` into SPEditor's JavaScript
   editor.
3. Run it with <kbd>Ctrl</kbd>+<kbd>D</kbd> (or <kbd>Cmd</kbd>+<kbd>D</kbd>).
4. Read the browser console for the result.

The script imports PnP JS using SPEditor's supported module loader and binds to
the currently open site's URL. The account running it needs SharePoint's
**Manage Lists** permission; this is checked before making changes.

## What it creates

If absent, the script creates these empty lists:

| List | Columns beyond the default `Title` column |
| --- | --- |
| `Polls` | `Question` (single line text, required); `Options` (required multi-select Choice, initially no choices, with manual entry enabled); `StartDate` and `EndDate` (required date and time); `IsActive` (required Yes/No, default No) |
| `Poll Answers` | `Poll` (required lookup to `Polls` ID, restrict deletion); `Answer` (required single line text) |

`Poll Answers.Title` remains the default Title field and is used by the web part
to store the voter email address.

Existing `Polls` and `Poll Answers` lists are deliberately left untouched; the
script neither validates nor repairs their schema. If a failure leaves a
partially provisioned list, remove that empty list manually before re-running
the script.

## Recovery after a failed earlier run

The `Poll` lookup is created, indexed, and only then configured with its
restricted-delete relationship. This order is required by SharePoint.

If an earlier version of this script failed with “This lookup field cannot
enforce a relationship behavior because it is not indexed”, it will have left
an incomplete `Poll Answers` list behind. Delete that empty, incomplete list
from **Site contents**, then run the corrected script. This manual step is
intentional: the script never modifies or deletes an existing list.

If `Polls` was created by an earlier script, edit its `Options` column from
**List settings**, enable both **Allow multiple selections** and **Can add
values manually**, or delete the empty list and run the corrected script.
