export default function SkeletonCard() {
    return (
        <div className="pnp-sample-item pnp-sample-item--skeleton">
            <div className="pnp-sample-item-content">
                <div className="pnp-card" aria-hidden="true">
                    <div className="skeleton-thumb" />
                    <div className="pnp-card__body">
                        <h3 className="pnp-card__title"><span className="skeleton-line skeleton-title" /></h3>
                        <div className="pnp-card__meta" style={{ marginTop: 8 }}>
                            <span className="skeleton-pill" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
