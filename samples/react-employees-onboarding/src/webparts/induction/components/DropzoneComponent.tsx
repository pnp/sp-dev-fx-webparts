import * as React from "react";
import { Group, Text, rem } from '@mantine/core';
import { IconFileTypeCsv } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, MIME_TYPES } from "@mantine/dropzone";

const DropzoneComponent: React.FC<Partial<DropzoneProps> & { handleDrop: (files: FileWithPath[]) => void }> = (props) => {
  return (
    <Dropzone
      onDrop={(files) => props.handleDrop(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={[MIME_TYPES.csv]}
      {...props}
    >
      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Idle>
          <IconFileTypeCsv size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            Drag or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Please note that only CSV files are supported, and each file should not exceed 5 MB.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default DropzoneComponent;