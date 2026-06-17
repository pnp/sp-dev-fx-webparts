import * as React from "react";
import { Card, Stack, Text, PrimaryButton, DefaultButton, Badge } from "@fluentui/react";
import { IResource } from "../models/IResource";
import { BookingService } from "../services/BookingService";
import BookingForm from "./BookingForm";
import styles from "./HotDeskBooking.module.scss";

interface Props {
  resource: IResource;
  onBookingCreated: () => Promise<void>;
  bookingService: BookingService;
}

const ResourceCard: React.FC<Props> = ({ resource, onBookingCreated, bookingService }) => {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <>
      <Card className={styles.resourceCard}>
        <Stack tokens={{ childrenGap: 12 }}>
          <Stack horizontal horizontalAlign="space-between">
            <Text variant="large" className={styles.resourceTitle}>
              {resource.title}
            </Text>
            <Badge appearance="primary" size="large">
              {resource.resourceType}
            </Badge>
          </Stack>

          {resource.location && (
            <Text variant="small">
              <strong>Location:</strong> {resource.location}
            </Text>
          )}

          {resource.description && (
            <Text variant="small">{resource.description}</Text>
          )}

          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <PrimaryButton
              text="Book"
              onClick={() => setShowForm(true)}
              className={styles.bookButton}
            />
          </Stack>
        </Stack>
      </Card>

      {showForm && (
        <BookingForm
          isOpen={showForm}
          resource={resource}
          onDismiss={() => setShowForm(false)}
          onSubmitted={onBookingCreated}
          bookingService={bookingService}
        />
      )}
    </>
  );
};

export default ResourceCard;
