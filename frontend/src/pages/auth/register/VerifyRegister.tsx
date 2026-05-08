import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyRegister } from "../../../api/authApi";
import "../../../style/auth/auth.index.css";

export default function VerifyRegister() {
    const [code, setCode] = useState<string>("");
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const registrationId = params.get("registrationId");

    useEffect(() => {
        if (!registrationId) {
            alert("Некорректная ссылка подтверждения");
            navigate("/");
        }
    }, [registrationId, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!registrationId) return;

        try {
            const response = await verifyRegister({
                registrationId,
                code,
            });

            if (response.data.success) {
                alert("Регистрация подтверждена");
                navigate("/main");
            } else {
                alert(response.data.message || "Ошибка подтверждения");
            }

        } catch (error: any) {
            console.error("Verify error:", error);
            alert(
                error.response?.data?.message ||
                "Неверный код или ошибка сервера"
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">CultureTest</h2>
                    <h3 className="auth-title3">верификация</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">
                                код верификации
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="input-field"
                                placeholder="Введите код из email"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Подтвердить код
                        </button>

                        <p
                            onClick={() => navigate("/")}
                            className="auth-link"
                            style={{ cursor: "pointer" }}
                        >
                            Вернуться к входу
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}