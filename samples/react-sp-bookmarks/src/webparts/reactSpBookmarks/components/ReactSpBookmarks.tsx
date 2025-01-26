import * as React from 'react';
import styles from './ReactSpBookmarks.module.scss';
import type { IReactSpBookmarksProps } from './IReactSpBookmarksProps';
import { Icon } from '@fluentui/react/lib/Icon';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { Dialog, DialogFooter, DialogType, PrimaryButton, DefaultButton, TextField, Stack, IStackTokens } from '@fluentui/react';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon: string;
}

const ReactSpBookmarks: React.FC<IReactSpBookmarksProps> = (props) => {
  // Initialize sp with the SPFx context
  const sp = spfi().using(SPFx(props.context));

  const { hasTeamsContext, listName, theme } = props;

  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [editingBookmark, setEditingBookmark] = React.useState<Bookmark | null>(null);

  // Fetch bookmarks from the SharePoint list
  const fetchBookmarks = async () => {
    try {
      const items = await sp.web.lists.getByTitle(listName).items.select('Id', 'Title', 'URL', 'Icon')();
      const bookmarks: Bookmark[] = items.map((item: any) => ({
        id: item.Id.toString(),
        title: item.Title,
        url: item.URL,
        icon: item.Icon
      }));

      setBookmarks(bookmarks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      setError('Failed to load bookmarks.');
      setLoading(false);

      // Fallback mock data for testing
      const mockBookmarks: Bookmark[] = [
        { id: '1', title: 'Google', url: 'https://google.com', icon: 'Globe' },
        { id: '2', title: 'Bing', url: 'https://bing.com', icon: 'Search' },
      ];
      setBookmarks(mockBookmarks);
    }
  };

  // Add a new bookmark to the SharePoint list
  const handleAddBookmark = async (newBookmark: Bookmark) => {
    try {
      await sp.web.lists.getByTitle(listName).items.add({
        Title: newBookmark.title,
        URL: newBookmark.url,
        Icon: newBookmark.icon
      });

      // Refresh the bookmarks list
      fetchBookmarks();
      setIsModalOpen(false); // Close the modal after adding the bookmark
    } catch (error) {
      console.error('Error adding bookmark:', error);
      setError('Failed to add a bookmark.');
    }
  };

  // Update an existing bookmark
  const handleUpdateBookmark = async (updatedBookmark: Bookmark) => {
    try {
      await sp.web.lists.getByTitle(listName).items.getById(Number(updatedBookmark.id)).update({
        Title: updatedBookmark.title,
        URL: updatedBookmark.url,
        Icon: updatedBookmark.icon
      });

      // Refresh the bookmarks list
      fetchBookmarks();
      setIsModalOpen(false); // Close the modal after updating the bookmark
      setEditingBookmark(null); // Reset the editing state
    } catch (error) {
      console.error('Error updating bookmark:', error);
      setError('Failed to update the bookmark.');
    }
  };

  // Delete a bookmark
  const handleDeleteBookmark = async (id: string) => {
    try {
      await sp.web.lists.getByTitle(listName).items.getById(Number(id)).delete();

      // Refresh the bookmarks list
      fetchBookmarks();
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      setError('Failed to delete the bookmark.');
    }
  };

  // Open the modal for adding or editing a bookmark
  const openModal = (bookmark: Bookmark | null = null) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  // Close the modal and reset the editing state
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBookmark(null);
  };

  // Fetch bookmarks when the component mounts
  React.useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <p>Loading bookmarks...</p>;
  if (error) return <p>{error}</p>;

  // Modal dialog properties
  const dialogContentProps = {
    type: DialogType.normal,
    title: editingBookmark ? 'Edit Bookmark' : 'Add New Bookmark',
    closeButtonAriaLabel: 'Close',
    subText: editingBookmark ? 'Edit the details for the bookmark.' : 'Enter the details for the new bookmark.',
  };

  const modalProps = {
    isBlocking: true, // Prevents clicking outside the modal
    styles: { main: { maxWidth: 450 } },
  };

  // Stack tokens for layout
  const stackTokens: IStackTokens = { childrenGap: 15 };

  return (
    <section className={`${styles.reactSpBookmarks} ${theme === 'dark' ? styles.darkTheme : ''} ${hasTeamsContext ? styles.darkTheme : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{props.title}</h2>
          
        </div>

        {/* Grid View for Bookmarks */}
        <div className={styles.grid}>
          {/* Add New Button */}
          <div className={styles.addNewButton} onClick={() => openModal()}>
            <Icon iconName="Add" className={styles.bookmarkIcon} />
            <span className={styles.bookmarkTitle}>Add New</span>
          </div>

          {/* Bookmarks */}
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className={styles.gridItem}>
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                <div className={styles.bookmarkCard}>
                  <Icon iconName={bookmark.icon} className={styles.bookmarkIcon} />
                  <span className={styles.bookmarkTitle}>{bookmark.title}</span>
                </div>
              </a>
              <div className={styles.bookmarkActions}>
                <Icon iconName="Edit" className={styles.actionIcon} onClick={() => openModal(bookmark)} />
                <Icon iconName="Delete" className={styles.actionIcon} onClick={() => handleDeleteBookmark(bookmark.id)} />
              </div>
            </div>
          ))}
        </div>

        {/* Modal Dialog */}
        <Dialog
          hidden={!isModalOpen}
          onDismiss={closeModal}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const updatedBookmark: Bookmark = {
                id: editingBookmark ? editingBookmark.id : Date.now().toString(),
                title: (form.elements.namedItem('title') as HTMLInputElement).value,
                url: (form.elements.namedItem('url') as HTMLInputElement).value,
                icon: (form.elements.namedItem('icon') as HTMLInputElement).value
              };

              if (editingBookmark) {
                handleUpdateBookmark(updatedBookmark);
              } else {
                handleAddBookmark(updatedBookmark);
              }
            }}
          >
            <Stack tokens={stackTokens}>
              <TextField
                label="Title"
                name="title"
                required
                placeholder="Enter the title"
                defaultValue={editingBookmark ? editingBookmark.title : ''}
              />
              <TextField
                label="URL"
                name="url"
                required
                placeholder="Enter the URL"
                defaultValue={editingBookmark ? editingBookmark.url : ''}
              />
              <TextField
                label="Icon"
                name="icon"
                description='Get the icon name from Fluent UI Icons (https://developer.microsoft.com/en-us/fluentui#/styles/web/icons)'
                required
                placeholder="Enter the icon name"
                defaultValue={editingBookmark ? editingBookmark.icon : ''}
              />
            </Stack>
            <DialogFooter>
              <PrimaryButton type="submit" text={editingBookmark ? 'Update Bookmark' : 'Add Bookmark'} />
              <DefaultButton onClick={closeModal} text="Cancel" />
            </DialogFooter>
          </form>
        </Dialog>
      </div>
    </section>
  );
};

export default ReactSpBookmarks;