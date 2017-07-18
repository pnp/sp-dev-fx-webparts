Imports System
Imports System.Web.Mvc

''' <summary>
''' SharePoint action filter attribute.
''' </summary>
Public Class SharePointContextFilterAttribute
    Inherits ActionFilterAttribute

    Public Overrides Sub OnActionExecuting(filterContext As ActionExecutingContext)
        If filterContext Is Nothing Then
            Throw New ArgumentNullException("filterContext")
        End If

        Dim redirectUrl As Uri = Nothing
        Select Case SharePointContextProvider.CheckRedirectionStatus(filterContext.HttpContext, redirectUrl)
            Case RedirectionStatus.Ok
                Return
            Case RedirectionStatus.ShouldRedirect
                filterContext.Result = New RedirectResult(redirectUrl.AbsoluteUri)
                Exit Select
            Case RedirectionStatus.CanNotRedirect
                filterContext.Result = New ViewResult() With {.ViewName = "Error"}
                Exit Select
        End Select
    End Sub
End Class
