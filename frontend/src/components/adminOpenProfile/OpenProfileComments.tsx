// ============================================================
// OpenProfileComments.tsx — блок комментариев (только для админа)
// ============================================================

interface Props {
    comment: string | null;
    commentText: string;
    setCommentText: (v: string) => void;
    commentLoading: boolean;
    commentError: string | null;
    commentSuccess: string | null;
    onSave: () => void;
}

const OpenProfileComments = ({
                                 comment,
                                 commentText,
                                 setCommentText,
                                 commentLoading,
                                 commentError,
                                 commentSuccess,
                                 onSave,
                             }: Props) => (
    <div className="profile-card">
        <h2 className="attempts-section__title">Комментарии</h2>
        <p className="open-profile-comments__note">
            Видно только администраторам
        </p>

        {/* Текущий комментарий */}
        {comment ? (
            <div className="open-profile-comment">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>{comment}</span>
            </div>
        ) : (
            <div className="attempts-empty" style={{ padding: '16px 0' }}>
                <span className="attempts-empty__icon">💬</span>
                <span className="attempts-empty__text">Комментариев нет</span>
            </div>
        )}

        <div className="admin-divider" style={{ margin: '18px 0' }} />

        {/* Форма добавления / редактирования */}
        <p className="admin-add-section__label">
            {comment ? 'Изменить комментарий' : 'Добавить комментарий'}
        </p>
        <div className="open-profile-comments__form">
            <textarea
                className="input-field open-profile-comments__textarea"
                placeholder="Введите комментарий..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                disabled={commentLoading}
                rows={3}
            />
            <button
                className="admin-add-btn"
                onClick={onSave}
                disabled={commentLoading || !commentText.trim()}
            >
                {commentLoading ? (
                    <span className="admin-add-btn__spinner" />
                ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5"
                         strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                )}
                Сохранить
            </button>
        </div>

        {commentError   && <p className="admin-add-section__error">{commentError}</p>}
        {commentSuccess && <p className="admin-add-section__success">{commentSuccess}</p>}
    </div>
);

export default OpenProfileComments;
