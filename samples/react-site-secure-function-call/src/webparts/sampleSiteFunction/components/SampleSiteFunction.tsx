import * as React from 'react';
import styles from './SampleSiteFunction.module.scss';
import * as strings from 'SampleSiteFunctionWebPartStrings';
import type { ISampleSiteFunctionProps } from './ISampleSiteFunctionProps';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from "@fluentui/react/lib/TextField";
import FunctionService from '../../../services/FunctionService';

export const SampleSiteFunction: React.FC<ISampleSiteFunctionProps> = (props) => {
  const [url, setUrl] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const onUrlChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void => {
    setUrl(value);
  };

  const onDescriptionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void => {
    setDescription(value);
  };

  const assignPermissions = async (): Promise<void> => {    
    const graphService = new FunctionService(props.serviceScope);

    const resp = await graphService.setNewSiteDescreption(url, description);
    console.log(resp);
  };

  return (
    <section className={`${styles.sampleSiteFunction} ${props.hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.field}>          
        <h2>{strings.HeaderLabel}</h2>
      </div>      
      <div className={styles.field}>
        <TextField
            label={strings.URLLabel}
            value={url}         
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onUrlChange}
            placeholder={strings.URLPlaceholder} />
      </div>
      <div className={styles.field}>
        <TextField
            label={strings.NewDescriptionLabel}
            value={description}        
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onDescriptionChange}
            placeholder={strings.NewDescriptionPlaceholder} />
      </div>
      <div className={styles.field}>
        <PrimaryButton text={strings.SetNewDescriptionLabel} 
                        onClick={assignPermissions} 
                        allowDisabledFocus />
      </div>
    </section>
  );
}
