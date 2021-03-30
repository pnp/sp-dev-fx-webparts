import * as React from 'react';
import * as tinymce from 'tinymce';
import 'tinymce/themes/silver/theme'; // Import the theme
import 'tinymce/icons/default/icons'; // Import the icons
require('../../../tinymce/skins/ui/oxide/skin.min.css');
require('../../../tinymce/skins/ui/oxide/content.min.css');

// Import plugins being used
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullpage';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/print';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/wordcount';

// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
import { uploadImageToQuestionsAssets, searchPeoplePicker, ensureUserInSite } from 'webparts/questions/redux/actions/actions';
import { LogHelper, Icons } from 'utilities';
import { Editor } from '@tinymce/tinymce-react';
import { Callout, getTheme, FontWeights, mergeStyleSets, Text } from 'office-ui-fabric-react';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { DetailsList, IColumn, SelectionMode, Selection, CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';
import { IPeoplePickerEntity } from '@pnp/sp/profiles';

interface IConnectedDispatch {
  uploadImageToQuestionsAssets: (title: string, blobInfo: any, progress) => Promise<string>;
  searchPeoplePicker: (input: string, maxCount: number) => Promise<IPeoplePickerEntity[]>;
  ensureUserInSite: (email: string) => Promise<boolean>;
}

interface IConnectedState {
}

// map actions to properties so they can be invoked
function mapStateToProps(state: IApplicationState, ownProps: any): IConnectedState {
  return {
  };
}

//Map the actions to the properties of the Component. Making them available in this.props inside the component.
const mapDispatchToProps = {
  uploadImageToQuestionsAssets,
  searchPeoplePicker,
  ensureUserInSite
};

interface IRichTextEditorProps {
  id: string;
  questionTitle: string;
  value: string;
  placeholder: string;
  onTextChange(htmlValue: string, textValue: string): void;
}

interface IRichTextEditorState {
  mentioningState: boolean;
  mentionFilter: string;
  people: IPeoplePickerEntity[];
  columns: IColumn[];
  selectedPersona: IPeoplePickerEntity | null;
  editor: React.RefObject<any>;
  showUserWarning: boolean;
}

const theme = getTheme();
const styles = mergeStyleSets({
  callout: {
    maxWidth: 400,
  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.mediumPlus,
    {
      margin: 0,
      fontWeight: FontWeights.semibold,
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
  tooltip: {
    padding: '20px'
  },
  subtext: [
    theme.fonts.smallPlus,
    {
      margin: 0,
      fontWeight: FontWeights.semibold,
    },
  ],
  subtextwarning: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
      color: theme.palette.accent
    }
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});

class RichTextEditorComponent extends React.Component<IRichTextEditorProps & IConnectedState & IConnectedDispatch, IRichTextEditorState> {

  private _mentionSelection: Selection;

  constructor(props: IRichTextEditorProps & IConnectedState & IConnectedDispatch) {
    super(props);
    tinymce.default.init({});
    LogHelper.verbose(this.constructor.name, 'ctor', 'start');

    this.state = {
      mentioningState: false,
      mentionFilter: '',
      people: [],
      columns: this.SetupColumns(),
      selectedPersona: null,
      editor: React.createRef(),
      showUserWarning: false
    };

    this._mentionSelection = new Selection({
      onSelectionChanged: () => {
        const person = this.GetMentionSelectionPersona();
        this.setState({
          selectedPersona: person,
        }, () => {
          LogHelper.info('RichTextEditor._mentionSelection', 'onSelectionChanged', `New person selected for mention (${this.state.selectedPersona && this.state.selectedPersona.DisplayText})`);
          if (this.state.selectedPersona !== null)
            this.CompleteMentionState();
        });

      },
    });
  }

  public render(): React.ReactElement<IRichTextEditorProps> {
    const { value, placeholder } = this.props;
    const { mentioningState, mentionFilter, showUserWarning } = this.state;
    const labelId: string = getId('callout-label');
    const descriptionId: string = getId('callout-description');

    return (
      <div className="customTextEditor">
        <Editor
          initialValue={value}
          init={{
            extended_valid_elements : `span[style]`,
            link_assume_external_targets: true,
            placeholder: placeholder,
            convert_urls: false,
            relative_urls: false,
            images_upload_handler: this.images_upload_handler,
            autoresize_on_init: false,
            paste_data_images: true,
            skin: "oxide",
            skin_url: "https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.5.1/skins/ui/oxide",
            content_css: "https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.5.1/skins/content/default/content.min.css, https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.5.1/skins/ui/oxide/skin.min.css,https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.5.1/skins/ui/oxide/content.min.css",
            plugins: [
              'autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks autoresize',
              'insertdatetime media table paste textcolor'
            ],
            menubar: false,
            toolbar:
              'undo redo formatselect bold italic underline forecolor backcolor table \
             alignleft aligncenter alignright alignjustify  \
             bullist numlist indent outdent link image removeformat',
            statusbar: false,
            block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3',
            setup: (editor) => this.setupTinyMce(editor)
          }}
          onEditorChange={(html, editor) => this.handleEditorChange(html, editor)}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          ref={this.state.editor}
        />
        {mentioningState && (
          <Callout
            className={styles.callout}
            ariaLabelledBy={labelId}
            ariaDescribedBy={descriptionId}
            role="alertdialog"
            gapSpace={0}
            target={`.customTextEditor`}
            onDismiss={() => this.ExitMentionState}
            setInitialFocus
          >
            <div className={styles.header}>
              <Text className={styles.subtext} id={labelId}>
                {this.IsPeopleSearchAllowed(mentionFilter) ? 'Suggestions' : 'Type more characters'}
              </Text>
            </div>
            <div className={styles.inner}>
              <DetailsList
                selection={this._mentionSelection}
                selectionPreservedOnEmptyClick={true}
                items={this.state.people}
                columns={this.state.columns}
                onRenderItemColumn={this.onRenderItemColumn}
                selectionMode={SelectionMode.single}
                isHeaderVisible={false}
                enterModalSelectionOnTouch={true}
                checkboxVisibility={CheckboxVisibility.hidden} />
            </div>
          </Callout>
        )}
        {showUserWarning && (
          <Callout
            className={styles.callout}
            ariaLabelledBy={labelId}
            ariaDescribedBy={descriptionId}
            role="alertdialog"
            gapSpace={0}
            target={`.customTextEditor`}
          >
            <div className={styles.tooltip}>The mentioned user is not a member of this site and will not be notified.</div>
          </Callout>
        )}
      </div>
    );
  }

  private onRenderItemColumn = (item: IPeoplePickerEntity, index: number, column: IColumn): React.ReactNode => {
    switch (column.key) {
      case 'persona':
        return <div style={{ cursor: 'pointer' }}><Persona text={item.DisplayText} secondaryText={item.EntityData.Email} tertiaryText={item.EntityData.Department} showSecondaryText={true} size={PersonaSize.size32} /></div>;
      default:
        return <></>;
    }
  }

  private SetupColumns = (): IColumn[] => {
    const retVal: IColumn[] = [];

    const personaCol: IColumn = {
      key: "persona",
      minWidth: 250,
      name: '',
      ariaLabel: 'Persona'
    };

    retVal.push(personaCol);

    return retVal;
  }

  private GetMentionSelectionPersona = (): IPeoplePickerEntity | null => {
    const selectionCount = this._mentionSelection.getSelectedCount();
    LogHelper.info('RichTextEditor', 'GetMentionSelctionPersona', `Current selection count: ${selectionCount}`);

    switch (selectionCount) {
      case 1:
        return (this._mentionSelection.getSelection()[0] as IPeoplePickerEntity);
      default:
        return null;
    }
  }

  private EnterMentionState = () => {
    LogHelper.info('RichTextEditor', 'EnterMentionState', 'Now in a mentioning state...');
    this.setState({ mentioningState: true, people: [] });
  }

  private ContinueMentionState = (nextChar: string, reduce?: boolean) => {
    if (reduce === true) {
      //Special check to leave the mentioning state if we have deleted past the @ symbol
      if (this.state.mentionFilter.length <= 0) {
        this.ExitMentionState();
      } else {
        const reduceString = this.state.mentionFilter.substring(0, this.state.mentionFilter.length - 1);
        LogHelper.info('RichTextEditor', 'ContinueMentionState', `Reducing mention: ${reduceString}`);
        this.setState({ mentionFilter: reduceString}, () => {
          this.MentionSearch(reduceString);
        });
      }
    }
    else {
      const concatString = this.state.mentionFilter.concat(nextChar);
      LogHelper.info('RichTextEditor', 'ContinueMentionState', `Adding to mention: ${concatString}`);
      this.setState({ mentionFilter: concatString}, () => {
        this.MentionSearch(concatString);
      });
    }
  }

  private CompleteMentionState = () => {
    LogHelper.info('RichTextEditor', 'CompleteMentionState', 'Completing the mentioning state...');
    //Inject the selected persona into the RTE
    const { mentionFilter, editor, selectedPersona } = this.state;
    //Only do something if we have a valid persona
    if (selectedPersona !== null) {
      LogHelper.info('RichTextEditor', 'CompleteMentionState', `Mentioning ${selectedPersona.DisplayText}`);
      let content: string = editor.current.editor.getContent();
      let mentionWithAt = `@${mentionFilter}`;
      let index = content.indexOf(mentionWithAt);
      if (index >= 0) {
        //let personaLink = `<div style="display: inline-block">&nbsp;</div><div style="display: inline-block"><a href="mailto:${selectedPersona.Email}">${selectedPersona.Title}</a></div><div style="display: inline-block">&shy;</div>`;
        let personaLink = `<span><a href="mailto:${selectedPersona.EntityData.Email}">${selectedPersona.DisplayText}</a></span><span>&shy;</span>`;
        let newContent: string = content.replace(mentionWithAt, personaLink);

        editor.current.editor.setContent(newContent);
        editor.current.editor.focus();
        editor.current.editor.selection.select(editor.current.editor.getBody(), true);
        editor.current.editor.selection.collapse(false);

        //Check if the user is actually in the site to determine whether or not to display the user warning tooltip
        if (selectedPersona.EntityData.Email !== undefined) {
        this.props.ensureUserInSite(selectedPersona.EntityData.Email)
          .then((response: boolean) => {
            LogHelper.info('RichTextEditor', 'CompleteMentionState', `${selectedPersona.EntityData.Email} in this site? ${response}`);
            this.setState({ showUserWarning: !response }, () => {
              this.ExitMentionState();

              if (this.state.showUserWarning) {
                setTimeout(() => {
                  this.setState({ showUserWarning: false });
                }, 7000);
              }
            });
          })
          .catch((reason) => {
            LogHelper.error('RichTextEditor', 'CompleteMentionState', reason);
            this.ExitMentionState();
          });
        } else {
          LogHelper.error('RichTextEditor', 'CompleteMentionState', 'NO email found for selected person...');
          this.ExitMentionState();
        }
      }
    } else {
      LogHelper.info('RichTextEditor', 'CompleteMentionState', 'No one to mention...');

      this.ExitMentionState();
    }
  }

  private ExitMentionState = () => {
    LogHelper.info('RichTextEditor', 'EnterMentionState', 'Exiting the mentioning state...');
    this.setState({ mentioningState: false, mentionFilter: '', people: [] });
  }

  private MentionSearch = (searchVal: string) => {
    LogHelper.info('RichTextEditor', 'MentionSearch', searchVal);
    if (this.IsPeopleSearchAllowed(searchVal)) {
      this.props.searchPeoplePicker(searchVal, 8)
        .then((peopleFound: IPeoplePickerEntity[]) => {
          LogHelper.info('RichTextEditor', 'MentionSearch', `Search found ${peopleFound.length} suggestions.`);
          //console.log(peopleFound);
          this.setState({ people: [...peopleFound]});
        })
        .catch((reason) => {
          LogHelper.error('RichTextEditor', 'MentionSearch', reason);
        });
    } else {
      LogHelper.warning('RichTextEditor', 'MentionSearch', 'Not enough characters for search.');
      this.setState({ people: []});
    }
  }

  private IsPeopleSearchAllowed = (searchVal: string): boolean => {
    return (searchVal.length > 2);
  }

  private setupTinyMce = (editor) => {
      editor.ui.registry.addIcon('undo', Icons.ic_fluent_arrow_undo_24_regular);
      editor.ui.registry.addIcon('redo', Icons.ic_fluent_arrow_redo_24_regular);
      editor.ui.registry.addIcon('bold', Icons.ic_fluent_text_bold_24_regular);
      editor.ui.registry.addIcon('italic', Icons.ic_fluent_text_italic_24_regular);
      editor.ui.registry.addIcon('underline', Icons.ic_fluent_text_underline_24_regular);
      editor.ui.registry.addIcon('text-color', Icons.ic_fluent_text_color_24_filled);
      editor.ui.registry.addIcon('highlight-bg-color', Icons.ic_fluent_highlight_24_regular);
      editor.ui.registry.addIcon('color-picker', Icons.ic_fluent_color_24_regular);
      editor.ui.registry.addIcon('table', Icons.ic_fluent_table_24_regular);
      editor.ui.registry.addIcon('table-delete-table', Icons.ic_fluent_table_delete_24_regular);
      editor.ui.registry.addIcon('table-cell-properties', Icons.ic_fluent_table_settings_24_regular);
      editor.ui.registry.addIcon('table-merge-cells', Icons.ic_fluent_table_cells_merge_24_regular);
      editor.ui.registry.addIcon('table-split-cells', Icons.ic_fluent_table_cells_split_24_regular);
      editor.ui.registry.addIcon('table-delete-column', Icons.ic_fluent_table_column_delete_24_regular);
      editor.ui.registry.addIcon('table-row-properties', Icons.ic_fluent_table_settings_24_regular);
      editor.ui.registry.addIcon('table-insert-row-after', Icons.ic_fluent_table_insert_down_24_regular);
      editor.ui.registry.addIcon('table-insert-column-before', Icons.ic_fluent_table_insert_left_24_regular);
      editor.ui.registry.addIcon('table-insert-column-after', Icons.ic_fluent_table_insert_right_24_regular);
      editor.ui.registry.addIcon('table-insert-row-above', Icons.ic_fluent_table_insert_up_24_regular);
      editor.ui.registry.addIcon('cut-row', Icons.ic_fluent_cut_24_regular);
      editor.ui.registry.addIcon('duplicate-row', Icons.ic_fluent_copy_24_regular);
      editor.ui.registry.addIcon('paste-row-after', Icons.ic_fluent_table_move_down_24_regular);
      editor.ui.registry.addIcon('paste-row-before', Icons.ic_fluent_table_move_up_24_regular);
      editor.ui.registry.addIcon('table-delete-row', Icons.ic_fluent_table_row_delete_24_regular);
      editor.ui.registry.addIcon('align-left', Icons.ic_fluent_text_align_left_24_regular);
      editor.ui.registry.addIcon('align-center', Icons.ic_fluent_text_align_center_24_regular);
      editor.ui.registry.addIcon('align-right', Icons.ic_fluent_text_align_right_24_regular);
      editor.ui.registry.addIcon('align-justify', Icons.ic_fluent_text_align_justify_24_regular);
      editor.ui.registry.addIcon('list-bull-default', Icons.ic_fluent_text_bullet_list_24_regular);
      editor.ui.registry.addIcon('list-num-default', Icons.ic_fluent_text_number_format_24_regular);
      editor.ui.registry.addIcon('indent', Icons.ic_fluent_text_indent_increase_24_regular);
      editor.ui.registry.addIcon('outdent', Icons.ic_fluent_text_indent_decrease_24_regular);
      editor.ui.registry.addIcon('link', Icons.ic_fluent_link_24_regular);
      editor.ui.registry.addIcon('unlink', Icons.ic_fluent_link_remove_20_regular);
      editor.ui.registry.addIcon('new-tab', Icons.ic_fluent_open_24_regular);
      editor.ui.registry.addIcon('image', Icons.ic_fluent_image_24_regular);
      editor.ui.registry.addIcon('remove-formatting', Icons.ic_fluent_text_clear_formatting_24_regular);
      editor.ui.registry.addIcon('close', Icons.ic_fluent_dismiss_24_regular);
      editor.ui.registry.addIcon('lock', Icons.ic_fluent_lock_24_regular);
  }

  private handleEditorChange = (html, editor) => {
    let text = editor.getContent({ format: 'text' });
    LogHelper.info('RichTextEditor', 'handleEditorChange', `HTML: ${html} \n Mention State: ${this.state.mentioningState}`);
    this.props.onTextChange(html, text);
  }

  private handleKeyDown = (a: KeyboardEvent, editor?: any) => {
    if (a.key.toLowerCase() === 'tab' || a.keyCode == 9) {
      if (!this.state.mentioningState)
        editor.execCommand( 'mceInsertContent', false, '&emsp;&emsp;' ); // inserts tab

      a.preventDefault();
    }
  }

  private handleKeyUp = (a: KeyboardEvent, editor?: any) => {
    if (this.state.mentioningState) {
      LogHelper.info('RichTextEditor', 'handleKeyDown (in mention state)', `${a.key}:${a.code}:${a.type}:${a.returnValue}`);
      const charList = 'abcdefghijklmnopqrstuvwxyz0123456789 ';
      const key = a.key.toLowerCase();

      // we are only interested in proceeding with alphanumeric keys and spaces or spaces
      if (charList.indexOf(key) === -1 && key.indexOf('shift') === -1) {
        if (key === 'backspace') {
          this.ContinueMentionState(a.key, true);
        } else if (key === 'enter' || key === 'return') {
          this.ExitMentionState();
        } else if (key === 'tab' || key === 'arrowright') {
          if (this.state.people.length > 0)
            this._mentionSelection.setIndexSelected(0, true, true); //We want the selection to trigger a Completion, if necessary
        } else {
          this.ExitMentionState();
        }
      } else {
        if (key.indexOf('shift') === -1)
          this.ContinueMentionState(a.key); //Essentially we want to drop shift from keystroke tracking
      }
    } else {
      if (a.key === '@') {
        //Special rules to prevent a mentioning state
        let content: string = editor.getContent({ format: "text" });
        if (content === '@' || content.endsWith(' @') || content.endsWith('\n@')) {
          this.EnterMentionState();
        }
      }
    }
  }

  private images_upload_handler = async (blobInfo, success, failure, progress) => {

    this.props.uploadImageToQuestionsAssets(this.props.questionTitle, blobInfo, (uploadProgress) => {
      progress(uploadProgress);
    })
      .then((imageUrl) => {
        success(imageUrl);
      })
      .catch((reason) => {
        LogHelper.error('RichTextEditor', 'images_upload_handler', reason);
        failure('There was a problem uploading the image, please try again!');
      });

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichTextEditorComponent);
