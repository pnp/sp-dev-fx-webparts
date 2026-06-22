import * as React from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { ISecretSantaProps } from "./ISecretSantaProps";
import { ISecretSantaItem } from "./ISecretSantaItem";
import styles from "./SecretSanta.module.scss"; 

const SecretSanta: React.FC<ISecretSantaProps> = (props) => {
  const [items, setItems] = React.useState<ISecretSantaItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const sp = spfi().using(SPFx(props.context));
        const listItems: ISecretSantaItem[] = await sp.web.lists
          .getByTitle(props.listName)
          .items.select(
            "Title",
            "Id",
            "Image",
            "Opened",
            "OpenedBy/Id",
            "OpenedBy/Title",
            "GiftTitle"
          )
          .expand("OpenedBy")();
        setItems(listItems);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData().catch(console.error);
  }, [props.context, props.listName]);


  const handleBoxClick = async (id: number): Promise<void> => {
    try {
      const sp = spfi().using(SPFx(props.context));
      const currentUser = await sp.web.currentUser();

      await sp.web.lists.getByTitle(props.listName).items.getById(id).update({
        Opened: true,
        OpenedById: currentUser.Id,
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.Id === id
            ? { ...item, Opened: true, OpenedBy: { Id: currentUser.Id, Title: currentUser.Title } }
            : item
        )
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  if (loading) {
    return <div >Loading...</div>;
  }

  if (error) {
    return <div >Error: {error}</div>;
  }

  return (
    <section
      className={`${styles.secretSanta} ${props.theme === "dark" ? styles.darkTheme : styles.lightTheme}`}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{props.webpartTitle}</h2>
        </div>
        <div className={styles.grid}>
          {items.map((item) => (
            <div
              key={item.Id}
              className={`${styles.box} ${item.Opened ? styles.opened : ''}`}
              onClick={() => !item.Opened && handleBoxClick(item.Id)}
            >
              {item.Opened ? (
                <div className={styles.cardContent}>
                  <h3 className={styles.giftTitle}>{item.GiftTitle}</h3>
                  <img src={item.Image.Url} alt={item.Title} className={styles.image} />
                  {item.OpenedBy && (
                    <div className={styles.openedBy}>Opened by: {item.OpenedBy.Title}</div>
                  )}
                </div>
              ) : (
                <div className={styles.placeholderContent}>
                  <h3 className={styles.placeholderTitle}>{item.Title}</h3>
                  <div className={styles.placeholder}>🎁</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecretSanta;
