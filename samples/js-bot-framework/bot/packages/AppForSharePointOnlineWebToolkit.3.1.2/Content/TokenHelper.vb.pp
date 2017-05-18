Imports Microsoft.IdentityModel
Imports Microsoft.IdentityModel.S2S.Protocols.OAuth2
Imports Microsoft.IdentityModel.S2S.Tokens
Imports Microsoft.SharePoint.Client
Imports Microsoft.SharePoint.Client.EventReceivers
Imports System
Imports System.Collections.Generic
Imports System.Collections.ObjectModel
Imports System.Globalization
Imports System.IdentityModel.Selectors
Imports System.IdentityModel.Tokens
Imports System.IO
Imports System.Linq
Imports System.Net
Imports System.Security.Cryptography.X509Certificates
Imports System.Security.Principal
Imports System.ServiceModel
Imports System.Text
Imports System.Web
Imports System.Web.Configuration
Imports System.Web.Script.Serialization
Imports AudienceRestriction = Microsoft.IdentityModel.Tokens.AudienceRestriction
Imports AudienceUriValidationFailedException = Microsoft.IdentityModel.Tokens.AudienceUriValidationFailedException
Imports SecurityTokenHandlerConfiguration = Microsoft.IdentityModel.Tokens.SecurityTokenHandlerConfiguration
Imports X509SigningCredentials = Microsoft.IdentityModel.SecurityTokenService.X509SigningCredentials

Public NotInheritable Class TokenHelper

#Region "public fields"

    ''' <summary>
    ''' SharePoint principal.
    ''' </summary>
    Public Const SharePointPrincipal As String = "00000003-0000-0ff1-ce00-000000000000"

    ''' <summary>
    ''' Lifetime of HighTrust access token, 12 hours.
    ''' </summary>
    Public Shared ReadOnly HighTrustAccessTokenLifetime As TimeSpan = TimeSpan.FromHours(12.0)

#End Region

#Region "public methods"

    ''' <summary>
    ''' Retrieves the context token string from the specified request by looking for well-known parameter names in the 
    ''' POSTed form parameters and the querystring. Returns Nothing if no context token is found.
    ''' </summary>
    ''' <param name="request">HttpRequest in which to look for a context token</param>
    ''' <returns>The context token string</returns>
    Public Shared Function GetContextTokenFromRequest(request As HttpRequest) As String
        Return GetContextTokenFromRequest(New HttpRequestWrapper(request))
    End Function

    ''' <summary>
    ''' Retrieves the context token string from the specified request by looking for well-known parameter names in the 
    ''' POSTed form parameters and the querystring. Returns Nothing if no context token is found.
    ''' </summary>
    ''' <param name="request">HttpRequest in which to look for a context token</param>
    ''' <returns>The context token string</returns>
    Public Shared Function GetContextTokenFromRequest(request As HttpRequestBase) As String
        Dim paramNames As String() = {"AppContext", "AppContextToken", "AccessToken", "SPAppToken"}
        For Each paramName As String In paramNames
            If Not String.IsNullOrEmpty(request.Form(paramName)) Then
                Return request.Form(paramName)
            End If
            If Not String.IsNullOrEmpty(request.QueryString(paramName)) Then
                Return request.QueryString(paramName)
            End If
        Next
        Return Nothing
    End Function

    ''' <summary>
    ''' Validate that a specified context token string is intended for this application based on the parameters 
    ''' specified in web.config. Parameters used from web.config used for validation include ClientId, 
    ''' HostedAppHostNameOverride, HostedAppHostName, ClientSecret, and Realm (if it is specified). If HostedAppHostNameOverride is present,
    ''' it will be used for validation. Otherwise, if the <paramref name="appHostName"/> is not 
    ''' Nothing, it is used for validation instead of the web.config's HostedAppHostName. If the token is invalid, an 
    ''' exception is thrown. If the token is valid, TokenHelper's static STS metadata url is updated based on the token contents
    ''' and a JsonWebSecurityToken based on the context token is returned.
    ''' </summary>
    ''' <param name="contextTokenString">The context token to validate</param>
    ''' <param name="appHostName">The URL authority, consisting of  Domain Name System (DNS) host name or IP address and the port number, to use for token audience validation.
    ''' If Nothing, HostedAppHostName web.config setting is used instead. HostedAppHostNameOverride web.config setting, if present, will be used 
    ''' for validation instead of <paramref name="appHostName"/> .</param>
    ''' <returns>A JsonWebSecurityToken based on the context token.</returns>
    Public Shared Function ReadAndValidateContextToken(contextTokenString As String, Optional appHostName As String = Nothing) As SharePointContextToken
        Dim tokenHandler As JsonWebSecurityTokenHandler = CreateJsonWebSecurityTokenHandler()
        Dim securityToken As SecurityToken = tokenHandler.ReadToken(contextTokenString)
        Dim jsonToken As JsonWebSecurityToken = TryCast(securityToken, JsonWebSecurityToken)
        Dim token As SharePointContextToken = SharePointContextToken.Create(jsonToken)

        Dim stsAuthority As String = (New Uri(token.SecurityTokenServiceUri)).Authority
        Dim firstDot As Integer = stsAuthority.IndexOf("."c)

        GlobalEndPointPrefix = stsAuthority.Substring(0, firstDot)
        AcsHostUrl = stsAuthority.Substring(firstDot + 1)

        tokenHandler.ValidateToken(jsonToken)

        Dim acceptableAudiences As String()
        If Not [String].IsNullOrEmpty(HostedAppHostNameOverride) Then
            acceptableAudiences = HostedAppHostNameOverride.Split(";"c)
        ElseIf appHostName Is Nothing Then
            acceptableAudiences = {HostedAppHostName}
        Else
            acceptableAudiences = {appHostName}
        End If

        Dim validationSuccessful As Boolean
        Dim definedRealm As String = If(Realm, token.Realm)
        For Each audience In acceptableAudiences
            Dim principal As String = GetFormattedPrincipal(ClientId, audience, definedRealm)
            If StringComparer.OrdinalIgnoreCase.Equals(token.Audience, principal) Then
                validationSuccessful = True
                Exit For
            End If
        Next

        If Not validationSuccessful Then
            Throw New AudienceUriValidationFailedException([String].Format(CultureInfo.CurrentCulture, """{0}"" is not the intended audience ""{1}""", [String].Join(";", acceptableAudiences), token.Audience))
        End If

        Return token
    End Function

    ''' <summary>
    ''' Retrieves an access token from ACS to call the source of the specified context token at the specified 
    ''' targetHost. The targetHost must be registered for the principal that sent the context token.
    ''' </summary>
    ''' <param name="contextToken">Context token issued by the intended access token audience</param>
    ''' <param name="targetHost">Url authority of the target principal</param>
    ''' <returns>An access token with an audience matching the context token's source</returns>
    Public Shared Function GetAccessToken(contextToken As SharePointContextToken, targetHost As String) As OAuth2AccessTokenResponse

        Dim targetPrincipalName As String = contextToken.TargetPrincipalName

        ' Extract the refreshToken from the context token
        Dim refreshToken As String = contextToken.RefreshToken

        If [String].IsNullOrEmpty(refreshToken) Then
            Return Nothing
        End If

        Dim targetRealm As String = If(Realm, contextToken.Realm)

        Return GetAccessToken(refreshToken, targetPrincipalName, targetHost, targetRealm)
    End Function

    ''' <summary>
    ''' Uses the specified authorization code to retrieve an access token from ACS to call the specified principal 
    ''' at the specified targetHost. The targetHost must be registered for target principal.  If specified realm is 
    ''' Nothing, the "Realm" setting in web.config will be used instead.
    ''' </summary>
    ''' <param name="authorizationCode">Authorization code to exchange for access token</param>
    ''' <param name="targetPrincipalName">Name of the target principal to retrieve an access token for</param>
    ''' <param name="targetHost">Url authority of the target principal</param>
    ''' <param name="targetRealm">Realm to use for the access token's nameid and audience</param>
    ''' <param name="redirectUri">Redirect URI registerd for this app</param>
    ''' <returns>An access token with an audience of the target principal</returns>
    Public Shared Function GetAccessToken(authorizationCode As String, targetPrincipalName As String, targetHost As String, targetRealm As String, redirectUri As Uri) As OAuth2AccessTokenResponse

        If targetRealm Is Nothing Then
            targetRealm = Realm
        End If

        Dim resource As String = GetFormattedPrincipal(targetPrincipalName, targetHost, targetRealm)
        Dim formattedClientId As String = GetFormattedPrincipal(ClientId, Nothing, targetRealm)

        ' Create request for token. The RedirectUri is Nothing here.  This will fail if redirect uri is registered
        Dim oauth2Request As OAuth2AccessTokenRequest = OAuth2MessageFactory.CreateAccessTokenRequestWithAuthorizationCode(formattedClientId, ClientSecret, authorizationCode, redirectUri, resource)

        ' Get token
        Dim client As New OAuth2S2SClient()
        Dim oauth2Response As OAuth2AccessTokenResponse
        Try
            oauth2Response = TryCast(client.Issue(AcsMetadataParser.GetStsUrl(targetRealm), oauth2Request), OAuth2AccessTokenResponse)
        Catch ex As WebException
            Using sr As New StreamReader(ex.Response.GetResponseStream())
                Dim responseText As String = sr.ReadToEnd()
                Throw New WebException(ex.Message + " - " + responseText, ex)
            End Using
        End Try

        Return oauth2Response
    End Function

    ''' <summary>
    ''' Uses the specified refresh token to retrieve an access token from ACS to call the specified principal 
    ''' at the specified targetHost. The targetHost must be registered for target principal.  If specified realm is 
    ''' Nothing, the "Realm" setting in web.config will be used instead.
    ''' </summary>
    ''' <param name="refreshToken">Refresh token to exchange for access token</param>
    ''' <param name="targetPrincipalName">Name of the target principal to retrieve an access token for</param>
    ''' <param name="targetHost">Url authority of the target principal</param>
    ''' <param name="targetRealm">Realm to use for the access token's nameid and audience</param>
    ''' <returns>An access token with an audience of the target principal</returns>
    Public Shared Function GetAccessToken(refreshToken As String, targetPrincipalName As String, targetHost As String, targetRealm As String) As OAuth2AccessTokenResponse

        If targetRealm Is Nothing Then
            targetRealm = Realm
        End If

        Dim resource As String = GetFormattedPrincipal(targetPrincipalName, targetHost, targetRealm)
        Dim formattedClientId As String = GetFormattedPrincipal(ClientId, Nothing, targetRealm)

        Dim oauth2Request As OAuth2AccessTokenRequest = OAuth2MessageFactory.CreateAccessTokenRequestWithRefreshToken(formattedClientId, ClientSecret, refreshToken, resource)

        ' Get token
        Dim client As New OAuth2S2SClient()
        Dim oauth2Response As OAuth2AccessTokenResponse
        Try
            oauth2Response = TryCast(client.Issue(AcsMetadataParser.GetStsUrl(targetRealm), oauth2Request), OAuth2AccessTokenResponse)
        Catch wex As WebException
            Using sr As New StreamReader(wex.Response.GetResponseStream())
                Dim responseText As String = sr.ReadToEnd()
                Throw New WebException(wex.Message + " - " & responseText, wex)
            End Using
        End Try

        Return oauth2Response
    End Function

    ''' <summary>
    ''' Retrieves an app-only access token from ACS to call the specified principal 
    ''' at the specified targetHost. The targetHost must be registered for target principal.  If specified realm is 
    ''' Nothing, the "Realm" setting in web.config will be used instead.
    ''' </summary>
    ''' <param name="targetPrincipalName">Name of the target principal to retrieve an access token for</param>
    ''' <param name="targetHost">Url authority of the target principal</param>
    ''' <param name="targetRealm">Realm to use for the access token's nameid and audience</param>
    ''' <returns>An access token with an audience of the target principal</returns>
    Public Shared Function GetAppOnlyAccessToken(targetPrincipalName As String, targetHost As String, targetRealm As String) As OAuth2AccessTokenResponse

        If targetRealm Is Nothing Then
            targetRealm = Realm
        End If

        Dim resource As String = GetFormattedPrincipal(targetPrincipalName, targetHost, targetRealm)
        Dim formattedClientId As String = GetFormattedPrincipal(ClientId, HostedAppHostName, targetRealm)

        Dim oauth2Request As OAuth2AccessTokenRequest = OAuth2MessageFactory.CreateAccessTokenRequestWithClientCredentials(formattedClientId, ClientSecret, resource)
        oauth2Request.Resource = resource

        ' Get token
        Dim client As New OAuth2S2SClient()

        Dim oauth2Response As OAuth2AccessTokenResponse
        Try
            oauth2Response = TryCast(client.Issue(AcsMetadataParser.GetStsUrl(targetRealm), oauth2Request), OAuth2AccessTokenResponse)
        Catch wex As WebException
            Using sr As New StreamReader(wex.Response.GetResponseStream())
                Dim responseText As String = sr.ReadToEnd()
                Throw New WebException(wex.Message + " - " & responseText, wex)
            End Using
        End Try

        Return oauth2Response
    End Function

    ''' <summary>
    ''' Creates a client context based on the properties of a remote event receiver
    ''' </summary>
    ''' <param name="properties">Properties of a remote event receiver</param>
    ''' <returns>A ClientContext ready to call the web where the event originated</returns>
    Public Shared Function CreateRemoteEventReceiverClientContext(properties As SPRemoteEventProperties) As ClientContext
        Dim sharepointUrl As Uri
        If properties.ListEventProperties IsNot Nothing Then
            sharepointUrl = New Uri(properties.ListEventProperties.WebUrl)
        ElseIf properties.ItemEventProperties IsNot Nothing Then
            sharepointUrl = New Uri(properties.ItemEventProperties.WebUrl)
        ElseIf properties.WebEventProperties IsNot Nothing Then
            sharepointUrl = New Uri(properties.WebEventProperties.FullUrl)
        Else
            Return Nothing
        End If

        If IsHighTrustApp() Then
            Return GetS2SClientContextWithWindowsIdentity(sharepointUrl, Nothing)
        End If

        Return CreateAcsClientContextForUrl(properties, sharepointUrl)

    End Function

    ''' <summary>
    ''' Creates a client context based on the properties of an app event
    ''' </summary>
    ''' <param name="properties">Properties of an app event</param>
    ''' <param name="useAppWeb">True to target the app web, false to target the host web</param>
    ''' <returns>A ClientContext ready to call the app web or the parent web</returns>
    Public Shared Function CreateAppEventClientContext(properties As SPRemoteEventProperties, useAppWeb As Boolean) As ClientContext
        If properties.AppEventProperties Is Nothing Then
            Return Nothing
        End If

        Dim sharepointUrl As Uri = If(useAppWeb, properties.AppEventProperties.AppWebFullUrl, properties.AppEventProperties.HostWebFullUrl)
        If IsHighTrustApp() Then
            Return GetS2SClientContextWithWindowsIdentity(sharepointUrl, Nothing)
        End If

        Return CreateAcsClientContextForUrl(properties, sharepointUrl)
    End Function

    ''' <summary>
    ''' Retrieves an access token from ACS using the specified authorization code, and uses that access token to 
    ''' create a client context
    ''' </summary>
    ''' <param name="targetUrl">Url of the target SharePoint site</param>
    ''' <param name="authorizationCode">Authorization code to use when retrieving the access token from ACS</param>
    ''' <param name="redirectUri">Redirect URI registerd for this app</param>
    ''' <returns>A ClientContext ready to call targetUrl with a valid access token</returns>
    Public Shared Function GetClientContextWithAuthorizationCode(targetUrl As String, authorizationCode As String, redirectUri As Uri) As ClientContext
        Return GetClientContextWithAuthorizationCode(targetUrl, SharePointPrincipal, authorizationCode, GetRealmFromTargetUrl(New Uri(targetUrl)), redirectUri)
    End Function

    ''' <summary>
    ''' Retrieves an access token from ACS using the specified authorization code, and uses that access token to 
    ''' create a client context
    ''' </summary>
    ''' <param name="targetUrl">Url of the target SharePoint site</param>
    ''' <param name="targetPrincipalName">Name of the target SharePoint principal</param>
    ''' <param name="authorizationCode">Authorization code to use when retrieving the access token from ACS</param>
    ''' <param name="targetRealm">Realm to use for the access token's nameid and audience</param>
    ''' <param name="redirectUri">Redirect URI registerd for this app</param>
    ''' <returns>A ClientContext ready to call targetUrl with a valid access token</returns>
    Public Shared Function GetClientContextWithAuthorizationCode(targetUrl As String, targetPrincipalName As String, authorizationCode As String, targetRealm As String, redirectUri As Uri) As ClientContext
        Dim targetUri As New Uri(targetUrl)

        Dim accessToken As String = GetAccessToken(authorizationCode, targetPrincipalName, targetUri.Authority, targetRealm, redirectUri).AccessToken

        Return GetClientContextWithAccessToken(targetUrl, accessToken)
    End Function

    ''' <summary>
    ''' Uses the specified access token to create a client context
    ''' </summary>
    ''' <param name="targetUrl">Url of the target SharePoint site</param>
    ''' <param name="accessToken">Access token to be used when calling the specified targetUrl</param>
    ''' <returns>A ClientContext ready to call targetUrl with the specified access token</returns>
    Public Shared Function GetClientContextWithAccessToken(targetUrl As String, accessToken As String) As ClientContext
        Dim clientContext As New ClientContext(targetUrl)

        clientContext.AuthenticationMode = ClientAuthenticationMode.Anonymous
        clientContext.FormDigestHandlingEnabled = False

        AddHandler clientContext.ExecutingWebRequest, Sub(oSender As Object, webRequestEventArgs As WebRequestEventArgs)
                                                          webRequestEventArgs.WebRequestExecutor.RequestHeaders("Authorization") = "Bearer " & accessToken
                                                      End Sub
        Return clientContext
    End Function

    ''' <summary>
    ''' Retrieves an access token from ACS using the specified context token, and uses that access token to create
    ''' a client context
    ''' </summary>
    ''' <param name="targetUrl">Url of the target SharePoint site</param>
    ''' <param name="contextTokenString">Context token received from the target SharePoint site</param>
    ''' <param name="appHostUrl">Url authority of the hosted app.  If this is Nothing, the value in the HostedAppHostName
    ''' of web.config will be used instead</param>
    ''' <returns>A ClientContext ready to call targetUrl with a valid access token</returns>
    Public Shared Function GetClientContextWithContextToken(targetUrl As String, contextTokenString As String, appHostUrl As String) As ClientContext
        Dim contextToken As SharePointContextToken = ReadAndValidateContextToken(contextTokenString, appHostUrl)

        Dim targetUri As New Uri(targetUrl)

        Dim accessToken As String = GetAccessToken(contextToken, targetUri.Authority).AccessToken

        Return GetClientContextWithAccessToken(targetUrl, accessToken)
    End Function

    ''' <summary>
    ''' Returns the SharePoint url to which the app should redirect the browser to request consent and get back
    ''' an authorization code.
    ''' </summary>
    ''' <param name="contextUrl">Absolute Url of the SharePoint site</param>
    ''' <param name="scope">Space-delimited permissions to request from the SharePoint site in "shorthand" format 
    ''' (e.g. "Web.Read Site.Write")</param>
    ''' <returns>Url of the SharePoint site's OAuth authorization page</returns>
    Public Shared Function GetAuthorizationUrl(contextUrl As String, scope As String) As String
        Return String.Format("{0}{1}?IsDlg=1&client_id={2}&scope={3}&response_type=code", EnsureTrailingSlash(contextUrl), AuthorizationPage, ClientId, scope)
    End Function

    ''' <summary>
    ''' Returns the SharePoint url to which the app should redirect the browser to request consent and get back
    ''' an authorization code.
    ''' </summary>
    ''' <param name="contextUrl">Absolute Url of the SharePoint site</param>
    ''' <param name="scope">Space-delimited permissions to request from the SharePoint site in "shorthand" format
    ''' (e.g. "Web.Read Site.Write")</param>
    ''' <param name="redirectUri">Uri to which SharePoint should redirect the browser to after consent is 
    ''' granted</param>
    ''' <returns>Url of the SharePoint site's OAuth authorization page</returns>
    Public Shared Function GetAuthorizationUrl(contextUrl As String, scope As String, redirectUri As String) As String
        Return String.Format("{0}{1}?IsDlg=1&client_id={2}&scope={3}&response_type=code&redirect_uri={4}", EnsureTrailingSlash(contextUrl), AuthorizationPage, ClientId, scope, redirectUri)
    End Function

    ''' <summary>
    ''' Returns the SharePoint url to which the app should redirect the browser to request a new context token.
    ''' </summary>
    ''' <param name="contextUrl">Absolute Url of the SharePoint site</param>
    ''' <param name="redirectUri">Uri to which SharePoint should redirect the browser to with a context token</param>
    ''' <returns>Url of the SharePoint site's context token redirect page</returns>
    Public Shared Function GetAppContextTokenRequestUrl(contextUrl As String, redirectUri As String) As String
        Return String.Format("{0}{1}?client_id={2}&redirect_uri={3}", EnsureTrailingSlash(contextUrl), RedirectPage, ClientId, redirectUri)
    End Function

    ''' <summary>
    ''' Retrieves an S2S access token signed by the application's private certificate on behalf of the specified 
    ''' WindowsIdentity and intended for the SharePoint at the targetApplicationUri. If no Realm is specified in 
    ''' web.config, an auth challenge will be issued to the targetApplicationUri to discover it.
    ''' </summary>
    ''' <param name="targetApplicationUri">Url of the target SharePoint site</param>
    ''' <param name="identity">Windows identity of the user on whose behalf to create the access token</param>
    ''' <returns>An access token with an audience of the target principal</returns>
    Public Shared Function GetS2SAccessTokenWithWindowsIdentity(targetApplicationUri As Uri, identity As WindowsIdentity) As String
        Dim targetRealm As String = If(String.IsNullOrEmpty(Realm), GetRealmFromTargetUrl(targetApplicationUri), Realm)

        Dim claims As JsonWebTokenClaim() = If(identity IsNot Nothing, GetClaimsWithWindowsIdentity(identity), Nothing)

        Return GetS2SAccessTokenWithClaims(targetApplicationUri.Authority, targetRealm, claims)
    End Function

    ''' <summary>
    ''' Retrieves an S2S client context with an access token signed by the application's private certificate on 
    ''' behalf of the specified WindowsIdentity and intended for application at the targetApplicationUri using the 
    ''' targetRealm. If no Realm is specified in web.config, an auth challenge will be issued to the 
    ''' targetApplicationUri to discover it.
    ''' </summary>
    ''' <param name="targetApplicationUri">Url of the target SharePoint site</param>
    ''' <param name="identity">Windows identity of the user on whose behalf to create the access token</param>
    ''' <returns>A ClientContext using an access token with an audience of the target application</returns>
    Public Shared Function GetS2SClientContextWithWindowsIdentity(targetApplicationUri As Uri, identity As WindowsIdentity) As ClientContext
        Dim targetRealm As String = If(String.IsNullOrEmpty(Realm), GetRealmFromTargetUrl(targetApplicationUri), Realm)

        Dim claims As JsonWebTokenClaim() = If(identity IsNot Nothing, GetClaimsWithWindowsIdentity(identity), Nothing)

        Dim accessToken As String = GetS2SAccessTokenWithClaims(targetApplicationUri.Authority, targetRealm, claims)

        Return GetClientContextWithAccessToken(targetApplicationUri.ToString(), accessToken)
    End Function

    ''' <summary>
    ''' Get authentication realm from SharePoint
    ''' </summary>
    ''' <param name="targetApplicationUri">Url of the target SharePoint site</param>
    ''' <returns>String representation of the realm GUID</returns>
    Public Shared Function GetRealmFromTargetUrl(targetApplicationUri As Uri) As String
        Dim request As WebRequest = HttpWebRequest.Create(targetApplicationUri.ToString() & "/_vti_bin/client.svc")
        request.Headers.Add("Authorization: Bearer ")

        Try
            request.GetResponse().Close()
        Catch e As WebException
            If e.Response Is Nothing Then
                Return Nothing
            End If

            Dim bearerResponseHeader As String = e.Response.Headers("WWW-Authenticate")
            If String.IsNullOrEmpty(bearerResponseHeader) Then
                Return Nothing
            End If

            Const bearer As String = "Bearer realm="""
            Dim bearerIndex As Integer = bearerResponseHeader.IndexOf(bearer, StringComparison.Ordinal)
            If bearerIndex < 0 Then
                Return Nothing
            End If

            Dim realmIndex As Integer = bearerIndex + bearer.Length

            If bearerResponseHeader.Length >= realmIndex + 36 Then
                Dim targetRealm As String = bearerResponseHeader.Substring(realmIndex, 36)

                Dim realmGuid As Guid

                If Guid.TryParse(targetRealm, realmGuid) Then
                    Return targetRealm
                End If
            End If
        End Try
        Return Nothing
    End Function

    ''' <summary>
    ''' Determines if this is a high trust app.
    ''' </summary>
    ''' <returns>True if this is a high trust app.</returns>
    Public Shared Function IsHighTrustApp() As Boolean
        Return SigningCredentials IsNot Nothing
    End Function

    ''' <summary>
    ''' Ensures that the specified URL ends with '/' if it is not null or empty.
    ''' </summary>
    ''' <param name="url">The url.</param>
    ''' <returns>The url ending with '/' if it is not null or empty.</returns>
    Public Shared Function EnsureTrailingSlash(url As String) As String
        If Not String.IsNullOrEmpty(url) AndAlso url(url.Length - 1) <> "/"c Then
            Return url + "/"
        End If

        Return url
    End Function

#End Region

#Region "private fields"

    '
    ' Configuration Constants
    '        

    Private Const AuthorizationPage As String = "_layouts/15/OAuthAuthorize.aspx"
    Private Const RedirectPage As String = "_layouts/15/AppRedirect.aspx"
    Private Const AcsPrincipalName As String = "00000001-0000-0000-c000-000000000000"
    Private Const AcsMetadataEndPointRelativeUrl As String = "metadata/json/1"
    Private Const S2SProtocol As String = "OAuth2"
    Private Const DelegationIssuance As String = "DelegationIssuance1.0"
    Private Const NameIdentifierClaimType As String = JsonWebTokenConstants.ReservedClaims.NameIdentifier
    Private Const TrustedForImpersonationClaimType As String = "trustedfordelegation"
    Private Const ActorTokenClaimType As String = JsonWebTokenConstants.ReservedClaims.ActorToken

    '
    ' Environment Constants
    '

    Private Shared GlobalEndPointPrefix As String = "accounts"
    Private Shared AcsHostUrl As String = "accesscontrol.windows.net"

    '
    ' Hosted app configuration
    '
    Private Shared ReadOnly ClientId As String = If(String.IsNullOrEmpty(WebConfigurationManager.AppSettings.[Get]("ClientId")), WebConfigurationManager.AppSettings.[Get]("HostedAppName"), WebConfigurationManager.AppSettings.[Get]("ClientId"))

    Private Shared ReadOnly IssuerId As String = If(String.IsNullOrEmpty(WebConfigurationManager.AppSettings.[Get]("IssuerId")), ClientId, WebConfigurationManager.AppSettings.[Get]("IssuerId"))

    Private Shared ReadOnly HostedAppHostName As String = WebConfigurationManager.AppSettings.[Get]("HostedAppHostName")

    Private Shared ReadOnly HostedAppHostNameOverride As String = WebConfigurationManager.AppSettings.[Get]("HostedAppHostNameOverride")

    Private Shared ReadOnly ClientSecret As String = If(String.IsNullOrEmpty(WebConfigurationManager.AppSettings.[Get]("ClientSecret")), WebConfigurationManager.AppSettings.[Get]("HostedAppSigningKey"), WebConfigurationManager.AppSettings.[Get]("ClientSecret"))

    Private Shared ReadOnly SecondaryClientSecret As String = WebConfigurationManager.AppSettings.[Get]("SecondaryClientSecret")

    Private Shared ReadOnly Realm As String = WebConfigurationManager.AppSettings.[Get]("Realm")

    Private Shared ReadOnly ServiceNamespace As String = WebConfigurationManager.AppSettings.[Get]("Realm")

    Private Shared ReadOnly ClientSigningCertificatePath As String = WebConfigurationManager.AppSettings.[Get]("ClientSigningCertificatePath")

    Private Shared ReadOnly ClientSigningCertificatePassword As String = WebConfigurationManager.AppSettings.[Get]("ClientSigningCertificatePassword")

    Private Shared ReadOnly ClientCertificate As X509Certificate2 = If((String.IsNullOrEmpty(ClientSigningCertificatePath) OrElse String.IsNullOrEmpty(ClientSigningCertificatePassword)), Nothing, New X509Certificate2(ClientSigningCertificatePath, ClientSigningCertificatePassword))

    Private Shared ReadOnly SigningCredentials As X509SigningCredentials = If((ClientCertificate Is Nothing), Nothing, New X509SigningCredentials(ClientCertificate, SecurityAlgorithms.RsaSha256Signature, SecurityAlgorithms.Sha256Digest))

#End Region

#Region "private methods"

    Private Shared Function CreateAcsClientContextForUrl(properties As SPRemoteEventProperties, sharepointUrl As Uri) As ClientContext
        Dim contextTokenString As String = properties.ContextToken

        If [String].IsNullOrEmpty(contextTokenString) Then
            Return Nothing
        End If

        Dim contextToken As SharePointContextToken = ReadAndValidateContextToken(contextTokenString, OperationContext.Current.IncomingMessageHeaders.To.Host)

        Dim accessToken As String = GetAccessToken(contextToken, sharepointUrl.Authority).AccessToken
        Return GetClientContextWithAccessToken(sharepointUrl.ToString(), accessToken)
    End Function

    Private Shared Function GetAcsMetadataEndpointUrl() As String
        Return Path.Combine(GetAcsGlobalEndpointUrl(), AcsMetadataEndPointRelativeUrl)
    End Function

    Private Shared Function GetFormattedPrincipal(principalName As String, hostName As String, targetRealm As String) As String
        If Not [String].IsNullOrEmpty(hostName) Then
            Return [String].Format(CultureInfo.InvariantCulture, "{0}/{1}@{2}", principalName, hostName, targetRealm)
        End If

        Return [String].Format(CultureInfo.InvariantCulture, "{0}@{1}", principalName, targetRealm)
    End Function

    Private Shared Function GetAcsPrincipalName(targetRealm As String) As String
        Return GetFormattedPrincipal(AcsPrincipalName, New Uri(GetAcsGlobalEndpointUrl()).Host, targetRealm)
    End Function

    Private Shared Function GetAcsGlobalEndpointUrl() As String
        Return [String].Format(CultureInfo.InvariantCulture, "https://{0}.{1}/", GlobalEndPointPrefix, AcsHostUrl)
    End Function

    Private Shared Function CreateJsonWebSecurityTokenHandler() As JsonWebSecurityTokenHandler
        Dim handler As New JsonWebSecurityTokenHandler()
        handler.Configuration = New SecurityTokenHandlerConfiguration()
        handler.Configuration.AudienceRestriction = New AudienceRestriction(AudienceUriMode.Never)
        handler.Configuration.CertificateValidator = X509CertificateValidator.None

        Dim securityKeys As New List(Of Byte())()
        securityKeys.Add(Convert.FromBase64String(ClientSecret))
        If Not String.IsNullOrEmpty(SecondaryClientSecret) Then
            securityKeys.Add(Convert.FromBase64String(SecondaryClientSecret))
        End If

        Dim securityTokens As New List(Of SecurityToken)()
        securityTokens.Add(New MultipleSymmetricKeySecurityToken(securityKeys))

        handler.Configuration.IssuerTokenResolver =
            SecurityTokenResolver.CreateDefaultSecurityTokenResolver(
                New ReadOnlyCollection(Of SecurityToken)(securityTokens), False)
        Dim issuerNameRegistry As New SymmetricKeyIssuerNameRegistry()
        For Each securityKey As Byte() In securityKeys
            issuerNameRegistry.AddTrustedIssuer(securityKey, GetAcsPrincipalName(ServiceNamespace))
        Next

        handler.Configuration.IssuerNameRegistry = issuerNameRegistry
        Return handler
    End Function

    Private Shared Function GetS2SAccessTokenWithClaims(targetApplicationHostName As String, targetRealm As String, claims As IEnumerable(Of JsonWebTokenClaim)) As String
        Return IssueToken(ClientId, IssuerId, targetRealm, SharePointPrincipal, targetRealm, targetApplicationHostName, True,
                          claims, claims Is Nothing)
    End Function

    Private Shared Function GetClaimsWithWindowsIdentity(identity As WindowsIdentity) As JsonWebTokenClaim()
        Dim claims As JsonWebTokenClaim() = New JsonWebTokenClaim() _
                {New JsonWebTokenClaim(NameIdentifierClaimType, identity.User.Value.ToLower()),
                 New JsonWebTokenClaim("nii", "urn:office:idp:activedirectory")}
        Return claims
    End Function

    Private Shared Function IssueToken(sourceApplication As String, issuerApplication As String, sourceRealm As String, targetApplication As String, targetRealm As String, targetApplicationHostName As String, trustedForDelegation As Boolean, _
                                       claims As IEnumerable(Of JsonWebTokenClaim), Optional appOnly As Boolean = False) As String
        If SigningCredentials Is Nothing Then
            Throw New InvalidOperationException("SigningCredentials was not initialized")
        End If

        '#Region "Actor token"

        Dim issuer As String = If(String.IsNullOrEmpty(sourceRealm), issuerApplication, String.Format("{0}@{1}", issuerApplication, sourceRealm))
        Dim nameid As String = If(String.IsNullOrEmpty(sourceRealm), sourceApplication, String.Format("{0}@{1}", sourceApplication, sourceRealm))
        Dim audience As String = String.Format("{0}/{1}@{2}", targetApplication, targetApplicationHostName, targetRealm)

        Dim actorClaims As New List(Of JsonWebTokenClaim)()
        actorClaims.Add(New JsonWebTokenClaim(JsonWebTokenConstants.ReservedClaims.NameIdentifier, nameid))
        If trustedForDelegation AndAlso Not appOnly Then
            actorClaims.Add(New JsonWebTokenClaim(TrustedForImpersonationClaimType, "true"))
        End If

        ' Create token
        Dim actorToken As New JsonWebSecurityToken(issuer:=issuer, audience:=audience, validFrom:=DateTime.UtcNow, validTo:=DateTime.UtcNow.Add(HighTrustAccessTokenLifetime), signingCredentials:=SigningCredentials, claims:=actorClaims)

        Dim actorTokenString As String = New JsonWebSecurityTokenHandler().WriteTokenAsString(actorToken)

        If appOnly Then
            ' App-only token is the same as actor token for delegated case
            Return actorTokenString
        End If

        '#End Region

        '#Region "Outer token"

        Dim outerClaims As List(Of JsonWebTokenClaim) = If(claims Is Nothing, New List(Of JsonWebTokenClaim)(), New List(Of JsonWebTokenClaim)(claims))
        outerClaims.Add(New JsonWebTokenClaim(ActorTokenClaimType, actorTokenString))

        ' outer token issuer should match actor token nameid
        Dim jsonToken As New JsonWebSecurityToken(nameid, audience, DateTime.UtcNow, DateTime.UtcNow.Add(HighTrustAccessTokenLifetime), outerClaims)

        Dim accessToken As String = New JsonWebSecurityTokenHandler().WriteTokenAsString(jsonToken)

        '#End Region

        Return accessToken
    End Function

#End Region

#Region "AcsMetadataParser"

    ' This class is used to get MetaData document from the global STS endpoint. It contains
    ' methods to parse the MetaData document and get endpoints and STS certificate.
    Public NotInheritable Class AcsMetadataParser
        Private Sub New()
        End Sub

        Public Shared Function GetAcsSigningCert(realm As String) As X509Certificate2
            Dim document As JsonMetadataDocument = GetMetadataDocument(realm)

            If document.keys IsNot Nothing AndAlso document.keys.Count > 0 Then
                Dim signingKey As JsonKey = document.keys(0)

                If signingKey IsNot Nothing AndAlso signingKey.keyValue IsNot Nothing Then
                    Return New X509Certificate2(Encoding.UTF8.GetBytes(signingKey.keyValue.value))
                End If
            End If

            Throw New Exception("Metadata document does not contain ACS signing certificate.")
        End Function

        Public Shared Function GetDelegationServiceUrl(realm As String) As String
            Dim document As JsonMetadataDocument = GetMetadataDocument(realm)

            Dim delegationEndpoint As JsonEndpoint = document.endpoints.SingleOrDefault(Function(e) e.protocol = DelegationIssuance)

            If delegationEndpoint IsNot Nothing Then
                Return delegationEndpoint.location
            End If

            Throw New Exception("Metadata document does not contain Delegation Service endpoint Url")
        End Function

        Private Shared Function GetMetadataDocument(realm As String) As JsonMetadataDocument
            Dim acsMetadataEndpointUrlWithRealm As String = [String].Format(CultureInfo.InvariantCulture, "{0}?realm={1}", GetAcsMetadataEndpointUrl(), realm)
            Dim acsMetadata As Byte()
            Using webClient As New WebClient()
                acsMetadata = webClient.DownloadData(acsMetadataEndpointUrlWithRealm)
            End Using
            Dim jsonResponseString As String = Encoding.UTF8.GetString(acsMetadata)

            Dim serializer As New JavaScriptSerializer()
            Dim document As JsonMetadataDocument = serializer.Deserialize(Of JsonMetadataDocument)(jsonResponseString)

            If document Is Nothing Then
                Throw New Exception("No metadata document found at the global endpoint " & acsMetadataEndpointUrlWithRealm)
            End If

            Return document
        End Function

        Public Shared Function GetStsUrl(realm As String) As String
            Dim document As JsonMetadataDocument = GetMetadataDocument(realm)

            Dim s2sEndpoint As JsonEndpoint = document.endpoints.SingleOrDefault(Function(e) e.protocol = S2SProtocol)

            If s2sEndpoint IsNot Nothing Then
                Return s2sEndpoint.location
            End If

            Throw New Exception("Metadata document does not contain STS endpoint url")
        End Function

        Private Class JsonMetadataDocument
            Public Property serviceName() As String
                Get
                    Return m_serviceName
                End Get
                Set(value As String)
                    m_serviceName = value
                End Set
            End Property

            Private m_serviceName As String

            Public Property endpoints() As List(Of JsonEndpoint)
                Get
                    Return m_endpoints
                End Get
                Set(value As List(Of JsonEndpoint))
                    m_endpoints = value
                End Set
            End Property

            Private m_endpoints As List(Of JsonEndpoint)

            Public Property keys() As List(Of JsonKey)
                Get
                    Return m_keys
                End Get
                Set(value As List(Of JsonKey))
                    m_keys = value
                End Set
            End Property

            Private m_keys As List(Of JsonKey)
        End Class

        Private Class JsonEndpoint
            Public Property location() As String
                Get
                    Return m_location
                End Get
                Set(value As String)
                    m_location = value
                End Set
            End Property

            Private m_location As String

            Public Property protocol() As String
                Get
                    Return m_protocol
                End Get
                Set(value As String)
                    m_protocol = value
                End Set
            End Property

            Private m_protocol As String

            Public Property usage() As String
                Get
                    Return m_usage
                End Get
                Set(value As String)
                    m_usage = value
                End Set
            End Property

            Private m_usage As String
        End Class

        Private Class JsonKeyValue
            Public Property type() As String
                Get
                    Return m_type
                End Get
                Set(value As String)
                    m_type = value
                End Set
            End Property

            Private m_type As String

            Public Property value() As String
                Get
                    Return m_value
                End Get
                Set(value As String)
                    m_value = value
                End Set
            End Property

            Private m_value As String
        End Class

        Private Class JsonKey
            Public Property usage() As String
                Get
                    Return m_usage
                End Get
                Set(value As String)
                    m_usage = value
                End Set
            End Property

            Private m_usage As String

            Public Property keyValue() As JsonKeyValue
                Get
                    Return m_keyValue
                End Get
                Set(value As JsonKeyValue)
                    m_keyValue = value
                End Set
            End Property

            Private m_keyValue As JsonKeyValue
        End Class
    End Class

#End Region
End Class

''' <summary>
''' A JsonWebSecurityToken generated by SharePoint to authenticate to a 3rd party application and allow callbacks using a refresh token
''' </summary>
Public Class SharePointContextToken
    Inherits JsonWebSecurityToken

    Public Shared Function Create(contextToken As JsonWebSecurityToken) As SharePointContextToken
        Return New SharePointContextToken(contextToken.Issuer, contextToken.Audience, contextToken.ValidFrom, contextToken.ValidTo, contextToken.Claims)
    End Function

    Public Sub New(issuer As String, audience As String, validFrom As DateTime, validTo As DateTime, claims As IEnumerable(Of JsonWebTokenClaim))
        MyBase.New(issuer, audience, validFrom, validTo, claims)
    End Sub

    Public Sub New(issuer As String, audience As String, validFrom As DateTime, validTo As DateTime, claims As IEnumerable(Of JsonWebTokenClaim), issuerToken As SecurityToken, _
                   actorToken As JsonWebSecurityToken)
        MyBase.New(issuer, audience, validFrom, validTo, claims, issuerToken, _
                   actorToken)
    End Sub

    Public Sub New(issuer As String, audience As String, validFrom As DateTime, validTo As DateTime, claims As IEnumerable(Of JsonWebTokenClaim), signingCredentials As SigningCredentials)
        MyBase.New(issuer, audience, validFrom, validTo, claims, signingCredentials)
    End Sub

    Public ReadOnly Property NameId() As String
        Get
            Return GetClaimValue(Me, "nameid")
        End Get
    End Property

    ''' <summary>
    ''' The principal name portion of the context token's "appctxsender" claim
    ''' </summary>
    Public ReadOnly Property TargetPrincipalName() As String
        Get
            Dim appctxsender As String = GetClaimValue(Me, "appctxsender")

            If appctxsender Is Nothing Then
                Return Nothing
            End If

            Return appctxsender.Split("@"c)(0)
        End Get
    End Property

    ''' <summary>
    ''' The context token's "refreshtoken" claim
    ''' </summary>
    Public ReadOnly Property RefreshToken() As String
        Get
            Return GetClaimValue(Me, "refreshtoken")
        End Get
    End Property

    ''' <summary>
    ''' The context token's "CacheKey" claim
    ''' </summary>
    Public ReadOnly Property CacheKey() As String
        Get
            Dim appctx As String = GetClaimValue(Me, "appctx")
            If appctx Is Nothing Then
                Return Nothing
            End If

            Dim ctx As New ClientContext("http://tempuri.org")
            Dim dict As Dictionary(Of String, Object) = DirectCast(ctx.ParseObjectFromJsonString(appctx), Dictionary(Of String, Object))
            Dim cacheKeyString As String = DirectCast(dict("CacheKey"), String)

            Return cacheKeyString
        End Get
    End Property

    ''' <summary>
    ''' The context token's "SecurityTokenServiceUri" claim
    ''' </summary>
    Public ReadOnly Property SecurityTokenServiceUri() As String
        Get
            Dim appctx As String = GetClaimValue(Me, "appctx")
            If appctx Is Nothing Then
                Return Nothing
            End If

            Dim ctx As New ClientContext("http://tempuri.org")
            Dim dict As Dictionary(Of String, Object) = DirectCast(ctx.ParseObjectFromJsonString(appctx), Dictionary(Of String, Object))
            Dim securityTokenServiceUriString As String = DirectCast(dict("SecurityTokenServiceUri"), String)

            Return securityTokenServiceUriString
        End Get
    End Property

    ''' <summary>
    ''' The realm portion of the context token's "audience" claim
    ''' </summary>
    Public ReadOnly Property Realm() As String
        Get
            Dim aud As String = Audience
            If aud Is Nothing Then
                Return Nothing
            End If

            Dim tokenRealm As String = aud.Substring(aud.IndexOf("@"c) + 1)

            Return tokenRealm
        End Get
    End Property

    Private Shared Function GetClaimValue(token As JsonWebSecurityToken, claimType As String) As String
        If token Is Nothing Then
            Throw New ArgumentNullException("token")
        End If

        For Each claim As JsonWebTokenClaim In token.Claims
            If StringComparer.Ordinal.Equals(claim.ClaimType, claimType) Then
                Return claim.Value
            End If
        Next

        Return Nothing
    End Function
End Class

''' <summary>
''' Represents a security token which contains multiple security keys that are generated using symmetric algorithms.
''' </summary>
Public Class MultipleSymmetricKeySecurityToken
    Inherits SecurityToken

    ''' <summary>
    ''' Initializes a new instance of the MultipleSymmetricKeySecurityToken class.
    ''' </summary>
    ''' <param name="keys">An enumeration of Byte arrays that contain the symmetric keys.</param>
    Public Sub New(keys As IEnumerable(Of Byte()))
        Me.New(UniqueId.CreateUniqueId(), keys)
    End Sub

    ''' <summary>
    ''' Initializes a new instance of the MultipleSymmetricKeySecurityToken class.
    ''' </summary>
    ''' <param name="tokenId">The unique identifier of the security token.</param>
    ''' <param name="keys">An enumeration of Byte arrays that contain the symmetric keys.</param>
    Public Sub New(tokenId As String, keys As IEnumerable(Of Byte()))
        If keys Is Nothing Then
            Throw New ArgumentNullException("keys")
        End If

        If String.IsNullOrEmpty(tokenId) Then
            Throw New ArgumentException("Value cannot be a null or empty string.", "tokenId")
        End If

        For Each key As Byte() In keys
            If key.Length <= 0 Then
                Throw New ArgumentException("The key length must be greater then zero.", "keys")
            End If
        Next

        m_id = tokenId
        m_effectiveTime = DateTime.UtcNow
        m_securityKeys = CreateSymmetricSecurityKeys(keys)
    End Sub

    ''' <summary>
    ''' Gets a unique identifier of the security token.
    ''' </summary>
    Public Overrides ReadOnly Property Id As String
        Get
            Return m_id
        End Get
    End Property

    ''' <summary>
    ''' Gets the cryptographic keys associated with the security token.
    ''' </summary>
    Public Overrides ReadOnly Property SecurityKeys() As ReadOnlyCollection(Of SecurityKey)
        Get
            Return m_securityKeys.AsReadOnly()
        End Get
    End Property

    ''' <summary>
    ''' Gets the first instant in time at which this security token is valid.
    ''' </summary>
    Public Overrides ReadOnly Property ValidFrom As DateTime
        Get
            Return m_effectiveTime
        End Get
    End Property

    ''' <summary>
    ''' Gets the last instant in time at which this security token is valid.
    ''' </summary>
    Public Overrides ReadOnly Property ValidTo As DateTime
        Get
            ' Never expire
            Return Date.MaxValue
        End Get
    End Property

    ''' <summary>
    ''' Returns a value that indicates whether the key identifier for this instance can be resolved to the specified key identifier.
    ''' </summary>
    ''' <param name="keyIdentifierClause">A SecurityKeyIdentifierClause to compare to this instance.</param>
    ''' <returns>true if keyIdentifierClause is a SecurityKeyIdentifierClause and it has the same unique identifier as the Id property; otherwise, false.</returns>
    Public Overrides Function MatchesKeyIdentifierClause(keyIdentifierClause As SecurityKeyIdentifierClause) As Boolean
        If keyIdentifierClause Is Nothing Then
            Throw New ArgumentNullException("keyIdentifierClause")
        End If

        ' Since this is a symmetric token and we do not have IDs to distinguish tokens, we just check for the
        ' presence of a SymmetricIssuerKeyIdentifier. The actual mapping to the issuer takes place later
        ' when the key is matched to the issuer.
        If TypeOf keyIdentifierClause Is SymmetricIssuerKeyIdentifierClause Then
            Return True
        End If
        Return MyBase.MatchesKeyIdentifierClause(keyIdentifierClause)
    End Function

#Region "private members"

    Private Function CreateSymmetricSecurityKeys(keys As IEnumerable(Of Byte())) As List(Of SecurityKey)
        Dim symmetricKeys As New List(Of SecurityKey)()
        For Each key As Byte() In keys
            symmetricKeys.Add(New InMemorySymmetricSecurityKey(key))
        Next
        Return symmetricKeys
    End Function

    Private m_id As String
    Private m_effectiveTime As DateTime
    Private m_securityKeys As List(Of SecurityKey)

#End Region
End Class
