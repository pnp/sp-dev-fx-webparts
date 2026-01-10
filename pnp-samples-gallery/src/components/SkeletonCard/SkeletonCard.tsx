import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
    return (
        <div className="pnp-sample-item pnp-sample-item--skeleton">
            <div className="pnp-sample-item-content">
                <div className="pnp-card" aria-hidden="true">
                    <div className={styles.skeletonThumb} />
                    <div className="pnp-card__body">
                        <h3 className="pnp-card__title"><span className={`${styles.skeletonLine} ${styles.skeletonTitle}`} /></h3>
                        <div className="pnp-card__meta" style={{ marginTop: 8 }}>
                            <span className={styles.skeletonPill} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
