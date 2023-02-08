import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                'DefineX Credit Application': 'DefineX Credit Application',
                'Languages': 'Languages',
                'English': 'English',
                'Turkish': 'Turkish',
                'Customer Register': 'Customer Register',
                'Identity Number': 'Identity Number',
                'Email': 'Email Address',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Register': 'Register',
                'Customer Login': 'Customer Login',
                'Login': 'Login'
            }
        },
        tr: {
            translation: {
                'DefineX Credit Application': 'DefineX Kredi Uygulaması',
                'Languages': 'Diller',
                'English': 'Ingilizce',
                'Turkish': 'Türkçe',
                'Customer Register': 'Müşteri Kayıt',
                'Identity Number': 'T.C. Kimlik Numarası',
                'Email': 'Email Adresi',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrarı',
                'Register': 'Kayıt Ol',
                'Customer Login': 'Müşteri Giriş',
                'Login': 'Giriş'
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translation'],
    defaultNS: 'translation',
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        useSuspense: true
    }
});

export default i18next;