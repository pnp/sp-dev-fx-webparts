import { sp, IEmailProperties } from '@pnp/sp/presets/all';
import { BaseService } from './base.service';
import { LogHelper } from 'utilities';

export class NotificationService extends BaseService {

    public async sendEmail(emailProps: IEmailProperties) {
        LogHelper.verbose(this.constructor.name, 'sendQuestionNotification', '');

        if (emailProps.Subject.length > 255) {
            emailProps.Subject = emailProps.Subject.substring(0, 252).concat('...');
        }

        if (emailProps.To && emailProps.To.length > 0) {
            await sp.utility.sendEmail(emailProps)
                .catch(e => {
                    super.handleHttpError('sendEmail', e);
                    throw e;
                });
            LogHelper.verbose(this.constructor.name, 'sendEmail', 'Email sent');
        }
        else {
            LogHelper.verbose(this.constructor.name, 'sendEmail', 'Email not sent - No to recipient');
        }
    }

}
