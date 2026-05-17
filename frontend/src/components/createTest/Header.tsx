import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/createTest/createTest.header.css';

const CreateTestHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="create-test-header">
            <div className="header-inner">
                <button
                    className="back-btn"
                    onClick={() => navigate('/admin-profile')}
                >
                    ← Вернуться в профиль
                </button>
                <div className="header-title">
                    Создание теста
                </div>
            </div>
        </header>
    );
};

export default CreateTestHeader;