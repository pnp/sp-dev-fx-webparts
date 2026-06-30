import * as React from 'react';
import styles from './TicketingDashboard.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFx } from "@pnp/sp";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton, IconButton } from '@fluentui/react/lib/Button';
import { format } from 'date-fns';
import { CommentService } from '../services/CommentService';
import { ITicketComment } from './ITicketComment';

export interface ITicketCommentsProps {
    ticketId: number;
    context: WebPartContext;
    listTitle: string;
}

export const TicketComments: React.FC<ITicketCommentsProps> = ({
    ticketId,
    context,
    listTitle
}) => {
    const [comments, setComments] = React.useState<ITicketComment[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [newComment, setNewComment] = React.useState<string>('');
    const [submitting, setSubmitting] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>(undefined);

    const commentService = React.useMemo(() => new CommentService(listTitle), [listTitle]);
    const currentUserLoginName = context.pageContext.user.loginName;

    const loadComments = React.useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(undefined);
        try {
            const sp = spfi().using(SPFx(context));
            const data = await commentService.getComments(ticketId, sp);
            setComments(data);
        } catch (err) {
            console.error('Failed to load comments:', err);
            setError('Failed to load comments.');
        } finally {
            setLoading(false);
        }
    }, [ticketId, context, commentService]);

    React.useEffect(() => {
        loadComments().catch(console.error);
    }, [loadComments]);

    const handleAddComment = async (): Promise<void> => {
        if (!newComment.trim()) return;
        setSubmitting(true);
        setError(undefined);
        try {
            const sp = spfi().using(SPFx(context));
            await commentService.addComment(ticketId, newComment.trim(), sp);
            setNewComment('');
            await loadComments();
        } catch (err) {
            console.error('Failed to add comment:', err);
            setError('Failed to post comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: string): Promise<void> => {
        try {
            const sp = spfi().using(SPFx(context));
            await commentService.deleteComment(ticketId, commentId, sp);
            setComments(prev => prev.filter(c => c.id !== commentId));
        } catch (err) {
            console.error('Failed to delete comment:', err);
            setError('Failed to delete comment. Please try again.');
        }
    };

    const handleLikeToggle = async (comment: ITicketComment): Promise<void> => {
        try {
            const sp = spfi().using(SPFx(context));
            if (comment.isLikedByUser) {
                await commentService.unlikeComment(ticketId, comment.id, sp);
            } else {
                await commentService.likeComment(ticketId, comment.id, sp);
            }
            setComments(prev => prev.map(c =>
                c.id === comment.id
                    ? {
                        ...c,
                        isLikedByUser: !c.isLikedByUser,
                        likeCount: c.isLikedByUser ? c.likeCount - 1 : c.likeCount + 1
                    }
                    : c
            ));
        } catch (err) {
            console.error('Failed to toggle like:', err);
        }
    };

    const formatCommentDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            return format(date, 'MMM d, yyyy h:mm a');
        } catch {
            return '';
        }
    };

    const getInitials = (name: string): string => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const isOwnComment = (comment: ITicketComment): boolean => {
        if (!comment.author?.loginName || !currentUserLoginName) return false;
        return comment.author.loginName.toLowerCase() === currentUserLoginName.toLowerCase();
    };

    return (
        <div className={`${styles.ticketSection} ${styles.commentsSection}`}>
            <h2>Comments ({comments.length})</h2>

            {error && <div className={styles.errorMessage}>{error}</div>}

            {loading ? (
                <Spinner size={SpinnerSize.medium} label="Loading comments..." />
            ) : comments.length === 0 ? (
                <div className={styles.commentsEmpty}>
                    No comments yet. Be the first to add one!
                </div>
            ) : (
                <div className={styles.commentsList}>
                    {comments.map(comment => (
                        <div key={comment.id} className={styles.commentItem}>
                            <div className={styles.commentAvatar}>
                                {getInitials(comment.author?.name || '')}
                            </div>
                            <div className={styles.commentBody}>
                                <div className={styles.commentMeta}>
                                    <span className={styles.commentAuthor}>{comment.author?.name}</span>
                                    <span className={styles.commentDate}>{formatCommentDate(comment.createdDate)}</span>
                                    {comment.isEdited && (
                                        <span className={styles.commentEdited}>(edited)</span>
                                    )}
                                </div>
                                <div className={styles.commentText}>{comment.text}</div>
                                <div className={styles.commentFooter}>
                                    <button
                                        className={`${styles.likeButton} ${comment.isLikedByUser ? styles.likeButtonActive : ''}`}
                                        onClick={() => handleLikeToggle(comment)}
                                        title={comment.isLikedByUser ? 'Unlike' : 'Like'}
                                    >
                                        👍{comment.likeCount > 0 && <span>&nbsp;{comment.likeCount}</span>}
                                    </button>
                                    {isOwnComment(comment) && (
                                        <IconButton
                                            iconProps={{ iconName: 'Delete' }}
                                            title="Delete comment"
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className={styles.commentDeleteButton}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.addCommentForm}>
                <TextField
                    multiline
                    rows={3}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(_ev, val) => setNewComment(val || '')}
                    disabled={submitting}
                />
                <div className={styles.addCommentActions}>
                    <PrimaryButton
                        text={submitting ? 'Posting...' : 'Post Comment'}
                        onClick={handleAddComment}
                        disabled={submitting || !newComment.trim()}
                        iconProps={{ iconName: 'Comment' }}
                    />
                </div>
            </div>
        </div>
    );
};
