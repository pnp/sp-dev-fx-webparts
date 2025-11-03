import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Stack,
  IconButton,
  TooltipHost,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  TextField,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Label,
  Dropdown,
  IDropdownOption,
  Icon
} from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ImageUploadService } from '../services/ImageUploadService';
import styles from './RichTextEditor.module.scss';

interface IRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  context?: WebPartContext;
}

const RichTextEditor: React.FC<IRichTextEditorProps> = ({ value, onChange, disabled, context }) => {
  const [isSourceMode, setIsSourceMode] = useState<boolean>(false);
  const [showImageDialog, setShowImageDialog] = useState<boolean>(false);
  const [showTableDialog, setShowTableDialog] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<{ text: string; type: MessageBarType } | null>(null);
  const [tableRows, setTableRows] = useState<string>('3');
  const [tableCols, setTableCols] = useState<string>('3');
  const editorRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageService = useRef<ImageUploadService | null>(null);

  // Initialize image service
  useEffect(() => {
    if (context) {
      imageService.current = new ImageUploadService(context);
    }
  }, [context]);

  const sanitizeHtml = (html: string): string => {
    let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
    sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    return sanitized;
  };

  // Initialize editor content only once
  useEffect(() => {
    if (editorRef.current && !isSourceMode && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = sanitizeHtml(value || '');
    }
  }, [value, isSourceMode]);

  const saveSelection = (): Range | null => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };

  const restoreSelection = (range: Range | null): void => {
    if (range) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const handleContentChange = (): void => {
    if (editorRef.current && !disabled) {
      const content = editorRef.current.innerHTML;
      const sanitized = sanitizeHtml(content);
      onChange(sanitized);
    }
  };

  const handleSourceChange = (newValue: string): void => {
    const sanitized = sanitizeHtml(newValue);
    onChange(sanitized);
  };

  const toggleSourceMode = (): void => {
    if (isSourceMode) {
      // Switch to visual mode
      if (editorRef.current) {
        editorRef.current.innerHTML = value;
      }
    }
    setIsSourceMode(!isSourceMode);
  };

  const execCommand = (command: string, val: string = ''): void => {
    if (disabled || isSourceMode) return;
    
    const savedRange = saveSelection();
    document.execCommand(command, false, val);
    
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        restoreSelection(savedRange);
      }
      handleContentChange();
    }, 0);
  };

  const insertTable = (): void => {
    if (disabled || isSourceMode) return;

    const rows = parseInt(tableRows) || 3;
    const cols = parseInt(tableCols) || 3;

    let tableHtml = '<table style="border-collapse: collapse; width: 100%; margin: 10px 0; border: 1px solid #c8c6c4;">';
    for (let i = 0; i < rows; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < cols; j++) {
        const tag = i === 0 ? 'th' : 'td';
        const style = 'border: 1px solid #c8c6c4; padding: 8px; ' + (tag === 'th' ? 'background-color: #f3f2f1; font-weight: 600;' : '');
        tableHtml += `<${tag} style="${style}">${tag === 'th' ? `Header ${j + 1}` : 'Cell'}</${tag}>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table><p><br></p>';

    if (editorRef.current) {
      editorRef.current.focus();
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tableHtml;
        
        const frag = document.createDocumentFragment();
        let node;
        while ((node = tempDiv.firstChild)) {
          frag.appendChild(node);
        }
        range.insertNode(frag);
      } else {
        editorRef.current.innerHTML += tableHtml;
      }
      
      handleContentChange();
    }

    setShowTableDialog(false);
    setTableRows('3');
    setTableCols('3');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setUploadMessage(null);
      
      const reader = new FileReader();
      reader.onload = (e): void => {
        const result = e.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadMessage({ text: 'Please select a valid image file', type: MessageBarType.error });
    }
  };

  const insertImage = async (): Promise<void> => {
    if (disabled || isSourceMode) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      let finalImageUrl = imageUrl;

      if (selectedFile && context && imageService.current) {
        setUploadMessage({ text: 'Uploading image to SharePoint...', type: MessageBarType.info });
        
        try {
          const uploadResult = await imageService.current.uploadImage(selectedFile);
          
          if (uploadResult.success && uploadResult.absoluteUrl) {
            finalImageUrl = uploadResult.absoluteUrl;
            setUploadMessage({ text: 'Image uploaded successfully to SharePoint!', type: MessageBarType.success });
          } else {
            setUploadMessage({ 
              text: `Failed to upload image: ${uploadResult.error || 'Unknown error'}. Please try again.`, 
              type: MessageBarType.error 
            });
            setIsUploading(false);
            return;
          }
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          setUploadMessage({ 
            text: 'Error uploading image to SharePoint. Please check permissions and try again.', 
            type: MessageBarType.error 
          });
          setIsUploading(false);
          return;
        }
      } else if (selectedFile && !context) {
        setUploadMessage({ 
          text: 'SharePoint context not available. Cannot upload image.', 
          type: MessageBarType.error 
        });
        setIsUploading(false);
        return;
      } else if (!imageUrl && !selectedFile) {
        setUploadMessage({ text: 'Please select an image or enter URL', type: MessageBarType.error });
        setIsUploading(false);
        return;
      }

      const imgHtml = `<img src="${sanitizeHtml(finalImageUrl)}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px;" alt="Inserted image" />`;
      
      if (editorRef.current) {
        editorRef.current.focus();
        
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = imgHtml;
          
          const frag = document.createDocumentFragment();
          let node;
          while ((node = tempDiv.firstChild)) {
            frag.appendChild(node);
          }
          range.insertNode(frag);
        } else {
          editorRef.current.innerHTML += imgHtml;
        }
        
        handleContentChange();
      }

      setTimeout(() => {
        setShowImageDialog(false);
        setImageUrl('');
        setSelectedFile(null);
        setUploadMessage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);

    } catch (error) {
      console.error('Error inserting image:', error);
      setUploadMessage({ text: 'Error inserting image', type: MessageBarType.error });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDialogDismiss = (): void => {
    setShowImageDialog(false);
    setImageUrl('');
    setSelectedFile(null);
    setUploadMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const headingOptions: IDropdownOption[] = [
    { key: 'p', text: 'Normal' },
    { key: 'h1', text: 'Heading 1' },
    { key: 'h2', text: 'Heading 2' },
    { key: 'h3', text: 'Heading 3' },
    { key: 'h4', text: 'Heading 4' },
    { key: 'h5', text: 'Heading 5' },
    { key: 'h6', text: 'Heading 6' }
  ];

  const applyHeading = (key: string): void => {
    execCommand('formatBlock', `<${key}>`);
  };

  return (
    <div className={styles.richTextEditor}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <Stack horizontal tokens={{ childrenGap: 5 }} wrap>
          <Dropdown
            options={headingOptions}
            defaultSelectedKey="p"
            onChange={(e, option) => option && applyHeading(option.key as string)}
            disabled={disabled || isSourceMode}
            styles={{ root: { width: 120 } }}
          />

          <div className={styles.divider} />

          <TooltipHost content="Bold (Ctrl+B)">
            <IconButton iconProps={{ iconName: 'Bold' }} onClick={() => execCommand('bold')} disabled={disabled || isSourceMode} ariaLabel="Bold" />
          </TooltipHost>
          
          <TooltipHost content="Italic (Ctrl+I)">
            <IconButton iconProps={{ iconName: 'Italic' }} onClick={() => execCommand('italic')} disabled={disabled || isSourceMode} ariaLabel="Italic" />
          </TooltipHost>
          
          <TooltipHost content="Underline (Ctrl+U)">
            <IconButton iconProps={{ iconName: 'Underline' }} onClick={() => execCommand('underline')} disabled={disabled || isSourceMode} ariaLabel="Underline" />
          </TooltipHost>

          <TooltipHost content="Strikethrough">
            <IconButton iconProps={{ iconName: 'Strikethrough' }} onClick={() => execCommand('strikeThrough')} disabled={disabled || isSourceMode} ariaLabel="Strikethrough" />
          </TooltipHost>

          <div className={styles.divider} />

          <TooltipHost content="Increase Font Size">
            <IconButton iconProps={{ iconName: 'FontIncrease' }} onClick={() => execCommand('fontSize', '4')} disabled={disabled || isSourceMode} ariaLabel="Increase Font" />
          </TooltipHost>

          <TooltipHost content="Decrease Font Size">
            <IconButton iconProps={{ iconName: 'FontDecrease' }} onClick={() => execCommand('fontSize', '2')} disabled={disabled || isSourceMode} ariaLabel="Decrease Font" />
          </TooltipHost>

          <div className={styles.divider} />

          <TooltipHost content="Text Color">
            <IconButton iconProps={{ iconName: 'FontColor' }} onClick={() => execCommand('foreColor', '#0078d4')} disabled={disabled || isSourceMode} ariaLabel="Text Color" />
          </TooltipHost>

          <TooltipHost content="Background Color">
            <IconButton iconProps={{ iconName: 'Highlight' }} onClick={() => execCommand('hiliteColor', '#ffff00')} disabled={disabled || isSourceMode} ariaLabel="Background Color" />
          </TooltipHost>

          <div className={styles.divider} />

          <TooltipHost content="Bulleted List">
            <IconButton iconProps={{ iconName: 'BulletedList' }} onClick={() => execCommand('insertUnorderedList')} disabled={disabled || isSourceMode} ariaLabel="Bulleted List" />
          </TooltipHost>
          
          <TooltipHost content="Numbered List">
            <IconButton iconProps={{ iconName: 'NumberedList' }} onClick={() => execCommand('insertOrderedList')} disabled={disabled || isSourceMode} ariaLabel="Numbered List" />
          </TooltipHost>

          <TooltipHost content="Decrease Indent">
            <IconButton iconProps={{ iconName: 'DecreaseIndent' }} onClick={() => execCommand('outdent')} disabled={disabled || isSourceMode} ariaLabel="Decrease Indent" />
          </TooltipHost>

          <TooltipHost content="Increase Indent">
            <IconButton iconProps={{ iconName: 'IncreaseIndent' }} onClick={() => execCommand('indent')} disabled={disabled || isSourceMode} ariaLabel="Increase Indent" />
          </TooltipHost>

          <div className={styles.divider} />

          <TooltipHost content="Align Left">
            <IconButton iconProps={{ iconName: 'AlignLeft' }} onClick={() => execCommand('justifyLeft')} disabled={disabled || isSourceMode} ariaLabel="Align Left" />
          </TooltipHost>
          
          <TooltipHost content="Align Center">
            <IconButton iconProps={{ iconName: 'AlignCenter' }} onClick={() => execCommand('justifyCenter')} disabled={disabled || isSourceMode} ariaLabel="Align Center" />
          </TooltipHost>
          
          <TooltipHost content="Align Right">
            <IconButton iconProps={{ iconName: 'AlignRight' }} onClick={() => execCommand('justifyRight')} disabled={disabled || isSourceMode} ariaLabel="Align Right" />
          </TooltipHost>

          <TooltipHost content="Justify">
            <IconButton iconProps={{ iconName: 'AlignJustify' }} onClick={() => execCommand('justifyFull')} disabled={disabled || isSourceMode} ariaLabel="Justify" />
          </TooltipHost>

          <div className={styles.divider} />

          <TooltipHost content="Insert Link">
            <IconButton
              iconProps={{ iconName: 'Link' }}
              onClick={() => {
                const url = prompt('Enter URL:');
                if (url) execCommand('createLink', url);
              }}
              disabled={disabled || isSourceMode}
              ariaLabel="Insert Link"
            />
          </TooltipHost>

          <TooltipHost content="Insert Table">
            <IconButton iconProps={{ iconName: 'Table' }} onClick={() => setShowTableDialog(true)} disabled={disabled || isSourceMode} ariaLabel="Insert Table" />
          </TooltipHost>
          
          <TooltipHost content="Insert Image">
            <IconButton iconProps={{ iconName: 'FileImage' }} onClick={() => setShowImageDialog(true)} disabled={disabled || isSourceMode} ariaLabel="Insert Image" />
          </TooltipHost>

          <TooltipHost content="Insert Horizontal Line">
            <IconButton iconProps={{ iconName: 'ChromeMinimize' }} onClick={() => execCommand('insertHorizontalRule')} disabled={disabled || isSourceMode} ariaLabel="Insert Horizontal Line" />
          </TooltipHost>

          <div className={styles.divider} />

          <TooltipHost content="Clear Formatting">
            <IconButton iconProps={{ iconName: 'ClearFormatting' }} onClick={() => execCommand('removeFormat')} disabled={disabled || isSourceMode} ariaLabel="Clear Formatting" />
          </TooltipHost>

          <TooltipHost content="Undo">
            <IconButton iconProps={{ iconName: 'Undo' }} onClick={() => execCommand('undo')} disabled={disabled || isSourceMode} ariaLabel="Undo" />
          </TooltipHost>

          <TooltipHost content="Redo">
            <IconButton iconProps={{ iconName: 'Redo' }} onClick={() => execCommand('redo')} disabled={disabled || isSourceMode} ariaLabel="Redo" />
          </TooltipHost>

          <div className={styles.divider} />

          <TooltipHost content={isSourceMode ? "Visual Editor" : "Source Code"}>
            <IconButton iconProps={{ iconName: 'Code' }} onClick={toggleSourceMode} disabled={disabled} ariaLabel="Toggle Source" checked={isSourceMode} />
          </TooltipHost>
        </Stack>
      </div>

      {/* Editor Area */}
      <div className={styles.editorContainer}>
        {isSourceMode ? (
          <textarea
            ref={sourceRef}
            className={styles.sourceEditor}
            value={value}
            onChange={(e) => handleSourceChange(e.target.value)}
            disabled={disabled}
            spellCheck={false}
          />
        ) : (
          <div
            ref={editorRef}
            className={styles.editor}
            contentEditable={!disabled}
            onInput={handleContentChange}
            onBlur={handleContentChange}
            suppressContentEditableWarning
          />
        )}
      </div>

      {/* Insert Image Dialog */}
      <Dialog
        hidden={!showImageDialog}
        onDismiss={handleImageDialogDismiss}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Insert Image',
          subText: context 
            ? 'Upload an image to SharePoint or enter an image URL' 
            : 'Enter an image URL or select a local image'
        }}
        modalProps={{ isBlocking: false }}
        minWidth={600}
      >
        <div className={styles.dialogContent}>
          {uploadMessage && (
            <MessageBar
              messageBarType={uploadMessage.type}
              onDismiss={() => setUploadMessage(null)}
              isMultiline={false}
              styles={{ root: { marginBottom: 15 } }}
            >
              {uploadMessage.text}
            </MessageBar>
          )}

          {context && (
            <div className={styles.uploadSection}>
              <Label styles={{ root: { fontWeight: 600, marginBottom: 10, fontSize: 15 } }}>
                Upload Image to SharePoint
              </Label>
              
              <Stack tokens={{ childrenGap: 12 }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className={styles.fileInput}
                  id="imageUploadInput"
                  disabled={isUploading}
                />
                
                <label htmlFor="imageUploadInput" className={styles.uploadButton}>
                  <Icon iconName="Upload" />
                  <span>{selectedFile ? 'Change Image' : 'Choose Image File'}</span>
                </label>

                {selectedFile && (
                  <MessageBar messageBarType={MessageBarType.success}>
                    Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </MessageBar>
                )}

                {imageUrl && selectedFile && (
                  <div className={styles.imagePreview}>
                    <span className={styles.imagePreviewLabel}>Preview:</span>
                    <img src={imageUrl} alt="Preview" />
                  </div>
                )}

                <MessageBar messageBarType={MessageBarType.info}>
                  <strong>Note:</strong> Images will be stored in SiteAssets/ProjectImages folder. Max size: 10MB
                </MessageBar>
              </Stack>

              <div className={styles.orDivider}>
                <span>OR</span>
              </div>
            </div>
          )}

          <Stack tokens={{ childrenGap: 12 }}>
            <Label styles={{ root: { fontWeight: 600, fontSize: 15 } }}>
              🔗 Enter Image URL
            </Label>
            <TextField
              placeholder="https://www.sharepoint.com/image.jpg"
              value={context && selectedFile ? '' : imageUrl}
              onChange={(e, newValue) => {
                setImageUrl(newValue || '');
                setSelectedFile(null);
              }}
              disabled={isUploading || (context && !!selectedFile)}
              description={context && selectedFile ? 'Clear the uploaded file to use URL instead' : ''}
            />

            {imageUrl && !selectedFile && (
              <div className={styles.imagePreview}>
                <span className={styles.imagePreviewLabel}>Preview:</span>
                <img 
                  src={imageUrl} 
                  alt="Preview"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    setUploadMessage({ text: 'Failed to load image from URL', type: MessageBarType.error });
                  }}
                />
              </div>
            )}
          </Stack>
        </div>

        <DialogFooter>
          {isUploading ? (
            <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
              <Spinner size={SpinnerSize.medium} />
              <Label>Uploading to SharePoint...</Label>
            </Stack>
          ) : (
            <>
              <PrimaryButton 
                onClick={insertImage} 
                text={context && selectedFile ? 'Upload & Insert' : 'Insert Image'}
                disabled={!imageUrl && !selectedFile}
                iconProps={{ iconName: context && selectedFile ? 'CloudUpload' : 'Accept' }}
              />
              <DefaultButton onClick={handleImageDialogDismiss} text="Cancel" iconProps={{ iconName: 'Cancel' }} />
            </>
          )}
        </DialogFooter>
      </Dialog>

      {/* Insert Table Dialog */}
      <Dialog
        hidden={!showTableDialog}
        onDismiss={() => setShowTableDialog(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Insert Table',
          subText: 'Specify table dimensions (max 20 rows, 10 columns)'
        }}
        modalProps={{ isBlocking: false }}
      >
        <Stack tokens={{ childrenGap: 15 }}>
          <TextField
            label="Number of Rows"
            type="number"
            value={tableRows}
            onChange={(e, newValue) => {
              const num = parseInt(newValue || '3');
              setTableRows(Math.min(Math.max(1, num), 20).toString());
            }}
            min={1}
            max={20}
          />
          <TextField
            label="Number of Columns"
            type="number"
            value={tableCols}
            onChange={(e, newValue) => {
              const num = parseInt(newValue || '3');
              setTableCols(Math.min(Math.max(1, num), 10).toString());
            }}
            min={1}
            max={10}
          />
          <MessageBar messageBarType={MessageBarType.info}>
            Table will be created with {tableRows} rows and {tableCols} columns. The first row will be headers.
          </MessageBar>
        </Stack>
        <DialogFooter>
          <PrimaryButton onClick={insertTable} text="Insert Table" iconProps={{ iconName: 'Table' }} />
          <DefaultButton onClick={() => setShowTableDialog(false)} text="Cancel" iconProps={{ iconName: 'Cancel' }} />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;