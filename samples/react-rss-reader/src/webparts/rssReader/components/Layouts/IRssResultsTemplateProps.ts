import { IRssResultsTemplateContext } from                 './';
import { BaseTemplateService } from                        '../../../../services/TemplateService';

export interface IRssResultsTemplateProps {

    /**
     * The template helper instance
     */
    templateService: BaseTemplateService;

    /**
     * The template context
     */
    templateContext: IRssResultsTemplateContext;

    /**
     * The Handlebars raw template content for a single item
     */
    templateContent: string;
}
