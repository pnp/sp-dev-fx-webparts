Imports Microsoft.IdentityModel.S2S.Protocols.OAuth2
Imports Microsoft.IdentityModel.Tokens
Imports Microsoft.SharePoint.Client
Imports System
Imports System.Net
Imports System.Security.Principal
Imports System.Web
Imports System.Web.Configuration

''' <summary>
''' Encapsulates all the information from SharePoint.
''' </summary>
Public MustInherit Class SharePointContext
    Public Const SPHostUrlKey As String = "SPHostUrl"
    Public Const SPAppWebUrlKey As String = "SPAppWebUrl"
    Public Const SPLanguageKey As String = "SPLanguage"
    Public Const SPClientTagKey As String = "SPClientTag"
    Public Const SPProductNumberKey As String = "SPProductNumber"

    Protected Shared ReadOnly AccessTokenLifetimeTolerance As TimeSpan = TimeSpan.FromMinutes(5.0)

    Private ReadOnly m_spHostUrl As Uri
    Private ReadOnly m_spAppWebUrl As Uri
    Private ReadOnly m_spLanguage As String
    Private ReadOnly m_spClientTag As String
    Private ReadOnly m_spProductNumber As String

    ' <AccessTokenString, UtcExpiresOn>
    Protected m_userAccessTokenForSPHost As Tuple(Of String, DateTime)
    Protected m_userAccessTokenForSPAppWeb As Tuple(Of String, DateTime)
    Protected m_appOnlyAccessTokenForSPHost As Tuple(Of String, DateTime)
    Protected m_appOnlyAccessTokenForSPAppWeb As Tuple(Of String, DateTime)

    ''' <summary>
    ''' Gets the SharePoint host url from QueryString of the specified HTTP request.
    ''' </summary>
    ''' <param name="httpRequest">The specified HTTP request.</param>
    ''' <returns>The SharePoint host url. Returns <c>Nothing</c> if the HTTP request doesn't contain the SharePoint host url.</returns>
    Public Shared Function GetSPHostUrl(httpRequest As HttpRequestBase) As Uri
        If httpRequest Is Nothing Then
            Throw New ArgumentNullException("httpRequest")
        End If

        Dim spHostUrlString As String = TokenHelper.EnsureTrailingSlash(httpRequest.QueryString(SPHostUrlKey))
        Dim spHostUrl As Uri = Nothing
        If Uri.TryCreate(spHostUrlString, UriKind.Absolute, spHostUrl) AndAlso
           (spHostUrl.Scheme = Uri.UriSchemeHttp OrElse spHostUrl.Scheme = Uri.UriSchemeHttps) Then
            Return spHostUrl
        End If

        Return Nothing
    End Function

    ''' <summary>
    ''' Gets the SharePoint host url from QueryString of the specified HTTP request.
    ''' </summary>
    ''' <param name="httpRequest">The specified HTTP request.</param>
    ''' <returns>The SharePoint host url. Returns <c>Nothing</c> if the HTTP request doesn't contain the SharePoint host url.</returns>
    Public Shared Function GetSPHostUrl(httpRequest As HttpRequest) As Uri
        Return GetSPHostUrl(New HttpRequestWrapper(httpRequest))
    End Function

    ''' <summary>
    ''' The SharePoint host url.
    ''' </summary>
    Public ReadOnly Property SPHostUrl() As Uri
        Get
            Return Me.m_spHostUrl
        End Get
    End Property

    ''' <summary>
    ''' The SharePoint app web url.
    ''' </summary>
    Public ReadOnly Property SPAppWebUrl() As Uri
        Get
            Return Me.m_spAppWebUrl
        End Get
    End Property

    ''' <summary>
    ''' The SharePoint language.
    ''' </summary>
    Public ReadOnly Property SPLanguage() As String
        Get
            Return Me.m_spLanguage
        End Get
    End Property

    ''' <summary>
    ''' The SharePoint client tag.
    ''' </summary>
    Public ReadOnly Property SPClientTag() As String
        Get
            Return Me.m_spClientTag
        End Get
    End Property

    ''' <summary>
    ''' The SharePoint product number.
    ''' </summary>
    Public ReadOnly Property SPProductNumber() As String
        Get
            Return Me.m_spProductNumber
        End Get
    End Property

    ''' <summary>
    ''' The user access token for the SharePoint host.
    ''' </summary>
    Public MustOverride ReadOnly Property UserAccessTokenForSPHost() As String

    ''' <summary>
    ''' The user access token for the SharePoint app web.
    ''' </summary>
    Public MustOverride ReadOnly Property UserAccessTokenForSPAppWeb() As String

    ''' <summary>
    ''' The app only access token for the SharePoint host.
    ''' </summary>
    Public MustOverride ReadOnly Property AppOnlyAccessTokenForSPHost() As String

    ''' <summary>
    ''' The app only access token for the SharePoint app web.
    ''' </summary>
    Public MustOverride ReadOnly Property AppOnlyAccessTokenForSPAppWeb() As String

    ''' <summary>
    ''' Constructor.
    ''' </summary>
    ''' <param name="spHostUrl">The SharePoint host url.</param>
    ''' <param name="spAppWebUrl">The SharePoint app web url.</param>
    ''' <param name="spLanguage">The SharePoint language.</param>
    ''' <param name="spClientTag">The SharePoint client tag.</param>
    ''' <param name="spProductNumber">The SharePoint product number.</param>
    Protected Sub New(spHostUrl As Uri, spAppWebUrl As Uri, spLanguage As String, spClientTag As String, spProductNumber As String)
        If spHostUrl Is Nothing Then
            Throw New ArgumentNullException("spHostUrl")
        End If

        If String.IsNullOrEmpty(spLanguage) Then
            Throw New ArgumentNullException("spLanguage")
        End If

        If String.IsNullOrEmpty(spClientTag) Then
            Throw New ArgumentNullException("spClientTag")
        End If

        If String.IsNullOrEmpty(spProductNumber) Then
            Throw New ArgumentNullException("spProductNumber")
        End If

        Me.m_spHostUrl = spHostUrl
        Me.m_spAppWebUrl = spAppWebUrl
        Me.m_spLanguage = spLanguage
        Me.m_spClientTag = spClientTag
        Me.m_spProductNumber = spProductNumber
    End Sub

    ''' <summary>
    ''' Creates a user ClientContext for the SharePoint host.
    ''' </summary>
    ''' <returns>A ClientContext instance.</returns>
    Public Function CreateUserClientContextForSPHost() As ClientContext
        Return CreateClientContext(Me.SPHostUrl, Me.UserAccessTokenForSPHost)
    End Function

    ''' <summary>
    ''' Creates a user ClientContext for the SharePoint app web.
    ''' </summary>
    ''' <returns>A ClientContext instance.</returns>
    Public Function CreateUserClientContextForSPAppWeb() As ClientContext
        Return CreateClientContext(Me.SPAppWebUrl, Me.UserAccessTokenForSPAppWeb)
    End Function

    ''' <summary>
    ''' Creates app only ClientContext for the SharePoint host.
    ''' </summary>
    ''' <returns>A ClientContext instance.</returns>
    Public Function CreateAppOnlyClientContextForSPHost() As ClientContext
        Return CreateClientContext(Me.SPHostUrl, Me.AppOnlyAccessTokenForSPHost)
    End Function

    ''' <summary>
    ''' Creates an app only ClientContext for the SharePoint app web.
    ''' </summary>
    ''' <returns>A ClientContext instance.</returns>
    Public Function CreateAppOnlyClientContextForSPAppWeb() As ClientContext
        Return CreateClientContext(Me.SPAppWebUrl, Me.AppOnlyAccessTokenForSPAppWeb)
    End Function

    ''' <summary>
    ''' Gets the database connection string from SharePoint for autohosted app.
    ''' This method is deprecated because the autohosted option is no longer available.
    ''' </summary>
    <ObsoleteAttribute("This method is deprecated because the autohosted option is no longer available.", true)>
    Public Function GetDatabaseConnectionString() As String
        Throw New NotSupportedException("This method is deprecated because the autohosted option is no longer available.")
    End Function

    ''' <summary>
    ''' Determines if the specified access token is valid.
    ''' It considers an access token as not valid if it is Nothing, or it has expired.
    ''' </summary>
    ''' <param name="accessToken">The access token to verify.</param>
    ''' <returns>True if the access token is valid.</returns>
    Protected Shared Function IsAccessTokenValid(accessToken As Tuple(Of String, DateTime)) As Boolean
        Return accessToken IsNot Nothing AndAlso
               Not String.IsNullOrEmpty(accessToken.Item1) AndAlso
               accessToken.Item2 > DateTime.UtcNow
    End Function

    ''' <summary>
    ''' Creates a ClientContext with the specified SharePoint site url and the access token.
    ''' </summary>
    ''' <param name="spSiteUrl">The site url.</param>
    ''' <param name="accessToken">The access token.</param>
    ''' <returns>A ClientContext instance.</returns>
    Private Shared Function CreateClientContext(spSiteUrl As Uri, accessToken As String) As ClientContext
        If spSiteUrl IsNot Nothing AndAlso Not String.IsNullOrEmpty(accessToken) Then
            Return TokenHelper.GetClientContextWithAccessToken(spSiteUrl.AbsoluteUri, accessToken)
        End If

        Return Nothing
    End Function
End Class

''' <summary>
''' Redirection status.
''' </summary>
Public Enum RedirectionStatus
    Ok
    ShouldRedirect
    CanNotRedirect
End Enum

''' <summary>
''' Provides SharePointContext instances.
''' </summary>
Public MustInherit Class SharePointContextProvider
    Private Shared s_current As SharePointContextProvider

    ''' <summary>
    ''' The current SharePointContextProvider instance.
    ''' </summary>
    Public Shared ReadOnly Property Current() As SharePointContextProvider
        Get
            Return SharePointContextProvider.s_current
        End Get
    End Property

    ''' <summary>
    ''' Initializes the default SharePointContextProvider instance.
    ''' </summary>
    Shared Sub New()
        If Not TokenHelper.IsHighTrustApp() Then
            SharePointContextProvider.s_current = New SharePointAcsContextProvider()
        Else
            SharePointContextProvider.s_current = New SharePointHighTrustContextProvider()
        End If
    End Sub

    ''' <summary>
    ''' Registers the specified SharePointContextProvider instance as current.
    ''' It should be called by Application_Start() in Global.asax.
    ''' </summary>
    ''' <param name="provider">The SharePointContextProvider to be set as current.</param>
    Public Shared Sub Register(provider As SharePointContextProvider)
        If provider Is Nothing Then
            Throw New ArgumentNullException("provider")
        End If

        SharePointContextProvider.s_current = provider
    End Sub

    ''' <summary>
    ''' Checks if it is necessary to redirect to SharePoint for user to authenticate.
    ''' </summary>
    ''' <param name="httpContext">The HTTP context.</param>
    ''' <param name="redirectUrl">The redirect url to SharePoint if the status is ShouldRedirect. <c>Null</c> if the status is Ok or CanNotRedirect.</param>
    ''' <returns>Redirection status.</returns>
    Public Shared Function CheckRedirectionStatus(httpContext As HttpContextBase, ByRef redirectUrl As Uri) As RedirectionStatus
        If httpContext Is Nothing Then
            Throw New ArgumentNullException("httpContext")
        End If

        redirectUrl = Nothing
        Dim contextTokenExpired As Boolean = False

        Try
            If SharePointContextProvider.Current.GetSharePointContext(httpContext) IsNot Nothing Then
                Return RedirectionStatus.Ok
            End If
        Catch ex As SecurityTokenExpiredException
            contextTokenExpired = True
        End Try

        Const SPHasRedirectedToSharePointKey As String = "SPHasRedirectedToSharePoint"

        If Not String.IsNullOrEmpty(httpContext.Request.QueryString(SPHasRedirectedToSharePointKey)) AndAlso Not contextTokenExpired Then
            Return RedirectionStatus.CanNotRedirect
        End If

        Dim spHostUrl As Uri = SharePointContext.GetSPHostUrl(httpContext.Request)

        If spHostUrl Is Nothing Then
            Return RedirectionStatus.CanNotRedirect
        End If

        If StringComparer.OrdinalIgnoreCase.Equals(httpContext.Request.HttpMethod, "POST") Then
            Return RedirectionStatus.CanNotRedirect
        End If

        Dim requestUrl As Uri = httpContext.Request.Url

        Dim queryNameValueCollection = HttpUtility.ParseQueryString(requestUrl.Query)

        ' Removes the values that are included in {StandardTokens}, as {StandardTokens} will be inserted at the beginning of the query string.
        queryNameValueCollection.Remove(SharePointContext.SPHostUrlKey)
        queryNameValueCollection.Remove(SharePointContext.SPAppWebUrlKey)
        queryNameValueCollection.Remove(SharePointContext.SPLanguageKey)
        queryNameValueCollection.Remove(SharePointContext.SPClientTagKey)
        queryNameValueCollection.Remove(SharePointContext.SPProductNumberKey)

        ' Adds SPHasRedirectedToSharePoint=1.
        queryNameValueCollection.Add(SPHasRedirectedToSharePointKey, "1")

        Dim returnUrlBuilder As New UriBuilder(requestUrl)
        returnUrlBuilder.Query = queryNameValueCollection.ToString()

        ' Inserts StandardTokens.
        Const StandardTokens As String = "{StandardTokens}"
        Dim returnUrlString As String = returnUrlBuilder.Uri.AbsoluteUri
        returnUrlString = returnUrlString.Insert(returnUrlString.IndexOf("?") + 1, StandardTokens + "&")

        ' Constructs redirect url.
        Dim redirectUrlString As String = TokenHelper.GetAppContextTokenRequestUrl(spHostUrl.AbsoluteUri, Uri.EscapeDataString(returnUrlString))

        redirectUrl = New Uri(redirectUrlString, UriKind.Absolute)

        Return RedirectionStatus.ShouldRedirect
    End Function

    ''' <summary>
    ''' Checks if it is necessary to redirect to SharePoint for user to authenticate.
    ''' </summary>
    ''' <param name="httpContext">The HTTP context.</param>
    ''' <param name="redirectUrl">The redirect url to SharePoint if the status is ShouldRedirect. <c>Null</c> if the status is Ok or CanNotRedirect.</param>
    ''' <returns>Redirection status.</returns>
    Public Shared Function CheckRedirectionStatus(httpContext As HttpContext, ByRef redirectUrl As Uri) As RedirectionStatus
        Return CheckRedirectionStatus(New HttpContextWrapper(httpContext), redirectUrl)
    End Function

    ''' <summary>
    ''' Creates a SharePointContext instance with the specified HTTP request.
    ''' </summary>
    ''' <param name="httpRequest">The HTTP request.</param>
    ''' <returns>The SharePointContext instance. Returns <c>Nothing</c> if errors occur.</returns>
    Public Function CreateSharePointContext(httpRequest As HttpRequestBase) As SharePointContext
        If httpRequest Is Nothing Then
            Throw New ArgumentNullException("httpRequest")
        End If

        ' SPHostUrl
        Dim spHostUrl As Uri = SharePointContext.GetSPHostUrl(httpRequest)
        If spHostUrl Is Nothing Then
            Return Nothing
        End If

        ' SPAppWebUrl
        Dim spAppWebUrlString As String = TokenHelper.EnsureTrailingSlash(httpRequest.QueryString(SharePointContext.SPAppWebUrlKey))
        Dim spAppWebUrl As Uri = Nothing
        If Not Uri.TryCreate(spAppWebUrlString, UriKind.Absolute, spAppWebUrl) OrElse
           Not (spAppWebUrl.Scheme = Uri.UriSchemeHttp OrElse spAppWebUrl.Scheme = Uri.UriSchemeHttps) Then
            spAppWebUrl = Nothing
        End If

        ' SPLanguage
        Dim spLanguage As String = httpRequest.QueryString(SharePointContext.SPLanguageKey)
        If String.IsNullOrEmpty(spLanguage) Then
            Return Nothing
        End If

        ' SPClientTag
        Dim spClientTag As String = httpRequest.QueryString(SharePointContext.SPClientTagKey)
        If String.IsNullOrEmpty(spClientTag) Then
            Return Nothing
        End If

        ' SPProductNumber
        Dim spProductNumber As String = httpRequest.QueryString(SharePointContext.SPProductNumberKey)
        If String.IsNullOrEmpty(spProductNumber) Then
            Return Nothing
        End If

        Return CreateSharePointContext(spHostUrl, spAppWebUrl, spLanguage, spClientTag, spProductNumber, httpRequest)
    End Function

    ''' <summary>
    ''' Creates a SharePointContext instance with the specified HTTP request.
    ''' </summary>
    ''' <param name="httpRequest">The HTTP request.</param>
    ''' <returns>The SharePointContext instance. Returns <c>Nothing</c> if errors occur.</returns>
    Public Function CreateSharePointContext(httpRequest As HttpRequest) As SharePointContext
        Return CreateSharePointContext(New HttpRequestWrapper(httpRequest))
    End Function

    ''' <summary>
    ''' Gets a SharePointContext instance associated with the specified HTTP context.
    ''' </summary>
    ''' <param name="httpContext">The HTTP context.</param>
    ''' <returns>The SharePointContext instance. Returns <c>Nothing</c> if not found and a new instance can't be created.</returns>
    Public Function GetSharePointContext(httpContext As HttpContextBase) As SharePointContext
        If httpContext Is Nothing Then
            Throw New ArgumentNullException("httpContext")
        End If

        Dim spHostUrl As Uri = SharePointContext.GetSPHostUrl(httpContext.Request)
        If spHostUrl Is Nothing Then
            Return Nothing
        End If

        Dim spContext As SharePointContext = LoadSharePointContext(httpContext)

        If spContext Is Nothing Or Not ValidateSharePointContext(spContext, httpContext) Then
            spContext = CreateSharePointContext(httpContext.Request)

            If spContext IsNot Nothing Then
                SaveSharePointContext(spContext, httpContext)
            End If
        End If

        Return spContext
    End Function

    ''' <summary>
    ''' Gets a SharePointContext instance associated with the specified HTTP context.
    ''' </summary>
    ''' <param name="httpContext">The HTTP context.</param>
    ''' <returns>The SharePointContext instance. Returns <c>Nothing</c> if not found and a new instance can't be created.</returns>
    Public Function GetSharePointContext(httpContext As HttpContext) As SharePointContext
        Return GetSharePointContext(New HttpContextWrapper(httpContext))
    End Function

    ''' <summary>
    ''' Creates a SharePointContext instance.
    ''' </summary>
    ''' <param name="spHostUrl">The SharePoint host url.</param>
    ''' <param name="spAppWebUrl">The SharePoint app web url.</param>
    ''' <param name="spLanguage">The SharePoint language.</param>
    ''' <param name="spClientTag">The SharePoint client tag.</param>
    ''' <param name="spProductNumber">The SharePoint product number.</param>
    ''' <param name="httpRequest">The HTTP request.</param>
    ''' <returns>The SharePointContext instance. Returns <c>Nothing</c> if errors occur.</returns>
    Protected MustOverride Function CreateSharePointContext(spHostUrl As Uri, spAppWebUrl As Uri, spLanguage As String, spClientTag As String, spProductNumber As String, httpRequest As HttpRequestBase) As SharePointContext

    ''' <summary>
    ''' Validates if the given SharePointContext can be used with the specified HTTP context.
    ''' </summary>
    ''' <param name="spContext">The SharePointContext.</param>
    ''' <param name="httpContext">The HTTP context.</param>
    ''' <returns>True if the given SharePointContext can be used with the specified HTTP context.</returns>
    Protected MustOverride Function ValidateSharePointContext(spContext As SharePointContext, httpContext As HttpContextBase) As Boolean

    ''' <summary>
    ''' Loads the SharePointContext instance associated with the specified HTTP context.
    ''' </summary>
    ''' <param name="httpContext">The HTTP context.</param>
    ''' <returns>The SharePointContext instance. Returns <c>Nothing</c> if not found.</returns>
    Protected MustOverride Function LoadSharePointContext(httpContext As HttpContextBase) As SharePointContext

    ''' <summary>
    ''' Saves the specified SharePointContext instance associated with the specified HTTP context.
    ''' <c>Nothing</c> is accepted for clearing the SharePointContext instance associated with the HTTP context.
    ''' </summary>
    ''' <param name="spContext">The SharePointContext instance to be saved, or <c>Nothing</c>.</param>
    ''' <param name="httpContext">The HTTP context.</param>
    Protected MustOverride Sub SaveSharePointContext(spContext As SharePointContext, httpContext As HttpContextBase)
End Class

#Region "ACS"

''' <summary>
''' Encapsulates all the information from SharePoint in ACS mode.
''' </summary>
Public Class SharePointAcsContext
    Inherits SharePointContext
    Private ReadOnly m_contextToken As String
    Private ReadOnly m_contextTokenObj As SharePointContextToken

    ''' <summary>
    ''' The context token.
    ''' </summary>
    Public ReadOnly Property ContextToken() As String
        Get
            Return If(Me.m_contextTokenObj.ValidTo > DateTime.UtcNow, Me.m_contextToken, Nothing)
        End Get
    End Property

    ''' <summary>
    ''' The context token's "CacheKey" claim.
    ''' </summary>
    Public ReadOnly Property CacheKey() As String
        Get
            Return If(Me.m_contextTokenObj.ValidTo > DateTime.UtcNow, Me.m_contextTokenObj.CacheKey, Nothing)
        End Get
    End Property

    ''' <summary>
    ''' The context token's "refreshtoken" claim.
    ''' </summary>
    Public ReadOnly Property RefreshToken() As String
        Get
            Return If(Me.m_contextTokenObj.ValidTo > DateTime.UtcNow, Me.m_contextTokenObj.RefreshToken, Nothing)
        End Get
    End Property

    Public Overrides ReadOnly Property UserAccessTokenForSPHost() As String
        Get
            Return GetAccessTokenString(Me.m_userAccessTokenForSPHost, Function() TokenHelper.GetAccessToken(Me.m_contextTokenObj, Me.SPHostUrl.Authority))
        End Get
    End Property

    Public Overrides ReadOnly Property UserAccessTokenForSPAppWeb() As String
        Get
            If Me.SPAppWebUrl Is Nothing Then
                Return Nothing
            End If

            Return GetAccessTokenString(Me.m_userAccessTokenForSPAppWeb, Function() TokenHelper.GetAccessToken(Me.m_contextTokenObj, Me.SPAppWebUrl.Authority))
        End Get
    End Property

    Public Overrides ReadOnly Property AppOnlyAccessTokenForSPHost() As String
        Get
            Return GetAccessTokenString(Me.m_appOnlyAccessTokenForSPHost, Function() TokenHelper.GetAppOnlyAccessToken(TokenHelper.SharePointPrincipal, Me.SPHostUrl.Authority, TokenHelper.GetRealmFromTargetUrl(Me.SPHostUrl)))
        End Get
    End Property

    Public Overrides ReadOnly Property AppOnlyAccessTokenForSPAppWeb() As String
        Get
            If Me.SPAppWebUrl Is Nothing Then
                Return Nothing
            End If

            Return GetAccessTokenString(Me.m_appOnlyAccessTokenForSPAppWeb, Function() TokenHelper.GetAppOnlyAccessToken(TokenHelper.SharePointPrincipal, Me.SPAppWebUrl.Authority, TokenHelper.GetRealmFromTargetUrl(Me.SPAppWebUrl)))
        End Get
    End Property

    Public Sub New(spHostUrl As Uri, spAppWebUrl As Uri, spLanguage As String, spClientTag As String, spProductNumber As String, contextToken As String, contextTokenObj As SharePointContextToken)
        MyBase.New(spHostUrl, spAppWebUrl, spLanguage, spClientTag, spProductNumber)
        If String.IsNullOrEmpty(contextToken) Then
            Throw New ArgumentNullException("contextToken")
        End If

        If contextTokenObj Is Nothing Then
            Throw New ArgumentNullException("contextTokenObj")
        End If

        Me.m_contextToken = contextToken
        Me.m_contextTokenObj = contextTokenObj
    End Sub

    ''' <summary>
    ''' Ensures the access token is valid and returns it.
    ''' </summary>
    ''' <param name="accessToken">The access token to verify.</param>
    ''' <param name="tokenRenewalHandler">The token renewal handler.</param>
    ''' <returns>The access token string.</returns>
    Private Shared Function GetAccessTokenString(ByRef accessToken As Tuple(Of String, DateTime), tokenRenewalHandler As Func(Of OAuth2AccessTokenResponse)) As String
        RenewAccessTokenIfNeeded(accessToken, tokenRenewalHandler)

        Return If(IsAccessTokenValid(accessToken), accessToken.Item1, Nothing)
    End Function

    ''' <summary>
    ''' Renews the access token if it is not valid.
    ''' </summary>
    ''' <param name="accessToken">The access token to renew.</param>
    ''' <param name="tokenRenewalHandler">The token renewal handler.</param>
    Private Shared Sub RenewAccessTokenIfNeeded(ByRef accessToken As Tuple(Of String, DateTime), tokenRenewalHandler As Func(Of OAuth2AccessTokenResponse))
        If IsAccessTokenValid(accessToken) Then
            Return
        End If

        Try
            Dim oAuth2AccessTokenResponse As OAuth2AccessTokenResponse = tokenRenewalHandler()

            Dim expiresOn As DateTime = oAuth2AccessTokenResponse.ExpiresOn

            If (expiresOn - oAuth2AccessTokenResponse.NotBefore) > AccessTokenLifetimeTolerance Then
                ' Make the access token get renewed a bit earlier than the time when it expires
                ' so that the calls to SharePoint with it will have enough time to complete successfully.
                expiresOn -= AccessTokenLifetimeTolerance
            End If

            accessToken = Tuple.Create(oAuth2AccessTokenResponse.AccessToken, expiresOn)
        Catch ex As WebException
        End Try
    End Sub
End Class

''' <summary>
''' Default provider for SharePointAcsContext.
''' </summary>
Public Class SharePointAcsContextProvider
    Inherits SharePointContextProvider
    Private Const SPContextKey As String = "SPContext"
    Private Const SPCacheKeyKey As String = "SPCacheKey"

    Protected Overrides Function CreateSharePointContext(spHostUrl As Uri, spAppWebUrl As Uri, spLanguage As String, spClientTag As String, spProductNumber As String, httpRequest As HttpRequestBase) As SharePointContext
        Dim contextTokenString As String = TokenHelper.GetContextTokenFromRequest(httpRequest)
        If String.IsNullOrEmpty(contextTokenString) Then
            Return Nothing
        End If

        Dim contextToken As SharePointContextToken = Nothing
        Try
            contextToken = TokenHelper.ReadAndValidateContextToken(contextTokenString, httpRequest.Url.Authority)
        Catch ex As WebException
            Return Nothing
        Catch ex As AudienceUriValidationFailedException
            Return Nothing
        End Try

        Return New SharePointAcsContext(spHostUrl, spAppWebUrl, spLanguage, spClientTag, spProductNumber, contextTokenString, contextToken)
    End Function

    Protected Overrides Function ValidateSharePointContext(spContext As SharePointContext, httpContext As HttpContextBase) As Boolean
        Dim spAcsContext As SharePointAcsContext = TryCast(spContext, SharePointAcsContext)

        If spAcsContext IsNot Nothing Then
            Dim spHostUrl As Uri = SharePointContext.GetSPHostUrl(httpContext.Request)
            Dim contextToken As String = TokenHelper.GetContextTokenFromRequest(httpContext.Request)
            Dim spCacheKeyCookie As HttpCookie = httpContext.Request.Cookies(SPCacheKeyKey)
            Dim spCacheKey As String = If(spCacheKeyCookie IsNot Nothing, spCacheKeyCookie.Value, Nothing)

            Return spHostUrl = spAcsContext.SPHostUrl AndAlso
                   Not String.IsNullOrEmpty(spAcsContext.CacheKey) AndAlso
                   spCacheKey = spAcsContext.CacheKey AndAlso
                   Not String.IsNullOrEmpty(spAcsContext.ContextToken) AndAlso
                   (String.IsNullOrEmpty(contextToken) OrElse contextToken = spAcsContext.ContextToken)
        End If

        Return False
    End Function

    Protected Overrides Function LoadSharePointContext(httpContext As HttpContextBase) As SharePointContext
        Return TryCast(httpContext.Session(SPContextKey), SharePointAcsContext)
    End Function

    Protected Overrides Sub SaveSharePointContext(spContext As SharePointContext, httpContext As HttpContextBase)
        Dim spAcsContext As SharePointAcsContext = TryCast(spContext, SharePointAcsContext)

        If spAcsContext IsNot Nothing Then
            Dim spCacheKeyCookie As New HttpCookie(SPCacheKeyKey) With
            {
                .Value = spAcsContext.CacheKey,
                .Secure = True,
                .HttpOnly = True
            }

            httpContext.Response.AppendCookie(spCacheKeyCookie)
        End If

        httpContext.Session(SPContextKey) = spAcsContext
    End Sub
End Class

#End Region

#Region "HighTrust"

''' <summary>
''' Encapsulates all the information from SharePoint in HighTrust mode.
''' </summary>
Public Class SharePointHighTrustContext
    Inherits SharePointContext
    Private ReadOnly m_logonUserIdentity As WindowsIdentity

    ''' <summary>
    ''' The Windows identity for the current user.
    ''' </summary>
    Public ReadOnly Property LogonUserIdentity() As WindowsIdentity
        Get
            Return Me.m_logonUserIdentity
        End Get
    End Property

    Public Overrides ReadOnly Property UserAccessTokenForSPHost() As String
        Get
            Return GetAccessTokenString(Me.m_userAccessTokenForSPHost, Function() TokenHelper.GetS2SAccessTokenWithWindowsIdentity(Me.SPHostUrl, Me.LogonUserIdentity))
        End Get
    End Property

    Public Overrides ReadOnly Property UserAccessTokenForSPAppWeb() As String
        Get
            If Me.SPAppWebUrl Is Nothing Then
                Return Nothing
            End If

            Return GetAccessTokenString(Me.m_userAccessTokenForSPAppWeb, Function() TokenHelper.GetS2SAccessTokenWithWindowsIdentity(Me.SPAppWebUrl, Me.LogonUserIdentity))
        End Get
    End Property

    Public Overrides ReadOnly Property AppOnlyAccessTokenForSPHost() As String
        Get
            Return GetAccessTokenString(Me.m_appOnlyAccessTokenForSPHost, Function() TokenHelper.GetS2SAccessTokenWithWindowsIdentity(Me.SPHostUrl, Nothing))
        End Get
    End Property

    Public Overrides ReadOnly Property AppOnlyAccessTokenForSPAppWeb() As String
        Get
            If Me.SPAppWebUrl Is Nothing Then
                Return Nothing
            End If

            Return GetAccessTokenString(Me.m_appOnlyAccessTokenForSPAppWeb, Function() TokenHelper.GetS2SAccessTokenWithWindowsIdentity(Me.SPAppWebUrl, Nothing))
        End Get
    End Property

    Public Sub New(spHostUrl As Uri, spAppWebUrl As Uri, spLanguage As String, spClientTag As String, spProductNumber As String, logonUserIdentity As WindowsIdentity)
        MyBase.New(spHostUrl, spAppWebUrl, spLanguage, spClientTag, spProductNumber)
        If logonUserIdentity Is Nothing Then
            Throw New ArgumentNullException("logonUserIdentity")
        End If

        Me.m_logonUserIdentity = logonUserIdentity
    End Sub

    ''' <summary>
    ''' Ensures the access token is valid and returns it.
    ''' </summary>
    ''' <param name="accessToken">The access token to verify.</param>
    ''' <param name="tokenRenewalHandler">The token renewal handler.</param>
    ''' <returns>The access token string.</returns>
    Private Shared Function GetAccessTokenString(ByRef accessToken As Tuple(Of String, DateTime), tokenRenewalHandler As Func(Of String)) As String
        RenewAccessTokenIfNeeded(accessToken, tokenRenewalHandler)

        Return If(IsAccessTokenValid(accessToken), accessToken.Item1, Nothing)
    End Function

    ''' <summary>
    ''' Renews the access token if it is not valid.
    ''' </summary>
    ''' <param name="accessToken">The access token to renew.</param>
    ''' <param name="tokenRenewalHandler">The token renewal handler.</param>
    Private Shared Sub RenewAccessTokenIfNeeded(ByRef accessToken As Tuple(Of String, DateTime), tokenRenewalHandler As Func(Of String))
        If IsAccessTokenValid(accessToken) Then
            Return
        End If

        Dim expiresOn As DateTime = DateTime.UtcNow.Add(TokenHelper.HighTrustAccessTokenLifetime)

        If TokenHelper.HighTrustAccessTokenLifetime > AccessTokenLifetimeTolerance Then
            ' Make the access token get renewed a bit earlier than the time when it expires
            ' so that the calls to SharePoint with it will have enough time to complete successfully.
            expiresOn -= AccessTokenLifetimeTolerance
        End If

        accessToken = Tuple.Create(tokenRenewalHandler(), expiresOn)
    End Sub
End Class

''' <summary>
''' Default provider for SharePointHighTrustContext.
''' </summary>
Public Class SharePointHighTrustContextProvider
    Inherits SharePointContextProvider
    Private Const SPContextKey As String = "SPContext"

    Protected Overrides Function CreateSharePointContext(spHostUrl As Uri, spAppWebUrl As Uri, spLanguage As String, spClientTag As String, spProductNumber As String, httpRequest As HttpRequestBase) As SharePointContext
        Dim logonUserIdentity As WindowsIdentity = httpRequest.LogonUserIdentity
        If logonUserIdentity Is Nothing Or Not logonUserIdentity.IsAuthenticated Or logonUserIdentity.IsGuest Or logonUserIdentity.User Is Nothing Then
            Return Nothing
        End If

        Return New SharePointHighTrustContext(spHostUrl, spAppWebUrl, spLanguage, spClientTag, spProductNumber, logonUserIdentity)
    End Function

    Protected Overrides Function ValidateSharePointContext(spContext As SharePointContext, httpContext As HttpContextBase) As Boolean
        Dim spHighTrustContext As SharePointHighTrustContext = TryCast(spContext, SharePointHighTrustContext)

        If spHighTrustContext IsNot Nothing Then
            Dim spHostUrl As Uri = SharePointContext.GetSPHostUrl(httpContext.Request)
            Dim logonUserIdentity As WindowsIdentity = httpContext.Request.LogonUserIdentity

            Return spHostUrl = spHighTrustContext.SPHostUrl AndAlso
                   logonUserIdentity IsNot Nothing AndAlso
                   logonUserIdentity.IsAuthenticated AndAlso
                   Not logonUserIdentity.IsGuest AndAlso
                   logonUserIdentity.User = spHighTrustContext.LogonUserIdentity.User
        End If

        Return False
    End Function

    Protected Overrides Function LoadSharePointContext(httpContext As HttpContextBase) As SharePointContext
        Return TryCast(httpContext.Session(SPContextKey), SharePointHighTrustContext)
    End Function

    Protected Overrides Sub SaveSharePointContext(spContext As SharePointContext, httpContext As HttpContextBase)
        httpContext.Session(SPContextKey) = TryCast(spContext, SharePointHighTrustContext)
    End Sub
End Class

#End Region
