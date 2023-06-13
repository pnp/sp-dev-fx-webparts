import * as React from 'react';
import styles from './InvoiceGenerator.module.scss';
import { InvoiceService } from '../../services/InvoiceService';
import { IInvoiceItem, IInvoice } from '../../models/index'
import { IInvoiceGeneratorProps } from './IInvoiceGeneratorProps';
import { InvoiceHeader } from './InvoiceHeader/InvoiceHeader';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import { InvoiceSummary } from './InvoiceSummary/InvoiceSummary';
import { Icon } from '@fluentui/react/lib/Icon';
import { PDFGenerator } from './PDFGenerator/PDFGenerator';
import { pdf } from '@react-pdf/renderer';
import { InvoiceItemRow } from './InvoiceItemRow/InvoiceItemRow';
import * as strings from 'InvoiceGeneratorWebPartStrings';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { Customizer } from "@uifabric/utilities/lib/";

const Plus = (): JSX.Element => <Icon iconName="CirclePlus" />;

export const InvoiceGenerator: React.FC<IInvoiceGeneratorProps> = (props) => {
  const { context, listId, taxRate, companyAddress, companyName, logoImage, themeVariant } = props;
  const [invoices, setInvoices] = React.useState<IInvoice[]>([]);
  const [selectedInvoiceIndex, setSelectedInvoiceIndex] = React.useState<string>('0');
  const [invoiceItems, setInvoiceItems] = React.useState<IInvoiceItem[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<IInvoiceItem>(null);
  const [itemDescription, setItemDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [showAddItemForm, setShowAddItemForm] = React.useState(false);
  const [issueDate, setIssueDate] = React.useState<Date>(new Date());
  const [dueDate, setDueDate] = React.useState<Date>(new Date());


  React.useEffect(() => {
    const invoiceService = new InvoiceService(context);
    invoiceService.getInvoice(listId)
      .then((data: IInvoice[]) => {
        setInvoices(data);
      })
      .catch((error) => {
        console.error('Error loading invoices:', error);

      });
  }, [listId, context]);

  const calculateSubtotal = (): number => {
    const subtotal = invoiceItems.reduce((acc, cur) => acc + cur.totalAmount, 0);
    return subtotal;
  };

  const calculateTax = (): number => {
    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal * taxRate) / 100;
    return taxAmount;
  };

  const calculateTotal = (): number => {

    const subtotal = calculateSubtotal();
    const taxAmount = calculateTax();
    const total = subtotal + taxAmount;

    if (isNaN(total)) {
      return 0;
    }

    return total;
  };

  const onItemSelected = (item: IInvoiceItem): void => {
    setSelectedItem(item);
    setItemDescription(item.description);
    setQuantity(item.quantity);
    setPrice(item.price);
  };

  const toggleAddItemForm = (): void => {
    setShowAddItemForm(!showAddItemForm);
  };

  const handleDeleteItem = (): void => {
    if (!selectedItem) {
      console.error('No item selected for deletion');
      return;
    }

    try {
      const updatedItems = invoiceItems.filter((item) => item !== selectedItem);
      setInvoiceItems(updatedItems);
      setSelectedItem(null);
      setItemDescription('');
      setQuantity(0);
      setPrice(0);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddItem = (): void => {
    if (!itemDescription || quantity === 0 || price === 0) {
      return;
    }

    const newInvoiceItem: IInvoiceItem = {
      description: itemDescription,
      id: invoiceItems.length + 1,
      quantity,
      price,
      totalAmount: quantity * price,
    };

    const updatedItems = [...invoiceItems, newInvoiceItem];

    setInvoiceItems(updatedItems);
    setItemDescription('');
    setQuantity(0);
    setPrice(0);
    setShowAddItemForm(false);
  };


  const handlePdfGeneration = async (): Promise<void> => {
    if (invoiceItems.length === 0) {

      return;
    }
    const invoiceData = {
      items: invoiceItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      invoiceNumber: invoices[Number(selectedInvoiceIndex)]?.ID,
      customerName: invoices[Number(selectedInvoiceIndex)]?.Title,
      customerAddress: invoices[Number(selectedInvoiceIndex)]?.billTo,
      companyAddress,
      companyName,
      issueDate,
      dueDate,
      logoImage
    };

    const pdfContent = <PDFGenerator {...invoiceData} />;
    const fileName = `invoice-#000${invoiceData.invoiceNumber}.pdf`;

    const blob = await pdf(pdfContent).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const DefaultExample = (): JSX.Element => (
    <MessageBar>
      Please add items to the invoice before generating a PDF.
    </MessageBar>
  );

  return (
    <Customizer settings={{ theme: themeVariant }}>


      <div className={styles.invoiceGenerator}>

        {(!invoices || invoices.length === 0 || !listId) && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part properties."
            buttonLabel="Configure"
            onConfigure={() => {
              context.propertyPane.open();
            }}
            theme={props.themeVariant}
          />
        )}
        {invoices && invoices.length > 0 && (
          <>
            <div className={styles.invoiceSelect}>
              <label style={{ marginRight: '8px', fontWeight: '700' }}>{strings.selectInvoicesLabel}</label>
              <Dropdown
                options={invoices.map((invoice, index) => ({
                  key: index.toString(),
                  text: `${strings.invoiceText} ${invoice.ID} - ${invoice.Title}`,
                }))}
                selectedKey={selectedInvoiceIndex.toString()}
                onChange={(event, option) => setSelectedInvoiceIndex(option.key.toString())}
              />
            </div>
            <div className={styles.header}>
              <img className={styles.companyLogo} src={logoImage} alt={strings.companyLogoAlt} height="100" width="100" />
              <div className={styles.title}>{strings.invoiceTitle}</div>
            </div>

            <InvoiceHeader
              invoiceNumber={invoices[Number(selectedInvoiceIndex)]?.ID}
              customerName={invoices[Number(selectedInvoiceIndex)]?.Title}
              customerAddress={invoices[Number(selectedInvoiceIndex)]?.billTo}
              companyAddress={companyAddress}
              companyName={companyName}
              amountdue={calculateTotal()}
              issueDate={issueDate}
              dueDate={dueDate}
              onIssueDateChange={setIssueDate}
              onDueDateChange={setDueDate}
            />
            <div className={styles.itemsContainer}>
              <div className={styles.itemsTable}>
                <div className={styles.itemsTableHeader}>
                  <div className={styles.itemDescription}>{strings.itemDescriptionText}</div>
                  <div className={styles.itemQuantity}>{strings.quantityText}</div>
                  <div className={styles.itemPrice}>{strings.priceText}</div>
                  <div className={styles.itemTotal}>{strings.totalText}</div>

                </div>
                {showAddItemForm && (
                  <div className={styles.addItem}>
                    <div className={styles.inputWrapper}>
                      <input
                        type="text"
                        placeholder={strings.itemDescriptionPlaceholder}
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <input
                        type="number"
                        placeholder={strings.quantityPlaceholder}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <input
                        type="number"
                        placeholder={strings.pricePlaceholder}
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                      />
                    </div>

                    <div onClick={handleAddItem} className={styles.submitButton}>{strings.submitButtonText}</div>
                  </div>
                )}
                {invoiceItems.map((item) => (
                  <InvoiceItemRow
                    key={item.id}
                    item={item}
                    isSelected={item === selectedItem}
                    onItemSelected={onItemSelected}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}

                <div className={styles.fullWidthPlusButton} onClick={toggleAddItemForm}>
                  <Plus />{strings.addItemButtonText}
                </div>
                {invoiceItems.length === 0 && showAddItemForm && (
                  <DefaultExample />
                )}
                <div className={styles.itemsTableFooter}>
                  <InvoiceSummary subtotal={calculateSubtotal()} taxRate={taxRate} total={calculateTotal()} />
                  <button className={styles.footerButton} onClick={handlePdfGeneration}>{strings.downloadPdfButtonText}</button>
                </div>

              </div>
            </div>
          </>
        )}
      </div>

    </Customizer>

  );
}

