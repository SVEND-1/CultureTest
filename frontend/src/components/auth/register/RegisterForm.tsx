import { useState } from "react";
import type { RegisterFormProps } from "../../../types/auth/auth.types";
import Field from "../global/Field";
import Button from "../global/Button";
import PasswordStrengthBar from "../PasswordStrengthBar.tsx";
import { usePasswordStrength } from "../usePasswordStrength.ts";

export default function RegisterForm({ form, setForm, handleSubmit, navigate }: RegisterFormProps) {
    const strength = usePasswordStrength(form.password);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const isFormValid =
        form.email.trim() &&
        form.name.trim() &&
        strength.checks.minLength &&
        privacyAccepted;

    return (
        <form onSubmit={handleSubmit}>
            <Field
                className="input-group"
                label="Имя"
                id="register-name"
                type="text"
                value={form.name}
                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                    setForm({ ...form, name: e.currentTarget.value })
                }
                placeholder="Ваше имя"
                required
            />

            <Field
                className="input-group"
                label="Почта"
                id="register-email"
                type="email"
                value={form.email}
                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                    setForm({ ...form, email: e.currentTarget.value })
                }
                placeholder="ваш@email.com"
                required
            />

            <Field
                className="input-group"
                label="Пароль"
                id="register-password"
                type="password"
                value={form.password}
                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                    setForm({ ...form, password: e.currentTarget.value })
                }
                placeholder="••••••••"
                required
            />

            <PasswordStrengthBar strength={strength} />

            <div className="privacy-checkbox">
                <label className="privacy-checkbox__label">
                    <input
                        type="checkbox"
                        className="privacy-checkbox__input"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    />
                    <span className="privacy-checkbox__box" aria-hidden="true">
                        <svg viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span className="privacy-checkbox__text">
                        Я принимаю{" "}
                        <a
                            href="/privacy-policy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="privacy-checkbox__link"
                            onClick={(e) => e.stopPropagation()}
                        >
                            политику конфиденциальности
                        </a>
                    </span>
                </label>
            </div>

            <Button
                type="submit"
                className="submit-button"
                isDisabled={!isFormValid}
            >
                Получить код
            </Button>

            <p
                onClick={() => navigate("/")}
                className="auth-link"
                style={{ cursor: "pointer" }}
            >
                Уже есть аккаунт? Войти
            </p>
        </form>
    );
}
