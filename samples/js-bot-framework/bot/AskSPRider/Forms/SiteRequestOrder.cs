using System;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.FormFlow;
using System.Threading.Tasks;
using AskSPRider.Models;
using AskSPRider.Helper;
using System.ComponentModel;

namespace AskSPRider.Forms
{
    public enum SiteTemplateOptions
    {
        [Description("STS#0")]
        Team,
        [Description("PROJECTSITE#0")]
        Project,
        [Description("BLOG#0")]
        Blog
    };

    [Serializable]
    public class SiteRequestOrder
    {
        [Prompt("Where(parent site url) you would like to create the sub-site")]
        public string ParentSiteUrl;

        [Prompt("What is the sub-site title?")]
        public string Title;

        [Optional]
        [Prompt("What is the sub-site description?")]
        public string Description;

        [Optional]
        [Prompt("What is the sub-site URL Name?")]
        public string URLName;

        [Describe("site template")]
        public SiteTemplateOptions? Template;

        public static IForm<SiteRequestOrder> BuildForm()
        {

            OnCompletionAsyncDelegate<SiteRequestOrder> wrapUpRequest = async (context, request) =>
            {

                try
                {
                    SiteRequest siteRquest = new SiteRequest();
                    siteRquest.ParentSiteUrl = request.ParentSiteUrl;
                    siteRquest.Title = request.Title;
                    siteRquest.Description = request.Description;
                    siteRquest.URLName = request.URLName;
                    siteRquest.Template = Common.GetDescription(request.Template); ;

                    string wrapUpMessage = Helper.ProcessRequest.createSubSite(siteRquest);
                    await context.PostAsync(wrapUpMessage);
                }
                catch (FormCanceledException<SiteRequestOrder> e)
                {
                    string reply;
                    if (e.InnerException == null)
                    {
                        reply = $"You quit on {e.Last}--maybe you can finish next time!";
                    }
                    else
                    {
                        reply = "There is a problem in creating the sub-site at this moment. Please try again later.";
                    }
                    await context.PostAsync(reply);
                }
            };

            return new FormBuilder<SiteRequestOrder>()
                        .Message("Welcome to SPOL Site Request bot!")
                        .Field(nameof(ParentSiteUrl), validate: ParentSiteValidator)
                        .Field(nameof(Title))
                        .Field(nameof(Description))
                        .Field(nameof(URLName), validate: SubSiteValidator)
                        .Field(nameof(Template))
                        .AddRemainingFields()
                        .Confirm("Do you want to submit your sub-site request - {Title}?")
                        .Message("Thanks for submitting a new sub-site!")
                        .OnCompletion(wrapUpRequest)
                        .Build();
        }

        private static ValidateAsyncDelegate<SiteRequestOrder> ParentSiteValidator = async (state, response) =>
        {
            var result = new ValidateResult { IsValid = true, Value = response };
            var parentSiteURL = (response as string).Trim();

            if (!Helper.ProcessRequest.checkSiteStatus(parentSiteURL))
            {
                result.Feedback = "Sorry, that is not a parent site.";
                result.IsValid = false;
            }

            return await Task.FromResult(result);
        };

        private static ValidateAsyncDelegate<SiteRequestOrder> SubSiteValidator = async (state, response) =>
        {
            var result = new ValidateResult { IsValid = true, Value = response };
            var subSiteURL = state.ParentSiteUrl + "/" + (response as string).Trim();

            if (Helper.ProcessRequest.checkSiteStatus(subSiteURL))
            {
                result.Feedback = "Sorry, A sub-site exist with the same URL Name. Please select a different URL Name.";
                result.IsValid = false;
            }

            return await Task.FromResult(result);
        };


    }
}