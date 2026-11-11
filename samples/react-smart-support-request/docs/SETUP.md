# Smart Support Request setup guide

See the [sample README](../README.md) for compatibility, contribution details, and SharePoint and local-preview demos.

A SharePoint Online SPFx web part with a mock IT support form and a browser WebMCP draft-filling tool. The ordinary form works without WebMCP, an extension, or an AI provider.

Generated with **SPFx 1.24.1** (latest stable npm release verified November 10, 2026), React **18.3.1**, and the Heft toolchain. Supported Node versions are 22.14+ in the 22.x line, 24.x, or 26.x. The installed Node 22.18.0 is supported.

## Run the local demo

From PowerShell:

```powershell
Set-Location .\samples\react-smart-support-request
npm ci
npm run preview
```

Open `http://127.0.0.1:5173` in Edge. This Vite development harness renders the **same React component** as the SPFx web part; it is not a SharePoint runtime or a replacement for testing on SharePoint.

Use **Load sample draft**, or enter fictional details manually. Select **Review request**, inspect the summary, confirm the review checkbox, and select **Submit mock request**. The resulting `MOCK-...` receipt exists only in React memory.

## Safety and scope

- There are no SharePoint list, Graph, ticketing, email, or Teams API calls. The web part requests no API permissions.
- Drafts and receipts are not saved to local storage, cookies, or a backend. Reloading or removing the web part discards them.
- No AI SDK, API key, natural-language parser, or provider call is embedded in the web part. **The Explorer agent translates natural language into structured tool arguments.** The sample button is deterministic mock data, not AI.
- Agent calls update visible fields only. Review and submission are separate page controls; neither is exposed as a tool. Any draft change resets review, including an agent update while reviewing.
- This is a cooperative review workflow, not a security barrier against agents that can also operate arbitrary page controls.
- Explorer may send prompts, tool metadata, and tool results to the provider configured in the extension. Use fictional information, never passwords or confidential support details. Keep provider credentials in Explorer, not this project.

## Test with Edge and WebMCP Explorer

Follow these steps in order. **No SharePoint list, OpenAI key, GitHub Copilot subscription, or paid AI provider is required for the local Ollama route.** You need Node.js supported by this project, Git, an up-to-date Edge build with the WebMCP testing flag, and enough disk space for Ollama plus the model download.

### 1. Enable WebMCP in Edge

Use an up-to-date **Edge Canary or Dev** build as recommended by the [WebMCP Labs instructions](https://github.com/MicrosoftEdge/webmcp-labs#test-webmcp-in-edge). A different Edge channel can also work if it exposes the testing flag and API; the installed Edge version used for verification is recorded below.

Open `edge://flags/#enable-webmcp-testing`, set **WebMCP for testing** to **Enabled**, and restart Edge. Use this same Edge profile for the extension and the form.

**Copilot in Edge does not currently offer public WebMCP integration.** Use WebMCP Explorer, not the built-in Copilot sidebar.

### 2. Install WebMCP Explorer

Clone the official [WebMCP Labs repository](https://github.com/MicrosoftEdge/webmcp-labs) into a separate folder, not into the SPFx source:

```powershell
git clone https://github.com/MicrosoftEdge/webmcp-labs.git C:\Dev\webmcp-labs
```

In `edge://extensions`, turn on **Developer mode**, choose **Load unpacked**, and select:

```text
C:\Dev\webmcp-labs\webmcp-explorer\dist
```

Keep that folder on disk; Edge loads the unpacked extension from it. Pin **WebMCP Explorer** to the toolbar if desired. Copy its **32-letter extension ID** from `edge://extensions`; you will need it for Ollama. This ID is not a secret or API key.

In the extension's **Details**, allow site access to the trusted local demo and SharePoint site you are testing, if Edge requests it. If Edge prompts for local-network access when Explorer connects to Ollama, allow it for the trusted extension. Do not disable browser security or grant access to unrelated sites.

### 3. Install Ollama and a local tool-calling model

Install Ollama from [ollama.com](https://ollama.com/download/windows), or use its official PowerShell installer:

```powershell
irm https://ollama.com/install.ps1 | iex
```

This executes a downloaded script; use only the official URL and review it first if required by your environment. Open a new PowerShell window after installation so the `ollama` command is available on PATH.

With Ollama running, download the model:

```powershell
ollama pull qwen3:4b
ollama list
```

`qwen3:4b` supports tool calling and downloads approximately **2.5 GB**. It runs locally without a provider API key or cloud API charges. Performance depends on your CPU/GPU, and the first request can take longer while the model loads. Not every chat model supports tool calling.

### 4. Allow the Explorer extension to call Ollama

**This is required even if Ollama works from PowerShell.** Without it, Explorer can report **Connection failed: 403 status code (no body)** because Ollama rejects the extension's browser origin.

Quit Ollama from its Windows tray icon first. In PowerShell, paste the following and enter the Explorer extension ID copied in step 2:

```powershell
$extensionId = (Read-Host "Paste the WebMCP Explorer extension ID").Trim()
if ($extensionId -notmatch '^[a-p]{32}$') {
    throw "Enter the 32-letter extension ID from edge://extensions."
}

$origin = "chrome-extension://$extensionId"
$existing = [Environment]::GetEnvironmentVariable('OLLAMA_ORIGINS', 'User')
$allowedOrigins = @($existing -split ',' | Where-Object { $_ })
if ($origin -notin $allowedOrigins) {
    $allowedOrigins += $origin
}

[Environment]::SetEnvironmentVariable(
    'OLLAMA_ORIGINS', ($allowedOrigins -join ','), 'User'
)
$env:OLLAMA_ORIGINS = [Environment]::GetEnvironmentVariable('OLLAMA_ORIGINS', 'User')

& "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" serve
```

Leave that PowerShell window open while testing. The last command starts the local API with the updated environment immediately. The user environment variable also persists for future Ollama launches, but **changing it does not update an already-running server**. If the command reports that port 11434 is already in use, an Ollama server is still running; quit that instance and restart it with the updated environment instead of starting another server.

Allow only your Explorer extension, not `*` or `chrome-extension://*`. Keep Ollama bound to its default `127.0.0.1`; exposing it on the network is not needed. If you move or reinstall an unpacked extension, check its ID again and update the allowlist if it changed.

From a second PowerShell window, check the API and extension-origin permission:

```powershell
Invoke-RestMethod http://localhost:11434/api/version

$extensionId = (Read-Host "Paste the WebMCP Explorer extension ID").Trim()
$response = Invoke-WebRequest `
    -Uri http://localhost:11434/v1/models `
    -Headers @{ Origin = "chrome-extension://$extensionId" }
$response.StatusCode
```

The version request should return a version, and the origin-aware request should return **200**. A version request alone does not prove browser-extension access works. See the [Ollama origin configuration](https://docs.ollama.com/faq#how-can-i-allow-additional-web-origins-to-access-ollama).

### 5. Configure the provider in Explorer

Start the local demo with `npm run preview` in another terminal, then open `http://127.0.0.1:5173` in the configured Edge profile. Alternatively, open the SharePoint page containing the web part after following **Run in SharePoint** below.

Open **WebMCP Explorer** from the Edge toolbar, select **Config**, and enter:

| Setting | Value |
|---|---|
| Provider | Chat Completions API |
| Base URL | `http://localhost:11434/v1` |
| API key | Leave blank |
| Model | `qwen3:4b` |

Select **Save**, then **Test Connection**. Expect **Connection successful!** Explorer checks both connectivity and local-model tool calling.

Other supported options include Azure OpenAI, OpenAI, and Anthropic with their own credentials and billing. A GitHub Copilot subscription is not an API key for these providers. Never put a provider key in the web part, support form, or source code.

### 6. Test draft filling and human review

1. Keep the form's browser tab active and open Explorer's **Tools** tab. Find `fill_support_request_local-demo`. On SharePoint, the suffix is the web part's instance ID rather than `local-demo`.
2. Confirm the form shows **WebMCP ready via document.modelContext**. First execute the tool using the example JSON below; this separates tool registration and field updates from model behavior.
3. Confirm the visible form updates and **no receipt exists**. Only draft filling should be exposed; there is no submit tool.
4. Clear the draft. In Explorer's **Chat** or **Agent** tab, enter: "On my demo laptop, VPN disconnects during Teams calls. I work remotely and this blocks my work. I already tried restarting. Contact me in Teams. Fill the support draft, but do not submit it."
5. Check the generated title and description, Network category, High urgency, Remote location, and Teams contact preference. A device name should not be invented. Model output can vary; inspect and correct it yourself.
6. Select **Review request** on the page, inspect the summary, confirm the review checkbox, and explicitly select **Submit mock request**. Expect an in-memory `MOCK-...` receipt, not a real IT ticket.
7. Check that changing any draft field, including through the tool during review, requires review again. Reload to confirm the draft and receipt disappear.
8. Disable the WebMCP flag and restart Edge to verify manual entry and **Load sample draft** still work. Re-enable the flag and restart before further agent tests.

### Troubleshooting

| Symptom | Check or action |
|---|---|
| `403 status code (no body)` | Add the **actual Explorer extension ID** to `OLLAMA_ORIGINS`, then restart the Ollama server. A successful PowerShell call without an `Origin` header is not sufficient. |
| Connection refused or unavailable | Keep Ollama running and check `http://localhost:11434/api/version`. Confirm the base URL ends in `/v1`, not `/api` or `/v1/chat/completions`. |
| Model not found | Run `ollama pull qwen3:4b`; enter the exact same model name in Explorer. |
| Connected, but model did not use tool calling | Confirm the selected model supports tools. The verified model is `qwen3:4b`; plain chat success is not a tool-calling check. |
| Slow initial response | Allow time for model loading and local inference. Qwen3 can also spend time reasoning before returning a tool call. |
| Manual mode / API unavailable | Enable the testing flag in the Edge profile you are actually using, restart Edge, and reload the page. The embedded app preview may not expose WebMCP even when standalone Edge does. |
| Explorer shows no tools | Activate the tab containing the form, check extension site access, and reload after enabling the flag or installing the extension. For SharePoint, confirm the web part loaded and check the frame hosting it. |
| Port 11434 already in use | Ollama is already serving. Do not launch a second server; restart the existing one if its origin settings need to change. |

The browser flag, extension site access, and Ollama origin allowlist are **separate permissions**. No SharePoint list or Graph API consent is needed for this mock form. Deploying the `.sppkg` still requires appropriate SharePoint app-catalog permissions.

### Example tool arguments

```json
{
  "title": "VPN disconnects during Teams calls",
  "description": "On my demo laptop the VPN disconnects during Teams calls. It blocks my work. I tried restarting.",
  "category": "Network",
  "urgency": "High",
  "impact": "Just me",
  "location": "Remote",
  "contactMethod": "Teams"
}
```

### Tool contract

`fill_support_request_<instanceId>` accepts a nonempty object containing any subset of `title`, `description`, `category`, `urgency`, `impact`, `device`, `location`, and `contactMethod`. Limits and enum choices appear in the tool's JSON Schema and the form. Unknown fields, invalid types, unsupported enum values, whitespace-only required values, and overlong strings are rejected **atomically** at runtime. Omitted fields are preserved. Empty `device` or `location` clears that optional field.

The tool returns an MCP-style text content result containing JSON:

```json
{
  "status": "draft_updated",
  "submitted": false,
  "requiresHumanReview": true,
  "changedFields": ["title", "description"],
  "missingRequiredFields": []
}
```

Validation errors return `isError: true` and `updated: false`, and are shown in the page. Registration errors also appear in the page without disabling manual entry.

The integration prefers the current `document.modelContext` API and supports the earlier `navigator.modelContext` experimental location. Current Edge unregisters tools through the registration's `AbortSignal`; older implementations use `unregisterTool(name)`. No polyfill pretends native WebMCP exists. Each web part uses a unique tool name and unregisters only its own tool on unmount. WebMCP is experimental; browser behavior may change.

## Build and test

```powershell
npm run build
npm run test:e2e
```

`build` runs the SPFx production checks, bundles assets, and packages:

```text
sharepoint\solution\smart-support-request.sppkg
```

The Playwright suite uses the installed **Microsoft Edge** channel with the WebMCP testing features enabled. It covers the manual-only workflow, mock-only submission with no outbound requests, atomic tool validation, partial updates, mandatory review, review invalidation, registration failure, and responsive layout. Native tests discover and execute the real tool and verify that unmounting one of two instances unregisters only its tool. Other protocol edge-case tests inject an explicitly labelled **test host**, not a production polyfill.

Source verification used Edge **157.0.4341.42** with WebMCP testing features enabled. The official WebMCP Explorer extension was loaded in an isolated profile, and its real content-script bridge discovered and executed the draft tool. Local Ollama `qwen3:4b` tool calling and exact-extension origin requests were verified, including successful CORS preflight and rejection of an unrelated extension origin.

The contributor confirmed that the web part works on SharePoint and supplied the SharePoint screenshot and recording linked from the [sample README](../README.md). Independently captured local-preview media uses native Edge WebMCP and actual model-generated arguments, with automated page actions for review and mock submission; it is not an Explorer Chat recording. The automated browser suite exercises the standalone preview, not an authenticated SharePoint tenant. Teams, full-page hosting, and remote containers have not been verified.

## Run in SharePoint

1. Create a modern development page, e.g. `/sites/dev/SitePages/SmartSupport.aspx`. Update `config\serve.json` to your actual page path. If using the optional VS Code launch configuration, replace its example tenant and page URL in `.vscode\launch.json` too. The deprecated Online workbench is not used.
2. Trust the SPFx development certificate once, then start the SPFx development server:

   ```powershell
   npx heft trust-dev-cert
   $env:SPFX_SERVE_TENANT_DOMAIN = "yourtenant.sharepoint.com"
   npm start
   ```

3. Enable local debugging on that page using the [SPFx modern-page debugging instructions](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/debug-modern-pages). Accept **Load debug scripts** only for your trusted local server and add **Smart Support Request** using the page toolbox.
4. Repeat the Explorer test in Edge. Add two web part instances to verify distinct tool names. Remove one and confirm only its tool disappears.
5. For deployment, upload the production `.sppkg` to your tenant or site app catalog and approve deployment. Add the web part to a modern page. The packaged solution includes its client-side assets.

No authenticated SharePoint session or cloud AI provider credentials are included. The contributor-supplied SharePoint recording retains its original visible URL with permission; the primary PNG obscures its address-bar URL. Configuration files use example tenant URLs that must be replaced with your own. Interactive SharePoint checks require your tenant; Explorer can use the local Ollama setup documented above.

## Source map

| Path | Purpose |
|---|---|
| `src\webparts\smartSupportRequest\SmartSupportRequestWebPart.ts` | SPFx React root, instance identity, theme, disposal |
| `src\webparts\smartSupportRequest\components\SmartSupportRequest.tsx` | Form, review, mock receipt, tool lifecycle |
| `src\webparts\smartSupportRequest\supportModel.ts` | Mock data, schema, runtime validation |
| `src\webparts\smartSupportRequest\webMcp.ts` | Feature detection and minimal experimental API types |
| `preview\main.tsx` | Tenant-free local harness |
| `tests\support.spec.ts` | Edge browser regression tests |

References: [SPFx 1.24.1 release notes](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.24.1), [WebMCP proposal](https://github.com/webmachinelearning/webmcp), [Explorer provider setup](https://github.com/MicrosoftEdge/webmcp-labs/tree/main/webmcp-explorer#provider-setup).
