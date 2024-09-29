import * as React from 'react';
import styles from './Induction.module.scss';
import type { IInductionProps } from './IInductionProps';
import { Stepper, Button, Group, Text, Flex } from '@mantine/core';
import { usePapaParse } from "react-papaparse";
import axios from 'axios';
import { FileWithPath } from '@mantine/dropzone';
import { EmployeeOnboarding } from '../../../types/Components.Types';
import DropzoneComponent from './DropzoneComponent';
import EmployeeTable from './EmployeeTable';
import OnboardingTimeline from './OnboardingTimeline';
import { IconExternalLink } from '@tabler/icons-react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from './webPartTitle';

const Induction: React.FC<IInductionProps> = (props) => {
  const { listUrl, azureFunctionUrl, context, description, title } = props;
  const { readString } = usePapaParse();
  const [active, setActive] = React.useState(0);
  const [acceptedFiles, setAcceptedFiles] = React.useState<FileWithPath>({} as FileWithPath);
  const [importedData, setImportedData] = React.useState<EmployeeOnboarding[]>([]);
  const [data, setData] = React.useState<EmployeeOnboarding[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [completed, setCompleted] = React.useState<boolean>(false);

  const parseCSVFile = (file: File): void => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvString = event.target?.result;
      if (typeof csvString === 'string') {
        readString(csvString, {
          header: true,
          worker: true,
          complete: (results) => {
            setImportedData(results.data.map((item: any) => ({
              name: item.Name,
              email: item.Email,
              department: item.Department
            })) as EmployeeOnboarding[]);            
            if (results.data.length > 0) {
              setActive(1);
            }
          },
        });
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (files: FileWithPath[]): void => {
    if (files.length > 1) {
      alert('Only one file is allowed');
      return;
    }
    setAcceptedFiles(files[0]);
    parseCSVFile(files[0]);
  };

  const handleStepClick = (stepIndex: number): void => {
    setActive(stepIndex);
  };

  const handleOnboarding = async (): Promise<void> => {
    try {
      setLoading(true);
      const headers = { 'Content-Type': 'application/json' };
      const response = await axios.post(azureFunctionUrl, importedData, { headers });      
      setData(response.data);
      setCompleted(true);
      setTimeout(() => {
        setActive(2);
      }, 3000);
    } catch (err) {
      console.error(err);
      setCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigure = ():void => {
    // Context of the web part
    context.propertyPane.open();
  }

  if (!listUrl || !azureFunctionUrl) {
    return (
      <Placeholder
        iconName='Edit'
        iconText='Configure your web part'
        description='Please configure the web part to start using it.'
        buttonLabel='Configure'
        onConfigure={handleConfigure}
      />
    );
  }

  return (
    <section className={`${styles.induction}`}>
      <WebPartTitle title={title} description={description} />
      <Stepper active={active} breakpoint="sm" onStepClick={handleStepClick} radius={"md"}>
        <Stepper.Step label="Step 1" description="Import users detail">
          <DropzoneComponent handleDrop={handleDrop} {...props} />
          {importedData.length > 0 && (
            <Flex style={{ marginTop: '20px', padding: '10px' }} mih={50} gap="md" justify="flex-start" align="flex-start" direction="column" wrap="wrap">
              <EmployeeTable data={importedData} fileName={acceptedFiles.name} />
            </Flex>
          )}
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Onboarding">
          <Flex style={{ marginTop: '20px', padding: '10px' }} mih={50} gap="md" justify="flex-start" align="flex-start" direction="column" wrap="wrap">
            <EmployeeTable data={importedData} />
            <Text fs="italic" fz="md" fw={500} c="#333333" > The following changes will be made for each user:</Text>
            <OnboardingTimeline data={data} />
            {!completed && <Button loading={loading} loaderProps={{ type: 'dots' }} onClick={handleOnboarding} style={{ marginTop: 40 }} gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Proceed</Button>}
          </Flex>
        </Stepper.Step>
        <Stepper.Completed>
          <EmployeeTable data={data} isCompleted />
          <Group position="center" mt="xl">
            <Button component="a" href={`${listUrl}`} variant="outline" leftIcon={<IconExternalLink size="0.9rem" />}>
              View more detail
            </Button>
          </Group>
        </Stepper.Completed>
      </Stepper>
    </section>
  );
};

export default Induction;