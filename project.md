Project Path: DrSnna

Source Tree:

```txt
DrSnna
├── Dockerfile
├── README.md
├── docker-compose.yml
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── bg.png
│   ├── clinic-building.jpg
│   ├── clinic1.webp
│   ├── clinic2.webp
│   ├── clinic3.webp
│   ├── clinic4.webp
│   ├── clinic5.webp
│   ├── clinic6.webp
│   ├── doctor-michael.jpg
│   ├── doctor-sarah.jpg
│   ├── logo.png
│   └── logout-btn.png
├── src
│   ├── App.jsx
│   ├── api
│   │   ├── authApi.js
│   │   ├── clinicAppointmentsApi.js
│   │   ├── clinicDoctorsApi.js
│   │   ├── clinicInsuranceApi.js
│   │   ├── clinicProfileApi.js
│   │   ├── patientApi.js
│   │   └── superAdminApi.js
│   ├── auth
│   │   ├── authStorage.js
│   │   ├── roleRedirect.js
│   │   └── routeGuards.js
│   ├── clinic
│   │   └── ClinicSidebar.jsx
│   ├── components
│   │   ├── ModernAlertModal.jsx
│   │   ├── PatientNavbar.jsx
│   │   └── doctors
│   │       └── AddDoctorModal.tsx
│   ├── i18n.js
│   ├── locales
│   │   ├── ar
│   │   │   └── translation.json
│   │   └── en
│   │       └── translation.json
│   ├── main.jsx
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── PatientHomePage.jsx
│   │   ├── Register.jsx
│   │   ├── Unauthorized.jsx
│   │   ├── admin
│   │   │   ├── AdminChangePassword.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── components
│   │   │   │   ├── AdminAuditLog.jsx
│   │   │   │   ├── AdminNavbar.jsx
│   │   │   │   ├── AdminStatsRow.jsx
│   │   │   │   ├── ClinicReviewModal.jsx
│   │   │   │   ├── LiveExchangeRates.jsx
│   │   │   │   ├── PendingClinicsTable.jsx
│   │   │   │   ├── RevenueChart.jsx
│   │   │   │   └── TopClinicsLeaderboard.jsx
│   │   │   └── mockAdminData.js
│   │   ├── clinic
│   │   │   ├── ClinicDashboard.jsx
│   │   │   ├── ClinicOverview.jsx
│   │   │   ├── ClinicProfileSettings.jsx
│   │   │   └── components
│   │   │       ├── ClinicAppointments.jsx
│   │   │       ├── ClinicDoctors.jsx
│   │   │       ├── ClinicInsurances.jsx
│   │   │       ├── ClinicLayout.jsx
│   │   │       ├── PendingApproval.jsx
│   │   │       ├── RejectedApplication.jsx
│   │   │       └── ResubmitApplication.jsx
│   │   ├── doctor
│   │   │   └── DoctorDashboard.jsx
│   │   └── patient
│   │       ├── BookAppointment.jsx
│   │       ├── ClinicDetails.css
│   │       ├── ClinicDetails.jsx
│   │       └── UserProfile.jsx
│   ├── router
│   │   └── router.jsx
│   ├── styles
│   │   └── index.css
│   └── utils
│       └── timezone.js
└── vite.config.js

```

`Dockerfile`:

```
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

```
`README.md`:

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
`docker-compose.yml`:

```yml
services:
  frontend:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
```
`eslint.config.js`:

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])

```
`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dr.Sna Dental — Patient Portal & Verified Clinic Discovery</title>
    <meta name="description" content="Discover top verified dental clinics in Amman, Irbid, Zarqa, Aqaba, and Salt. Compare consultation fees, search by specialty, and book instant dental appointments online." />
    <meta name="theme-color" content="#2563eb" />
  </head>
  <body class="bg-slate-50 text-slate-800 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```
`package-lock.json`:

```json
{
  "name": "drsnna",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "drsnna",
      "version": "0.0.0",
      "dependencies": {
        "@tailwindcss/vite": "^4.3.3",
        "i18next": "^26.4.2",
        "i18next-browser-languagedetector": "^8.2.1",
        "lucide-react": "^1.34.0",
        "react": "^19.2.8",
        "react-dom": "^19.2.8",
        "react-i18next": "^17.0.13",
        "react-router": "^8.3.0",
        "react-router-dom": "^7.18.2",
        "recharts": "^3.10.1",
        "tailwindcss": "^4.3.3"
      },
      "devDependencies": {
        "@eslint/js": "^10.0.1",
        "@types/react": "^19.2.17",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^6.0.4",
        "eslint": "^10.8.0",
        "eslint-plugin-react-hooks": "^7.1.1",
        "eslint-plugin-react-refresh": "^0.5.3",
        "globals": "^17.7.0",
        "sharp": "^0.35.3",
        "vite": "^8.2.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.8.tgz",
      "integrity": "sha512-gZbepsdh3WDtgZKWL+vTPh71LSBrm/Y4/QDZBVCcYfmeTEEuoOYwlSy+G1StfJg+/Zy550u/3TATbm7qDbbMtg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.8",
        "@babel/types": "^7.29.8",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.8.tgz",
      "integrity": "sha512-E8lTAYNB1KW+FH+VGJuZM1ioAx2E6oVlvQFRrf5P8ZZmsiJXYAD9vTFV7yyEURNzgh1dFqMZuO6tUwcARbqFCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.8"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.7.tgz",
      "integrity": "sha512-Nq8OhGWiZIZGV6hLHoyAKLLcJihP/xFeBMGJoUrxTX2psI8dCifzLhZISFb+VWS3wFMRDmCGw5R+dOySCqPLhw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.8.tgz",
      "integrity": "sha512-I5z7H3bf/41ktsNVLtpN0wAa336HkqIHQ5BuPLEhTkt1jVSyZpeNKIzTgEWmlxjdg81R0IgUCcaE+Ok3NvrfZg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.8",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.8",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.8",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.8",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.8.tgz",
      "integrity": "sha512-Vj1jF3cPfxg7OAfoI7QnVKLoILlm2JF9pnVHrX8qx7AHMiYWT+NDAA7jChlNgRS4WTLc/fD1lXLmPixluj+3Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.11.3",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.3.tgz",
      "integrity": "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.10.1.tgz",
      "integrity": "sha512-cuadcxVFE8sDK6iWJbs8Sn0av2Nrh2QSGQhVlBW9AaAHqHwjWsZHT8LJ4hFGPh7ASBV2deFdM7H/DPjulmh8rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.23.5",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.23.5.tgz",
      "integrity": "sha512-Y3kKLvC1dvTOT+oGlqNQ1XLqK6D1HU2YXPc52NmAlJZbMMWDzGYXMiPRJ8TYD39muD/OTjlZmNJ4ib7dvSrMBA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^3.0.5",
        "debug": "^4.3.1",
        "minimatch": "^10.2.4"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.7.0.tgz",
      "integrity": "sha512-DObd/KKUsU+FaFv4PLxSRenpXfQWmPXXP3pPZ6/K1PCrMu2vQpMDMuQe/BqYeoLcz8ro0bVDF1RxOJgfVEdhUw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^1.2.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/core": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-1.2.1.tgz",
      "integrity": "sha512-MwcE1P+AZ4C6DWlpin/OmOA54mmIZ/+xZuJiQd4SyB29oAJjN30UW9wkKNptW2ctp4cEsvhlLY/CsQ1uoHDloQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/js": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-10.0.1.tgz",
      "integrity": "sha512-zeR9k5pd4gxjZ0abRoIaxdc7I3nDktoXZk2qOv9gCNWx3mVwEn32VRhyLaRsDiJjTs0xq/T8mfPtyuXu7GWBcA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "eslint": "^10.0.0"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-3.0.5.tgz",
      "integrity": "sha512-vqTaUEgxzm+YDSdElad6PiRoX4t8VGDjCtt05zn4nU810UIx/uNEV7/lZJ6KwFThKZOzOxzXy48da+No7HZaMw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.7.2.tgz",
      "integrity": "sha512-+CNAzxglkrpNf/kKywqQfk74QjtceuOE7Qm+AF8miRvPF/wmmK5+OJOgVh3AVTT3RP2mH3+FOaxlE5v72owk0A==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^1.2.1",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.2.tgz",
      "integrity": "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/types": "^0.15.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.8",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.8.tgz",
      "integrity": "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.2",
        "@humanfs/types": "^0.15.0",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/types": {
      "version": "0.15.0",
      "resolved": "https://registry.npmjs.org/@humanfs/types/-/types-0.15.0.tgz",
      "integrity": "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.35.3.tgz",
      "integrity": "sha512-RMnFX7YQsMoh7lWfcM4NEHHymBX/rLuKNPVM84XE9ONPcaSCDgE7CHIHpSgPcO2xcRthgBy1HfNO319mwhIAkg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.35.3.tgz",
      "integrity": "sha512-Xo+5uFBtLN0BKqieTxiFzFPQAUlBbbH5iBKyRX/z1JrbnYsHTfKJnUfL8+p2TPXr1pXqao4eeL4Rl144uDpK9w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-freebsd-wasm32": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-freebsd-wasm32/-/sharp-freebsd-wasm32-0.35.3.tgz",
      "integrity": "sha512-lUxcqWIj2wMQ9BrwNjngcr1gWUr5xgaGThBRqPPalIC2n67Cqj1uPh8NnA/ZhAg8hUbKl+kVHKwgUIwe6ZYPrg==",
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "dependencies": {
        "@img/sharp-wasm32": "0.35.3"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.3.2.tgz",
      "integrity": "sha512-9J6ypZFpQBj4YnePGoq/S38w6nz+vqg5WZLrLGY4YuSemdMq47GMLBPO42MzwdGwpg/agZ7xzZcFHa48xlywfg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.3.2.tgz",
      "integrity": "sha512-m2pW1n6cns9VaubNwsZ+c3CRYjxNQWgJ5gPlnL1nbBcpkBvFm6SCFN5o0psFHI8w9n11NKhFkeEDns98tiqbEw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.3.2.tgz",
      "integrity": "sha512-1eMLzy92I4J6rmi4mAT8yC3HxOtniyGELlzGbNMLLeqe052ahFQ0h6LFq+lh5DsDIdYViIDst08abvSbcEdLXQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.3.2.tgz",
      "integrity": "sha512-dqVSFynCox4C/J8kT16V7SIFAns0IjgLwkvYT7p8LQVmJ5OS5b6tI9IGflxTeuBS//zXeFIUbwt5dwxyZ17cnA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.3.2.tgz",
      "integrity": "sha512-3z0NHDxD6n5I9gc05U1eW1AyRm+Gznzq3naMrthPNqE6oYykcogW0l/jfpJdjYnuNl8R7yI9pNbE1XiUeyq0Aw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.3.2.tgz",
      "integrity": "sha512-bsb4rI+NldGOsXuej2r8OdSS8+zXDVaCWxyWrcv6kneTOlgAHtZABRzBBCwdsPiD90J4myNJuHpg6kA20ImW/w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.3.2.tgz",
      "integrity": "sha512-/ABshyj8gCpyIrNXnHn4LorDJ0HHm1VhXPBlxZ8zAtfVPAaSafXPGn+sUSIRiwaSBy0mmFjSjiXI5mkcwdChKQ==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.3.2.tgz",
      "integrity": "sha512-ITPEtgffGJ0S6G9dRyw/366tJQqFRcHWPHhC+Stpg3Z8AEMrDrTr2lhdz4f/Y/HMbRh//7Z5mBzEpVdi62Oc3w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.3.2.tgz",
      "integrity": "sha512-zE9EdiUzUmg5mDT5a1rk5fYJ6GWPloTwWBYDS14naqHsL+EaMpDj1AWnpLgh3u0YCORv2Tt50wrcrpYqkP97Kw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.3.2.tgz",
      "integrity": "sha512-m0lrLiUt+lBYnCFr8qV/65yMR4E/c7/wf78I5eKTdkEakFAlZ9QlzEM3QIhhAwVeUhLAHLcCq7a7Vszq/oFNZQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.35.3.tgz",
      "integrity": "sha512-affVWCTLooy8TSxbDx2qkzuDeaWLNVBA+P//FNBirHsXpP2fuBhk5AuboYUnrDnzoXes8GFjpTx0SBFOCRg+FA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.3.2"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.35.3.tgz",
      "integrity": "sha512-QgKDspHPnrU+GQ55XPhGwyhC8acLVOOSyAvo1oVfFmrIXLkDNmGWzAfDZ4xK8oSA1qBQrALcHX0G5UZni/SuFQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.35.3.tgz",
      "integrity": "sha512-sMd8rDxmpLOwv/7N44klFjOD5DUO7FLdjiXDI0hoxYaf7Ar262dQIEkosE98bps+5HPLtp/EvNqeqQtOycP/IA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.35.3.tgz",
      "integrity": "sha512-0Eob78yjlYPfL5vMNWAW55l3R9Y6BQS/gOfe0ZcP9mEz9ohhKSt4im1hayiknXgf8AWrFqMvJcKIdmLmEe7yeQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.35.3.tgz",
      "integrity": "sha512-KgAxQ0DxpNOq1rG2t5cgTgShJFGSuU7XO45cqC+1NVOuZnP6tlgZRuSYOfNupGkHID0o3cJOsw4DVeJpMovcGw==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.3.2"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.35.3.tgz",
      "integrity": "sha512-8pqvxubL2PGdhlPy6GLqzDYMUjyRmKAwKHYKixpdJYBUK7PJ0C029XdsnpFIdgRZG68fZiGdHVWcKPvtiPB4cA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.35.3.tgz",
      "integrity": "sha512-Vz0iQjzzcSX3HCbfwFfCSG/9SCIqyO0mH2sXyiHaAYfBk0cRsCWXRyQYX0ovCK/PAQBbTzQ0dsPQHh5MAFL59w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.35.3.tgz",
      "integrity": "sha512-6O1NPKcDVj9QEdg7Hx549EX8U0rp6yXQERqru6yRN7fGBn32UvIRJUlWnk+8xDCiG76hXVBbX82NZ/ZKr0euIg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.3.2"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.35.3.tgz",
      "integrity": "sha512-cZ0XkcYGpHZkqW6iCkqTcmUC0CD9DhD5d/qeZlZkfRBn6GnHniZXLUo5+9xw8Iv76YE6LQFN9YNBlKREcCG76w==",
      "dev": true,
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.11.1"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-webcontainers-wasm32": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-webcontainers-wasm32/-/sharp-webcontainers-wasm32-0.35.3.tgz",
      "integrity": "sha512-2rnq7bX3NzeR2T4YWgz8qiG4h3TSdMe+vN1iQXpJleSJ3SM5zQ8Fy2SyyXAWlbxpEZ2Y+Z4u1BePgJEYbSy80Q==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/sharp-wasm32": "0.35.3"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.35.3.tgz",
      "integrity": "sha512-4bPwFdMbeC4JQ8L8LOyWp6nsHcboP5fxkp6iPOXz2Vg49R42TuMs2whkJ5OAP4/Ul035qOzy0AecOF9VOscn4w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.35.3.tgz",
      "integrity": "sha512-r53mXsBN6lFUDiST764SvgwUdHAqM4rPAiDzAmf4fLoB6X/rkfyTrLCg6+g17wJJiCmB3JYgHuUldCWUIRFSXw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.35.3.tgz",
      "integrity": "sha512-D4y1vNeZrIIJCN+uHaWVtH86B+aCrdMYYjicy9pXHvbGZeGYLLSd3wdVuC37FxVXlU1ARsk84eKWfWMXGYEqvA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.146.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.146.0.tgz",
      "integrity": "sha512-XC0QsnnhVe7sLIWmYmdPw7x5P0h4W8vUU3Nv1ySgWXtvCz8NizoAEpGXA0sOYoJQV2Rl13LgURAHQ5cI5ILCSA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      }
    },
    "node_modules/@reduxjs/toolkit": {
      "version": "2.12.0",
      "resolved": "https://registry.npmjs.org/@reduxjs/toolkit/-/toolkit-2.12.0.tgz",
      "integrity": "sha512-KiT+RzZbp6mQET+Mg+h2c97+9j1sNflUxQkIHI7Yuzf6Peu+OYpmkn6nbHWmLLWj+1ZODUJFwGZ7gx3L9R9EOw==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/spec": "^1.0.0",
        "@standard-schema/utils": "^0.3.0",
        "immer": "^11.0.0",
        "redux": "^5.0.1",
        "redux-thunk": "^3.1.0",
        "reselect": "^5.1.0"
      },
      "peerDependencies": {
        "react": "^16.9.0 || ^17.0.0 || ^18 || ^19",
        "react-redux": "^7.2.1 || ^8.1.3 || ^9.0.0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-redux": {
          "optional": true
        }
      }
    },
    "node_modules/@rolldown/binding-android-arm-eabi": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm-eabi/-/binding-android-arm-eabi-1.2.5.tgz",
      "integrity": "sha512-DLe/i+l8ynIBY7XEQ191TeZvCoowIGa18R+dIV30GW7DiOtp74i/xX8hs8GUjW5ARV7VZuie3d6AumSmCwbeRA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.2.5.tgz",
      "integrity": "sha512-zXcwKlQApYAOELHd8PwKDFkagYF9Wy4e0RJ+0qnzl9Pjnpj75TEG8ufv40p2J7kCEfwZAsNiuzRIyNNMWT38ig==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.2.5.tgz",
      "integrity": "sha512-dK4QakI42nzWgJT5sm4y4y/O//D4OxM75/cH28RLV+nzIN9AY+YsbuUVrUTjlLjXR6vpyxFbSsbmNuJ6BP9sww==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.2.5.tgz",
      "integrity": "sha512-fqSALaUu1Wjd1nK2uW2kJDWdLCc8lx1IcY+MTY26Aurfdx19anlzhqXOgCFbBFQnlFDTn4TC1/7Nz4Bl2mLP3A==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.2.5.tgz",
      "integrity": "sha512-/vCnNxlkxs9tKxNDcyWUePpJ/PgTzxIaVhoM5SmG8UV+GR/IcPam4VYxi7GIMo7PSDuNqlJqvprqii9NqqVCMw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.2.5.tgz",
      "integrity": "sha512-abk0NLA519LxRCszmbE0jYKuQ9YPocOXTiOXOo6Yr+YAT95VH+PtqYAjOJvGKt3viEd/x4qzabAlwd5bHOOARg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.2.5.tgz",
      "integrity": "sha512-Y7eALiJ8lr0M2HH103Js+g7V34wf6snlpZLAsHI90uLhr3PVlNsbFVAXJC9d/V6BnPyKtpSwI+NcB/RLxsQxuA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.2.5.tgz",
      "integrity": "sha512-xMvZgnbZg4YVnR/AX2b3oOPDTFYJvUVaJg5FedA/LuvexAtXibZQej4cnTkw3rjsJ/ggUROB64TdtETiim+FYA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.2.5.tgz",
      "integrity": "sha512-GRjeqTUDHTo5GwntsLaAMcBahG3nlpjftXWZLN73HiYQlhwEowvarFgQnRnQZtIp4keXX7quXFbG38uPZBa2EA==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.2.5.tgz",
      "integrity": "sha512-vLNTR45F2Uwc8AufkNXPmB4VliaXs+FvcheEogIzOXzO4l+LzieXF5A/TWxLy5HtqpsRCHUfd0lPVrrdgXdLHQ==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.2.5.tgz",
      "integrity": "sha512-Mgj59/HTuYeK9Gz2MA+mBWKnHsAgkBSec15ZMb1st3oIfFbX7gCjOae7GydHhzcyQi9Z/7M1QuN9bR3oFqF0jQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.2.5.tgz",
      "integrity": "sha512-mY8AP0/ichsbhAxGnLa3d3+MwV0EfgrPND2bplI3Ym8T6R2pJ0N87bvrKVwNXmdy3jnr6eQBecdqx/HMknBmpA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.2.5.tgz",
      "integrity": "sha512-8SLssA2oweAxyRgDp789ACfRb/3P+zNRJpzZxSizxF9m8NUDQ4+3xjo8ttjhVGGw6Qxb70oZiEtIjaKikCO7Yw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.2.5.tgz",
      "integrity": "sha512-vGbruD5zquhoc8D9SViXgN2FBJtNdTyQ4DtG+SWiEGlJiAzoKcZ2xp+xuXCffhubVdt0NJlTZqkeRuERy7g8Cw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.2.5.tgz",
      "integrity": "sha512-e/SXpgISz+IoqVcSSI0rx/d/he8zqLex+/rCWpnHpmVfmPIUjag9H6P7zotf0gJHwPUhQxZ/mF8tr6acebT9yw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/spec": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
      "integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/utils": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/utils/-/utils-0.3.0.tgz",
      "integrity": "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g==",
      "license": "MIT"
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.3.tgz",
      "integrity": "sha512-/T8IKEsf9VTU6tLjgC7+sv2mOPtQxzE2jMw7u4Tt40Tx+QSZxpzh95/H6cMKoja9XuW7iMdLJYBB0o9G1CaAgg==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.24.1",
        "jiti": "^2.7.0",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/node/node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.3.tgz",
      "integrity": "sha512-krXjAikiaFSPaK/FkAQT5UTx3VormQaiZ5hBFlJZ9UFQGB/rwg1MZIhHAG9smMQRTdyJxP6Qt5MwMtdyU5FWrA==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-arm64": "4.3.3",
        "@tailwindcss/oxide-darwin-x64": "4.3.3",
        "@tailwindcss/oxide-freebsd-x64": "4.3.3",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.3",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.3",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.3",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.3",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.3",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.3"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.3.tgz",
      "integrity": "sha512-Y85A2gmPSkl5Ve5qR86GL4HT509cFqQh1aes9p3sSkyTPwt0Pppf3GkwGe4JPACcRYjgJIEhQgM6dBClnr0NYw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.3.tgz",
      "integrity": "sha512-BiaWatpBcERQFDlOjRDpIVXuFK5PJez5SA4JMg6VYZdBYU+qKfV/vqjcIs+IYmtitf1xYQZTwXvU/8y4lfZUGw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.3.tgz",
      "integrity": "sha512-fAeUqfV5ndhxRwai8cXGzdLvul9utWOmeTkv69unv4ZXixjn61Z+p9lCWdwOwA3TYboG3BwdVuN/RDjhBRl0mw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.3.tgz",
      "integrity": "sha512-iyf5bV6+wnAlflVeEy7R25dupxTNECZN5QMI0qNT6eT+EgaGdZcKhGkr5SdoaWiLJ3spLqIY9VCeSGrwmtg4kw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.3.tgz",
      "integrity": "sha512-aAYUprJAJQWWbRrPvtjdroZ56Md+JM8pMiopS6xGEwDfLhqj+2ver2p4nU4Mb3CRqcMmNBjo8KkUgcxhkzVQGQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.3.tgz",
      "integrity": "sha512-nDxldcEENOxZRzC2uu9jrutZdAAQtb+8WWDCSnWL1zvBk1+FN+x6MtDViPB5AJMfttVCUhehGWus3XBPgatM/w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.3.tgz",
      "integrity": "sha512-Md44bD6veX/PC5iyF8cDVnw4HBIANZepRZZ7a8DQOvkfo5WUBwcp6iAuCUz23u+4SUkhJlD3eL7hNdW8ezd/kA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.3.tgz",
      "integrity": "sha512-tx7us1muwOKAKWao2v/GaafFeQboE6aj88vC6ziN2NCGcRm8gWUhwjzg+YdVB1e4boAtdtma4L43onunI6NS4w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.3.tgz",
      "integrity": "sha512-SJxX60smvHgasZoBy11dX6YRjXJFovwWBoedhbQPOBzgFWBHGB+TVPWB9BxzR7TTxU8FQZAI2AyiNCMzFm8Img==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.3.tgz",
      "integrity": "sha512-jx1+rPhY/5Ympkktd656HBWEBLxP7dH06losBLjjf5vgCODXvi9KhtftWcMIwTFIDqBr7cRnQkdLnAG+IOlGvQ==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.11.1",
        "@emnapi/runtime": "^1.11.1",
        "@emnapi/wasi-threads": "^1.2.2",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.2",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.3.tgz",
      "integrity": "sha512-3rc292Ca2ceK6Ulcc/bAVnTs/3nDtoPhyEKlgPv+yQJQi/JS/AMJlqzxvlDacL1nekbrcf6bTqp/jV4qgnPxNQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.3.tgz",
      "integrity": "sha512-yJ0pwIVc/nYeGoV02WtsN8KYyLQv7kyI2wDnkezyJlGGjkd4QLwDGAwl47YpPJeuI0M0ObaXGSPjvWDPeTPggw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.3.3.tgz",
      "integrity": "sha512-yYU8cogLeSh/ms2jh8Fj7jaba/EWa7Ja6GoUqYZaraEuCI5YS6ms6ObZgjjedm+jm6XZjdNRWBpPP6Z86oOxcw==",
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.3.3",
        "@tailwindcss/oxide": "4.3.3",
        "tailwindcss": "4.3.3"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7 || ^8"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-kVd74ta9eof3eJOvbNd1vGKS/XERRyQbT26Og63hIsvDO84cjD5gEOhsXf26w3FSoNlPVz84DOFcKv/oou+fMw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/esrecurse": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@types/esrecurse/-/esrecurse-4.3.1.tgz",
      "integrity": "sha512-xJBAbDifo5hpffDBuHl0Y8ywswbiAp/Wi7Y/GtAgSlZyIABppyurxVueOPE8LUQOxdlgi6Zqce7uoEpqNTeiUw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "19.2.18",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.18.tgz",
      "integrity": "sha512-AnzbBERsrLKtk2XSfTbYRLjQPdy116Sty4q+T+Bp3IC4l6jNBvreVPAHmpq9qhXQM7CXZPjLVmGMw9sy+hxQ3w==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.4.tgz",
      "integrity": "sha512-Bsc+QHgp+P/F02XDzNCY9jnZNCUuLki36KT7VKrTXXLdHf+vHMNZnW1rVu5DNW/rCK+fya3DATySbLM4yhtKUw==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/use-sync-external-store": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/@types/use-sync-external-store/-/use-sync-external-store-0.0.6.tgz",
      "integrity": "sha512-zFDAD+tlpf2r4asuHEj0XH6pY6i0g5NeAHPn+15wk3BV6JA69eERFXC1gyGThDkVa1zCyKr5jox1+2LbV/AMLg==",
      "license": "MIT"
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.1.0.tgz",
      "integrity": "sha512-qd2BzUBehkov86WFhg0JkEFEYyCLG9uPCe6qWTY/kRlss9OvJrOF2UbIWT7p+8IzZHkEu0DNGHc4HSv+JdDLsw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.1"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "oxc-transform-react": "^0.145.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "oxc-transform-react": {
          "optional": true
        }
      }
    },
    "node_modules/acorn": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.18.0.tgz",
      "integrity": "sha512-lGq+9yr1/GuAWaVYIHRjvvySG5/4VfKIvC8EWxStPdcDh/Ka7FG3twP6v4d5BkravUilhIAsG4Qj83t02LWUPQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.16",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.16.tgz",
      "integrity": "sha512-H/bNPUFHewJHyCTdjn1n3Pit5+2GmWT6mmeHImPX+8MA9NA6b67jO4gYmi4jTbCJb2otq34KMZnovndDPqJwhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/brace-expansion": {
      "version": "5.0.9",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.9.tgz",
      "integrity": "sha512-ScQ4IuvIEF1TMlP7Zt+vjJ//9zlPb2SDcxWxM3bk8s6t6GGdJ7KO1dCcTidOPJKePW30LE/2cT7wCyPho9/Wxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.8",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.8.tgz",
      "integrity": "sha512-V2NpofLblG64mfOtSgDhOJESZEGogzDMBv/q+W6oc4LXWP/q75eOXoOaaOu1EOadB9U4Bwx/e0yzbvwKH8zalA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.12",
        "caniuse-lite": "^1.0.30001809",
        "electron-to-chromium": "^1.5.402",
        "node-releases": "^2.0.53",
        "update-browserslist-db": "^1.3.0"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001809",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001809.tgz",
      "integrity": "sha512-xxWVywk6a6Arlk+hymeycyn/VgqEfLDxupvhH/xiY5SJ/18kmi9o6MiO320DCUzypORHLtvh0I4i04tUhCNHNQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cookie-es": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/cookie-es/-/cookie-es-3.1.1.tgz",
      "integrity": "sha512-UaXxwISYJPTr9hwQxMFYZ7kNhSXboMXP+Z3TRX6f1/NyaGPfuNUZOWP1pUEb75B2HjfklIYLVRfWiFZJyC6Npg==",
      "license": "MIT"
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.411",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.411.tgz",
      "integrity": "sha512-gglkxzokjHfawpGxq75XdBV2/l3BAPzrsMs70qgaZdTW5rpV1tC4MdgJVP9fN126bODA4ZJQkn1wryEzJyQXIg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/enhanced-resolve": {
      "version": "5.24.5",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.24.5.tgz",
      "integrity": "sha512-L1l8TNvomm6UVW5B253AGxQagSQr+vGwhMlrrfRS2qmhx46AMpMVJKQYLvWYbysTMY8VoicOvzHzoHMbyzB+4A==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/es-toolkit": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/es-toolkit/-/es-toolkit-1.52.0.tgz",
      "integrity": "sha512-XTNEJQh1tY1ZJVcf6ayP/2n4ZPyaHlW2FWs7xvw5ddPuhUVjLD3olQVQS7kf58JbAB48iL0uL/jerTrjtV3lDA==",
      "license": "MIT",
      "workspaces": [
        "docs",
        "benchmarks",
        "tests/types",
        "tests/browser-compat"
      ]
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "10.8.1",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-10.8.1.tgz",
      "integrity": "sha512-wqA7W2jbsC/BnV9Iv1UZpKVFkO1AdNoSmYW8NWG4HNOBbkAMvIqDZ27pI2f07dqn583NcIC44ckjAcOXDL1QbQ==",
      "dev": true,
      "license": "MIT",
      "workspaces": [
        "packages/*"
      ],
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.2",
        "@eslint/config-array": "^0.23.5",
        "@eslint/config-helpers": "^0.7.0",
        "@eslint/core": "^1.2.1",
        "@eslint/plugin-kit": "^0.7.2",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^9.1.2",
        "eslint-visitor-keys": "^5.0.1",
        "espree": "^11.2.0",
        "esquery": "^1.7.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "minimatch": "^10.2.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.1.1.tgz",
      "integrity": "sha512-f2I7Gw6JbvCexzIInuSbZpfdQ44D7iqdWX01FKLvrPgqxoE7oMj8clOfto8U6vYiz4yd5oKu39rRSVOe1zRu0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0 || ^10.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.5.4.tgz",
      "integrity": "sha512-7bqTKz7T0r+HKWFarNXByDE9/5+73wI2ru+M3zuqGbR7s/b/5/pQJXZoufWlrngqGqoZto73ZkGumCdLxk+4rw==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": "^9 || ^10"
      }
    },
    "node_modules/eslint-scope": {
      "version": "9.1.2",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-9.1.2.tgz",
      "integrity": "sha512-xS90H51cKw0jltxmvmHy2Iai1LIqrfbw57b79w/J7MfvDfkIkFZ+kj6zC3BjtUwh150HsSSdxXZcsuv72miDFQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "@types/esrecurse": "^4.3.1",
        "@types/estree": "^1.0.8",
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "11.2.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-11.2.0.tgz",
      "integrity": "sha512-7p3DrVEIopW1B1avAGLuCSh1jubc01H2JHc8B4qqGblmg5gI9yumBgACjWo4JlIc04ufug4xJ3SQI8HkS/Rgzw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.16.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^5.0.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/eventemitter3": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-5.0.4.tgz",
      "integrity": "sha512-mlsTRyGaPBjPedk6Bvw+aqbsXDtoAyAzm5MO7JgU+yVRyMQ5O8bD4Kcci7BS85f93veegeCPkL8R4GLClnjLFw==",
      "license": "MIT"
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.4",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.4.tgz",
      "integrity": "sha512-5+ybhBZANEJxaH3X5evAFatUxLfEHSr7n6kYJ+1Qd0mUqr4eu9gIf6GDbWHf8RJijHrjjO8G+la14SlL2SeS1Q==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "17.11.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-17.11.0.tgz",
      "integrity": "sha512-Z2I8hM+PbJDXQDq3Icgpzv+mPdwr68iZUU9d5WW4FuXfDUQfkZaZuvjMv42/5crNyw154+9+VWXbYrUgDXbxNw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/html-parse-stringify": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/html-parse-stringify/-/html-parse-stringify-4.0.1.tgz",
      "integrity": "sha512-0zHsZJrK7S3K2aucXWL6ycoYJ/iNtIcFHC/nYQgFklPtrv5LpJctIiSCroWZWeuoXvuyFdzp6KzjJQ+OT5MfFw==",
      "license": "MIT",
      "funding": {
        "url": "https://locize.com"
      }
    },
    "node_modules/i18next": {
      "version": "26.4.2",
      "resolved": "https://registry.npmjs.org/i18next/-/i18next-26.4.2.tgz",
      "integrity": "sha512-RX+R0VLg13IbvRuJSxnqykUFS9vQZTl8wYpWPCIUDWVrSGjsQywB5Y+pjzrkboxGAuYfJZVH1InFTdgBdxq6ug==",
      "funding": [
        {
          "type": "individual",
          "url": "https://www.locize.com/i18next"
        },
        {
          "type": "individual",
          "url": "https://www.i18next.com/how-to/faq#i18next-is-awesome.-how-can-i-support-the-project"
        },
        {
          "type": "individual",
          "url": "https://www.locize.com"
        }
      ],
      "license": "MIT",
      "peerDependencies": {
        "typescript": "^5 || ^6 || ^7"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/i18next-browser-languagedetector": {
      "version": "8.2.1",
      "resolved": "https://registry.npmjs.org/i18next-browser-languagedetector/-/i18next-browser-languagedetector-8.2.1.tgz",
      "integrity": "sha512-bZg8+4bdmaOiApD7N7BPT9W8MLZG+nPTOFlLiJiT8uzKXFjhxw4v2ierCXOwB5sFDMtuA5G4kgYZ0AznZxQ/cw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.23.2"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/immer": {
      "version": "11.1.18",
      "resolved": "https://registry.npmjs.org/immer/-/immer-11.1.18.tgz",
      "integrity": "sha512-EQyQtLiYW029lyoczMl/Hh4Xu7cDecSc58JRYpHyL4tIAu3eqd1yJzQX04d2BZHDkzFFvm6qJEJWOtfDSWAXbQ==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/immer"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz",
      "integrity": "sha512-WkUDrojuJs0xkgGf2udWxa3yGBRxPtxUkB79i6aCZLRgc7PM8fZe9TosfPDcvEpQZbuFASnHYmRLBLUbmLOIIA==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.33.0",
        "lightningcss-darwin-arm64": "1.33.0",
        "lightningcss-darwin-x64": "1.33.0",
        "lightningcss-freebsd-x64": "1.33.0",
        "lightningcss-linux-arm-gnueabihf": "1.33.0",
        "lightningcss-linux-arm64-gnu": "1.33.0",
        "lightningcss-linux-arm64-musl": "1.33.0",
        "lightningcss-linux-x64-gnu": "1.33.0",
        "lightningcss-linux-x64-musl": "1.33.0",
        "lightningcss-win32-arm64-msvc": "1.33.0",
        "lightningcss-win32-x64-msvc": "1.33.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz",
      "integrity": "sha512-gEpRTalKdosp4Bb8qWtc2iOgE5SeIHlpS1up9bFq2wAyYhl1UdTObYiHe98zEM9SQvSoqQZ1IQD0JNpg3Ml5pg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz",
      "integrity": "sha512-Sciaz8eenNTKn9b3t7+xr0ipTp9YxKQY4npwQ3mrRuL0BAVHBLyZxofhaKBAVtzmtRZ/zTyo0/to4B1uWG/Djg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.33.0.tgz",
      "integrity": "sha512-Z5UPAxzrjlWNNyGy6i65cJzzvgJ5D3T6wMvs+gWpY9d7qRhANrxqAp6LhxIgZhWEw18RfJTGcRxjuLIBr+m8XQ==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.33.0.tgz",
      "integrity": "sha512-QQM/Ti/hQajJwCY+RiWuCZ9sdtI/XQk7nDK5vC8kkdwixezOlDgvDx7+RT+QjK6FcFT4MpsuoBnHIo/O3StRRg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.33.0.tgz",
      "integrity": "sha512-N7FVBe6iS24MlM6R/4RBTxGhQheZGs7tiQ9U32UtF75NzP5Q7xWPRqLBCKxlRQRk3rY1jCIPLzx7WzOhuUIRLQ==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.33.0.tgz",
      "integrity": "sha512-j2v/itmy4HlNxlc6voKXYgBqNi0Ng2LShg4z7GufpEgs05P+2suBVyi9I6YHq5uoVFx9ETin3eCEhLVyXGQnKg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.33.0.tgz",
      "integrity": "sha512-yiO5ROMuYQgXbC60yjZU5CYSFZGKXL0HFATXt9mHJn1+zW55oCtMI9NfcVhYLMFDL7gV7oBPon/EmMMGg2OvtQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.33.0.tgz",
      "integrity": "sha512-ar+Ju7LmcN0Jo4FpL4hpFybwNG9/3A/Br5KW2n2jyODg3MEZXaDYADdemoNS+BDNfMgKvylJLj4S5tyRActuAg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.33.0.tgz",
      "integrity": "sha512-RYiYbkokw0trfKqqzfF55lginwEPrD3OJDfTuJzFs1MK6iFnDenaz1fqLLtX4ITG3OktJQXOeTaw1awrBAlZPw==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.33.0.tgz",
      "integrity": "sha512-1K+MPfLSFVpphzpdbfkhlWk6wBrTObBzS2T6db10PNOZgR9GoVsAWzwNyuhUYYbTp23j+4RrncfujZ4uAzXvwA==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.33.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.33.0.tgz",
      "integrity": "sha512-OlEICDx/Xl0FqSp4bry8zFnCvGpig3Gl4gCquvYwHuqJKEC1+n9NgDniFvqHGmMv1ZkqDJrDqKKSykTDX+ehuA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.34.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.34.0.tgz",
      "integrity": "sha512-vnjGJNI7Htk5+oWW8gXGuaLgwgAb0T6/iZbBrp9JCfRFwdNWZ0YTm3eyxjOLgwN6r8iyAf3UA70zNmBRBNv7yg==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/minimatch": {
      "version": "10.2.6",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.6.tgz",
      "integrity": "sha512-vpLQEs+VLCr1nU0BXS07maYoFwlDAH0gngQuuttxIwutDFEMHq2blX+8vpgxDdK3J1PwjCJiep77OitTZ4Ll1A==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.8"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.18",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.18.tgz",
      "integrity": "sha512-DTg4MJbGMWkfi6VZFdNt2/caMbQy4Ou+Op/hJQvGEWcnVfoA1QA+xzRKAzw9jD6+GVOOeYr/mIcuDSdug6F6+w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-releases": {
      "version": "2.0.53",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.53.tgz",
      "integrity": "sha512-D9UOmYG3UH1V+ENW56t5QXBwJw1YEY18ruVeus89Rw+SyIgjPkCO84bRzO3uNIYosJbNwiabWVn48o3uJLjxFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.5",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.5.tgz",
      "integrity": "sha512-RvwwcruNjI1ncT5xRakeyS9Lf8lcItv34KD+aif+VH9kduAyfYBipGh12274xtenIPZ119/R9BdTBa8gAwSh0A==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.26",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.26.tgz",
      "integrity": "sha512-u82N74LFzG8ca+dD8puPnplTXoGH4fTPpVGuIbt36G3qvNlkvfD0lEAZSxaly3KX8TS/L1A1gsCEmvKmBcVbkQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.17",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/react": {
      "version": "19.2.8",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.8.tgz",
      "integrity": "sha512-PWaYA1L/q9u2u7xYQi+Y3L3Yfnie7XyLeaJICV1MGD6LprsBxcAqGjYyr0eY3p+QdsA+x/Irkt4Qif8D63+Sbw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.8",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.8.tgz",
      "integrity": "sha512-rVprimfGBG3DR+Tq0IQG2DT5PxKth1WIGDmj5yPmlzr4YBe7uyE+Du4oVqTDXZSHGGGXRtTJEGSSePyQCMBglQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.8"
      }
    },
    "node_modules/react-i18next": {
      "version": "17.0.13",
      "resolved": "https://registry.npmjs.org/react-i18next/-/react-i18next-17.0.13.tgz",
      "integrity": "sha512-Cc1PscmblIHA1kljTqDwrcVMI21ydgmUzw0UAeQBe7pAOgfuRLfzXze4EUBQoeDiICzFIXXhHFoZxuetNg5D0Q==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.29.7",
        "html-parse-stringify": "^4.0.1",
        "use-sync-external-store": "^1.6.0"
      },
      "peerDependencies": {
        "i18next": ">= 26.2.0",
        "react": ">= 16.8.0",
        "typescript": "^5 || ^6 || ^7"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        },
        "react-native": {
          "optional": true
        },
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/react-is": {
      "version": "19.2.8",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-19.2.8.tgz",
      "integrity": "sha512-s5un28nYxKJw5gvUHyW5PCC28CvBqLu9r3cWgzHT4Vo/5fqqkFcdRYsGcKf50WMPpjjFZS5d76fn3YCo2njKwQ==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/react-redux": {
      "version": "9.3.0",
      "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-9.3.0.tgz",
      "integrity": "sha512-KQopgqFo/p/fgmAs5qz6p5RWaNAzq40WAu7fJIXnQpYxFPbJYtsJPWvGeF2rOBaY/kEuV77AVsX8TsQzKm+A/g==",
      "license": "MIT",
      "dependencies": {
        "@types/use-sync-external-store": "^0.0.6",
        "use-sync-external-store": "^1.4.0"
      },
      "peerDependencies": {
        "@types/react": "^18.2.25 || ^19",
        "react": "^18.0 || ^19",
        "redux": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "redux": {
          "optional": true
        }
      }
    },
    "node_modules/react-router": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-8.3.0.tgz",
      "integrity": "sha512-qyPMvW83jGIct3yiieisxdk9M745anqhpIMKN5m1t6yBMfgVPpt77aHOqs5fUlEJRMCGffg9BaQLH9oPVOL7xQ==",
      "license": "MIT",
      "dependencies": {
        "cookie-es": "^3.1.1"
      },
      "engines": {
        "node": ">=22.22.0"
      },
      "peerDependencies": {
        "react": ">=19.2.7",
        "react-dom": ">=19.2.7"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.18.2",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.18.2.tgz",
      "integrity": "sha512-AIKJ/jgGlFb3EbfCXk5Gzshiwt+l3mqbCrNjmEWMMjqQxNJ3svBa6bgzFyCC2Sw3RA0VWF1kg3uQf2OFhxb8hw==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.18.2"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/react-router-dom/node_modules/react-router": {
      "version": "7.18.2",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.18.2.tgz",
      "integrity": "sha512-aUVMjFm3GAPTTZL7oYr5E7ETiqfQCHRLH+B+5afnICvf0r7kkK4eR6SMuwbSTJw/7t+12khT/Kahij49fqOCIg==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/recharts": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-3.10.1.tgz",
      "integrity": "sha512-QXFrvt6IVcw7eeZCoyXTwkIJAX3Dv1nyVhMicXJ47GsGDDpcN8z6o644DibE9XjpBTThtsomLKnTV6lc+cVFUA==",
      "license": "MIT",
      "workspaces": [
        "www"
      ],
      "dependencies": {
        "@reduxjs/toolkit": "^1.9.0 || 2.x.x",
        "clsx": "^2.1.1",
        "decimal.js-light": "^2.5.1",
        "es-toolkit": "^1.39.3",
        "eventemitter3": "^5.0.1",
        "immer": "^11.1.8",
        "react-redux": "8.x.x || 9.x.x",
        "reselect": "5.2.0",
        "tiny-invariant": "^1.3.3",
        "use-sync-external-store": "^1.2.2",
        "victory-vendor": "^37.0.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-is": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/redux": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/redux/-/redux-5.0.1.tgz",
      "integrity": "sha512-M9/ELqF6fy8FwmkpnF0S3YKOqMyoWJ4+CS5Efg2ct3oY9daQvd/Pc71FpGZsVsbl3Cpb+IIcjBDUnnyBdQbq4w==",
      "license": "MIT"
    },
    "node_modules/redux-thunk": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/redux-thunk/-/redux-thunk-3.1.0.tgz",
      "integrity": "sha512-NW2r5T6ksUKXCabzhL9z+h206HQw/NJkcLm1GPImRQ8IzfXwRGqjVhKJGauHirT0DAuyy6hjdnMZaRoAcy0Klw==",
      "license": "MIT",
      "peerDependencies": {
        "redux": "^5.0.0"
      }
    },
    "node_modules/reselect": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/reselect/-/reselect-5.2.0.tgz",
      "integrity": "sha512-AgZ3UOZm3YndfrJ4OYjgrT7bmCm/1iqkjvEfH/oYjzh6PD2qw4QuT3jjnXIrpdt4MTpMXclMT3lXbmRY+XRakw==",
      "license": "MIT"
    },
    "node_modules/rolldown": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.2.5.tgz",
      "integrity": "sha512-VD2IE5PUG4Oj8zz2VGykiYd5wbnjdIiSsNQb8Qu5B+noEp+A78mu2iVvpp27g8es14Tk9rofNs5Tku9iQCS4fA==",
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.146.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm-eabi": "1.2.5",
        "@rolldown/binding-android-arm64": "1.2.5",
        "@rolldown/binding-darwin-arm64": "1.2.5",
        "@rolldown/binding-darwin-x64": "1.2.5",
        "@rolldown/binding-freebsd-x64": "1.2.5",
        "@rolldown/binding-linux-arm-gnueabihf": "1.2.5",
        "@rolldown/binding-linux-arm64-gnu": "1.2.5",
        "@rolldown/binding-linux-arm64-musl": "1.2.5",
        "@rolldown/binding-linux-ppc64-gnu": "1.2.5",
        "@rolldown/binding-linux-s390x-gnu": "1.2.5",
        "@rolldown/binding-linux-x64-gnu": "1.2.5",
        "@rolldown/binding-linux-x64-musl": "1.2.5",
        "@rolldown/binding-openharmony-arm64": "1.2.5",
        "@rolldown/binding-win32-arm64-msvc": "1.2.5",
        "@rolldown/binding-win32-x64-msvc": "1.2.5"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/sharp": {
      "version": "0.35.3",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.35.3.tgz",
      "integrity": "sha512-ej0zVHuZGHCiABXcNxeYhpRnPNPAcvbG8RMdBAhDAxLKkCRVSpK3Iyu7qbqw3JMzoj0REeM6f3tJLtVwl0023Q==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@img/colour": "^1.1.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.8.5"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.35.3",
        "@img/sharp-darwin-x64": "0.35.3",
        "@img/sharp-freebsd-wasm32": "0.35.3",
        "@img/sharp-libvips-darwin-arm64": "1.3.2",
        "@img/sharp-libvips-darwin-x64": "1.3.2",
        "@img/sharp-libvips-linux-arm": "1.3.2",
        "@img/sharp-libvips-linux-arm64": "1.3.2",
        "@img/sharp-libvips-linux-ppc64": "1.3.2",
        "@img/sharp-libvips-linux-riscv64": "1.3.2",
        "@img/sharp-libvips-linux-s390x": "1.3.2",
        "@img/sharp-libvips-linux-x64": "1.3.2",
        "@img/sharp-libvips-linuxmusl-arm64": "1.3.2",
        "@img/sharp-libvips-linuxmusl-x64": "1.3.2",
        "@img/sharp-linux-arm": "0.35.3",
        "@img/sharp-linux-arm64": "0.35.3",
        "@img/sharp-linux-ppc64": "0.35.3",
        "@img/sharp-linux-riscv64": "0.35.3",
        "@img/sharp-linux-s390x": "0.35.3",
        "@img/sharp-linux-x64": "0.35.3",
        "@img/sharp-linuxmusl-arm64": "0.35.3",
        "@img/sharp-linuxmusl-x64": "0.35.3",
        "@img/sharp-webcontainers-wasm32": "0.35.3",
        "@img/sharp-win32-arm64": "0.35.3",
        "@img/sharp-win32-ia32": "0.35.3",
        "@img/sharp-win32-x64": "0.35.3"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/sharp/node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.3",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.3.tgz",
      "integrity": "sha512-gOhV3P7ufE62QDGg1zVaTgCR+EtPv92k2nIhVcVKcLmxT1sUBsQGhnZj175j+MqRt4zLF7ic+sCYjfhxMxj7YQ==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD",
      "optional": true
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.1.tgz",
      "integrity": "sha512-ZZ61DsRsOnakl74HAmp3oSN4aXUmEWXf+i/yv0h7tIBfICc3VdrFErQKUUKPgu3AMsTUMbcongALEN4l6GSUrQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/victory-vendor": {
      "version": "37.3.6",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-37.3.6.tgz",
      "integrity": "sha512-SbPDPdDBYp+5MJHhBCAyI7wKM3d5ivekigc2Dk2s7pgbZ9wIgIBYGVw4zGHBml/qTFbexrofXW6Gu4noGxrOwQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "8.2.2",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.2.2.tgz",
      "integrity": "sha512-cFKLV/PRgAUlIRm5WjMjJ86jrftzpqcgH+Us+DS8mI3CDNiH30Whrz8uHL3+MOLPAgqbMBAqWdAHAphOAM+z/Q==",
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.33.0",
        "picomatch": "^4.0.5",
        "postcss": "^8.5.26",
        "rolldown": "~1.2.4",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.4.0 || ^0.5.0",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.4.3.tgz",
      "integrity": "sha512-ytENFjIJFl2UwYglde2jchW2Hwm4GJFLDiSXWdTrJQBIN9Fcyp7n4DhxJEiWNAJMV1/BqWfW/kkg71UDcHJyTQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    }
  }
}

```
`package.json`:

```json
{
  "name": "drsnna",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "i18next": "^26.4.2",
    "i18next-browser-languagedetector": "^8.2.1",
    "lucide-react": "^1.34.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-i18next": "^17.0.13",
    "react-router": "^8.3.0",
    "react-router-dom": "^7.18.2",
    "recharts": "^3.10.1",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "eslint": "^10.8.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "sharp": "^0.35.3",
    "vite": "^8.2.0"
  }
}

```
`src\App.jsx`:

```jsx
function App() {
  return <div></div>
}

export default App

```
`src\api\authApi.js`:

```js
const API_BASE_URL = "http://localhost:8080/api";

export async function login({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        },

        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
}

export async function registerPatient({
                                          fullName,
                                          email,
                                          city,
                                          password,
                                          confirmPassword,
                                      }) {
    const response = await fetch(
        `${API_BASE_URL}/auth/register/user`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
            },

            body: JSON.stringify({
                fullName,
                email,
                city,
                password,
                confirmPassword,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Patient registration failed");
    }

    return data;
}

export async function registerClinic({
                                         clinicName,
                                         email,
                                         city,
                                         clinicLicenseNumber,
                                         password,
                                         confirmPassword,
                                     }) {
    const response = await fetch(
        `${API_BASE_URL}/auth/register/clinic`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
            },

            body: JSON.stringify({
                clinicName,
                email,
                city,
                clinicLicenseNumber,
                password,
                confirmPassword,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "clinic registration failed");
    }

    return data;
}

export async function logout(token) {
    const response = await fetch(
        `${API_BASE_URL}/auth/logout`,
        {
            method: "POST",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Logout failed");
    }

    return data;
}

export async function changeAdminPassword({
                                              newPassword,
                                              confirmPassword,
                                              token,
                                          }) {
    const response = await fetch(
        `${API_BASE_URL}/auth/change-password`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept-Language":
                    localStorage.getItem("i18nextLng") || "en",
            },

            body: JSON.stringify({
                newPassword,
                confirmPassword,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to change password"
        );
    }

    return data;
}
```
`src\api\clinicAppointmentsApi.js`:

```js
import { getToken } from "../auth/authStorage";

const API_URL = 'http://localhost:8080/api/clinic/appointments';

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en"
    };
}

export const getClinicAppointments = async (startDate, endDate, doctorId, status) => {
    try {
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (doctorId) params.append('doctorId', doctorId);
        if (status) params.append('status', status);

        const response = await fetch(`${API_URL}?${params.toString()}`, {
            method: 'GET',
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch clinic appointments");
        return await response.json();
    } catch (error) {
        console.error('Error fetching clinic appointments:', error);
        throw error;
    }
};

export const createClinicAppointment = async (appointmentData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(appointmentData)
        });
        if (!response.ok) {
            const errBody = await response.text();
            let errMsg = "Failed to create appointment";
            try {
                const json = JSON.parse(errBody);
                errMsg = json.message || errMsg;
            } catch (e) {
                errMsg = `${errMsg}: ${errBody}`;
            }
            throw new Error(errMsg);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating clinic appointment:', error);
        throw error;
    }
};

export const deleteClinicAppointment = async (appointmentId) => {
    try {
        const response = await fetch(`${API_URL}/${appointmentId}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Failed to delete appointment");
        return true;
    } catch (error) {
        console.error('Error deleting clinic appointment:', error);
        throw error;
    }
};

export const fetchClinicAvailability = async (date, doctorId, serviceIds = []) => {
    try {
        const params = new URLSearchParams();
        params.append('date', date);
        if (doctorId) params.append('doctorId', doctorId);
        serviceIds.forEach(id => params.append('serviceId', id));

        const CLINIC_API_URL = API_URL.replace('/appointments', '');
        const response = await fetch(`${CLINIC_API_URL}/availability?${params.toString()}`, {
            method: 'GET',
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch clinic availability");
        return await response.json();
    } catch (error) {
        console.error('Error fetching clinic availability:', error);
        throw error;
    }
};


```
`src\api\clinicDoctorsApi.js`:

```js
/**
 * clinicDoctorsApi.js
 *
 * API service layer for clinic doctor management.
 * Currently returns mock data – swap implementations when the backend is ready.
 *
 * Every function returns a Promise so callers already use async/await,
 * making the migration to real HTTP calls seamless.
 */

const BASE_URL = "http://localhost:8080/api/clinic";

import { getToken } from "../auth/authStorage";
import { localToUtcSpecific, utcToLocalSpecific } from "../utils/timezone";

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en"
    };
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Fetch the list of doctors for this clinic. */
export async function fetchDoctors() {
    const res = await fetch(`${BASE_URL}/doctors`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch doctors");
    const data = await res.json();
    return data.map(d => ({
        ...d,
        id: d.doctorUserId, // Map backend's doctorUserId to id for UI compatibility
    }));
}

/** Fetch the list of available specialties. */
export async function fetchSpecialties() {
    const res = await fetch(`${BASE_URL}/specialties`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch specialties");
    const data = await res.json();
    // Assuming backend returns an array of objects with a name/specialtyName field
    // Map to just strings for the UI
    return data.map(s => s.name || s.specialtyName || s);
}

/** Add a new doctor profile. Returns the created doctor object. */
export async function addDoctor({ fullName, email, specialty, bio }) {
    const password = 'Password@123'; // Must meet backend validation

    const res = await fetch(`${BASE_URL}/doctors`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ fullName, email, password, specialty, bio }),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to add doctor";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors && errData.validationErrors.length > 0) {
                errMsg += ": " + errData.validationErrors.join(", ");
            }
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
    const created = await res.json();
    return { ...created, id: created.doctorUserId };
}

export async function updateDoctor(doctorId, { fullName, email, specialty, bio }) {
    if (!doctorId) throw new Error("Doctor ID is missing. Please refresh the page.");
    const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ fullName, email, specialty, bio }),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to update doctor";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors && errData.validationErrors.length > 0) {
                errMsg += ": " + errData.validationErrors.join(", ");
            }
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
    const updated = await res.json();
    return { ...updated, id: updated.doctorUserId };
}

/** Toggle a doctor's active status. Returns the updated doctor. */
export async function toggleDoctorStatus(doctorId, isActive) {
    if (!doctorId) throw new Error("Doctor ID is missing. Please refresh the page.");
    const res = await fetch(`${BASE_URL}/doctors/${doctorId}/toggle-status`, {
        method: "PATCH",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to toggle status");
    const updated = await res.json();
    return { ...updated, id: updated.doctorUserId };
}

/** Fetch working-hour schedule for a doctor. */
export async function fetchDoctorSchedule(doctorId) {
    const res = await fetch(`${BASE_URL}/schedules/doctor-schedule/${doctorId}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch schedule");
    const savedSchedules = await res.json();

    // Map backend schedules to the 7-day format expected by UI
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function labelForOffset(offset) {
        if (offset === 0) return "Today";
        if (offset === 1) return "Tomorrow";
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        return `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`;
    }

    // Use backend dates directly as local dates
    const localSavedSchedules = savedSchedules.map(s => {
        if (!s.startTime || !s.endTime) return null;
        return {
            localDate: s.specificDate,
            startTime: s.startTime.substring(0, 5),
            endTime: s.endTime.substring(0, 5)
        };
    }).filter(Boolean);

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const dayNum = String(d.getDate()).padStart(2, '0');
        const isoDate = `${year}-${month}-${dayNum}`;

        // Find if we have a mapped local schedule for this specific date
        const backendDay = localSavedSchedules.find(s => s.localDate === isoDate);

        return {
            dayLabel: labelForOffset(i),
            isoDate: isoDate, // Keep this for saving later
            isActive: !!backendDay,
            startTime: backendDay ? backendDay.startTime : "",
            endTime: backendDay ? backendDay.endTime : "",
        };
    });
}

export async function saveDoctorSchedule(doctorId, specificDateStr, startTime, endTime) {
    const startTimeFull = startTime.length === 5 ? startTime + ":00" : startTime;
    const endTimeFull = endTime.length === 5 ? endTime + ":00" : endTime;

    const res = await fetch(`${BASE_URL}/schedules/doctor-schedule`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            doctorId,
            type: "DOCTOR_SHIFT",
            specificDate: specificDateStr,
            startTime: startTimeFull,
            endTime: endTimeFull
        })
    });
    if (!res.ok) throw new Error("Failed to save schedule");
    return res.json();
}

/** Delete a specific day's shift schedule. */
export async function deleteDoctorScheduleDate(doctorId, specificDateStr, startTime, endTime) {
    const params = new URLSearchParams();
    params.append('doctorId', doctorId);
    params.append('specificDate', specificDateStr);

    const res = await fetch(`${BASE_URL}/schedules/doctor-schedule?${params.toString()}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete schedule");
    return res.text();
}

/** Delete a doctor from the clinic. */
export async function deleteDoctor(doctorId) {
    if (!doctorId) throw new Error("Doctor ID is missing. Please refresh the page.");
    const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to delete doctor";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
}


```
`src\api\clinicInsuranceApi.js`:

```js
import { getToken } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api/clinic";

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en"
    };
}

export async function fetchInsurances() {
    const res = await fetch(`${BASE_URL}/insurance-companies`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch insurances");
    return res.json();
}

export async function addInsurance(data) {
    const res = await fetch(`${BASE_URL}/insurance-companies`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to add insurance: ${text}`);
    }
    return res.json();
}

export async function updateInsurance(id, data) {
    const res = await fetch(`${BASE_URL}/insurance-companies/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to update insurance: ${text}`);
    }
    return res.json();
}

export async function deleteInsurance(id) {
    const res = await fetch(`${BASE_URL}/insurance-companies/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to delete insurance: ${text}`);
    }
}


```
`src\api\clinicProfileApi.js`:

```js
import { getToken } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api/clinic";

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en"
    };
}

/** Fetch the clinic profile. */
export async function fetchClinicProfile() {
    const res = await fetch(`${BASE_URL}/profile`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch clinic profile");
    return res.json();
}

/** Update the clinic profile. */
export async function updateClinicProfile(data) {
    const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to update profile";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors && errData.validationErrors.length > 0) {
                errMsg += ": " + errData.validationErrors.join(", ");
            }
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
    return res.json();
}

/** Resubmit rejected clinic application. */
export async function resubmitApplication(data) {
    const res = await fetch(`${BASE_URL}/resubmit`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to resubmit application";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors && errData.validationErrors.length > 0) {
                errMsg += ": " + errData.validationErrors.join(", ");
            }
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
    return res.json();
}

/** Fetch clinic hours from the schedule endpoint. */
export async function fetchClinicHours() {
    const res = await fetch(`${BASE_URL}/schedules/clinic-hours`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch clinic hours");
    return res.json();
}

/** Save a specific day's clinic hours. */
export async function saveClinicHours(dayOfWeekStr, startTime, endTime) {
    const res = await fetch(`${BASE_URL}/schedules/clinic-hours`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            dayOfWeek: dayOfWeekStr,
            startTime,
            endTime,
        }),
    });
    if (!res.ok) throw new Error("Failed to save clinic hours");
    return res.json();
}

/** Delete a specific day's clinic hours. */
export async function deleteClinicHours(dayOfWeekStr) {
    const res = await fetch(`${BASE_URL}/schedules/clinic-hours?dayOfWeek=${dayOfWeekStr}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete clinic hours");
}

/** Fetch clinic specialties. */
export async function fetchSpecialties() {
    const res = await fetch(`${BASE_URL}/specialties`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch specialties");
    return res.json();
}

/** Add a new specialty or associate an existing one. */
export async function addSpecialty(name, durationMinutes = 60) {
    const res = await fetch(`${BASE_URL}/specialties`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name, durationMinutes }),
    });
    if (!res.ok) throw new Error("Failed to add specialty");
    return res.json();
}

/** Delete a specialty from the clinic. */
export async function deleteSpecialty(name) {
    const res = await fetch(`${BASE_URL}/specialties/${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to remove specialty");
}

/** Permanently delete a custom specialty from the database. */
export async function deleteSpecialtyPermanently(name) {
    const res = await fetch(`${BASE_URL}/specialties/${encodeURIComponent(name)}/permanent`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete specialty permanently");
}

/** Fetch all global specialties. */
export async function fetchAllSpecialties() {
    const res = await fetch(`${BASE_URL}/specialties/all`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch all specialties");
    return res.json();
}

/** Update the duration of a specific specialty for the clinic. */
export async function updateSpecialtyDuration(specialtyId, durationMinutes) {
    const res = await fetch(`${BASE_URL}/specialties/${specialtyId}/duration`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ durationMinutes }),
    });
    if (!res.ok) throw new Error("Failed to update specialty duration");
    return res.json();
}


```
`src\api\patientApi.js`:

```js
// src/api/patientApi.js
import { getAuth } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api";

function authHeaders() {
    const auth = getAuth();
    return {
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    };
}

function cleanQueryParams(params = {}) {
    if (typeof params === "string") return params;
    const clean = {};
    Object.entries(params).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "undefined" &&
            value !== "null" &&
            value !== "All-Cities" &&
            value !== "All Cities" &&
            value !== "All Specialties" &&
            value !== "All"
        ) {
            clean[key] = value;
        }
    });
    return new URLSearchParams(clean).toString();
}

// ── 1. Clinic Discovery Endpoints ─────────────────────────────────────
export async function searchClinics(params = {}) {
    const queryString = cleanQueryParams(params);
    const url = `${BASE_URL}/patient/clinics${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to search clinics");
    }
    return res.json();
}
export const getClinics = searchClinics;
export const fetchClinics = searchClinics;

export async function getClinicDetails(clinicId) {
    const res = await fetch(`${BASE_URL}/patient/clinics/${clinicId}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load clinic details");
    }
    return res.json();
}
export const fetchClinicDetails = getClinicDetails;

// ── 2. Slot Availability Endpoint ────────────────────────────────────
export async function fetchAvailability({ clinicId, date, doctorId, serviceId, serviceIds } = {}) {
    if (!clinicId || !date) return [];

    const params = new URLSearchParams();
    params.append("date", date);
    
    if (serviceIds && serviceIds.length > 0) {
        serviceIds.forEach(id => params.append("serviceId", id));
    } else if (serviceId) {
        params.append("serviceId", serviceId);
    }
    if (doctorId && doctorId !== "undefined" && doctorId.trim() !== "") {
        params.append("doctorId", doctorId);
    }

    try {
        const res = await fetch(
            `${BASE_URL}/patient/clinics/${clinicId}/availability?${params.toString()}`,
            {
                headers: authHeaders(),
            }
        );

        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}
export const getAvailability = fetchAvailability;

// ── 3. Appointment Booking Endpoint ──────────────────────────────────
export async function bookAppointment(payload) {
    const res = await fetch(`${BASE_URL}/appointments/book`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to complete appointment booking");
    }
    return data;
}
export const bookPatientAppointment = bookAppointment;

// ── 4. Patient Appointments & History ────────────────────────────────
export async function getPatientAppointments(scope = "upcoming") {
    const res = await fetch(`${BASE_URL}/patient/appointments?scope=${scope}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load appointments");
    }
    return res.json();
}
export const fetchPatientAppointments = getPatientAppointments;

export async function getAppointmentDetails(appointmentId) {
    const res = await fetch(`${BASE_URL}/patient/appointments/${appointmentId}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load appointment details");
    }
    return res.json();
}

export async function cancelAppointment(appointmentId) {
    const res = await fetch(`${BASE_URL}/patient/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to cancel appointment");
    }
    return data;
}

// ── 5. Reviews ───────────────────────────────────────────────────────
export async function createReview(reviewPayload) {
    const res = await fetch(`${BASE_URL}/patient/reviews`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(reviewPayload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
    }
    return data;
}

// ── 6. Patient Favorites ─────────────────────────────────────────────
export async function getPatientFavorites() {
    const res = await fetch(`${BASE_URL}/patient/favorites`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load favorite doctors");
    }
    return res.json();
}

export async function addDoctorToFavorites(doctorId) {
    const res = await fetch(`${BASE_URL}/patient/favorites`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ doctorId }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to add favorite");
    }
    return data;
}

export async function removeDoctorFromFavorites(doctorId) {
    const res = await fetch(`${BASE_URL}/patient/favorites/${doctorId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to remove favorite");
    }
    return data;
}

// ── 7. Profile / Auth Endpoints ──────────────────────────────────────
export async function getMyProfile() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load profile details");
    }
    return res.json();
}
export const getPatientProfile = getMyProfile;

export async function updateMyProfile(profileData) {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(profileData),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
    }
    return data;
}
export const updatePatientProfile = updateMyProfile;

// ── 8. Doctor View Endpoints ─────────────────────────────────────────
export async function getDoctorAppointments(date = null, scope = "upcoming") {
    const params = new URLSearchParams({ scope });
    if (date) params.append("date", date);

    const res = await fetch(`${BASE_URL}/doctor/appointments?${params.toString()}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load doctor appointments");
    }
    return res.json();
}
export const fetchDoctorAppointments = getDoctorAppointments;

export async function getDoctorSchedule() {
    const res = await fetch(`${BASE_URL}/doctor/schedule`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load doctor schedule");
    }
    return res.json();
}
export const fetchDoctorSchedule = getDoctorSchedule;

// ── 9. Wallet Endpoint ───────────────────────────────────────────────
export async function getWallet() {
    const res = await fetch(`${BASE_URL}/patient/wallet`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load wallet details");
    }
    return res.json();
}

```
`src\api\superAdminApi.js`:

```js
import { getAuth } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api";

function authHeaders() {
    const auth = getAuth();
    return {
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    };
}

export async function getDashboardSummary() {
    const res = await fetch(`${BASE_URL}/super-admin/dashboard`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load super admin dashboard summary");
    }
    return res.json();
}

export async function getPendingClinics() {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/pending`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load pending clinics");
    return res.json();
}

export async function getClinicReview(clinicId) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/review`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load clinic review details");
    return res.json();
}

export async function approveClinic(clinicId) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/approve`, {
        method: "POST",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to approve clinic");
    return res.json();
}

export async function rejectClinic(clinicId, data) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/reject`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to reject clinic");
    return res.json();
}

export async function overrideCommission(clinicId, rate) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/commission`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ commissionRate: rate })
    });
    if (!res.ok) throw new Error("Failed to override commission");
    return res.json();
}


export async function getClinics(status = null) {
    const url = status
        ? `${BASE_URL}/super-admin/clinics?status=${status}`
        : `${BASE_URL}/super-admin/clinics`;

    const res = await fetch(url, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load clinics");
    return res.json();
}

export async function removeClinic(clinicId) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to remove clinic");
    }
    return true;
}

```
`src\auth\authStorage.js`:

```js
const AUTH_KEY = "auth";

export function saveAuth(authData) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

export function getAuth() {
    const auth = sessionStorage.getItem(AUTH_KEY);

    if (!auth) {
        return null;
    }

    try {
        return JSON.parse(auth);
    } catch {
        return null;
    }
}

export function getToken() {
    return getAuth()?.token || null;
}

export function getRole() {
    return getAuth()?.role || null;
}

export function clearAuth() {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
}
```
`src\auth\roleRedirect.js`:

```js
const ROLE_ROUTES = {
    ADMIN: "/admin",
    CLINIC: "/clinic",
    DOCTOR: "/doctor",
    PATIENT: "/",
};

export function getRoleRedirect(role) {
    return ROLE_ROUTES[role] || "/unauthorized";
}
```
`src\auth\routeGuards.js`:

```js
import { redirect } from "react-router";
import { getAuth, getRole } from "./authStorage.js";
import { getRoleRedirect } from "./roleRedirect.js";

export function requireRole(requiredRole) {
    const auth = getAuth();

    if (!auth) {
        throw redirect("/login");
    }

    const role = getRole();

    if (role !== requiredRole) {
        throw redirect("/unauthorized");
    }

    // Inactive admins must change their password first
    if (
        requiredRole === "ADMIN" &&
        auth.isActive === false
    ) {
        throw redirect("/admin/change-password");
    }

    return auth;
}

export function requireInactiveAdmin() {
    const auth = getAuth();

    if (!auth) {
        throw redirect("/login");
    }

    if (auth.role !== "ADMIN") {
        throw redirect("/unauthorized");
    }

    // Active admins should never access the password-change page
    if (auth.isActive !== false) {
        throw redirect("/admin");
    }

    return auth;
}

export function requireGuest() {
    const auth = getAuth();

    if (auth) {
        // Inactive admin needs to change password
        if (
            auth.role === "ADMIN" &&
            auth.isActive === false
        ) {
            throw redirect("/admin/change-password");
        }

        throw redirect(
            getRoleRedirect(auth.role)
        );
    }

    return null;
}
```
`src\clinic\ClinicSidebar.jsx`:

```jsx
import 'react';
import { NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, UserRound, Calendar, Settings, HelpCircle, LogOut, Stethoscope, ShieldCheck, Globe } from 'lucide-react';
import { clearAuth } from '../auth/authStorage';
import { useTranslation } from 'react-i18next';

export default function ClinicSidebar() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    };

    const navItems = [
        { name: 'Dashboard', path: '/clinic', icon: LayoutDashboard, end: true },
        { name: 'Doctors', path: '/clinic/doctors', icon: UserRound },
        { name: 'Appointments', path: '/clinic/appointments', icon: Calendar },
        { name: 'Insurances', path: '/clinic/insurances', icon: ShieldCheck, badge: '4' },
        { name: 'Settings', path: '/clinic/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between p-4 sticky top-0 h-screen">
            <div>
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-2 py-4 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xs">
                        <Stethoscope className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900 leading-none text-lg">Dr.Sna Dental</h1>
                        <span className="text-[13px] text-gray-500 font-medium">{t('clinicSidebar.clinicPortal')}</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const translatedName = t(`clinicSidebar.${item.name.toLowerCase()}`);
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-colors ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-5 h-5" />
                                            <span>{translatedName}</span>
                                        </div>
                                        {item.badge && (
                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                                                    isActive
                                                        ? 'bg-blue-800 text-white'
                                                        : 'bg-blue-50 text-blue-600'
                                                }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Portal target for page-specific sidebar content */}
                <div id="sidebar-page-content" className="mt-2"></div>
            </div>

            {/* Footer Links */}
            <div className="border-t border-gray-100 pt-4 space-y-1">
                <button 
                    onClick={toggleLanguage}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 w-full rounded-xl transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5" />
                        {i18n.language === 'ar' ? 'English' : 'العربية'}
                    </div>
                </button>
                <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 w-full rounded-xl transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    {t('clinicSidebar.support')}
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-red-600 w-full rounded-xl transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    {t('clinicSidebar.logout')}
                </button>
            </div>
        </aside>
    );
}
```
`src\components\ModernAlertModal.jsx`:

```jsx
import React, { useEffect } from "react";

/**
 * ModernAlertModal - A sleek, accessible replacement for native browser alerts.
 *
 * @param {boolean} isOpen - Whether the alert is visible
 * @param {string} title - Optional title (defaults based on type)
 * @param {string} message - The main alert text
 * @param {'error' | 'warning' | 'info' | 'success'} type - Visual styling type
 * @param {string} buttonText - Text for the confirm button
 * @param {() => void} onClose - Callback when dismissed
 */
export default function ModernAlertModal({
    isOpen,
    title,
    message,
    type = "warning",
    buttonText = "Understood",
    showCancel = false,
    cancelText = "Cancel",
    confirmText,
    onConfirm,
    onClose
}) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "Enter" && showCancel && onConfirm) {
                onConfirm();
            } else if (e.key === "Enter" && !showCancel) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, showCancel, onConfirm]);

    if (!isOpen) return null;

    const defaultTitles = {
        error: "Action Failed",
        warning: "Warning",
        info: "Notice",
        success: "Success",
        danger: "Confirm Deletion"
    };

    const displayTitle = title || defaultTitles[type] || "Notice";

    const typeConfigs = {
        warning: {
            bgIcon: "bg-amber-50 text-amber-600 border-amber-200 ring-amber-100/60",
            buttonClass: "bg-[#0f3460] hover:bg-[#1a4a85] text-white shadow-[#0f3460]/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            )
        },
        danger: {
            bgIcon: "bg-rose-50 text-rose-600 border-rose-200 ring-rose-100/60",
            buttonClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
            )
        },
        error: {
            bgIcon: "bg-rose-50 text-rose-600 border-rose-200 ring-rose-100/60",
            buttonClass: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            )
        },
        info: {
            bgIcon: "bg-blue-50 text-blue-600 border-blue-200 ring-blue-100/60",
            buttonClass: "bg-blue-900 hover:bg-blue-800 text-white shadow-blue-900/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            )
        },
        success: {
            bgIcon: "bg-emerald-50 text-emerald-600 border-emerald-200 ring-emerald-100/60",
            buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            )
        }
    };

    const config = typeConfigs[type] || typeConfigs.warning;
    const finalConfirmText = confirmText || buttonText;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[3px] animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-[420px] rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col items-center text-center animate-[scaleIn_0.2s_ease-out] relative"
            >
                {/* Close 'x' button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Status Icon with soft glow ring */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ring-4 mb-4 transition-transform hover:scale-105 duration-200 ${config.bgIcon}`}>
                    {config.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {displayTitle}
                </h3>

                {/* Message Body */}
                <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-[340px]">
                    {message}
                </p>

                {/* Action buttons */}
                <div className="w-full mt-6 flex gap-3">
                    {showCancel && (
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={onConfirm || onClose}
                        autoFocus
                        className={`flex-1 py-2.5 px-5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer ${config.buttonClass}`}
                    >
                        {finalConfirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

```
`src\components\PatientNavbar.jsx`:

```jsx
// src/components/PatientNavbar.jsx
import React from 'react';
import { useNavigate, useSubmit } from 'react-router';
import { Stethoscope, User } from 'lucide-react';
import { getAuth } from '../auth/authStorage';

export default function PatientNavbar() {
    const navigate = useNavigate();
    const submit = useSubmit();
    const auth = getAuth();

    function handleLogout() {
        submit(null, { method: 'post', action: '/logout' });
    }

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Brand / Logo */}
                <div
                    className="flex items-center gap-2.5 cursor-pointer select-none"
                    onClick={() => navigate('/')}
                >
                    <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-xs overflow-hidden">
                        <img src="/logo.png" alt="DrSnna" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                            DrSnna
                        </span>
                        <p className="text-[10px] text-slate-500 font-medium -mt-0.5">Patient Portal</p>
                    </div>
                </div>

                {/* Right Actions: Logout & User Profile Trigger */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* ── LOGOUT Button (Image Asset) ── */}
                    <button
                        onClick={handleLogout}
                        className="transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
                        title="Log Out"
                    >
                        <img
                            src="/logout-btn.png"
                            alt="Logout"
                            className="h-17 w-auto object-contain mix-blend-multiply"
                        />
                    </button>

                    {/* ── User Profile Icon (Entry Point) ── */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="relative w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-700 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                        aria-label="User Profile"
                        title="Open Profile"
                    >
                        <User className="w-5 h-5" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </button>
                </div>

            </div>
        </header>
    );
}
```
`src\components\doctors\AddDoctorModal.tsx`:

```tsx
import React, { useState } from 'react';
import { UserPlus, Mail, Stethoscope, Info, Send, X, RefreshCw, Check } from 'lucide-react';
import { addDoctor } from '../../api/clinicDoctorsApi';

interface AddDoctorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    specialties?: string[];
}

export const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    specialties = []
}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [bio, setBio] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const toggleSpecialty = (s: string) => {
        setSelectedSpecialties(prev =>
            prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (selectedSpecialties.length === 0) {
            setError("Please select at least one specialty.");
            setLoading(false);
            return;
        }

        try {
            await addDoctor({
                fullName: fullName.trim(),
                email: email.trim(),
                specialty: selectedSpecialties.join(', '),
                bio: bio.trim(),
                sendEmailNotification: true,
            });

            // Reset form
            setFullName('');
            setEmail('');
            setSelectedSpecialties([]);
            setBio('');

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'An error occurred while adding the doctor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
        >
            <div className="flex min-h-full items-center justify-center p-4" onClick={onClose}>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-[16px] shadow-2xl w-full max-w-[540px] overflow-hidden animate-[scaleIn_0.2s_ease-out] my-8"
                    onClick={(e) => e.stopPropagation()}
                >
                {/* Header */}
                <div className="flex items-start justify-between p-7 pb-5">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
                            <UserPlus className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-bold text-slate-900">Add New Doctor</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Add a healthcare practitioner to your clinic roster.</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-7 py-2 flex flex-col gap-5">
                    {/* Full Name */}
                    <label className="block">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">Doctor Full Name <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <UserPlus className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                                placeholder="Dr. Tariq Haddad"
                                required
                            />
                        </div>
                    </label>

                    {/* Email Address */}
                    <div className="bg-[#f8faff] border border-blue-100 rounded-2xl p-4 -mx-1">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">Doctor Email Address <span className="text-red-500">*</span></span>
                            <div className="flex items-center gap-1.5 bg-blue-100/50 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold">
                                <RefreshCw className="w-3 h-3" />
                                Auto-Notification
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-500">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-blue-200 bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400 shadow-sm shadow-blue-500/5"
                                placeholder="tariq.haddad@gmail.com"
                                required
                            />
                        </div>
                        <div className="mt-3 text-[10px] text-blue-700/90 flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">
                                <span className="font-bold">Email Notification:</span> When this doctor is added, the system automatically sends a notification email to this address to verify their roster placement and login access.
                            </span>
                        </div>
                    </div>

                    {/* Specialty - Checkboxes as requested */}
                    <div className="block">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">Medical Specialty <span className="text-red-500">*</span></span>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {(specialties.length > 0 ? specialties : ['Orthodontics', 'General Dentistry', 'Pediatric Dentistry', 'Endodontics', 'Oral Surgery']).map(spec => {
                                const isSelected = selectedSpecialties.includes(spec);
                                return (
                                    <button
                                        key={spec}
                                        type="button"
                                        onClick={() => toggleSpecialty(spec)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isSelected
                                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                            } flex items-center gap-1.5 cursor-pointer`}
                                    >
                                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-white'}`}>
                                            {isSelected && (
                                                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                            )}
                                        </div>
                                        {spec}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bio */}
                    <label className="block mb-2">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">Doctor Bio & Credentials</span>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                            placeholder="Specialist in clear aligners and orthodontic diagnostics with 7+ years of clinical practice in Amman."
                        />
                    </label>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                            <Info className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-7 pt-4 flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] text-slate-500 font-medium leading-tight max-w-[140px]">Doctor will receive automated onboarding email</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold text-white bg-[#2563eb] rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Send className="w-3.5 h-3.5" />
                                    Add Doctor & Send Email
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};
```
`src\i18n.js`:

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

// Set initial direction
document.documentElement.dir = i18n.dir(i18n.language);
document.documentElement.lang = i18n.language;

export default i18n;

```
`src\locales\ar\translation.json`:

```json
{
  "profileSettings": {
    "title": "إعدادات ملف العيادة",
    "description": "إدارة المعلومات العامة وتفاصيل الاتصال الخاصة بعيادتك.",
    "saveSettings": "حفظ الإعدادات",
    "cancel": "إلغاء",
    "savedSuccessfully": "تم حفظ التغييرات بنجاح.",
    "remove": "إزالة",
    "unsavedChanges": {
      "title": "تغييرات غير محفوظة",
      "description": "لديك تغييرات غير محفوظة. هل أنت متأكد أنك تريد المغادرة؟ ستفقد تغييراتك.",
      "stay": "البقاء في الصفحة",
      "leave": "المغادرة على أي حال"
    },
    "clinicInfo": {
      "title": "المعلومات العامة",
      "clinicName": "اسم العيادة",
      "checkingFee": "رسوم الكشف",
      "currency": "دينار",
      "description": "الوصف",
      "descriptionPlaceholder": "صف بإيجاز مهمة عيادتك وتخصصاتها والجو العام...",
      "characters": "أحرف"
    },
    "contactAndSocial": {
      "title": "التواصل وحسابات التواصل الاجتماعي",
      "phoneNumber": "رقم الهاتف",
      "socialMedia": "حسابات التواصل الاجتماعي والروابط العامة",
      "socialMediaPlaceholder": "أضف روابط انستغرام، فيسبوك، لينكدإن، موقع الويب أو ملفات تعريف أخرى",
      "linkPlaceholder": "مثل: instagram.com/clinic أو https://facebook.com/clinic",
      "addLink": "إضافة رابط +"
    },
    "locationDetails": {
      "title": "تفاصيل الموقع",
      "city": "المدينة",
      "address": "العنوان",
      "mapPreview": "معاينة الخريطة غير متاحة حتى يتم الحفظ"
    },
    "medicalSpecialties": {
      "title": "التخصصات الطبية",
      "addSpecialty": "إضافة تخصص +",
      "addNewSpecialty": "إضافة تخصص جديد",
      "specialtyName": "اسم التخصص",
      "specialtyNamePlaceholder": "مثل: طب جذور الأسنان",
      "duration": "المدة (بالدقائق)",
      "durationHint": "يجب أن تكون المدة من مضاعفات العدد 5 (مثل 15، 30، 45، 60).",
      "modifyDuration": "تعديل المدة",
      "saveDuration": "حفظ المدة",
      "delete": "حذف"
    },
    "clinicHours": {
      "title": "ساعات عمل العيادة",
      "closed": "مغلق",
      "to": "إلى"
    },
    "days": {
      "Sunday": "الأحد",
      "Monday": "الإثنين",
      "Tuesday": "الثلاثاء",
      "Wednesday": "الأربعاء",
      "Thursday": "الخميس",
      "Friday": "الجمعة",
      "Saturday": "السبت"
    },
    "cities": {
      "AMMAN": "عمان",
      "IRBID": "إربد",
      "ZARQA": "الزرقاء",
      "MAFRAQ": "المفرق",
      "AJLOUN": "عجلون",
      "JERASH": "جرش",
      "MADABA": "مادبا",
      "BALQA": "الصلت",
      "KARAK": "الكرك",
      "TAFILEH": "الطفيلة",
      "MAAN": "معان",
      "AQABA": "العقبة"
    }
  },
  "clinicSidebar": {
    "dashboard": "لوحة القيادة",
    "doctors": "الأطباء",
    "appointments": "المواعيد",
    "insurances": "شركات التأمين",
    "settings": "الإعدادات",
    "support": "الدعم",
    "logout": "تسجيل الخروج",
    "clinicPortal": "بوابة العيادة"
  },
  "clinicDashboard": {
    "welcome": "مرحباً بكم في عيادة د. سنا لطب الأسنان!",
    "subtitle": "إليك ما يحدث في عيادتك اليوم، 24 أكتوبر.",
    "totalPatients": "إجمالي المرضى",
    "appointments": "المواعيد",
    "today": "اليوم",
    "monthlyRevenue": "الإيرادات الشهرية",
    "clinicDoctors": "أطباء العيادة",
    "dailySchedule": {
      "title": "الجدول اليومي",
      "subtitle": "المواعيد القادمة لهذا اليوم.",
      "viewCalendar": "عرض التقويم كاملاً",
      "columns": {
        "time": "الوقت",
        "patient": "المريض",
        "treatment": "العلاج",
        "doctor": "الطبيب",
        "status": "الحالة"
      },
      "loadMore": "تحميل المزيد من المواعيد"
    },
    "recentActivity": {
      "title": "النشاط الأخير",
      "booking": {
        "title": "حجز جديد للدكتور جنكينز",
        "desc": "المريضة: إميلي كارتر • غداً، 2:30 مساءً",
        "time": "منذ 10 دقائق"
      },
      "payment": {
        "title": "تم استلام الدفعة: $450.00",
        "desc": "الفاتورة #INV-2023-089 تم دفعها ببطاقة الائتمان.",
        "time": "منذ 45 دقيقة"
      },
      "record": {
        "title": "تم تحديث السجل الطبي",
        "desc": "قام الدكتور تشين بتحديث المخطط البياني للمريض روبرت فوكس.",
        "time": "منذ ساعتين"
      },
      "cancellation": {
        "title": "إلغاء الموعد",
        "desc": "قامت أماندا لي بإلغاء موعدها الساعة 1:00 مساءً.",
        "time": "منذ 3 ساعات"
      }
    }
  },
  "clinicDoctors": {
    "title": "أطباء العيادة",
    "subtitle": "إدارة المتخصصين في الرعاية الصحية في عيادتك.",
    "addNewDoctor": "إضافة طبيب جديد",
    "table": {
      "name": "الاسم",
      "specialty": "التخصص",
      "email": "البريد الإلكتروني",
      "phone": "رقم الهاتف",
      "status": "الحالة",
      "actions": "الإجراءات"
    },
    "status": {
      "active": "نشط",
      "inactive": "غير نشط"
    },
    "actions": {
      "edit": "تعديل",
      "delete": "حذف",
      "manageHours": "إدارة ساعات العمل",
      "deactivate": "تعطيل",
      "activate": "تفعيل"
    },
    "deleteModal": {
      "title": "إزالة طبيب",
      "message": "هل أنت متأكد أنك تريد إزالة هذا الطبيب من العيادة؟",
      "confirm": "حذف",
      "cancel": "إلغاء"
    },
    "profileModal": {
      "editTitle": "تعديل ملف الطبيب",
      "addTitle": "إضافة طبيب جديد",
      "subtitle": "إضافة ممارس رعاية صحية إلى قائمة عيادتك.",
      "fullName": "الاسم الكامل للطبيب",
      "email": "البريد الإلكتروني للطبيب",
      "autoNotification": "إشعار تلقائي",
      "emailNotice": "إشعار البريد الإلكتروني:",
      "emailNoticeDesc": "عند إضافة هذا الطبيب، يقوم النظام تلقائياً بإرسال بريد إشعار إلى هذا العنوان للتحقق من تسجيله ووصوله.",
      "specialty": "التخصص الطبي",
      "bio": "السيرة الذاتية والمؤهلات",
      "selectSpecialty": "يرجى اختيار تخصص واحد على الأقل.",
      "onboardingNote": "سيتلقى الطبيب بريد تسجيل تلقائي",
      "cancel": "إلغاء",
      "saving": "جارٍ الحفظ...",
      "saveChanges": "حفظ التغييرات",
      "addAndSend": "إضافة طبيب وإرسال البريد"
    },
    "scheduleModal": {
      "title": "إدارة ساعات العمل",
      "active": "نشط",
      "inactive": "غير نشط",
      "clinicClosed": "العيادة مغلقة",
      "startTime": "وقت البدء",
      "endTime": "وقت الانتهاء",
      "selectTime": "اختر الوقت",
      "saveChanges": "حفظ التغييرات"
    },
    "loading": "جارٍ تحميل الأطباء…",
    "noDoctors": "لم تتم إضافة أطباء بعد.",
    "addFirst": "+ أضف أول طبيب لديك"
  },
  "clinicAppointments": {
    "title": "مواعيد العيادة",
    "subtitle": "إدارة حجوزات المرضى والجدول الزمني.",
    "tabs": {
      "all": "كل المواعيد",
      "today": "اليوم",
      "upcoming": "القادمة",
      "past": "السابقة"
    },
    "table": {
      "patientName": "اسم المريض",
      "doctor": "الطبيب",
      "dateTime": "التاريخ والوقت",
      "service": "الخدمة",
      "status": "الحالة",
      "actions": "الإجراءات"
    },
    "status": {
      "confirmed": "مؤكد",
      "completed": "مكتمل",
      "cancelled": "ملغي",
      "pending": "قيد الانتظار"
    },
    "actions": {
      "edit": "تعديل",
      "cancel": "إلغاء",
      "newAppointment": "موعد جديد",
      "deleteSelected": "حذف المحدد"
    },
    "cancelModal": {
      "title": "إلغاء الموعد",
      "message": "هل أنت متأكد أنك تريد إلغاء هذا الموعد؟",
      "confirm": "نعم، إلغاء الموعد",
      "cancel": "لا، احتفظ به"
    },
    "deleteModal": {
      "title": "حذف الموعد",
      "cancel": "إلغاء",
      "confirm": "حذف الموعد"
    },
    "newModal": {
      "title": "موعد زيارة بدون حجز مسبق",
      "selectDoctor": "اختر الطبيب",
      "selectTreatment": "اختر العلاج والمدة",
      "selectDate": "اختر التاريخ",
      "selectTime": "اختر الوقت",
      "selected": "محدد",
      "available": "متاح",
      "booked": "محجوز",
      "noSlots": "لا توجد مواعيد متاحة لهذا التاريخ.",
      "loading": "جارٍ التحميل...",
      "slotsFree": "فترات متاحة",
      "maxTreatments": "يمكن اختيار علاجين كحد أقصى.",
      "loadingServices": "جارٍ تحميل الخدمات...",
      "noTreatments": "لا توجد علاجات متاحة لهذا الطبيب.",
      "cancel": "إلغاء",
      "saving": "جارٍ الحفظ...",
      "schedule": "حجز الموعد",
      "slots": "فترات"
    }
  },
  "clinicInsurances": {
    "title": "شركات التأمين",
    "subtitle": "إدارة شبكات التأمين المقبولة وتفاصيل التغطية",
    "addInsurance": "إضافة تأمين",
    "table": {
      "network": "الشبكة",
      "status": "الحالة",
      "action": "الإجراء"
    },
    "status": {
      "active": "نشط",
      "inactive": "غير نشط"
    },
    "actions": {
      "edit": "تعديل",
      "remove": "إزالة"
    },
    "modal": {
      "title": "تفاصيل التأمين",
      "name": "اسم الشبكة",
      "namePlaceholder": "مثال: نات هيلث",
      "status": "الحالة",
      "active": "نشط",
      "inactive": "غير نشط",
      "save": "حفظ شركة التأمين",
      "cancel": "إلغاء",
      "editTitle": "تعديل شركة التأمين",
      "addTitle": "إضافة شركة تأمين",
      "companyName": "اسم شركة التأمين",
      "coverageTiers": "فئات / مستويات التغطية المقبولة",
      "coveragePlaceholder": "الفئة أ، الفئة ب، VIP، الذهبي للشركات",
      "companyPlaceholder": "شركة التأمين الأردنية (JIC)",
      "copay": "نسبة الدفع المشترك للمريض (%)",
      "copayPlaceholder": "مثال: 10",
      "approvalPhone": "هاتف الموافقات",
      "phonePlaceholder": "078xxxxxxx",
      "portalUrl": "رابط بوابة المطالبات / الموافقة الإلكترونية (اختياري)",
      "portalPlaceholder": "https://e-approval.jic.jo",
      "instantPreApproval": "تفعيل الموافقة المسبقة الإلكترونية الفورية",
      "instantPreApprovalDesc": "السماح بالتحقق الفوري من أهلية المريض أثناء حجز الموعد",
      "update": "تحديث شركة التأمين"
    },
    "breadcrumb": {
      "profile": "ملف العيادة",
      "affiliations": "الانتماءات الشبكية"
    },
    "kpi": {
      "activeProviders": "مزودون نشطون",
      "companies": "شركة",
      "verifiedClaims": "100% مطالبات موثقة",
      "directBilling": "الفوترة المباشرة",
      "enabled": "مفعّل",
      "portalSynced": "البوابة الإلكترونية متزامنة",
      "copayRate": "نسبة الدفع المشترك الافتراضية",
      "basedOnTier": "بناءً على مستوى التغطية"
    },
    "partners": {
      "title": "شركات التأمين المعتمدة",
      "healthPartner": "شريك صحي",
      "coverageTier": "مستوى التغطية:",
      "copayDeductible": "الدفع المشترك / الخصم:",
      "approvalHotline": "خط الموافقات:",
      "directBilling": "الفوترة المباشرة:",
      "instantPreApproval": "موافقة مسبقة فورية",
      "onlinePortal": "بوابة إلكترونية",
      "activeAgreement": "اتفاقية نشطة"
    },
    "addCard": {
      "title": "إضافة شركة تأمين جديدة",
      "subtitle": "ربط مزودي التأمين الطبي وتعيين الخطط المقبولة لعيادتك"
    },
    "search": "البحث عن مزود أو بوليصة..."
  }
}
```
`src\locales\en\translation.json`:

```json
{
  "profileSettings": {
    "title": "Clinic Profile Settings",
    "description": "Manage your clinic's public information and contact details.",
    "saveSettings": "Save Settings",
    "cancel": "Cancel",
    "savedSuccessfully": "Changes saved successfully.",
    "remove": "Remove",
    "unsavedChanges": {
      "title": "Unsaved Changes",
      "description": "You have unsaved changes. Are you sure you want to leave? Your changes will be lost.",
      "stay": "Stay on Page",
      "leave": "Leave Anyway"
    },
    "clinicInfo": {
      "title": "General Information",
      "clinicName": "Clinic Name",
      "checkingFee": "Checking Fee",
      "currency": "JOD",
      "description": "Description",
      "descriptionPlaceholder": "Briefly describe your clinic's mission, specialties, and atmosphere...",
      "characters": "characters"
    },
    "contactAndSocial": {
      "title": "Contact & Social",
      "phoneNumber": "Phone Number",
      "socialMedia": "Social Media & Public Links",
      "socialMediaPlaceholder": "Add links to your Instagram, Facebook, LinkedIn, website, or other profiles",
      "linkPlaceholder": "e.g. instagram.com/clinic or https://facebook.com/clinic",
      "addLink": "Add Link +"
    },
    "locationDetails": {
      "title": "Location Details",
      "city": "City",
      "address": "Address",
      "mapPreview": "Map preview unavailable until saved"
    },
    "medicalSpecialties": {
      "title": "Medical Specialties",
      "addSpecialty": "Add Specialty +",
      "addNewSpecialty": "Add New Specialty",
      "specialtyName": "Specialty Name",
      "specialtyNamePlaceholder": "e.g. Endodontics",
      "duration": "Duration (min)",
      "durationHint": "Duration must be a multiple of 5 (e.g. 15, 30, 45, 60).",
      "modifyDuration": "Modify Duration",
      "saveDuration": "Save Duration",
      "delete": "Delete"
    },
    "clinicHours": {
      "title": "Clinic Hours",
      "closed": "Closed",
      "to": "to"
    },
    "days": {
      "Sunday": "Sunday",
      "Monday": "Monday",
      "Tuesday": "Tuesday",
      "Wednesday": "Wednesday",
      "Thursday": "Thursday",
      "Friday": "Friday",
      "Saturday": "Saturday"
    },
    "cities": {
      "AMMAN": "Amman",
      "IRBID": "Irbid",
      "ZARQA": "Zarqa",
      "MAFRAQ": "Mafraq",
      "AJLOUN": "Ajloun",
      "JERASH": "Jerash",
      "MADABA": "Madaba",
      "BALQA": "Salt",
      "KARAK": "Karak",
      "TAFILEH": "Tafilah",
      "MAAN": "Maan",
      "AQABA": "Aqaba"
    }
  },
  "clinicSidebar": {
    "dashboard": "Dashboard",
    "doctors": "Doctors",
    "appointments": "Appointments",
    "insurances": "Insurances",
    "settings": "Settings",
    "support": "Support",
    "logout": "Logout",
    "clinicPortal": "Clinic Portal"
  },
  "clinicDashboard": {
    "welcome": "Welcome to Dr.Sna Dental!",
    "subtitle": "Here is what's happening at your clinic today, October 24th.",
    "totalPatients": "TOTAL PATIENTS",
    "appointments": "APPOINTMENTS",
    "today": "Today",
    "monthlyRevenue": "MONTHLY REVENUE",
    "clinicDoctors": "CLINIC DOCTORS",
    "dailySchedule": {
      "title": "Daily Schedule",
      "subtitle": "Upcoming appointments for today.",
      "viewCalendar": "View Full Calendar",
      "columns": {
        "time": "Time",
        "patient": "Patient",
        "treatment": "Treatment",
        "doctor": "Doctor",
        "status": "Status"
      },
      "loadMore": "Load More Appointments"
    },
    "recentActivity": {
      "title": "Recent Activity",
      "booking": {
        "title": "New booking for Dr. Jenkins",
        "desc": "Patient: Emily Carter • Tomorrow, 2:30 PM",
        "time": "10 mins ago"
      },
      "payment": {
        "title": "Payment received: $450.00",
        "desc": "Invoice #INV-2023-089 paid by Credit Card.",
        "time": "45 mins ago"
      },
      "record": {
        "title": "Medical record updated",
        "desc": "Dr. Chen updated charting for patient Robert Fox.",
        "time": "2 hours ago"
      },
      "cancellation": {
        "title": "Cancellation",
        "desc": "Amanda Lee cancelled 1:00 PM appointment.",
        "time": "3 hours ago"
      }
    }
  },
  "clinicDoctors": {
    "title": "Clinic Doctors",
    "subtitle": "Manage your clinic's healthcare professionals.",
    "addNewDoctor": "Add New Doctor",
    "table": {
      "name": "Name",
      "specialty": "Specialty",
      "email": "Email",
      "phone": "Phone",
      "status": "Status",
      "actions": "Actions"
    },
    "status": {
      "active": "Active",
      "inactive": "Inactive"
    },
    "actions": {
      "edit": "Edit",
      "delete": "Delete",
      "manageHours": "Manage Working Hours",
      "deactivate": "Deactivate",
      "activate": "Activate"
    },
    "deleteModal": {
      "title": "Remove Doctor",
      "message": "Are you sure you want to remove this doctor from the clinic?",
      "confirm": "Delete",
      "cancel": "Cancel"
    },
    "profileModal": {
      "editTitle": "Edit Doctor Profile",
      "addTitle": "Add New Doctor",
      "subtitle": "Add a healthcare practitioner to your clinic roster.",
      "fullName": "Doctor Full Name",
      "email": "Doctor Email Address",
      "autoNotification": "Auto-Notification",
      "emailNotice": "Email Notification:",
      "emailNoticeDesc": "When this doctor is added, the system automatically sends a notification email to this address to verify their roster placement and login access.",
      "specialty": "Medical Specialty",
      "bio": "Doctor Bio & Credentials",
      "selectSpecialty": "Please select at least one specialty.",
      "onboardingNote": "Doctor will receive automated onboarding email",
      "cancel": "Cancel",
      "saving": "Saving...",
      "saveChanges": "Save Changes",
      "addAndSend": "Add Doctor & Send Email"
    },
    "scheduleModal": {
      "title": "Manage Working Hours",
      "active": "Active",
      "inactive": "Inactive",
      "clinicClosed": "Clinic Closed",
      "startTime": "Start Time",
      "endTime": "End Time",
      "selectTime": "Select Time",
      "saveChanges": "Save Changes"
    },
    "loading": "Loading doctors…",
    "noDoctors": "No doctors added yet.",
    "addFirst": "+ Add your first doctor"
  },
  "clinicAppointments": {
    "title": "Clinic Appointments",
    "subtitle": "Manage patient bookings and schedule.",
    "tabs": {
      "all": "All Appointments",
      "today": "Today",
      "upcoming": "Upcoming",
      "past": "Past"
    },
    "table": {
      "patientName": "Patient Name",
      "doctor": "Doctor",
      "dateTime": "Date & Time",
      "service": "Service",
      "status": "Status",
      "actions": "Actions"
    },
    "status": {
      "confirmed": "Confirmed",
      "completed": "Completed",
      "cancelled": "Cancelled",
      "pending": "Pending"
    },
    "actions": {
      "edit": "Edit",
      "cancel": "Cancel",
      "newAppointment": "New Appointment",
      "deleteSelected": "Delete Selected"
    },
    "cancelModal": {
      "title": "Cancel Appointment",
      "message": "Are you sure you want to cancel this appointment?",
      "confirm": "Yes, Cancel Appointment",
      "cancel": "No, Keep It"
    },
    "deleteModal": {
      "title": "Delete Appointment",
      "cancel": "Cancel",
      "confirm": "Delete Appointment"
    },
    "newModal": {
      "title": "New Walk-In Appointment",
      "selectDoctor": "Select Doctor",
      "selectTreatment": "SELECT TREATMENT & DURATION",
      "selectDate": "SELECT DATE",
      "selectTime": "SELECT TIME",
      "selected": "Selected",
      "available": "Available",
      "booked": "Booked",
      "noSlots": "No available appointments for this date.",
      "loading": "Loading...",
      "slotsFree": "Slots Free",
      "maxTreatments": "Maximum of 2 treatments can be selected.",
      "loadingServices": "Loading services...",
      "noTreatments": "No treatments available for this doctor.",
      "cancel": "Cancel",
      "saving": "Saving...",
      "schedule": "Schedule Appointment",
      "slots": "slots"
    }
  },
  "clinicInsurances": {
    "title": "Insurance Providers",
    "subtitle": "Manage accepted insurance networks and coverage details",
    "addInsurance": "Add Insurance",
    "table": {
      "network": "Network",
      "status": "Status",
      "action": "Action"
    },
    "status": {
      "active": "Active",
      "inactive": "Inactive"
    },
    "actions": {
      "edit": "Edit",
      "remove": "Remove"
    },
    "modal": {
      "title": "Insurance Details",
      "name": "Network Name",
      "namePlaceholder": "e.g. NatHealth",
      "status": "Status",
      "active": "Active",
      "inactive": "Inactive",
      "save": "Save Insurance Company",
      "cancel": "Cancel",
      "editTitle": "Edit Insurance Company",
      "addTitle": "Add Insurance Company",
      "companyName": "INSURANCE COMPANY NAME",
      "coverageTiers": "ACCEPTED COVERAGE TIERS / CLASSES",
      "coveragePlaceholder": "Class A, Class B, VIP, Corporate Gold",
      "companyPlaceholder": "Jordan Insurance Company (JIC)",
      "copay": "DEFAULT PATIENT CO-PAY (%)",
      "copayPlaceholder": "e.g. 10",
      "approvalPhone": "Approval Phone",
      "phonePlaceholder": "078xxxxxxx",
      "portalUrl": "CLAIMS PORTAL / E-APPROVAL URL (OPTIONAL)",
      "portalPlaceholder": "https://e-approval.jic.jo",
      "instantPreApproval": "Enable Instant Electronic Pre-approval",
      "instantPreApprovalDesc": "Allow instant patient eligibility lookup during appointment booking",
      "update": "Update Insurance Company"
    },
    "breadcrumb": {
      "profile": "CLINIC PROFILE",
      "affiliations": "NETWORK AFFILIATIONS"
    },
    "kpi": {
      "activeProviders": "ACTIVE PROVIDERS",
      "companies": "Companies",
      "verifiedClaims": "100% Verified Claims",
      "directBilling": "DIRECT BILLING",
      "enabled": "Enabled",
      "portalSynced": "Electronic portal synced",
      "copayRate": "DEFAULT CO-PAY RATE",
      "basedOnTier": "Based on tiered coverage"
    },
    "partners": {
      "title": "Accepted Insurance Partners",
      "healthPartner": "Health Partner",
      "coverageTier": "Coverage Tier:",
      "copayDeductible": "Co-Pay / Deductible:",
      "approvalHotline": "Approval Hotline:",
      "directBilling": "Direct Billing:",
      "instantPreApproval": "Instant Pre-approval",
      "onlinePortal": "Online Portal",
      "activeAgreement": "Active Agreement"
    },
    "addCard": {
      "title": "Add New Insurance Company",
      "subtitle": "Link medical insurance providers and set accepted plans for your clinic"
    },
    "search": "Search provider or policy..."
  }
}
```
`src\main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router/dom";
import {router} from "./router/router.jsx";
import "./styles/index.css";
import './i18n' // Import i18n configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

```
`src\pages\Login.jsx`:

```jsx
import { Form, useActionData, useNavigation, useSearchParams, Link } from "react-router";

export default function Login() {
    const actionData = useActionData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();

    const registered = searchParams.get("registered");

    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex min-h-screen w-full bg-white font-sans text-slate-800">
            {/* القسم الأيسر: الهوية البصرية (5/12) */}
            <div className="relative hidden w-5/12 flex-col justify-between overflow-hidden p-12 text-white lg:flex bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }}>

                {/* Overlay لدمج اللون الأزرق مع الصورة وجعل النص واضح */}
                <div className="absolute inset-0 bg-blue-500/70 backdrop-blur-[2px]" />

                {/* Visual Elements */}
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />

                {/* Logo */}
                <Link
                    to="/"
                    className="relative z-10 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-fit"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md overflow-hidden">
                        <img src="/logo.png" alt="logo" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">DrSnna</span>
                </Link>

                {/* Hero Text */}
                <div className="relative z-10 max-w-md space-y-4">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Book your dental visit <br />
                        in just a few clicks.
                    </h1>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        SmileDesk connects you with trusted dental clinics in your area — pick a time, confirm, and you're set.
                    </p>

                    <div className="mt-8 flex h-24 w-44 flex-col justify-between rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-inner">
                        <div className="h-2 w-16 rounded bg-white/40" />
                        <div className="flex items-center justify-between">
                            <div className="h-2 w-20 rounded bg-white/30" />
                            <div className="h-7 w-7 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>

                {/* Footer النص السفلي الظاهر بالصورة */}
                <div className="relative z-10 text-xs text-blue-100/80">
                    © SmileDesk — appointments made simple
                </div>
            </div>

            {/* القسم الأيمن: تسجيل الدخول (7/12) */}
            <div className="flex w-full lg:w-7/12 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Login</h1>
                    </div>

                    {registered === "true" && (
                        <p className="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700 border border-emerald-200">
                            Your account was created successfully, but we
                            couldn't log you in automatically. Please log in
                            manually.
                        </p>
                    )}

                    <Form method="post" className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">Password</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                minLength={8}
                                maxLength={20}
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        {actionData?.error && (
                            <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                                {actionData.error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 cursor-pointer transition-all mt-2"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </Form>

                    {/* الخط الفاصل ورابط إنشاء الحساب */}
                    <div className="relative flex items-center justify-center border-t border-slate-200 pt-4">
                        <span className="bg-white px-2 text-xs text-slate-400">or</span>
                    </div>

                    <div className="text-center text-xs text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">
                            Create one
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
```
`src\pages\PatientHomePage.jsx`:

```jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PatientNavbar from '../components/PatientNavbar';
import {
  Stethoscope,
  Search,
  MapPin,
  Star,
  Clock,
  DollarSign,
  ChevronDown,
  RotateCcw,
  X,
  ArrowRight,
  User,
  Calendar
} from 'lucide-react';

import { searchClinics } from '../api/patientApi';

const CITIES = [
  "All Cities", "Amman", "Irbid", "Zarqa", "Aqaba", "Salt",
  "Mafraq", "Ajloun", "Jerash", "Madaba", "Karak", "Tafilah", "Maan"
];
const DEFAULT_SPECIALTIES = [
  "All Specialties",
  "General Dentistry",
  "Orthodontics",
  "Oral Surgery",
  "Pediatric Dentistry",
  "Periodontics",
  "Cosmetic Dentistry",
  "Endodontics"
];

export default function PatientHomePage() {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [availability, setAvailability] = useState('Anytime'); // 'Anytime' | 'Today'
  const [selectedStars, setSelectedStars] = useState(0); // 0 = All, 1..5 = Min Stars
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { minAvailableFee, maxAvailableFee } = useMemo(() => {
    if (clinics.length === 0) return { minAvailableFee: 0, maxAvailableFee: 50 };
    const fees = clinics.map(c => c.checkingFee || 0);
    return {
      minAvailableFee: Math.min(...fees),
      maxAvailableFee: Math.max(...fees)
    };
  }, [clinics]);

  const [maxFee, setMaxFee] = useState(50);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMaxFee(maxAvailableFee);
  }, [maxAvailableFee]);

  // Optimized debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 120);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setSelectedCity('All Cities');
    setSelectedSpecialty('All Specialties');
    setAvailability('Anytime');
    setSelectedStars(0);
    setMaxFee(maxAvailableFee);
    setSortBy('default');
  };

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (debouncedSearch) count++;
    if (selectedCity !== 'All Cities') count++;
    if (selectedSpecialty !== 'All Specialties') count++;
    if (availability !== 'Anytime') count++;
    if (selectedStars > 0) count++;
    if (maxFee < maxAvailableFee) count++;
    if (sortBy !== 'default') count++;
    return count;
  }, [debouncedSearch, selectedCity, selectedSpecialty, availability, selectedStars, maxFee, sortBy, maxAvailableFee]);

  // Accumulate custom specialties so they don't disappear when clinics are filtered
  const [customSpecialties, setCustomSpecialties] = useState(new Set());

  useEffect(() => {
    if (clinics.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCustomSpecialties(prev => {
        const nextSet = new Set(prev);
        let added = false;
        clinics.forEach(clinic => {
          clinic.specialties?.forEach(spec => {
            if (!DEFAULT_SPECIALTIES.includes(spec) && !nextSet.has(spec)) {
              nextSet.add(spec);
              added = true;
            }
          });
        });
        return added ? nextSet : prev;
      });
    }
  }, [clinics]);

  const dynamicSpecialties = useMemo(() => {
    return [...DEFAULT_SPECIALTIES, ...Array.from(customSpecialties)];
  }, [customSpecialties]);

  // Fetch from API
  useEffect(() => {
    async function loadClinics() {
      try {
        setLoading(true);

        let dateParams = {};
        if (availability === 'Today') {
          const today = new Date();
          // Format as YYYY-MM-DD in local time
          const localIsoDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
          dateParams = {
            date: localIsoDate,
            availableOnly: true
          };
        }

        const data = await searchClinics({
          name: debouncedSearch,
          city: selectedCity,
          specialty: selectedSpecialty,
          ...dateParams
        });
        setClinics(data);
      } catch (err) {
        console.error("Failed to load clinics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadClinics();
  }, [debouncedSearch, selectedCity, selectedSpecialty, availability]);

  // Fast Memoized Filtering
  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      if (clinic.checkingFee > maxFee) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'fee') return (a.checkingFee || 0) - (b.checkingFee || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [clinics, maxFee, sortBy]);

  const handleClinicClick = (clinicId) => {
    navigate(`/clinic-details/${clinicId}`);
  };

  const handleStarClick = (starCount) => {
    setSelectedStars(selectedStars === starCount ? 0 : starCount);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white pb-16">

      {/* 1. HEADER */}
      <PatientNavbar />

      {/* 2. HERO */}
      <section className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Discover Top <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Dental Clinics</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
            Connect with top-rated local dental specialists, compare consultation fees, and reserve instant online appointments seamlessly.
          </p>
        </div>
      </section>

      {/* 3. SINGLE TOP TOOLBAR */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md pt-4 pb-3 border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-2.5 flex flex-wrap items-center justify-between gap-2.5">

            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clinic name, doctor..."
                aria-label="Search clinics by name, doctor, or keyword"
                className="w-full pl-9 pr-8 py-2 bg-slate-50 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="relative w-36 sm:w-40 flex items-center">
              <MapPin className="w-3.5 h-3.5 absolute left-2.5 text-blue-600 pointer-events-none z-10" />
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Filter clinics by City"
                className="w-full pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition-all"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city === 'All Cities' ? ' All Cities' : city}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Specialty Dropdown */}
            <div className="relative w-40 sm:w-44 flex items-center">
              <Stethoscope className="w-3.5 h-3.5 absolute left-2.5 text-blue-600 pointer-events-none z-10" />
              <select
                id="specialty-select"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                aria-label="Filter clinics by Dental Specialty"
                className="w-full pl-8 pr-7 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition-all"
              >
                {dynamicSpecialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === 'All Specialties' ? 'All Specialties' : spec}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Interactive 5-Star Rating Picker */}
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Rating:</span>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  onClick={() => handleStarClick(starIndex)}
                  type="button"
                  aria-label={`Filter by ${starIndex} stars and above`}
                  title={`Filter ${starIndex}+ Stars`}
                  className="p-0.5 rounded transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 transition-colors ${starIndex <= selectedStars
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-300 hover:text-amber-300'
                      }`}
                  />
                </button>
              ))}
              {selectedStars > 0 && (
                <span className="text-[11px] font-extrabold text-amber-700 ml-1 bg-amber-100 px-1.5 py-0.2 rounded">
                  {selectedStars}.0+
                </span>
              )}
            </div>

            {/* Max Fee Slider */}
            <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-600 shrink-0">Fee:</span>
              <span className="font-bold text-blue-600 shrink-0">{maxFee} JOD</span>
              <input
                type="range"
                id="fee-range-slider"
                min={minAvailableFee}
                max={maxAvailableFee}
                step="5"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                aria-label="Filter by Maximum consultation fee in JOD"
                className="w-16 accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Today Pill Toggle */}
            <button
              onClick={() => setAvailability(availability === 'Today' ? 'Anytime' : 'Today')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${availability === 'Today'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-2xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
            >
              <span> Today</span>
            </button>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort clinics order"
                className="pl-3 pr-7 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 appearance-none focus:outline-none cursor-pointer transition-all"
              >
                <option value="default">Sort: Default</option>
                <option value="rating">Highest Rated</option>
                <option value="fee">Lowest Fee</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 text-slate-400 pointer-events-none" />
            </div>

            {/* Reset All Action */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                title="Reset all active filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* 4. MAIN DISCOVERY GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Recommended Clinics
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {filteredClinics.length} Clinics
            </span>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
            >
              Reset Filters ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* CLINICS GRID */}
        {filteredClinics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClinics.map((clinic, cIdx) => (
              <article
                key={clinic.clinicId}
                onClick={() => handleClinicClick(clinic.clinicId)}
                className="group bg-white/70 backdrop-blur-md rounded-2xl border border-white/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200/90 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer backdrop-saturate-150"
              >
                {/* LCP Priority High Performance Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 aspect-video">
                  <img
                    src={'/clinic1.webp'}
                    alt={clinic.clinicName}
                    width="480"
                    height="270"
                    loading={cIdx === 0 ? "eager" : "lazy"}
                    fetchPriority={cIdx === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-80" />

                  {/* Fee Pill */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/75 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-0.5 border border-white/20">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    <span>{clinic.checkingFee} JOD</span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-white/85 backdrop-blur-md text-slate-900 px-2 py-0.5 rounded-full text-xs font-extrabold shadow-xs flex items-center gap-1 border border-white/60">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{clinic.rating ? clinic.rating.toFixed(1) : "0.0"}</span>
                  </div>

                  {/* Specialty Tags */}
                  <div className="absolute bottom-2 left-2.5 flex flex-wrap items-center gap-1">
                    {clinic.specialties?.slice(0, 3).map((spec, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white shadow-xs">
                        {spec}
                      </span>
                    ))}
                    {clinic.specialties?.length > 3 && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-800/80 text-white shadow-xs backdrop-blur-sm">
                        more...
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced Glassmorphism Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white/40 backdrop-blur-xs">
                  <div>
                    {/* Clinic Name */}
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1 mb-1">
                      {clinic.clinicName}
                    </h3>

                    {/* Doctor Names */}
                    <div className="text-[11px] font-bold text-slate-900 mb-2 flex items-center gap-1.5 flex-wrap">
                      <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      {clinic.doctors?.length > 0 ? (
                        <>
                          {clinic.doctors.slice(0, 2).map((doc, dIdx) => (
                            <span key={dIdx}>{doc}{dIdx < clinic.doctors.length - 1 ? ', ' : ''}</span>
                          ))}
                          {clinic.doctors.length > 2 && (
                            <span className="text-slate-500 font-semibold italic">more...</span>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-500 italic">No active doctors</span>
                      )}
                    </div>

                    {/* Address & Hours */}
                    <div className="space-y-1 text-[11px] text-slate-600 mb-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="line-clamp-1 font-medium">{clinic.detailedAddress || "No address provided"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-medium">{clinic.workingHours || "Hours not set"}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1 mb-2.5">
                      {clinic.description || "No description available"}
                    </p>

                    {/* Service Badges */}
                    <div className="flex flex-wrap items-center gap-1">
                      {clinic.services?.slice(0, 2).map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-blue-50/80 text-blue-700 text-[10px] font-semibold border border-blue-200/60 backdrop-blur-xs"
                        >
                          {srv}
                        </span>
                      ))}
                      {clinic.services?.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100/80 text-slate-600 text-[10px] font-bold border border-slate-200">
                          +{clinic.services.length - 2} More
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-blue-600 [text-shadow:0_0_8px_theme(colors.blue.400/50)]">
                      <Calendar className="w-3.5 h-3.5 shrink-0 drop-shadow-[0_0_4px_rgba(37,99,235,0.5)]" />
                      <span className="font-bold text-[11px]">
                        {clinic.nextAvailableSlot ? `Next available: ${clinic.nextAvailableSlot}` : "No upcoming slots"}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClinicClick(clinic.clinicId);
                      }}
                      className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-lg text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-10 text-center shadow-2xs my-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No Matching Clinics Found</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search keyword or star rating filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </main>

    </div>
  );
}

```
`src\pages\Register.jsx`:

```jsx
import { useState } from "react";
import { Form, useActionData, Link } from "react-router";

export default function Register() {
    const [mode, setMode] = useState("PATIENT");

    const actionData = useActionData();

    return (
        <div className="flex min-h-screen w-full bg-white font-sans text-slate-800">
            {/* القسم الأيسر: الهوية البصرية (5/12) */}
            <div className="relative hidden w-5/12 flex-col justify-between overflow-hidden p-12 text-white lg:flex bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }}>

                {/* Overlay لدمج اللون الأزرق مع الصورة وجعل النص واضح */}
                <div className="absolute inset-0 bg-blue-500/70 backdrop-blur-[2px]" />

                {/* Visual Elements */}
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />

                <Link
                    to="/"
                    className="relative z-10 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-fit"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md overflow-hidden">
                        <img src="logo.png" alt="logo" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">DrSnna</span>
                </Link>

                {/* Hero Text */}
                <div className="relative z-10 max-w-md space-y-4">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Join a growing networkof patients and clinics. <br />

                    </h1>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        Whether you're booking your next cleaning or listing your practice, getting started only takes a minute.
                    </p>

                    <div className="mt-8 flex h-24 w-44 flex-col justify-between rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-inner">
                        <div className="h-2 w-16 rounded bg-white/40" />
                        <div className="flex items-center justify-between">
                            <div className="h-2 w-20 rounded bg-white/30" />
                            <div className="h-7 w-7 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>

                {/* Footer النص السفلي الظاهر بالصورة */}
                <div className="relative z-10 text-xs text-blue-100/80">
                    © SmileDesk — appointments made simple
                </div>
            </div>

            {/* القسم الأيمن: التسجيل (7/12) */}
            <div className="flex w-full lg:w-7/12 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-6">

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Register</h1>
                    </div>

                    {/* أزرار التبديل Patient / clinic */}
                    <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-600">
                        <button
                            type="button"
                            onClick={() => setMode("PATIENT")}
                            className={`flex-1 rounded-md py-2.5 text-center transition-all cursor-pointer ${mode === "PATIENT"
                                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            Patient
                        </button>

                        <button
                            type="button"
                            onClick={() => setMode("CLINIC")}
                            className={`flex-1 rounded-md py-2.5 text-center transition-all cursor-pointer ${mode === "CLINIC"
                                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            Clinic
                        </button>
                    </div>

                    {/* عرض الأخطاء إن وجدت */}
                    {actionData?.error && (
                        <p className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                            {actionData.error}
                        </p>
                    )}

                    <Form method="post" className="space-y-4">
                        <input
                            type="hidden"
                            name="mode"
                            value={mode}
                        />

                        {mode === "PATIENT" && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">
                                        Full name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Ibraheem Hamzah"
                                        required
                                        className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>
                            </>
                        )}

                        {mode === "CLINIC" && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">
                                        Clinic name
                                    </label>

                                    <input
                                        type="text"
                                        name="clinicName"
                                        placeholder="Bright Smiles Dental Clinic"
                                        required
                                        className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">
                                        Clinic license number
                                    </label>

                                    <input
                                        type="text"
                                        name="clinicLicenseNumber"
                                        placeholder="CLN-2026-00451"
                                        required
                                        className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                City
                            </label>

                            <select
                                name="city"
                                defaultValue=""
                                required
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer"
                            >
                                <option value="" disabled>
                                    Select your city
                                </option>

                                <option value="AMMAN">Amman</option>
                                <option value="IRBID">Irbid</option>
                                <option value="ZARQA">Zarqa</option>
                                <option value="MAFRAQ">Mafraq</option>
                                <option value="AJLOUN">Ajloun</option>
                                <option value="JERASH">Jerash</option>
                                <option value="MADABA">Madaba</option>
                                <option value="BALQA">Balqa</option>
                                <option value="KARAK">Karak</option>
                                <option value="TAFILEH">Tafelah</option>
                                <option value="MAAN">Maan</option>
                                <option value="AQABA">Aqaba</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                required
                                minLength={8}
                                maxLength={12}
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$"
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>
                        <div>
                            <p style={{ color: '#4a5568', fontSize: '14px' }}>
                                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                                Password must be 8-12 characters long and contains at least one uppercase letter, in addition to symbols and numbers.
                            </p>                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                Confirm password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter your password"
                                required
                                minLength={8}
                                maxLength={12}
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$"
                                className="w-full rounded-lg border-0 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:bg-blue-700 cursor-pointer transition-all mt-2"
                        >
                            Register
                        </button>
                    </Form>

                    {/* الخط الفاصل ورابط تسجيل الدخول */}
                    <div className="relative flex items-center justify-center border-t border-slate-200 pt-4">
                        <span className="bg-white px-2 text-xs text-slate-400">or</span>
                    </div>

                    <div className="text-center text-xs text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
```
`src\pages\Unauthorized.jsx`:

```jsx
import { Link, useNavigate } from "react-router"; // استخدم "react-router-dom" إذا كنت تستخدم النسخة الشائعة

export default function Unauthorized({ onGoBack }) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onGoBack) {
            onGoBack();
        } else {
            navigate('/'); // التوجيه المباشر لصفحة الـ Landing
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white font-sans">
            {/* Left side: Brand Banner */}
            <div
                className="relative hidden w-5/12 flex-col justify-between overflow-hidden p-12 text-white lg:flex bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }}
            >
                {/* Overlay لدمج اللون الأزرق مع الصورة وجعل النص واضح */}
                <div className="absolute inset-0 bg-blue-500/70 backdrop-blur-[2px]" />

                {/* Visual Elements */}
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-xl pointer-events-none" />

                {/* Logo */}
                <Link
                    to="/"
                    className="relative z-10 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-fit"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md overflow-hidden">
                        <img src="/logo.png" alt="logo" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">DrSna</span>
                </Link>

                {/* Hero Text */}
                <div className="relative z-10 max-w-md space-y-4">
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
                        Book your dental visit <br />
                        in just a few clicks.
                    </h1>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        DrSna connects you with trusted dental clinics in your area — pick a time, confirm, and you're set.
                    </p>

                    <div className="mt-8 flex h-24 w-44 flex-col justify-between rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/20 shadow-inner">
                        <div className="h-2 w-16 rounded bg-white/40" />
                        <div className="flex items-center justify-between">
                            <div className="h-2 w-20 rounded bg-white/30" />
                            <div className="h-7 w-7 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>

                {/* Footer النص السفلي */}
                <div className="relative z-10 text-xs text-blue-100/80">
                    © DrSna — appointments made simple
                </div>
            </div>

            {/* Right side: Unauthorized Message */}
            <div className="flex flex-1 items-center justify-center bg-white p-8">
                <div className="flex w-full max-w-[460px] flex-col items-center text-center">

                    <div className="mb-4 flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-rose-100">
                        <svg className="h-[34px] w-[34px] stroke-rose-600" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>

                    <h2 className="mb-4 text-2xl font-bold text-slate-900">
                        You don't have permission to access this page.
                    </h2>

                    <div className="mb-7 w-full rounded-[14px] border border-amber-200 bg-amber-50 p-4 text-left">
                        <p className="mb-1.5 text-[15px] font-bold text-amber-900">
                            You are currently viewing a page that does not belong to you
                        </p>
                        <p className="text-xs leading-relaxed text-amber-800">
                            You attempted to access another user's private data or records. You do not have sufficient permissions to view this resource on the DrSna platform.
                        </p>
                    </div>

                    {/* Centered Back Button */}
                    <button
                        onClick={handleBack}
                        className="w-[260px] cursor-pointer rounded-xl bg-[#207ecb] px-7 py-3.5 text-base font-semibold text-white shadow-md shadow-[#207ecb]/30 transition hover:bg-[#1b76be] active:scale-[0.98]"
                    >
                        Go Back
                    </button>

                </div>
            </div>
        </div>
    );
}
```
`src\pages\admin\AdminChangePassword.jsx`:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";

import { changeAdminPassword } from "../../api/authApi";
import { getAuth, saveAuth } from "../../auth/authStorage";

export default function AdminChangePassword() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (newPassword.length < 8 || newPassword.length > 12) {
            setError("Password must be between 8 and 12 characters.");
            return;
        }

        if (!/[0-9]/.test(newPassword)) {
            setError("Password must contain at least one number.");
            return;
        }

        if (!/[^a-zA-Z0-9]/.test(newPassword)) {
            setError(
                "Password must contain at least one special character."
            );
            return;
        }

        const auth = getAuth();

        if (!auth?.token) {
            navigate("/login", { replace: true });
            return;
        }

        try {
            setIsSubmitting(true);

            await changeAdminPassword({
                newPassword,
                confirmPassword,
                token: auth.token,
            });

            // The backend has now activated the account.
            saveAuth({
                ...auth,
                isActive: true,
            });

            setSuccess(
                "Password changed successfully. Redirecting..."
            );

            setTimeout(() => {
                navigate("/admin", { replace: true });
            }, 1000);
        } catch (error) {
            setError(
                error.message || "Failed to change password."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen w-full bg-slate-50 items-center justify-center px-6 py-10">
            <div className="w-full max-w-md">

                {/* Logo / Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                        <img
                            src="/logo.png"
                            alt="DrSnna"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Change your password
                    </h1>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        For security reasons, you must change your
                        temporary password before continuing.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                            {success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* New password */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="newPassword"
                                className="block text-xs font-semibold text-slate-700"
                            >
                                New password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="newPassword"
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your new password"
                                    required
                                    minLength={8}
                                    maxLength={12}
                                    className="w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showNewPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-xs font-semibold text-slate-700"
                            >
                                Confirm new password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Confirm your new password"
                                    required
                                    minLength={8}
                                    maxLength={12}
                                    className="w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password requirements */}
                        <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                            <p className="mb-1 font-semibold text-slate-700">
                                Password requirements:
                            </p>

                            <ul className="list-disc space-y-1 pl-4">
                                <li>8–12 characters</li>
                                <li>At least one number</li>
                                <li>At least one special character</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <LockKeyhole size={17} />

                            {isSubmitting
                                ? "Changing password..."
                                : "Change password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
```
`src\pages\admin\AdminDashboard.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import AdminNavbar from './components/AdminNavbar';
import AdminStatsRow from './components/AdminStatsRow';
import RevenueChart from './components/RevenueChart';
import PendingClinicsTable from './components/PendingClinicsTable';
import LiveExchangeRates from './components/LiveExchangeRates';
import TopClinicsLeaderboard from './components/TopClinicsLeaderboard';
import AdminAuditLog from './components/AdminAuditLog';
import ClinicReviewModal from './components/ClinicReviewModal';
import { getDashboardSummary, getPendingClinics, getClinics } from '../../api/superAdminApi';

export default function AdminDashboard() {
    const [reviewClinic, setReviewClinic] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [pendingClinics, setPendingClinics] = useState([]);
    const [activeClinics, setActiveClinics] = useState([]);
    const [currentTab, setCurrentTab] = useState('active'); // default to 'active' so your 2 clinics show immediately

    const loadData = async () => {
        setLoading(true);
        try {
            const [pendingData, activeData, summaryData] = await Promise.all([
                getPendingClinics(),
                getClinics('APPROVED'),
                getDashboardSummary()
            ]);

            setPendingClinics(pendingData);
            setActiveClinics(activeData);
            setDashboardData(summaryData);
        } catch (err) {
            console.error("Failed to load dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const displayedClinics = currentTab === 'pending' ? pendingClinics : activeClinics;

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans">
            <AdminNavbar />

            <div className="max-w-[1600px] mx-auto px-6 py-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                            <span className="text-[10px] font-bold text-teal-700 tracking-wider uppercase">Executive Command Center</span>
                        </div>
                        <h1 className="text-[26px] font-bold text-slate-900 leading-tight">Platform Operations & Performance</h1>
                        <p className="text-[13px] text-slate-500 mt-1">Jordanian & Regional Network oversight, settlement metrics, and credential approvals.</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            <span className="px-4 py-1.5 bg-slate-100 text-xs font-bold text-slate-700 border-r border-slate-200">Oct 2023</span>
                            <span className="px-4 py-1.5 text-xs font-semibold text-slate-500">Q3 Summary</span>
                        </div>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
                            <Download className="w-4 h-4" /> Financial Export
                        </button>
                    </div>
                </div>

                {/* Top Stats Row */}
                <AdminStatsRow
                    onReviewClick={() => setCurrentTab('pending')}
                    commission={{
                        value: dashboardData?.commissionRevenueCurrentMonth ?? 48250.00,
                        isPositive: true,
                        change: dashboardData?.commissionRevenueChangePercent ?? 14.8
                    }}
                    activeClinics={dashboardData ? {
                        value: dashboardData.activeClinics,
                        newThisMonth: dashboardData.activeClinicsNewThisMonth
                    } : {
                        value: activeClinics.length,
                        newThisMonth: 0
                    }}
                    pendingApprovals={pendingClinics?.length || 0}
                    bookings={{
                        value: dashboardData?.bookingsThisMonth ?? 3840,
                        isPositive: true,
                        change: dashboardData?.bookingsChangePercent ?? 9.2
                    }}
                />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <RevenueChart />
                        <PendingClinicsTable
                            clinics={displayedClinics}
                            currentTab={currentTab}
                            onTabChange={setCurrentTab}
                            pendingCount={pendingClinics.length}
                            activeCount={activeClinics.length}
                            onReviewClick={(clinic) => setReviewClinic(clinic)}
                        />
                    </div>

                    {/* Right Column (Side Content) */}
                    <div className="flex flex-col gap-5">
                        <LiveExchangeRates />
                        <TopClinicsLeaderboard clinics={dashboardData?.topClinicsByCommission || []} />
                        <AdminAuditLog />
                    </div>
                </div>
            </div>

            {reviewClinic && (
                <ClinicReviewModal
                    clinicId={reviewClinic.clinicId}
                    onClose={() => setReviewClinic(null)}
                    onRefresh={loadData}
                />
            )}
        </div>
    );
}
```
`src\pages\admin\components\AdminAuditLog.jsx`:

```jsx
import React from 'react';
import { History, UserPlus, CheckCircle, CreditCard, RefreshCw } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../mockAdminData';

const ICONS = {
    UserPlus: UserPlus,
    CheckCircle: CheckCircle,
    CreditCard: CreditCard,
    RefreshCw: RefreshCw
};

export default function AdminAuditLog() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-teal-600" />
                    <h2 className="text-[15px] font-bold text-slate-900 leading-tight">Super Admin Audit Log</h2>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-teal-600"></div>
            </div>

            <div className="flex flex-col gap-5 relative">
                {/* Vertical line connecting the timeline */}
                <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-100 -z-0"></div>

                {MOCK_AUDIT_LOGS.map((log) => {
                    const IconComponent = ICONS[log.icon];
                    return (
                        <div key={log.id} className="flex gap-3 relative z-10">
                            <div className={`w-8 h-8 rounded-full ${log.iconBg} ${log.iconColor} flex items-center justify-center shrink-0 border-2 border-white`}>
                                {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="text-[11px] font-bold text-slate-800 leading-tight">{log.action}</span>
                                <span className="text-[9px] text-slate-500 font-medium mt-0.5">{log.detail} • {log.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors">
                View All Audit Logs
            </button>
        </div>
    );
}

```
`src\pages\admin\components\AdminNavbar.jsx`:

```jsx
import React from 'react';
import { Search, Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { clearAuth } from '../../../auth/authStorage';

export default function AdminNavbar() {
    const handleLogout = () => {
        clearAuth();
        window.location.href = '/login';
    };
    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="bg-blue-800 text-white p-1.5 rounded-lg flex items-center justify-center font-bold text-lg leading-none">
                    <span className="mb-0.5">D</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-blue-900 text-lg">Dr.Sna</span>
                        <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold rounded-sm tracking-wider uppercase">SUPER</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 tracking-wider">ADMIN</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center relative w-[400px]">
                <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search clinics, doctors, transactions..."
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Logout"
                >
                    <LogOut className="w-4 h-4" />
                </button>
                <div className="relative cursor-pointer">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </div>
                <HelpCircle className="w-5 h-5 text-slate-600 cursor-pointer" />

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-slate-800">Dr. S. Na</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-sm tracking-wider uppercase">SUPER</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">Chief Administrator</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white shrink-0">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

```
`src\pages\admin\components\AdminStatsRow.jsx`:

```jsx
import React from 'react';
import { Wallet, PlusSquare, ClipboardList, Calendar } from 'lucide-react';

export default function AdminStatsRow({ onReviewClick, commission, activeClinics, pendingApprovals, bookings }) {
    if (!commission || !activeClinics || pendingApprovals === undefined || !bookings) {
        return <div className="h-32 mb-6 flex items-center justify-center text-slate-500">Loading metrics...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
            {/* Commission Revenue */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Commission Revenue</span>
                    <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                        <Wallet className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{commission.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                    <span className="text-xs font-semibold text-slate-500 uppercase">JOD</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${commission.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {commission.isPositive ? '↗' : '↘'} +{commission.change}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">vs last month</span>
                </div>
            </div>

            {/* Active Clinics */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Active Clinics</span>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <PlusSquare className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{activeClinics.value}</h3>
                    <span className="text-xs font-semibold text-slate-500">clinics</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700">
                        + {activeClinics.newThisMonth}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">onboarded this month</span>
                </div>
                <div className="h-1 w-full bg-blue-100 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-blue-700 w-3/4 rounded-full"></div>
                </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Pending Approvals</span>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{pendingApprovals}</h3>
                    <span className="text-sm font-semibold text-slate-700">Clinics</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <span className="text-[10px] font-bold text-rose-600 leading-tight">Requires<br/>Review</span>
                    </div>
                    <button 
                        onClick={onReviewClick}
                        className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                        Review Now <span>→</span>
                    </button>
                </div>
            </div>

            {/* Bookings This Month */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Bookings This Month</span>
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                        <Calendar className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{bookings.value.toLocaleString('en-US')}</h3>
                    <span className="text-xs font-semibold text-slate-500">visits</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${bookings.isPositive ? 'bg-cyan-50 text-cyan-700' : 'bg-red-100 text-red-700'}`}>
                        {bookings.isPositive ? '↗' : '↘'} +{bookings.change}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">vs last month</span>
                </div>
            </div>
        </div>
    );
}

```
`src\pages\admin\components\ClinicReviewModal.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, Loader2, Mail, Trash2 } from 'lucide-react';
import {
    getClinicReview,
    approveClinic,
    rejectClinic,
    overrideCommission,
    removeClinic
} from '../../../api/superAdminApi';
import ModernAlertModal from '../../../components/ModernAlertModal';

export default function ClinicReviewModal({ clinicId, onClose, onRefresh }) {
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [overrideRate, setOverrideRate] = useState(12.0);
    const [isRejecting, setIsRejecting] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!clinicId) return;
        setLoading(true);
        getClinicReview(clinicId)
            .then(data => {
                setClinic({
                    ...data,
                    clinicName: data?.clinicInformation?.clinicName || "Unknown",
                    city: data?.clinicInformation?.city || "Unknown",
                    email: data?.submittingUser?.email || "Unknown",
                    legalName: (data?.clinicInformation?.clinicName || "Unknown") + " Est.",
                    registryNo: "#JO-" + (data?.clinicInformation?.city || 'AMM').substring(0, 3).toUpperCase() + "-" + Math.floor(10000 + Math.random() * 90000),
                    branches: 2,
                    doctors: 6,
                    operatories: 10,
                    currency: "JOD",
                    disciplines: ["Orthodontics", "Oral Surgery", "General Dentistry"],
                    mohLicense: "MOH-DENT-2023-4182"
                });
                setOverrideRate(data?.overriddenCommissionRate || data?.currentCommissionRate || 12.0);
            })
            .catch(err => {
                console.error("Error loading clinic review:", err);
                setError(err.message || "Failed to load clinic details.");
            })
            .finally(() => setLoading(false));
    }, [clinicId]);

    const handleApprove = async () => {
        setSubmitting(true);
        setError("");
        try {
            if (overrideRate !== (clinic.overriddenCommissionRate || clinic.currentCommissionRate)) {
                await overrideCommission(clinicId, overrideRate);
            }
            await approveClinic(clinicId);
            onRefresh();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to approve clinic");
            setSubmitting(false);
        }
    };

    const handleRejectConfirm = async () => {
        if (!rejectionReason.trim()) {
            setError("Please provide a reason for rejection.");
            return;
        }
        setSubmitting(true);
        setError("");
        try {
            await rejectClinic(clinicId, { reason: rejectionReason });
            onRefresh();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to reject clinic");
            setSubmitting(false);
        }
    };

    const handleDecommissionClinic = async () => {
        setDeleting(true);
        setError("");
        try {
            await removeClinic(clinicId);
            setShowDeleteModal(false);
            onRefresh();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to decommission clinic.");
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            </div>
        );
    }

    if (!clinic) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative flex flex-col items-center text-center">
                    <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <X className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Failed to Load</h3>
                    <p className="text-sm text-slate-500 mb-6">{error || "Could not retrieve clinic details."}</p>
                    <button onClick={onClose} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-200 my-2 max-h-[95vh]">
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Application Review & Onboarding</span>
                            <h2 className="text-2xl font-bold text-slate-900">{clinic.clinicName}</h2>
                            <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                                <Mail className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">{clinic.email}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {/* Status Banner */}
                    <div className={`border rounded-xl p-3 flex items-center justify-between shrink-0 ${
                        clinic.applicationStatus === 'APPROVED'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                            : 'bg-cyan-50 border-cyan-100 text-cyan-800'
                    }`}>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            {clinic.applicationStatus === 'APPROVED' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                                <Clock className="w-4 h-4 text-cyan-600" />
                            )}
                            <span>
            {clinic.applicationStatus === 'APPROVED' ? 'Active Network Clinic' : 'Queue #1'}
        </span>
                        </div>
                        <span className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md ${
                            clinic.applicationStatus === 'APPROVED'
                                ? 'bg-emerald-200/60 text-emerald-900'
                                : 'bg-cyan-200/50 text-cyan-800'
                        }`}>
        {clinic.applicationStatus === 'APPROVED' ? 'Operational & Active' : 'Pending Verification'}
    </span>
                    </div>
                    {/* 3 Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Legal Brand & Trade Name</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{clinic.legalName}</h3>
                            <span className="text-xs font-semibold text-teal-600">Registry {clinic.registryNo}</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Location & Expansion</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">{clinic.city}</h3>
                            <span className="text-xs font-medium text-slate-500">{clinic.branches} Operational Branch{clinic.branches > 1 ? 'es' : ''}</span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Staff & Practice Scale</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">{clinic.doctors} Accredited Dentists</h3>
                            <span className="text-xs font-medium text-slate-500">{clinic.operatories} Operatories • {clinic.currency} Settlement</span>
                        </div>
                    </div>

                    {/* Disciplines */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Registered Dental Disciplines</span>
                        <div className="flex flex-wrap gap-2">
                            {clinic.disciplines.map(disc => (
                                <span key={disc} className="px-3 py-1.5 bg-white border border-slate-200 text-blue-700 text-[11px] font-bold rounded-lg shadow-sm">
                                    {disc}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tax Compliance */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 shrink-0">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-bold text-slate-900">Tax Compliance & Jordanian MOH License</h3>
                            <span className="text-[11px] font-medium text-slate-500">Tax Registration No. (TIN)</span>
                            <span className="text-sm font-bold text-slate-800">{clinic.licenseNumber || clinic.taxRegistration || "N/A"}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1 mt-4 md:mt-0">
                            <div className="flex items-center gap-1 text-teal-600 text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified with Ministry
                            </div>
                            <span className="text-[11px] font-medium text-slate-500 mt-1">MOH Practicing Authority License</span>
                            <span className="text-sm font-bold text-slate-800">{clinic.mohLicense}</span>
                        </div>
                    </div>

                    {/* Commission Override */}
                    <div className="bg-slate-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Super Admin Commission Override (%)</h3>
                            <p className="text-[11px] text-slate-500 font-medium mt-1">Default platform tier: 12.0%. Custom agreements override global rate.</p>
                        </div>
                        <div className="mt-4 md:mt-0 relative flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden w-32 shadow-sm">
                            <input
                                type="number"
                                value={overrideRate}
                                onChange={(e) => setOverrideRate(Number(e.target.value))}
                                className="w-full py-1.5 pl-3 pr-8 text-sm font-bold text-slate-900 focus:outline-none"
                            />
                            <span className="absolute right-3 text-slate-400 font-bold text-xs">%</span>
                        </div>
                    </div>

                    {/* Inline Rejection Message UI */}
                    {isRejecting && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-2 fade-in">
                            <label className="block text-sm font-bold text-red-800 mb-2">Rejection Reason</label>
                            <p className="text-xs text-red-600 mb-3">This message will be sent to the clinic to help them correct their application.</p>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="w-full border border-red-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                                rows={3}
                                placeholder="E.g., Missing valid dental license document."
                            ></textarea>
                            <div className="flex justify-end gap-2 mt-3">
                                <button
                                    onClick={() => setIsRejecting(false)}
                                    className="px-4 py-2 bg-white border border-red-200 text-red-700 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRejectConfirm}
                                    disabled={submitting}
                                    className="flex items-center px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Confirm Reject
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!isRejecting && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between mt-auto shrink-0">

                        {clinic.applicationStatus === 'APPROVED' ? (
                            /* ========================================================
                               ACTIVE CLINIC FOOTER: Only Decommission & Dismiss
                               ======================================================== */
                            <>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(true)}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-600 text-xs font-bold rounded-lg transition-colors border border-rose-200 shadow-xs cursor-pointer"
                                    title="Decommission clinic from the platform"
                                >
                                    <Trash2 className="w-4 h-4" /> Decommission Clinic
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                            </>
                        ) : (
                            /* ========================================================
                               PENDING CLINIC FOOTER: Reject, Dismiss & Approve
                               ======================================================== */
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsRejecting(true)}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" /> Reject Application
                                </button>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleApprove}
                                        disabled={submitting}
                                        className="flex items-center gap-1.5 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm disabled:bg-blue-400 cursor-pointer"
                                    >
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                        Approve & Activate Clinic
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
                {/* Confirmation Modal */}
                <ModernAlertModal
                    isOpen={showDeleteModal}
                    type="danger"
                    title="Decommission Clinic"
                    message={`Are you sure you want to decommission "${clinic.clinicName}"? The clinic will be permanently deactivated and removed from public discovery, but historical appointments, financial reports, and reviews will be preserved.`}
                    showCancel={true}
                    cancelText="Cancel"
                    confirmText={deleting ? "Decommissioning..." : "Yes, Decommission"}
                    onConfirm={handleDecommissionClinic}
                    onClose={() => setShowDeleteModal(false)}
                />
            </div>
        </div>
    );
}
```
`src\pages\admin\components\LiveExchangeRates.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw, Activity } from 'lucide-react';

export default function LiveExchangeRates() {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdatedDate, setLastUpdatedDate] = useState(null);
    const [relativeTime, setRelativeTime] = useState('');

    const fetchRates = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://open.er-api.com/v6/latest/JOD');
            const data = await res.json();
            
            setRates([
                {
                    currency: 'USD',
                    pair: 'USD/JOD',
                    name: 'US Dollar',
                    rate: data.rates.USD,
                    isPegged: true,
                    color: 'text-blue-500',
                    change: 'Fixed'
                },
                {
                    currency: 'EGP',
                    pair: 'EGP/JOD',
                    name: 'Egyptian Pound',
                    rate: data.rates.EGP,
                    isPegged: false,
                    color: 'text-slate-500',
                    change: 'Live'
                },
                {
                    currency: 'SAR',
                    pair: 'SAR/JOD',
                    name: 'Saudi Riyal',
                    rate: data.rates.SAR,
                    isPegged: true,
                    color: 'text-emerald-500',
                    change: 'Fixed'
                }
            ]);
            
            const date = new Date(data.time_last_update_utc);
            setLastUpdatedDate(date);
        } catch (error) {
            console.error("Failed to fetch rates", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    useEffect(() => {
        if (!lastUpdatedDate) return;
        
        const updateRelativeTime = () => {
            const seconds = Math.floor((new Date() - lastUpdatedDate) / 1000);
            if (seconds < 60) {
                setRelativeTime(`Updated ${seconds} seconds ago`);
            } else if (seconds < 3600) {
                setRelativeTime(`Updated ${Math.floor(seconds / 60)} minutes ago`);
            } else {
                setRelativeTime(`Updated ${Math.floor(seconds / 3600)} hours ago`);
            }
        };

        updateRelativeTime();
        const interval = setInterval(updateRelativeTime, 1000);
        return () => clearInterval(interval);
    }, [lastUpdatedDate]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <h2 className="text-[15px] font-bold text-slate-900">Live Exchange Rates</h2>
                </div>
                <button 
                    onClick={fetchRates}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50">
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Sync
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {loading && rates.length === 0 ? (
                    <div className="text-center text-sm text-slate-500 py-4">Loading rates...</div>
                ) : rates.map((rate) => (
                    <div key={rate.currency} className="flex flex-col border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold w-8 text-center py-1 rounded bg-slate-50 ${rate.currency === 'USD' ? 'text-blue-700' : 'text-slate-700'}`}>
                                    {rate.currency}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-slate-800 leading-tight">{rate.pair}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">{rate.name}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[13px] font-bold text-slate-900 leading-tight">{rate.rate.toFixed(4)}</span>
                                {rate.isPegged ? (
                                    <span className={`text-[10px] font-bold ${rate.color}`}>Pegged • {rate.change}</span>
                                ) : (
                                    <span className={`text-[10px] font-bold ${rate.color}`}>{rate.change}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Open Exchange Rates feed</span>
                <span>{relativeTime || 'Updating...'}</span>
            </div>
        </div>
    );
}

```
`src\pages\admin\components\PendingClinicsTable.jsx`:

```jsx
import React from 'react';
import { Building2, Clock, CheckCircle } from 'lucide-react';

export default function PendingClinicsTable({
                                                clinics = [],
                                                currentTab = 'active',
                                                onTabChange,
                                                pendingCount = 0,
                                                activeCount = 0,
                                                onReviewClick
                                            }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header with Tabs */}
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {currentTab === 'pending' ? 'Clinics Awaiting Approval' : 'Active Partner Clinics'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {currentTab === 'pending'
                            ? 'Review and authorize dental practitioner organizations'
                            : 'Manage operational clinics, commissions, and decommissions'}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1 self-start md:self-auto">
                    <button
                        type="button"
                        onClick={() => onTabChange('active')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentTab === 'active'
                                ? 'bg-white text-blue-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Active Clinics ({activeCount})
                    </button>
                    <button
                        type="button"
                        onClick={() => onTabChange('pending')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentTab === 'pending'
                                ? 'bg-white text-blue-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Pending ({pendingCount})
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                        <th className="py-2.5 px-5">Clinic Name</th>
                        <th className="py-2.5 px-5">City</th>
                        <th className="py-2.5 px-5">Branches</th>
                        <th className="py-2.5 px-5">Doctors</th>
                        <th className="py-2.5 px-5">Status</th>
                        <th className="py-2.5 px-5 text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {clinics.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="py-8 text-center text-xs font-semibold text-slate-400">
                                No {currentTab} clinics found.
                            </td>
                        </tr>
                    ) : (
                        clinics.map((clinic) => {
                            const initials = clinic.clinicName ? clinic.clinicName.substring(0, 2).toUpperCase() : 'CL';
                            return (
                                <tr key={clinic.clinicId} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                                                {initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 leading-tight">{clinic.clinicName}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">ID: {clinic.clinicId?.split('-')[0]}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 text-[13px] text-slate-600 font-medium">
                                        {clinic.city}
                                    </td>
                                    <td className="py-3 px-5">
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                                                {clinic.numberOfBranches || 1} branch
                                            </span>
                                    </td>
                                    <td className="py-3 px-5 text-[13px] text-slate-600 font-medium">
                                        {clinic.numberOfDoctors || 0} doctors
                                    </td>
                                    <td className="py-3 px-5">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                                                clinic.applicationStatus === 'APPROVED'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                                {clinic.applicationStatus}
                                            </span>
                                    </td>
                                    <td className="py-3 px-5 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onReviewClick(clinic)}
                                            className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                        >
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-500">
                    Showing {clinics.length} {currentTab} clinic items
                </span>
            </div>
        </div>
    );
}
```
`src\pages\admin\components\RevenueChart.jsx`:

```jsx
import React from 'react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { BarChart3, CheckCircle2 } from 'lucide-react';
import { MOCK_CHART_DATA } from '../mockAdminData';

export default function RevenueChart() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div className="flex items-start gap-3">
                    <div className="text-blue-700 mt-1">
                        <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Commission Revenue — Last 6 Months</h2>
                        <p className="text-xs text-slate-500 mt-1">Volume growth across network bookings (May - Oct 2023)</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg">
                        <button className="px-3 py-1 bg-white text-blue-700 font-bold text-xs rounded-md shadow-sm">JOD</button>
                        <button className="px-3 py-1 text-slate-500 font-semibold text-xs rounded-md hover:bg-slate-200/50">USD</button>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                        <div className="flex items-center gap-1.5 text-slate-600">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-700"></div> Actual
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                            <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div> Target
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            domain={[20000, 50000]}
                            ticks={[20000, 30000, 40000, 50000]}
                            tickFormatter={(value) => value.toLocaleString()}
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                            dataKey="actual" 
                            fill="#1d4ed8" 
                            radius={[6, 6, 0, 0]} 
                            barSize={45} 
                        />
                        <Line 
                            type="monotone" 
                            dataKey="target" 
                            stroke="#0d9488" 
                            strokeWidth={3}
                            dot={{ fill: '#0d9488', r: 4, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 bg-slate-50 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between border border-slate-100">
                <div className="flex items-center gap-4 text-[11px]">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-semibold uppercase tracking-wider">Average Network Commission:</span>
                        <span className="text-blue-700 font-bold">13.2%</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] mt-3 md:mt-0">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-semibold uppercase tracking-wider">6-Month Total Collected:</span>
                        <span className="text-slate-900 font-bold text-xs">232,650 JOD</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 w-fit px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                Payout Settlement Succeeded
            </div>
        </div>
    );
}

```
`src\pages\admin\components\TopClinicsLeaderboard.jsx`:

```jsx
import React from 'react';
import { Award } from 'lucide-react';

export default function TopClinicsLeaderboard({ clinics = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-start gap-2">
                    <div className="text-blue-700 mt-0.5">
                        <Award className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-[15px] font-bold text-slate-900 leading-tight">Top Clinics —</h2>
                        <h2 className="text-[15px] font-bold text-slate-900 leading-tight">Commission</h2>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block text-[9px] font-bold text-teal-700 uppercase tracking-wider">October</span>
                    <span className="block text-[9px] font-bold text-teal-700 uppercase tracking-wider">Leaderboard</span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {clinics.map((clinic, idx) => (
                    <div key={clinic.clinicId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                <span className={`text-[10px] font-bold ${idx === 0 ? 'text-blue-700' : 'text-slate-600'}`}>{idx + 1}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-slate-800 leading-tight">{clinic.clinicName}</span>
                                <span className="text-[10px] text-slate-500 font-medium">{clinic.city} • {clinic.rating}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[13px] font-bold text-slate-900 leading-tight">
                                {clinic.commission.toLocaleString()} <span className="text-[10px] font-bold">{clinic.currency}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

```
`src\pages\admin\mockAdminData.js`:

```js
export const MOCK_STATS = {
    commission: { value: 48250.00, change: 14.8, isPositive: true },
    activeClinics: { value: 142, newThisMonth: 6 },
    pendingApprovals: 7,
    bookings: { value: 3840, change: 9.2, isPositive: true }
};

export const MOCK_CHART_DATA = [
    { name: 'MAY (31K)', actual: 31000, target: 33000 },
    { name: 'JUN (34.2K)', actual: 34200, target: 35000 },
    { name: 'JUL (37.8K)', actual: 37800, target: 38000 },
    { name: 'AUG (39.4K)', actual: 39400, target: 39000 },
    { name: 'SEP (42.0K)', actual: 42000, target: 41000 },
    { name: 'OCT (48.25K)', actual: 48250, target: 45000 },
];

export const MOCK_PENDING_CLINICS = [
    {
        id: 'CL-AMM-881',
        name: 'Al-Amal Dental Center',
        legalName: 'Al-Amal Specialized Oral Clinic LLC',
        registryNo: '#JO-AMM-99420',
        city: 'Amman',
        location: 'Amman, Jordan',
        branches: 3,
        doctors: 8,
        operatories: 14,
        currency: 'JOD',
        submitted: 'Oct 24, 2023 - 09:30 AM',
        initials: 'AA',
        initialsBg: 'bg-blue-100',
        initialsColor: 'text-blue-700',
        disciplines: ['Prosthodontics', 'Endodontics', 'Periodontal Surgery', 'Pediatric Dentistry', 'Dental Implantology', 'Clear Aligners'],
        taxNo: '102948192 - JOD',
        mohLicense: 'MOH-DENT - 2023-4180',
        defaultCommission: 12.0
    },
    {
        id: 'CL-IRB-109',
        name: 'Jordan Specialty Clinic',
        legalName: 'Jordan Specialty Clinic LLC',
        registryNo: '#JO-IRB-99421',
        city: 'Irbid',
        location: 'Irbid, Jordan',
        branches: 1,
        doctors: 4,
        operatories: 6,
        currency: 'JOD',
        submitted: 'Oct 23, 2023 - 04:15 PM',
        initials: 'JS',
        initialsBg: 'bg-teal-100',
        initialsColor: 'text-teal-700',
        disciplines: ['General Dentistry', 'Orthodontics'],
        taxNo: '102948193 - JOD',
        mohLicense: 'MOH-DENT - 2023-4181',
        defaultCommission: 12.0
    },
    {
        id: 'CL-ZRQ-302',
        name: 'Royal Ortho Hub',
        legalName: 'Royal Ortho Hub Est.',
        registryNo: '#JO-ZRQ-99422',
        city: 'Zarqa',
        location: 'Zarqa, Jordan',
        branches: 2,
        doctors: 6,
        operatories: 10,
        currency: 'USD',
        submitted: 'Oct 23, 2023 - 11:20 AM',
        initials: 'RO',
        initialsBg: 'bg-purple-100',
        initialsColor: 'text-purple-700',
        disciplines: ['Orthodontics', 'Oral Surgery'],
        taxNo: '102948194 - JOD',
        mohLicense: 'MOH-DENT - 2023-4182',
        defaultCommission: 12.0
    },
    {
        id: 'CL-AQB-051',
        name: 'Petra Dental Care',
        legalName: 'Petra Dental Care Clinic',
        registryNo: '#JO-AQB-99423',
        city: 'Aqaba',
        location: 'Aqaba, Jordan',
        branches: 1,
        doctors: 3,
        operatories: 4,
        currency: 'JOD',
        submitted: 'Oct 22, 2023 - 01:45 PM',
        initials: 'PD',
        initialsBg: 'bg-slate-200',
        initialsColor: 'text-slate-700',
        disciplines: ['General Dentistry', 'Pediatric Dentistry'],
        taxNo: '102948195 - JOD',
        mohLicense: 'MOH-DENT - 2023-4183',
        defaultCommission: 12.0
    }
];

export const MOCK_EXCHANGE_RATES = [
    { currency: 'USD', pair: 'USD / JOD', name: 'US Dollar', rate: 0.7090, change: '+ 0.0%', isPegged: true, color: 'text-slate-500' },
    { currency: 'EUR', pair: 'EUR / JOD', name: 'Euro', rate: 0.7685, change: '+0.14%', isPegged: false, color: 'text-emerald-600' },
    { currency: 'SAR', pair: 'SAR / JOD', name: 'Saudi Riyal', rate: 0.1890, change: '0.00%', isPegged: false, color: 'text-slate-500' },
    { currency: 'GBP', pair: 'GBP / JOD', name: 'British Pound', rate: 0.8950, change: '-0.08%', isPegged: false, color: 'text-rose-600' }
];

export const MOCK_TOP_CLINICS = [
    { rank: 1, name: 'SmileArt Studio', location: 'Amman', rate: '15% override rate', revenue: 12450, status: 'Top Contributor' },
    { rank: 2, name: 'Apex Dental Care', location: 'Irbid', rate: '12% standard rate', revenue: 9820, status: '+8% vs Sep' },
    { rank: 3, name: 'Little Teeth Clinic', location: 'Amman', rate: '15% rate', revenue: 7650, status: '+12% vs Sep' },
    { rank: 4, name: 'Aljubaiha Dental', location: 'Amman', rate: '10% rate', revenue: 6120, status: 'Consistent' }
];

export const MOCK_AUDIT_LOGS = [
    { id: 1, action: 'Dr. Tariq added to Aljubaiha Dental', detail: 'Credential verification completed by SuperAdmin', time: '24 mins ago', icon: 'UserPlus', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    { id: 2, action: 'Jordan Dental Care approved', detail: 'Account activated & settlement channels linked', time: '2 hours ago', icon: 'CheckCircle', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { id: 3, action: 'Commission payout processed for Apex Dental', detail: 'Settlement reference #PO-88219 confirmed', time: '4 hours ago', icon: 'CreditCard', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    { id: 4, action: 'FX rate updated automatically', detail: 'EUR/JOD synced to 0.7685 from Central Bank API', time: '8 hours ago', icon: 'RefreshCw', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' }
];

```
`src\pages\clinic\ClinicDashboard.jsx`:

```jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import ClinicSidebar from '../../clinic/ClinicSidebar';
import { fetchClinicProfile } from '../../api/clinicProfileApi';
import PendingApproval from './components/PendingApproval';
import RejectedApplication from './components/RejectedApplication';
import { Loader2 } from 'lucide-react';

export default function ClinicDashboard() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        fetchClinicProfile()
            .then((data) => {
                if (isMounted) {
                    setProfile(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-red-500">Error loading profile: {error}</div>
            </div>
        );
    }

    const isApproved = profile?.applicationStatus === 'APPROVED';
    const isPending = profile?.applicationStatus === 'PENDING';
    const isRejected = profile?.applicationStatus === 'REJECTED';
    
    // Allow access to resubmit page for rejected clinics
    const isResubmitPage = location.pathname.endsWith('/resubmit');

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar Navigation - only show if approved */}
            {isApproved && <ClinicSidebar />}

            {/* Main Content Area */}
            <main className={`flex-1 p-8 ${!isApproved ? 'flex justify-center items-center' : ''}`}>
                {isApproved && <Outlet context={{ profile }} />}
                
                {isPending && <PendingApproval />}
                
                {isRejected && !isResubmitPage && (
                    <RejectedApplication rejectionReason={profile?.rejectionReason} />
                )}
                
                {isRejected && isResubmitPage && (
                    <div className="w-full">
                        <Outlet context={{ profile }} />
                    </div>
                )}
            </main>
        </div>
    );
}
```
`src\pages\clinic\ClinicOverview.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { fetchDoctors } from '../../api/clinicDoctorsApi';
import { getClinicAppointments } from '../../api/clinicAppointmentsApi';
import {
    Users,
    CalendarCheck,
    UserCheck,
    CalendarDays,
    Banknote,
    FileText,
    CalendarX,
    DollarSign
} from 'lucide-react';

export default function ClinicOverview() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [stats, setStats] = useState({
        doctorsCount: 0, // Initial mock value
        todayAppointments: 0 // Initial mock value
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Fetch doctors
                const doctors = await fetchDoctors();
                const activeDoctorsCount = doctors.filter(d => d.isActive !== false).length;

                // Fetch today's appointments
                const today = new Date();
                const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

                const appointments = await getClinicAppointments(todayStr, todayStr);
                const todayApptsCount = appointments.length;

                setStats({
                    doctorsCount: activeDoctorsCount,
                    todayAppointments: todayApptsCount
                });
            } catch (error) {
                console.error("Error loading clinic stats:", error);
            }
        };

        loadStats();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('clinicDashboard.welcome')}</h1>
                <p className="text-gray-500 text-[15px] mt-1.5 font-medium">
                    {t('clinicDashboard.subtitle')}
                </p>
            </div>

            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title={t('clinicDashboard.totalPatients')}
                    value="1,248"
                    change="+12%"
                    changeColor={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
                    icon={Users}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title={t('clinicDashboard.appointments')}
                    value={stats.todayAppointments.toString()}
                    badge={t('clinicDashboard.today')}
                    icon={CalendarCheck}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                    onClick={() => navigate('/clinic/appointments')}
                />
                <StatCard
                    title={t('clinicDashboard.monthlyRevenue')}
                    value="$48.5k"
                    change="+5.2%"
                    changeColor={{ bg: 'bg-cyan-50', text: 'text-cyan-600' }}
                    icon={Banknote}
                    iconBg="bg-gray-100"
                    iconColor="text-gray-800"
                />
                <StatCard
                    title={t('clinicDashboard.clinicDoctors')}
                    value={stats.doctorsCount.toString()}
                    icon={UserCheck}
                    iconBg="bg-cyan-100"
                    iconColor="text-cyan-600"
                    onClick={() => navigate('/clinic/doctors')}
                />
            </div>

            {/* Main Grid: Daily Schedule & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Daily Schedule Table (2/3 width) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col h-full">
                    <div className="flex justify-between items-start p-6 pb-4">
                        <div>
                            <h2 className="text-[17px] font-bold text-gray-900">{t('clinicDashboard.dailySchedule.title')}</h2>
                            <p className="text-sm text-gray-500 mt-0.5">{t('clinicDashboard.dailySchedule.subtitle')}</p>
                        </div>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">{t('clinicDashboard.dailySchedule.viewCalendar')}</button>
                    </div>

                    <div className="flex-1 overflow-x-auto px-6">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-400 tracking-wider border-b border-gray-100 uppercase">
                                    <th className="pb-3 w-[15%]">{t('clinicDashboard.dailySchedule.columns.time')}</th>
                                    <th className="pb-3 w-[25%]">{t('clinicDashboard.dailySchedule.columns.patient')}</th>
                                    <th className="pb-3 w-[25%]">{t('clinicDashboard.dailySchedule.columns.treatment')}</th>
                                    <th className="pb-3 w-[20%]">{t('clinicDashboard.dailySchedule.columns.doctor')}</th>
                                    <th className="pb-3 text-right">{t('clinicDashboard.dailySchedule.columns.status')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Row 1 */}
                                <tr>
                                    <td className="py-4 text-gray-900 font-medium text-sm">09:00 AM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[11px] font-bold shrink-0">JD</div>
                                            <span className="font-semibold text-gray-900 text-[13px] leading-tight">John<br />Doe</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-500 text-[13px] leading-tight">Root Canal<br />Prep</td>
                                    <td className="py-4 text-gray-700 text-[13px] leading-tight">Dr.<br />Jenkins</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-600 text-center leading-tight">In<br />Progress</span>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr>
                                    <td className="py-4 text-gray-900 font-medium text-sm">10:15 AM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <img src="https://i.pravatar.cc/150?img=5" alt="Sarah" className="w-8 h-8 rounded-full object-cover shrink-0" />
                                            <span className="font-semibold text-gray-900 text-[13px] leading-tight">Sarah<br />Williams</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-500 text-[13px] leading-tight">Invisalign<br />Checkup</td>
                                    <td className="py-4 text-gray-700 text-[13px] leading-tight">Dr. Chen</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600 text-center leading-tight">Waiting</span>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr>
                                    <td className="py-4 text-gray-900 font-medium text-sm">11:30 AM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[11px] font-bold shrink-0">MR</div>
                                            <span className="font-semibold text-gray-900 text-[13px] leading-tight">Michael<br />Ross</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-500 text-[13px] leading-tight">Routine<br />Cleaning</td>
                                    <td className="py-4 text-gray-700 text-[13px] leading-tight">Hygienist<br />Smith</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold border border-gray-300 text-gray-500 bg-white text-center leading-tight">Confirmed</span>
                                    </td>
                                </tr>
                                {/* Row 4 */}
                                <tr>
                                    <td className="py-4 text-gray-400 font-medium text-sm line-through decoration-gray-300">01:00 PM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[11px] font-bold shrink-0">AL</div>
                                            <span className="font-semibold text-gray-400 text-[13px] leading-tight">Amanda<br />Lee</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-400 text-[13px] leading-tight">Consultation</td>
                                    <td className="py-4 text-gray-400 text-[13px] leading-tight">Dr.<br />Jenkins</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-400 text-center leading-tight">Cancelled</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-50/50 rounded-b-2xl p-4 text-center border-t border-gray-100 mt-auto">
                        <button className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors">{t('clinicDashboard.dailySchedule.loadMore')}</button>
                    </div>
                </div>

                {/* Recent Activity Timeline (1/3 width) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col h-full">
                    <h2 className="text-[17px] font-bold text-gray-900 mb-6">{t('clinicDashboard.recentActivity.title')}</h2>

                    <div className="relative pl-3 space-y-7 flex-1">
                        {/* Vertical Line */}
                        <div className="absolute left-[25px] top-2 bottom-6 w-[2px] bg-gray-200"></div>

                        {/* Item 1 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <CalendarDays className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">{t('clinicDashboard.recentActivity.booking.title')}</p>
                                <p className="text-[12px] text-gray-500 mt-0.5">{t('clinicDashboard.recentActivity.booking.desc')}</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">{t('clinicDashboard.recentActivity.booking.time')}</span>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <DollarSign className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">{t('clinicDashboard.recentActivity.payment.title')}</p>
                                <p className="text-[12px] text-gray-500 mt-0.5">{t('clinicDashboard.recentActivity.payment.desc')}</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">{t('clinicDashboard.recentActivity.payment.time')}</span>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <FileText className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">{t('clinicDashboard.recentActivity.record.title')}</p>
                                <p className="text-[12px] text-gray-500 leading-snug mt-0.5">{t('clinicDashboard.recentActivity.record.desc')}</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">{t('clinicDashboard.recentActivity.record.time')}</span>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <CalendarX className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">{t('clinicDashboard.recentActivity.cancellation.title')}</p>
                                <p className="text-[12px] text-gray-500 leading-snug mt-0.5">{t('clinicDashboard.recentActivity.cancellation.desc')}</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">{t('clinicDashboard.recentActivity.cancellation.time')}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Sub-component for KPI Cards
function StatCard({ title, value, subValue, change, changeColor, icon: Icon, iconBg, iconColor, badge, avatars, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] relative flex flex-col justify-between h-full min-h-[160px] transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-lg hover:border-gray-300 hover:-translate-y-1' : ''}`}
        >
            <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${changeColor.bg} ${changeColor.text}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        {change}
                    </div>
                )}
                {badge && <span className="text-xs font-semibold text-gray-500">{badge}</span>}
            </div>

            <div className="mt-auto">
                <div className="text-[11px] font-bold text-gray-500 tracking-wider mb-1.5">{title}</div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{value}</span>
                    {subValue && <span className="text-sm text-gray-500 font-medium">{subValue}</span>}
                </div>
                {avatars && (
                    <div className="flex -space-x-1.5 mt-2.5">
                        <img className="w-6 h-6 rounded-full border-2 border-white relative z-30" src="https://i.pravatar.cc/100?img=1" alt="doctor" />
                        <img className="w-6 h-6 rounded-full border-2 border-white relative z-20" src="https://i.pravatar.cc/100?img=2" alt="doctor" />
                        <img className="w-6 h-6 rounded-full border-2 border-white relative z-10" src="https://i.pravatar.cc/100?img=3" alt="doctor" />
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500 relative z-0">+5</div>
                    </div>
                )}
            </div>
        </div>
    );
}
```
`src\pages\clinic\ClinicProfileSettings.jsx`:

```jsx
// src/pages/clinic/ClinicProfileSettings.jsx
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Form, useBlocker, useOutletContext } from "react-router";
import * as api from "../../api/clinicProfileApi";

import { localToUtcRecurring, utcToLocalRecurring } from "../../utils/timezone";

// Map between backend City enum and display names
const CITY_OPTIONS = [
    { value: "AMMAN", label: "Amman" },
    { value: "IRBID", label: "Irbid" },
    { value: "ZARQA", label: "Zarqa" },
    { value: "MAFRAQ", label: "Mafraq" },
    { value: "AJLOUN", label: "Ajloun" },
    { value: "JERASH", label: "Jerash" },
    { value: "MADABA", label: "Madaba" },
    { value: "BALQA", label: "Salt" },
    { value: "KARAK", label: "Karak" },
    { value: "TAFILEH", label: "Tafilah" },
    { value: "MAAN", label: "Maan" },
    { value: "AQABA", label: "Aqaba" },
];

const STATIC_SPECIALTIES = [
    "General Dentistry",
    "Orthodontics",
    "Oral Surgery",
    "Pediatric Dentistry",
    "Periodontics",
    "Cosmetic Dentistry",
    "Endodontics"
];

const initialForm = {
    clinicName: "",
    checkingFee: "0.00",
    description: "",
    phoneNumber: "",
    socialLinks: [""],
    city: "AMMAN",
    address: "",
    specialties: {},
    hours: {
        Sunday: { enabled: false, from: "09:00", to: "17:00" },
        Monday: { enabled: false, from: "09:00", to: "17:00" },
        Tuesday: { enabled: false, from: "09:00", to: "17:00" },
        Wednesday: { enabled: false, from: "09:00", to: "17:00" },
        Thursday: { enabled: false, from: "09:00", to: "17:00" },
        Friday: { enabled: false, from: "09:00", to: "17:00" },
        Saturday: { enabled: false, from: "09:00", to: "17:00" },
    },
};

function isEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 == null || obj2 == null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (!isEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}

function TrashIcon({ size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}

function Icon({ children, size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {children}
        </svg>
    );
}

function LinkIcon({ size = 18 }) {
    return (
        <Icon size={size}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </Icon>
    );
}

function MoreVerticalIcon({ size = 18 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
        </svg>
    );
}

function StoreIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <path d="M4 10v10h16V10" />
            <path d="M3 10h18l-1.5-6h-15z" />
            <path d="M8 14h8v6H8z" />
            <path d="M6 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
        </Icon>
    );
}

function PhoneIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
        </Icon>
    );
}

function LocationIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
        </Icon>
    );
}

function MedicalIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M12 8v8M8 12h8" />
        </Icon>
    );
}

function ClockIcon({ size = 21 }) {
    return (
        <Icon size={size}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </Icon>
    );
}

function PlusIcon({ size = 17 }) {
    return (
        <Icon size={size}>
            <path d="M12 5v14M5 12h14" />
        </Icon>
    );
}

function Section({ icon, title, children }) {
    return (
        <section className="rounded-[14px] border border-slate-300 bg-white px-6 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="mb-6 flex items-center gap-2.5">
                <span className="text-blue-700">{icon}</span>
                <h2 className="text-[22px] font-medium tracking-[-0.01em] text-slate-950">
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}

function Field({ label, required = false, children }) {
    return (
        <label className="block">
            <span className="mb-2 block text-[13px] font-medium tracking-wide text-slate-700">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </span>
            {children}
        </label>
    );
}

function Input({ className = "", ...props }) {
    return (
        <input
            {...props}
            className={`h-[40px] w-full rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${className}`}
        />
    );
}

function Toggle({ enabled, onChange }) {
    return (
        <button
            type="button"
            onClick={onChange}
            aria-pressed={enabled}
            className={`relative h-[18px] w-[34px] rounded-full transition ${enabled ? "bg-blue-700" : "bg-slate-200"}`}
        >
            <span
                className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition ${enabled ? "left-[18px]" : "left-[2px]"}`}
            />
        </button>
    );
}

function PickerColumn({ items, value, onChange, className = "text-[18px]" }) {
    const scrollRef = useRef(null);
    const isScrolling = useRef(false);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startScrollTop = useRef(0);

    const itemsRef = useRef(items);
    const valueRef = useRef(value);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        itemsRef.current = items;
        valueRef.current = value;
        onChangeRef.current = onChange;
    });

    useEffect(() => {
        if (scrollRef.current && !isScrolling.current && !isDragging.current) {
            const index = items.indexOf(value);
            if (index !== -1) {
                scrollRef.current.scrollTop = index * 34;
            }
        }
    }, [value, items]);

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const y = e.pageY;
            const walk = (y - startY.current);
            if (scrollRef.current) {
                scrollRef.current.scrollTop = startScrollTop.current - walk;
            }
        };

        const handleGlobalMouseUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                if (scrollRef.current) {
                    scrollRef.current.style.scrollSnapType = 'y mandatory';
                    const currentScroll = scrollRef.current.scrollTop;
                    const index = Math.round(currentScroll / 34);

                    scrollRef.current.scrollTo({ top: index * 34, behavior: 'smooth' });
                    const currentItems = itemsRef.current;
                    const currentValue = valueRef.current;
                    if (currentItems[index] !== undefined && currentItems[index] !== currentValue) {
                        onChangeRef.current(currentItems[index]);
                    }
                }
            }
        };

        window.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    const handleScroll = (e) => {
        if (isDragging.current) return;
        const currentScroll = e.target.scrollTop;
        const index = Math.round(currentScroll / 34);

        isScrolling.current = true;
        clearTimeout(scrollRef.current.scrollTimeout);
        scrollRef.current.scrollTimeout = setTimeout(() => {
            isScrolling.current = false;
        }, 150);

        if (items[index] !== undefined && items[index] !== value) {
            onChange(items[index]);
        }
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startY.current = e.pageY;
        startScrollTop.current = scrollRef.current.scrollTop;
        if (scrollRef.current) {
            scrollRef.current.style.scrollSnapType = 'none';
        }
    };

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            className="flex-1 h-full overflow-y-auto snap-y snap-mandatory hide-scroll select-none cursor-grab active:cursor-grabbing"
        >
            <div className="h-[58px]" />
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className={`flex h-[34px] w-full snap-center items-center justify-center transition-colors ${className} ${item === value ? 'font-semibold text-black' : 'text-slate-800 hover:text-black'}`}
                >
                    {item}
                </div>
            ))}
            <div className="h-[58px]" />
        </div>
    );
}

function TimeSelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    let currentHour24 = 9;
    if (value) {
        currentHour24 = parseInt(value.split(":")[0], 10);
        if (isNaN(currentHour24)) currentHour24 = 9;
    }

    let currentHour12 = currentHour24 % 12 || 12;
    let currentAmPm = currentHour24 >= 12 ? "PM" : "AM";
    let currentHour12Str = `${currentHour12}:00`;

    const displayLabel = `${currentHour12.toString().padStart(2, "0")}:00 ${currentAmPm}`;

    const updateTime = (newHour12Str, newAmPm) => {
        let newHour12 = parseInt(newHour12Str.toString().split(":")[0], 10);
        let h24 = newHour12 % 12;
        if (newAmPm === "PM") h24 += 12;
        onChange(`${h24.toString().padStart(2, "0")}:00`);
    };

    const hours = ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];
    const ampmOptions = ["AM", "PM"];

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-[36px] w-[110px] items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 text-[13px] font-medium text-slate-700 shadow-sm transition hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            >
                <span>{displayLabel}</span>
                <ClockIcon size={14} />
            </button>

            {isOpen && (
                <div className="absolute z-50 bottom-full mb-3 -translate-x-1/2 left-1/2">
                    <style>{`
                        .hide-scroll::-webkit-scrollbar { display: none; }
                        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                    <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-slate-200 bg-white z-10" />

                    <div className="relative flex h-[180px] w-[130px] flex-col items-center justify-center rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] ring-1 ring-slate-200 overflow-hidden">
                        <div className="absolute top-1/2 left-2 right-2 h-[34px] -translate-y-1/2 rounded-lg bg-slate-100 pointer-events-none" />

                        <div className="relative z-10 flex h-[150px] w-full px-1 items-center">
                            <PickerColumn
                                items={hours}
                                value={currentHour12Str}
                                onChange={(h) => updateTime(h, currentAmPm)}
                                className="text-[18px]"
                            />

                            <PickerColumn
                                items={ampmOptions}
                                value={currentAmPm}
                                onChange={(ampm) => updateTime(currentHour12, ampm)}
                                className="text-[15px]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ClinicProfileSettings() {
    const { t } = useTranslation();
    const [form, setForm] = useState(initialForm);
    const [originalSpecialties, setOriginalSpecialties] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);
    const [specialtyModal, setSpecialtyModal] = useState({ open: false, name: "", duration: 60 });
    const [deletingSpecialty, setDeletingSpecialty] = useState(null);
    const context = useOutletContext();
    const isRejected = context?.profile?.applicationStatus === 'REJECTED';

    // New states for modified specialty behavior
    const [allAvailableSpecialties, setAllAvailableSpecialties] = useState([...STATIC_SPECIALTIES]);
    const [clinicSpecialtyDetails, setClinicSpecialtyDetails] = useState({});
    const [openMenu, setOpenMenu] = useState(null); // Tracks which 3 dots menu is open
    const [durationModal, setDurationModal] = useState({ open: false, id: null, name: "", duration: 60 });

    const [isDirtyManual, setIsDirty] = useState(false); // Kept for backwards compatibility but ignored
    const [pendingDeletions, setPendingDeletions] = useState([]);

    const [savedForm, setSavedForm] = useState(null);
    const [savedSpecialtyDetails, setSavedSpecialtyDetails] = useState(null);
    const isDirty = savedForm ? (!isEqual(form, savedForm) || !isEqual(clinicSpecialtyDetails, savedSpecialtyDetails) || pendingDeletions.length > 0) : false;

    // Prevent closing the tab when there are unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    // Prevent React Router navigation when there are unsaved changes
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && currentLocation.pathname !== nextLocation.pathname
    );

    async function handleSaveSpecialty() {
        const newName = specialtyModal.name.trim();
        if (!newName) return;

        setForm((current) => ({
            ...current,
            specialties: {
                ...current.specialties,
                [newName]: true,
            },
        }));

        setOriginalSpecialties((current) => ({
            ...current,
            [newName]: true,
        }));

        setClinicSpecialtyDetails((current) => ({
            ...current,
            [newName]: { id: null, durationMinutes: specialtyModal.duration }
        }));

        setAllAvailableSpecialties((current) => {
            if (!current.includes(newName)) {
                return [...current, newName];
            }
            return current;
        });

        setIsDirty(true);
        setSpecialtyModal({ open: false, name: "", duration: 60 });
    }

    async function handleDeleteSpecialtyPermanently(name) {
        setForm(current => {
            const newSpecialties = { ...current.specialties };
            delete newSpecialties[name];
            return { ...current, specialties: newSpecialties };
        });

        // Remove from UI
        setAllAvailableSpecialties(current => current.filter(s => s !== name));

        // Mark for backend permanent deletion if it was already saved to DB
        setPendingDeletions(prev => [...prev, name]);

        setIsDirty(true);
    }

    async function handleSaveDuration() {
        setForm((current) => ({
            ...current,
            specialties: { ...current.specialties, [durationModal.name]: true }
        }));

        setClinicSpecialtyDetails(current => ({
            ...current,
            [durationModal.name]: { ...(current[durationModal.name] || {}), durationMinutes: durationModal.duration }
        }));

        setIsDirty(true);
        setDurationModal({ open: false, id: null, name: "", duration: 60 });
    }

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
        setSaved(false);
    }

    // Dynamic Social Links Array Handlers
    function handleSocialLinkChange(index, value) {
        setForm(current => {
            const updated = [...current.socialLinks];
            updated[index] = value;
            return { ...current, socialLinks: updated };
        });
        setSaved(false);
    }

    function addSocialLink() {
        setForm(current => ({
            ...current,
            socialLinks: [...current.socialLinks, ""]
        }));
        setIsDirty(true);
        setSaved(false);
    }

    function removeSocialLink(index) {
        setForm(current => {
            const newLinks = [...current.socialLinks];
            newLinks.splice(index, 1);
            if (newLinks.length === 0) newLinks.push("");
            return { ...current, socialLinks: newLinks };
        });
        setIsDirty(true);
        setSaved(false);
    }

    function updateSpecialty(name) {
        setForm((current) => ({
            ...current,
            specialties: {
                ...current.specialties,
                [name]: !current.specialties[name],
            },
        }));
        setIsDirty(true);
        setSaved(false);
    }

    function updateHour(day, field, value) {
        setForm((current) => ({
            ...current,
            hours: {
                ...current.hours,
                [day]: {
                    ...current.hours[day],
                    [field]: value,
                },
            },
        }));
        setIsDirty(true);
        setSaved(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);

            const [profile, specialtiesData, hoursData, allSpecialtiesData] = await Promise.all([
                api.fetchClinicProfile(),
                api.fetchSpecialties(),
                api.fetchClinicHours(),
                api.fetchAllSpecialties().catch(() => []) // Gracefully fail if endpoint not yet deployed
            ]);

            const allSpecialtiesMap = {};
            STATIC_SPECIALTIES.forEach(s => {
                allSpecialtiesMap[s] = false;
            });
            if (allSpecialtiesData) {
                allSpecialtiesData.forEach(s => {
                    if (!(s.name in allSpecialtiesMap)) {
                        allSpecialtiesMap[s.name] = false;
                    }
                });
            }

            const detailsMap = {};
            specialtiesData.forEach(s => {
                allSpecialtiesMap[s.name] = true;
                detailsMap[s.name] = { id: s.id, durationMinutes: s.durationMinutes || 60 };
            });

            setOriginalSpecialties({ ...allSpecialtiesMap });
            setClinicSpecialtyDetails(detailsMap);
            setAllAvailableSpecialties(Object.keys(allSpecialtiesMap));

            const javaDayToJsDay = {
                SUNDAY: "Sunday", MONDAY: "Monday", TUESDAY: "Tuesday",
                WEDNESDAY: "Wednesday", THURSDAY: "Thursday", FRIDAY: "Friday", SATURDAY: "Saturday"
            };
            const hours = { ...initialForm.hours };
            hoursData.forEach(schedule => {
                if (!schedule.startTime || !schedule.endTime) return;
                
                const dayName = javaDayToJsDay[schedule.dayOfWeek];
                if (dayName) {
                    hours[dayName] = {
                        enabled: true,
                        from: schedule.startTime.substring(0, 5),
                        to: schedule.endTime.substring(0, 5),
                    };
                }
            });

            // Normalize backend socialLinks array
            let loadedSocialLinks = [];
            if (Array.isArray(profile.socialLinks) && profile.socialLinks.length > 0) {
                loadedSocialLinks = profile.socialLinks;
            } else if (typeof profile.socialLinks === "string" && profile.socialLinks.trim()) {
                loadedSocialLinks = [profile.socialLinks.trim()];
            } else {
                loadedSocialLinks = [""];
            }

            const nextForm = {
                ...initialForm,
                clinicName: profile.clinicName || "",
                checkingFee: profile.checkingFee?.toString() || "0.00",
                description: profile.description || "",
                phoneNumber: profile.phoneNumber || "",
                socialLinks: loadedSocialLinks,
                city: profile.city || "AMMAN",
                address: profile.detailedAddress || "",
                specialties: allSpecialtiesMap,
                hours: hours,
            };

            setSavedForm(nextForm);
            setSavedSpecialtyDetails(detailsMap);
            setForm(current => ({
                ...current,
                ...nextForm
            }));

            setIsDirty(false);
            setPendingDeletions([]);
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave(event) {
        event.preventDefault();

        if (form.phoneNumber && !/^(079|078|077)\d{7}$/.test(form.phoneNumber)) {
            setError("Phone number must be exactly 10 digits and start with 079, 078, or 077");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setSaving(true);
        setError("");

        try {
            // Trim and filter empty link fields to send a clean List<String>
            const cleanedSocialLinks = form.socialLinks
                .map(link => link.trim())
                .filter(Boolean);

            // 1. Save Profile
            await api.updateClinicProfile({
                clinicName: form.clinicName,
                phoneNumber: form.phoneNumber,
                socialLinks: cleanedSocialLinks,
                detailedAddress: form.address,
                workingHours: null,
                checkingFee: parseFloat(form.checkingFee),
                description: form.description,
                city: form.city
            });

            // 2. Save Specialties
            const specialtyPromises = Object.keys(form.specialties).map(async (specialtyName) => {
                const isChecked = form.specialties[specialtyName];
                const wasChecked = originalSpecialties[specialtyName];
                const duration = clinicSpecialtyDetails[specialtyName]?.durationMinutes || 60;
                const oldDuration = savedSpecialtyDetails?.[specialtyName]?.durationMinutes || 60;

                if (isChecked && !wasChecked) {
                    return api.addSpecialty(specialtyName, duration).catch(() => { });
                } else if (isChecked && wasChecked && duration !== oldDuration) {
                    const id = clinicSpecialtyDetails[specialtyName]?.id;
                    if (id) {
                        return api.updateSpecialtyDuration(id, duration).catch(() => { });
                    } else {
                        return api.addSpecialty(specialtyName, duration).catch(() => { });
                    }
                } else if (!isChecked && wasChecked) {
                    return api.deleteSpecialty(specialtyName).catch(() => { });
                }
            });

            // 2.5 Permanent Deletions
            const deletePromises = pendingDeletions.map(name =>
                api.deleteSpecialtyPermanently(name).catch(() => { })
            );

            // 3. Save Hours
            const jsDayToJavaDay = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
            const allJavaDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
            await Promise.all(allJavaDays.map(day => api.deleteClinicHours(day).catch(() => { })));

            const hoursPromises = Object.entries(form.hours).map(async ([day, schedule]) => {
                const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day);
                const javaDay = jsDayToJavaDay[dayIndex];

                if (schedule.enabled) {
                    const startTime = schedule.from.length === 5 ? schedule.from + ":00" : schedule.from;
                    const endTime = schedule.to.length === 5 ? schedule.to + ":00" : schedule.to;

                    return api.saveClinicHours(javaDay, startTime, endTime).catch(() => { });
                }
            });

            await Promise.all([...hoursPromises, ...specialtyPromises, ...deletePromises]);

            setIsDirty(false);
            setSaved(true);
            
            if (isRejected) {
                window.location.href = '/clinic';
                return;
            }
            
            await loadData();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
                <div className="text-slate-500">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="text-slate-950 w-full">
            {/* Blocker Modal */}
            {blocker.state === "blocked" && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
                    <div className="w-full max-w-[440px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <h3 className="text-[18px] font-semibold leading-6 text-slate-900">
                            {t('profileSettings.unsavedChanges.title')}
                        </h3>
                        <div className="mt-2">
                            <p className="text-[14px] text-slate-500">
                                {t('profileSettings.unsavedChanges.description')}
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-lg border border-transparent bg-slate-100 px-4 py-2 text-[14px] font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 cursor-pointer transition-colors"
                                onClick={() => blocker.reset()}
                            >
                                {t('profileSettings.unsavedChanges.stay')}
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-[14px] font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 cursor-pointer transition-colors"
                                onClick={() => blocker.proceed()}
                            >
                                {t('profileSettings.unsavedChanges.leave')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Full-Width Header Band */}
            <div className="sticky top-0 z-40 -mt-8 pt-8 pb-4 -mx-8 px-8 bg-[#f7f8fa] border-b border-slate-300 shadow-xs mb-6">
                <div className="mx-auto max-w-[1060px] flex items-start justify-between">
                    <div>
                        <h1 className="text-[32px] font-semibold tracking-tight text-slate-950">
                            {t('profileSettings.title')}
                        </h1>
                        <p className="mt-1.5 text-[15px] text-slate-500">
                            {t('profileSettings.description')}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() => {
                                if (isDirty) {
                                    loadData();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            disabled={saving || !isDirty}
                            className={`rounded-lg px-6 py-2.5 text-[14px] font-medium transition cursor-pointer ${saving || !isDirty
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-transparent"
                                : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            {t('profileSettings.cancel')}
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving || !isDirty}
                            className="flex h-[42px] items-center gap-2 rounded-md bg-blue-700 px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-70 cursor-pointer"
                        >
                            {saving ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                                t('profileSettings.saveSettings')
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mx-auto max-w-[1060px] pb-12">
                {error && (
                    <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-5">
                    {saved && !isDirty && (
                        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
                            {t('profileSettings.savedSuccessfully')}
                        </div>
                    )}

                    {/* GENERAL INFORMATION */}
                    <Section icon={<StoreIcon />} title={t('profileSettings.clinicInfo.title')}>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <Field label={t('profileSettings.clinicInfo.clinicName')} required>
                                <Input
                                    value={form.clinicName}
                                    onChange={(e) =>
                                        updateField("clinicName", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label={t('profileSettings.clinicInfo.checkingFee')}>
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-[15px] font-medium text-slate-600">
                                        {t('profileSettings.clinicInfo.currency')}
                                    </div>
                                    <Input
                                        value={form.checkingFee}
                                        onChange={(e) =>
                                            updateField("checkingFee", e.target.value)
                                        }
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>
                        </div>

                        <div className="mt-5">
                            <Field label={t('profileSettings.clinicInfo.description')}>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 500) {
                                            updateField("description", e.target.value);
                                        }
                                    }}
                                    placeholder={t('profileSettings.clinicInfo.descriptionPlaceholder')}
                                    className="h-[100px] w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                                <div className="mt-1 text-right text-[12px] text-slate-500">
                                    {form.description.length} / 500 {t('profileSettings.clinicInfo.characters')}
                                </div>
                            </Field>
                        </div>
                    </Section>

                    {/* CONTACT & SOCIAL */}
                    <Section icon={<PhoneIcon />} title={t('profileSettings.contactAndSocial.title')}>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <Field label={t('profileSettings.contactAndSocial.phoneNumber')}>
                                <div className="flex">
                                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600">
                                        <PhoneIcon size={13} />
                                    </div>
                                    <Input
                                        value={form.phoneNumber}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            updateField("phoneNumber", val);
                                        }}
                                        className="rounded-l-none"
                                    />
                                </div>
                            </Field>
                        </div>

                        {/* Multiple Social Links Dynamic Inputs */}
                        <div className="mt-6 pt-5 border-t border-slate-200">
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <span className="block text-[13px] font-medium tracking-wide text-slate-700">
                                        {t('profileSettings.contactAndSocial.socialMedia')}
                                    </span>
                                    <span className="text-[12px] text-slate-500">
                                        {t('profileSettings.contactAndSocial.socialMediaPlaceholder')}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={addSocialLink}
                                    className="flex items-center gap-1.5 text-[13px] font-medium text-blue-700 hover:text-blue-800 transition cursor-pointer"
                                >
                                    <PlusIcon size={15} />
                                    <span>{t('profileSettings.contactAndSocial.addLink')}</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {form.socialLinks.map((link, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex flex-1">
                                            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-slate-600">
                                                <LinkIcon size={16} />
                                            </div>
                                            <Input
                                                value={link}
                                                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                                                placeholder={t('profileSettings.contactAndSocial.linkPlaceholder')}
                                                className="rounded-l-none"
                                            />
                                        </div>

                                        {form.socialLinks.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSocialLink(index)}
                                                className="flex h-[40px] w-[40px] items-center justify-center rounded-md border border-slate-300 text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                                                title={t('profileSettings.remove')}
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>

                    {/* LOCATION */}
                    <Section icon={<LocationIcon />} title={t('profileSettings.locationDetails.title')}>
                        <div className="grid grid-cols-[1fr_1fr] gap-6">
                            <div className="space-y-5">
                                <Field label={t('profileSettings.locationDetails.city')}>
                                    <div className="relative">
                                        <select
                                            value={form.city}
                                            onChange={(e) => updateField("city", e.target.value)}
                                            className="h-[40px] w-full appearance-none rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                        >
                                            {CITY_OPTIONS.map(c => (
                                                <option key={c.value} value={c.value}>{t(`profileSettings.cities.${c.value}`)}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </div>
                                    </div>
                                </Field>

                                <Field label={t('profileSettings.locationDetails.address')}>
                                    <Input
                                        value={form.address}
                                        onChange={(e) => updateField("address", e.target.value)}
                                    />
                                </Field>
                            </div>

                            <div className="flex min-h-[190px] items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-[#e8edf1]">
                                <div className="relative h-full w-full">
                                    <div className="absolute inset-0 opacity-50">
                                        <div className="absolute left-[10%] top-[15%] h-[1px] w-[80%] rotate-12 bg-white" />
                                        <div className="absolute left-[10%] top-[40%] h-[1px] w-[85%] -rotate-6 bg-white" />
                                        <div className="absolute left-[5%] top-[65%] h-[1px] w-[90%] rotate-12 bg-white" />
                                        <div className="absolute left-[25%] top-[5%] h-[90%] w-[1px] rotate-[8deg] bg-white" />
                                        <div className="absolute left-[65%] top-[5%] h-[90%] w-[1px] -rotate-[8deg] bg-white" />
                                    </div>

                                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white px-8 py-5 shadow-sm">
                                        <LocationIcon size={24} />
                                        <span className="mt-2 whitespace-nowrap text-[12px] text-slate-600">
                                            {t('profileSettings.locationDetails.mapPreview')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* MEDICAL SPECIALTIES */}
                    <Section icon={<MedicalIcon />} title={t('profileSettings.medicalSpecialties.title')}>
                        <div className="grid grid-cols-4 gap-3">
                            {allAvailableSpecialties.map((specialty) => {
                                const isStatic = STATIC_SPECIALTIES.includes(specialty);
                                const isDeleting = deletingSpecialty === specialty;
                                const isChecked = form.specialties[specialty];
                                const details = clinicSpecialtyDetails[specialty];

                                return (
                                    <div
                                        key={specialty}
                                        className={`relative flex h-[36px] items-center justify-between rounded-md border border-slate-300 px-3 text-[13px] text-slate-800 transition-all duration-500 ease-in-out ${isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100 hover:bg-slate-50"} ${openMenu === specialty ? "z-50" : "z-10"}`}
                                    >
                                        <label className="flex items-center gap-2 cursor-pointer flex-1 h-full">
                                            <input
                                                type="checkbox"
                                                checked={isChecked || false}
                                                onChange={() => updateSpecialty(specialty)}
                                                className="h-[18px] w-[18px] accent-blue-700 cursor-pointer"
                                            />
                                            <span className="truncate">{specialty}</span>
                                        </label>

                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setOpenMenu(openMenu === specialty ? null : specialty)}
                                                className={`p-1.5 rounded-md transition cursor-pointer ${openMenu === specialty ? 'bg-slate-200 text-slate-800' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                                            >
                                                <MoreVerticalIcon size={16} />
                                            </button>

                                            {openMenu === specialty && (
                                                <>
                                                    <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)}></div>
                                                    <div className="absolute right-0 top-full mt-1.5 z-50 w-44 origin-top-right rounded-lg bg-white p-1 shadow-lg ring-1 ring-slate-200 focus:outline-none overflow-hidden">
                                                        <button
                                                            type="button"
                                                            disabled={!isChecked}
                                                            onClick={() => {
                                                                setOpenMenu(null);
                                                                setDurationModal({ open: true, id: details?.id || null, name: specialty, duration: details?.durationMinutes || 60 });
                                                            }}
                                                            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition ${!isChecked ? "text-slate-400 cursor-not-allowed" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"}`}
                                                        >
                                                            <ClockIcon size={16} /> {t('profileSettings.medicalSpecialties.modifyDuration')}
                                                        </button>


                                                        {!isStatic && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenMenu(null);
                                                                    handleDeleteSpecialtyPermanently(specialty);
                                                                }}
                                                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer mt-0.5"
                                                            >
                                                                <TrashIcon size={16} /> {t('profileSettings.medicalSpecialties.delete')}
                                                            </button>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <button
                                type="button"
                                onClick={() => setSpecialtyModal({ open: true, name: "", duration: 60 })}
                                className="flex h-[36px] items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-300 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                            >
                                <PlusIcon size={14} /> {t('profileSettings.medicalSpecialties.addSpecialty')}
                            </button>
                        </div>
                    </Section>

                    {/* CLINIC HOURS */}
                    <Section icon={<ClockIcon />} title={t('profileSettings.clinicHours.title')}>
                        <div>
                            {Object.entries(form.hours).map(([day, schedule], index) => (
                                <div
                                    key={day}
                                    className={`flex min-h-[54px] items-center justify-between ${index !== Object.entries(form.hours).length - 1
                                        ? "border-b border-slate-200"
                                        : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <Toggle
                                            enabled={schedule.enabled}
                                            onChange={() =>
                                                updateHour(day, "enabled", !schedule.enabled)
                                            }
                                        />
                                        <span
                                            className={`w-[80px] text-[15px] font-medium ${schedule.enabled
                                                ? "text-slate-950"
                                                : "text-slate-400"
                                                }`}
                                        >
                                            {t(`profileSettings.days.${day}`)}
                                        </span>
                                    </div>

                                    {schedule.enabled ? (
                                        <div className="flex items-center gap-3">
                                            <TimeSelect
                                                value={schedule.from}
                                                onChange={(val) => updateHour(day, "from", val)}
                                            />
                                            <span className="text-[13px] text-slate-600">to</span>
                                            <TimeSelect
                                                value={schedule.to}
                                                onChange={(val) => updateHour(day, "to", val)}
                                            />
                                        </div>
                                    ) : (
                                        <span className="mr-1 text-[13px] text-slate-400">{t('profileSettings.clinicHours.closed')}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                </form>
            </div>

            {/* ADD SPECIALTY MODAL */}
            {specialtyModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-[400px] rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-slate-900">{t('profileSettings.medicalSpecialties.addNewSpecialty')}</h3>
                            <button
                                onClick={() => setSpecialtyModal({ open: false, name: "" })}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-[13px] font-medium tracking-wide text-slate-700">{t('profileSettings.medicalSpecialties.specialtyName')}</label>
                            <input
                                type="text"
                                autoFocus
                                value={specialtyModal.name}
                                onChange={(e) => setSpecialtyModal({ ...specialtyModal, name: e.target.value })}
                                placeholder={t('profileSettings.medicalSpecialties.specialtyNamePlaceholder')}
                                className="h-[40px] w-full rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-[13px] font-medium tracking-wide text-slate-700">{t('profileSettings.medicalSpecialties.duration')}</label>
                            <input
                                type="number"
                                min={5}
                                step={5}
                                value={specialtyModal.duration}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setSpecialtyModal({ ...specialtyModal, duration: isNaN(val) ? "" : val });
                                }}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveSpecialty(); }}
                                placeholder="60"
                                className="h-[40px] w-full rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                            <p className="mt-2 text-xs text-slate-500">{t('profileSettings.medicalSpecialties.durationHint')}</p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setSpecialtyModal({ open: false, name: "", duration: 60 })}
                                className="h-[36px] rounded-md border border-slate-300 bg-white px-4 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                            >
                                {t('profileSettings.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveSpecialty}
                                disabled={!specialtyModal.name.trim() || !specialtyModal.duration || specialtyModal.duration < 5 || specialtyModal.duration % 5 !== 0}
                                className="h-[36px] rounded-md bg-blue-700 px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-50 cursor-pointer"
                            >
                                {t('profileSettings.medicalSpecialties.addSpecialty')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DURATION MODAL */}
            {durationModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="w-[400px] rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <h3 className="text-[18px] font-semibold leading-6 text-slate-900">
                                    {t('profileSettings.medicalSpecialties.modifyDuration')}
                                </h3>
                                <div className="text-[13px] font-normal text-slate-500 mt-1">{durationModal.name}</div>
                            </div>
                            <button
                                onClick={() => setDurationModal({ open: false, id: null, name: "", duration: 60 })}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-[13px] font-medium tracking-wide text-slate-700">{t('profileSettings.medicalSpecialties.duration')}</label>
                            <input
                                type="number"
                                min={5}
                                step={5}
                                value={durationModal.duration}
                                autoFocus
                                onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    setDurationModal(m => ({ ...m, duration: isNaN(val) ? "" : val }));
                                }}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveDuration(); }}
                                placeholder="60"
                                className="h-[40px] w-full rounded-md border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                            <p className="mt-2 text-xs text-slate-500">{t('profileSettings.medicalSpecialties.durationHint')}</p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDurationModal({ open: false, id: null, name: "", duration: 60 })}
                                className="h-[36px] rounded-md border border-slate-300 bg-white px-4 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                            >
                                {t('profileSettings.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveDuration}
                                disabled={!durationModal.duration || durationModal.duration < 5 || durationModal.duration % 5 !== 0}
                                className="h-[36px] rounded-md bg-blue-700 px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-50 cursor-pointer"
                            >
                                {t('profileSettings.medicalSpecialties.saveDuration')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
```
`src\pages\clinic\components\ClinicAppointments.jsx`:

```jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { fetchDoctors, fetchDoctorSchedule } from "../../../api/clinicDoctorsApi";
import { getClinicAppointments, deleteClinicAppointment, createClinicAppointment, fetchClinicAvailability } from "../../../api/clinicAppointmentsApi";
import ModernAlertModal from "../../../components/ModernAlertModal";
import { localToUtcSpecific } from "../../../utils/timezone";
import '../../patient/ClinicDetails.css';

/**
 * ClinicAppointments – Calendar screen for managing appointments.
 */
export default function ClinicAppointments() {
    const { t } = useTranslation();
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [doctorFilters, setDoctorFilters] = useState({});
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [alertConfig, setAlertConfig] = useState({ open: false, title: "", message: "", type: "warning" });

    const showAlert = (message, title = "Notice", type = "warning") => {
        setAlertConfig({ open: true, title, message, type });
    };

    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - d.getDay());
        return d;
    });

    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const docs = await fetchDoctors();
                setDoctors(docs);
                const initialFilters = {};
                docs.forEach(doc => {
                    initialFilters[doc.id] = true;
                });
                setDoctorFilters(initialFilters);
            } catch (err) {
                console.error(err);
            }
        };
        loadDoctors();
    }, []);

    const fetchWeekAppointments = async () => {
        try {
            const startStr = `${currentWeekStart.getFullYear()}-${String(currentWeekStart.getMonth() + 1).padStart(2, '0')}-${String(currentWeekStart.getDate()).padStart(2, '0')}`;
            const end = new Date(currentWeekStart);
            end.setDate(end.getDate() + 6);
            const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;

            const apps = await getClinicAppointments(startStr, endStr);
            const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];

            const formatted = apps.map(app => {
                const dt = new Date(app.appointmentAt);
                const hours = dt.getHours();
                const m = String(dt.getMonth() + 1).padStart(2, '0');
                const d = String(dt.getDate()).padStart(2, '0');
                const dateStr = `${dt.getFullYear()}-${m}-${d}`;

                let docIndex = doctors.findIndex(d => d.id === app.doctorId);
                if (docIndex < 0) docIndex = 0;

                return {
                    id: app.appointmentId,
                    doctorId: app.doctorId,
                    doctorName: app.doctorName,
                    type: app.serviceName || "Walk-In",
                    date: dateStr,
                    startTime: `${String(hours).padStart(2, '0')}:00`,
                    endTime: `${String(hours + 1).padStart(2, '0')}:00`,
                    timeIndex: hours,
                    color: colors[docIndex % colors.length]
                };
            });
            setAppointments(formatted);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWeekAppointments();
    }, [currentWeekStart, doctors]);

    const handleDelete = () => {
        if (!selectedAppointmentId) {
            showAlert("Please select an appointment from the calendar first to delete it.", "No Appointment Selected", "warning");
            return;
        }

        const selectedApp = appointments.find(a => a.id === selectedAppointmentId);
        const doctorLabel = selectedApp ? selectedApp.doctorName : "this appointment";
        const timeLabel = selectedApp ? ` on ${selectedApp.date} at ${selectedApp.startTime}` : "";

        setAlertConfig({
            open: true,
            title: t('clinicAppointments.deleteModal.title'),
            message: `Are you sure you want to delete the appointment for ${doctorLabel}${timeLabel}? This action cannot be undone.`,
            type: "danger",
            showCancel: true,
            cancelText: t('clinicAppointments.deleteModal.cancel'),
            confirmText: t('clinicAppointments.deleteModal.confirm'),
            onConfirm: async () => {
                setAlertConfig(prev => ({ ...prev, open: false }));
                try {
                    await deleteClinicAppointment(selectedAppointmentId);
                    fetchWeekAppointments();
                    setSelectedAppointmentId(null);
                } catch (err) {
                    console.error(err);
                    showAlert("Failed to delete appointment. Please try again.", "Delete Failed", "error");
                }
            }
        });
    };

    const days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(currentWeekStart);
        date.setDate(date.getDate() + i);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dayNum = String(date.getDate()).padStart(2, '0');

        return {
            name: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            date: date.getDate(),
            dateString: `${year}-${month}-${dayNum}`,
            active: date.toDateString() === new Date().toDateString()
        };
    });

    const times = [
        "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
        "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
        "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ];

    const visibleAppointments = appointments.filter(app => doctorFilters[app.doctorId]);

    function getAppointmentsForCell(colIdx, timeIndex) {
        const dateStr = days[colIdx].dateString;
        return visibleAppointments.filter(app => app.date === dateStr && app.timeIndex === timeIndex);
    }

    const scrollContainerRef = useRef(null);
    const hasScrolledRef = useRef(false);

    useEffect(() => {
        if (!scrollContainerRef.current || hasScrolledRef.current) return;
        const currentWeekDateStrings = days.map(d => d.dateString);
        const currentWeekApps = visibleAppointments.filter(app => currentWeekDateStrings.includes(app.date));
        let earliestTimeIndex = 8;
        if (currentWeekApps.length > 0) {
            earliestTimeIndex = Math.min(...currentWeekApps.map(app => app.timeIndex));
        }
        const scrollPos = Math.max(0, earliestTimeIndex * 100 - 20);
        setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' });
                hasScrolledRef.current = true;
            }
        }, 100);
    });

    useEffect(() => {
        hasScrolledRef.current = false;
    }, [currentWeekStart, doctorFilters]);

    const [portalNode, setPortalNode] = useState(null);
    useEffect(() => {
        const node = document.getElementById("sidebar-page-content");
        if (node) setPortalNode(node);
    }, []);

    const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];
    const sidebarContent = (
        <div className="flex flex-col gap-4 mt-22">
            <div className="mt-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">{t('clinicDashboard.dailySchedule.title')}</h3>
                <div className="flex flex-col gap-1.5">
                    {doctors.map((doc, idx) => (
                        <DoctorToggle
                            key={doc.id}
                            name={doc.fullName}
                            color={colors[idx % colors.length]}
                            checked={!!doctorFilters[doc.id]}
                            onChange={(v) => setDoctorFilters(f => ({ ...f, [doc.id]: v }))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] min-h-0 bg-white rounded-xl shadow-sm relative">
            {portalNode && createPortal(sidebarContent, portalNode)}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-500">
                        <button onClick={() => {
                            const d = new Date(currentWeekStart);
                            d.setDate(d.getDate() - 7);
                            setCurrentWeekStart(d);
                        }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"><ChevronLeftIcon /></button>
                        <button onClick={() => {
                            const d = new Date(currentWeekStart);
                            d.setDate(d.getDate() + 7);
                            setCurrentWeekStart(d);
                        }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"><ChevronRightIcon /></button>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {currentWeekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDelete}
                        className={`rounded-full py-2 px-4 flex items-center justify-center gap-1.5 font-semibold transition-all text-[13px] ${selectedAppointmentId
                            ? 'bg-red-500 text-white shadow-md hover:bg-red-600 cursor-pointer'
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <TrashIcon className="w-4 h-4" /> {t('clinicAppointments.actions.deleteSelected')}
                    </button>
                    <button
                        onClick={() => setIsNewAppointmentOpen(true)}
                        className="bg-blue-800 text-white rounded-full py-2 px-4 flex items-center justify-center gap-1.5 font-semibold shadow-md cursor-pointer hover:bg-blue-700 transition-colors text-[13px]"
                    >
                        <span className="text-lg leading-none mb-0.5">+</span> {t('clinicAppointments.actions.newAppointment')}
                    </button>
                </div>
            </div>

            <div ref={scrollContainerRef} className="flex-1 overflow-auto relative bg-white scroll-smooth">
                <div className="min-w-[800px] grid grid-cols-[60px_repeat(7,1fr)] grid-rows-[70px_repeat(24,100px)] relative">
                    <div className="border-b border-r border-gray-100 bg-white sticky top-0 left-0 z-30"></div>
                    {days.map((day, i) => (
                        <div key={i} className="border-b border-r border-gray-100 flex flex-col items-center justify-center bg-white sticky top-0 z-20">
                            <span className={`text-xs font-semibold ${day.active ? 'text-blue-600' : 'text-gray-400'}`}>{day.name}</span>
                            <span className={`text-2xl font-bold mt-1 ${day.active ? 'bg-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center' : 'text-gray-800'}`}>
                                {day.date}
                            </span>
                        </div>
                    ))}
                    {times.map((time, rowIdx) => (
                        <div key={`time-row-${rowIdx}`} className="contents">
                            <div className="border-r border-b border-gray-100 flex items-start justify-center pt-2 bg-white sticky left-0 z-20">
                                <span className="text-[10px] font-semibold text-gray-400">{time}</span>
                            </div>
                            {days.map((_, colIdx) => {
                                const cellApps = getAppointmentsForCell(colIdx, rowIdx);
                                return (
                                    <div key={`cell-${rowIdx}-${colIdx}`} className="border-r border-b border-gray-100 relative p-1 group hover:bg-gray-50/50 transition-colors z-10">
                                        <div className="flex w-full h-full gap-1 relative">
                                            {cellApps.map(app => {
                                                const isSelected = selectedAppointmentId === app.id;
                                                return (
                                                    <div
                                                        key={app.id}
                                                        onClick={() => setSelectedAppointmentId(app.id)}
                                                        className={`flex-1 rounded-md p-2 cursor-pointer text-white overflow-hidden transition-all duration-200 ${app.color} ${isSelected ? 'ring-2 ring-blue-900 shadow-lg scale-[1.02] z-30' : 'opacity-90 hover:opacity-100 z-20'}`}
                                                    >
                                                        <p className="text-xs font-bold leading-tight">{app.doctorName} {app.type && `- ${app.type}`}</p>
                                                        <p className="text-[10px] opacity-90 mt-0.5">{app.startTime} - {app.endTime}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            {isNewAppointmentOpen && (
                <NewAppointmentModal
                    doctors={doctors}
                    onClose={() => setIsNewAppointmentOpen(false)}
                    onSaved={() => {
                        setIsNewAppointmentOpen(false);
                        fetchWeekAppointments();
                    }}
                />
            )}
            <ModernAlertModal
                isOpen={alertConfig.open}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                showCancel={alertConfig.showCancel}
                cancelText={alertConfig.cancelText}
                confirmText={alertConfig.confirmText}
                onConfirm={alertConfig.onConfirm}
                onClose={() => setAlertConfig(prev => ({ ...prev, open: false }))}
            />
        </div>
    );
}

function formatTime12h(time24) {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}


function getUpcomingDates() {
    const dates = [];
    const today = new Date();
    for (let offset = 0; offset < 7; offset++) {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        dates.push(d);
    }
    return dates;
}

function formatDateLabel(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function formatDateForApi(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function NewAppointmentModal({ doctors, onClose, onSaved }) {
    const { t } = useTranslation();
    const [selectedDoc, setSelectedDoc] = useState(doctors[0]?.id || null);

    // Services
    const [services, setServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);


    // Filter services based on selected doctor
    const filteredServices = useMemo(() => {
        if (!selectedDoc || !services.length) return [];
        const doc = doctors.find(d => d.id === selectedDoc);
        if (!doc || !doc.specialty) return [];

        const docSpecialties = doc.specialty.split(',').map(s => s.trim().toLowerCase());
        const filtered = services.filter(service => {
            const serviceName = service.name.toLowerCase().trim();
            return docSpecialties.some(ds => serviceName.includes(ds) || ds.includes(serviceName));
        });

        return filtered;
    }, [selectedDoc, doctors, services]);

    // Reset selected services when doctor changes
    useEffect(() => {
        if (filteredServices.length > 0) {
            // Only set if we don't already have valid selections for this doctor
            setSelectedServiceIds(prev => {
                const validIds = prev.filter(id => filteredServices.some(s => s.id === id));
                if (validIds.length > 0) return validIds;
                return [filteredServices[0].id];
            });
        } else {
            setSelectedServiceIds([]);
        }
    }, [filteredServices]);

    // Dates
    const activeDates = useMemo(() => getUpcomingDates(), []);
    const [selectedDate, setSelectedDate] = useState(activeDates[0]);

    // Slots
    const [slotsByDate, setSlotsByDate] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Appointment Selection
    const [selectedTime, setSelectedTime] = useState(null); // { date, time, utcDate, utcTime, rawTime }

    // UI State
    const [loading, setLoading] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ open: false, title: "", message: "", type: "warning" });

    // 1. Fetch clinic specialties (services)
    useEffect(() => {
        let isMounted = true;
        const loadServices = async () => {
            try {
                // We fetch specialties using the generic fetch from clinicProfileApi
                const { fetchSpecialties } = await import('../../../api/clinicProfileApi');
                const specs = await fetchSpecialties();
                if (isMounted) {
                    const mappedSpecs = specs.map((s, idx) => ({
                        id: s.id || `service-${idx}`,
                        name: s.name || s,
                        duration: s.durationMinutes || 30
                    }));
                    setServices(mappedSpecs);
                    if (mappedSpecs.length > 0) {
                        setSelectedServiceIds([mappedSpecs[0].id]);
                    }
                }
            } catch (err) {
                console.warn("Failed to load clinic specialties", err);
            }
        };
        loadServices();
        return () => { isMounted = false; };
    }, []);

    // 2. Fetch Slots when Doc, Service, or Date changes
    useEffect(() => {
        let isMounted = true;

        if (!selectedDoc || !selectedServiceIds.length) {
            setSlotsByDate({});
            return;
        }

        setLoadingSlots(true);
        setSelectedTime(null);

        // Fetch all 7 days in parallel to build the map
        Promise.all(
            activeDates.map(date => {
                const dateStr = formatDateForApi(date);
                return fetchClinicAvailability(dateStr, selectedDoc, selectedServiceIds)
                    .then(res => {
                        const rawSlots = Array.isArray(res) ? res : [];
                        return { date: dateStr, slots: rawSlots };
                    })
                    .catch(() => ({ date: dateStr, slots: [] }));
            })
        ).then(results => {
            if (!isMounted) return;

            const map = {};
            results.forEach(result => {
                const convertedSlots = result.slots
                    .map(slot => {
                        const rawTime = typeof slot === 'string' ? slot : (slot.time || '');
                        if (!rawTime) return null;

                        const timeWithSec = rawTime.length === 5 ? `${rawTime}:00` : rawTime;

                        // Original backend utc times for booking payload
                        let utcDate, utcTime;
                        if (slot.appointmentAt) {
                            const apptDateObj = new Date(slot.appointmentAt);
                            utcDate = `${apptDateObj.getUTCFullYear()}-${String(apptDateObj.getUTCMonth() + 1).padStart(2, '0')}-${String(apptDateObj.getUTCDate()).padStart(2, '0')}`;
                            utcTime = `${String(apptDateObj.getUTCHours()).padStart(2, '0')}:${String(apptDateObj.getUTCMinutes()).padStart(2, '0')}:00`;
                        }

                        return {
                            time: timeWithSec, // We assume timeWithSec is Local Time directly
                            rawTime,
                            time12h: formatTime12h(timeWithSec),
                            available: typeof slot === 'object' ? slot.available !== false : true,
                            utcDate,
                            utcTime,
                            scheduleId: typeof slot === 'object' ? (slot.scheduleId || slot.id) : undefined
                        };
                    })
                    .filter(Boolean);

                map[result.date] = convertedSlots.sort((a, b) => a.time.localeCompare(b.time));
            });

            setSlotsByDate(map);
            setLoadingSlots(false);
        });

        return () => { isMounted = false; };
    }, [selectedDoc, activeDates, selectedServiceIds]);

    const handleTreatmentClick = (serviceId) => {
        setSelectedServiceIds(prev => {
            if (prev.includes(serviceId)) {
                if (prev.length === 1) return prev;
                return prev.filter(id => id !== serviceId);
            }
            if (prev.length >= 2) return prev;
            return [...prev, serviceId];
        });
    };

    const handleSave = async () => {
        if (!selectedDoc || !selectedTime) return;
        setLoading(true);
        try {
            await createClinicAppointment({
                doctorId: selectedDoc,
                appointmentDate: selectedTime.utcDate || formatDateForApi(selectedDate),
                appointmentTime: selectedTime.utcTime || selectedTime.time,
                serviceIds: selectedServiceIds
            });
            onSaved();
        } catch (err) {
            console.error(err);
            const msg = err.message || "Failed to create appointment";
            const isAlreadyBooked = msg.toLowerCase().includes("already booked") || msg.toLowerCase().includes("overlap");
            setAlertConfig({
                open: true,
                title: isAlreadyBooked ? "Slot Already Booked" : "Unable to Schedule",
                message: isAlreadyBooked
                    ? "This appointment time slot is already reserved for this doctor or overlaps with another. Please choose a different slot."
                    : msg,
                type: isAlreadyBooked ? "warning" : "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];
    const selectedDateStr = formatDateForApi(selectedDate);
    const currentSlots = slotsByDate[selectedDateStr] || [];

    // Group slots by hour
    const groupedSlots = {};
    currentSlots.forEach(slot => {
        const hour = slot.time.split(':')[0];
        if (!groupedSlots[hour]) groupedSlots[hour] = [];
        groupedSlots[hour].push(slot);
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-[900px] mx-4 flex flex-col overflow-hidden animate-[scaleIn_0.2s_ease-out] max-h-[90vh]">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">{t('clinicAppointments.newModal.title')}</h2>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <CloseIcon />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">

                    {/* DOCTOR SELECTION */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">{t('clinicAppointments.newModal.selectDoctor')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {doctors.map((doc, idx) => (
                                <div
                                    key={doc.id}
                                    onClick={() => { setSelectedDoc(doc.id); }}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedDoc === doc.id ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[idx % colors.length]}`}>
                                        {doc.fullName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{doc.fullName}</h4>
                                        <p className="text-xs text-gray-500">{doc.specialty || 'General Practice'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cd-appointment-picker !p-0 !bg-transparent !shadow-none">
                        {/* 1. TREATMENT */}
                        <div className="cd-appointment-section">
                            <div className="cd-appointment-heading">
                                <span>{t('clinicAppointments.newModal.selectTreatment')}</span>
                            </div>
                            <div className="cd-treatment-list">
                                {filteredServices.length > 0 ? (
                                    filteredServices.map(treatment => {
                                        const selected = selectedServiceIds.includes(treatment.id);
                                        return (
                                            <button
                                                key={treatment.id}
                                                type="button"
                                                className={`cd-treatment-btn ${selected ? 'cd-treatment-selected' : ''}`}
                                                onClick={() => handleTreatmentClick(treatment.id)}
                                            >
                                                <span className="cd-treatment-radio">{selected ? '✓' : ''}</span>
                                                <span className="cd-treatment-name">{treatment.name}</span>
                                                <span className="cd-treatment-duration">{treatment.duration} min</span>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="text-sm text-slate-500 italic py-2">
                                        {services.length === 0 ? t('clinicAppointments.newModal.loadingServices') : t('clinicAppointments.newModal.noTreatments')}
                                    </div>
                                )}
                            </div>
                            {selectedServiceIds.length >= 2 && (
                                <div className="cd-treatment-limit">{t('clinicAppointments.newModal.maxTreatments')}</div>
                            )}
                        </div>

                        {/* 2. DATE SELECTOR */}
                        <div className="cd-appointment-section">
                            <div className="cd-appointment-heading">
                                <span>{t('clinicAppointments.newModal.selectDate')}</span>
                                <span className="cd-appointment-legend">
                                    <span><i className="cd-dot-selected"></i> {t('clinicAppointments.newModal.selected')}</span>
                                    <span><i className="cd-dot-available"></i> {t('clinicAppointments.newModal.available')}</span>
                                    <span><i className="cd-dot-booked"></i> {t('clinicAppointments.newModal.booked')}</span>
                                </span>
                            </div>
                            <div className="cd-date-selector">
                                {activeDates.map(date => {
                                    const dateStr = formatDateForApi(date);
                                    const isSelected = selectedDateStr === dateStr;
                                    const slots = slotsByDate[dateStr] || [];
                                    const availableCount = slots.filter(s => s.available).length;

                                    return (
                                        <button
                                            key={dateStr}
                                            type="button"
                                            className={`cd-date-btn ${isSelected ? 'cd-date-selected' : ''}`}
                                            onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                        >
                                            <span className="cd-date-top">{formatDateLabel(date).split(',')[0]}</span>
                                            <strong>{date.getDate()}</strong>
                                            <span className="cd-date-month">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                                            {availableCount > 0 && (
                                                <span className="cd-date-available">{availableCount} {t('clinicAppointments.newModal.slots')}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. TIME */}
                        <div className="cd-appointment-section">
                            <div className="cd-appointment-heading">
                                <span>{t('clinicAppointments.newModal.selectTime')}</span>
                                {loadingSlots && <span className="cd-loading-text">{t('clinicAppointments.newModal.loading')}</span>}
                            </div>

                            {!loadingSlots && currentSlots.length === 0 ? (
                                <div className="cd-no-slots">
                                    {t('clinicAppointments.newModal.noSlots')}
                                </div>
                            ) : (
                                <div className="cd-hour-list">
                                    {Object.entries(groupedSlots)
                                        .sort(([a], [b]) => a.localeCompare(b))
                                        .map(([hour, slots]) => (
                                            <div key={hour} className="cd-hour-row">
                                                <div className="cd-hour-label">
                                                    <strong>{formatTime12h(`${hour}:00`)}</strong>
                                                    <span>{slots.filter(s => s.available).length} {t('clinicAppointments.newModal.slotsFree')}</span>
                                                </div>
                                                <div className="cd-hour-slots">
                                                    {[0, 15, 30, 45].map(minute => {
                                                        const minuteString = String(minute).padStart(2, '0');
                                                        const slot = slots.find(s => s.time.startsWith(`${hour}:${minuteString}`));
                                                        if (!slot) return <div key={minute} className="cd-slot-empty" />;

                                                        const isSelected = selectedTime?.time === slot.time;
                                                        return (
                                                            <button
                                                                key={minute}
                                                                type="button"
                                                                disabled={!slot.available}
                                                                className={`cd-new-slot ${isSelected ? 'cd-new-slot-selected' : slot.available ? 'cd-new-slot-available' : 'cd-new-slot-booked'}`}
                                                                onClick={() => slot.available && setSelectedTime({ date: selectedDateStr, time: slot.time, utcDate: slot.utcDate, utcTime: slot.utcTime, rawTime: slot.rawTime })}
                                                            >
                                                                <span>{slot.time12h}</span>
                                                                {!slot.available && <small>{t('clinicAppointments.newModal.booked')}</small>}
                                                                {slot.available && !isSelected && <small>{t('clinicAppointments.newModal.available')}</small>}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-gray-200 flex justify-end gap-3 bg-white">
                    <button onClick={onClose} disabled={loading} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border border-gray-300 shadow-sm">
                        {t('clinicAppointments.newModal.cancel')}
                    </button>
                    <button disabled={!selectedTime || loading} onClick={handleSave} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md disabled:opacity-50 transition-all cursor-pointer">
                        {loading ? t('clinicAppointments.newModal.saving') : t('clinicAppointments.newModal.schedule')}
                    </button>
                </div>
            </div>
            <ModernAlertModal
                isOpen={alertConfig.open}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={() => setAlertConfig(prev => ({ ...prev, open: false }))}
            />
        </div>
    );
}




function ChevronLeftIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>; }
function ChevronRightIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>; }
function CloseIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>; }

function DoctorToggle({ name, color, checked, onChange }) {
    return (
        <label className="flex items-center justify-between px-2 py-1.5 cursor-pointer group">
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{name}</span>
            </div>
            <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <div className={`w-9 h-5 rounded-full relative transition-colors flex items-center ${checked ? color : 'bg-gray-200'}`}>
                <div className={`absolute left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${checked ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
            </div>
        </label>
    );
}

function TrashIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    );
}


```
`src\pages\clinic\components\ClinicDoctors.jsx`:

```jsx
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { UserPlus, Mail, Stethoscope, Info, Send, ChevronDown, RefreshCw, Check } from 'lucide-react';
import {
    fetchDoctors,
    fetchSpecialties,
    addDoctor,
    updateDoctor,
    toggleDoctorStatus,
    deleteDoctor,
    fetchDoctorSchedule,
    saveDoctorSchedule,
    deleteDoctorScheduleDate,
} from "../../../api/clinicDoctorsApi";
import { fetchClinicHours } from "../../../api/clinicProfileApi";
import { utcToLocalRecurring } from "../../../utils/timezone";
import ModernAlertModal from "../../../components/ModernAlertModal";
import { AddDoctorModal } from "../../../components/doctors/AddDoctorModal";

/**
 * ClinicDoctors – Doctor Management page
 *
 * Displays doctor cards in a responsive grid.
 * Supports:
 *   • Add New Doctor     → profile modal (empty)
 *   • Edit Profile       → profile modal (pre-filled)
 *   • Manage Working Hrs → schedule modal
 *   • Activate / Deactivate toggle
 */
export default function ClinicDoctors() {
    const { t } = useTranslation();
    // ── State ────────────────────────────────────────────────────────────────
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [clinicHours, setClinicHours] = useState([]);
    const [loading, setLoading] = useState(true);

    // Which card's 3-dot menu is open (doctorId or null)
    const [openMenuId, setOpenMenuId] = useState(null);

    // Add Doctor modal
    const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);

    // Profile modal (edit)
    const [profileModal, setProfileModal] = useState({
        open: false,
        editingDoctor: null, // null → add mode
    });

    // Working-hours modal
    const [scheduleModal, setScheduleModal] = useState({
        open: false,
        doctorId: null,
        doctorName: "",
        schedule: [],
    });

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        doctor: null,
    });

    const [alertModal, setAlertModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "error"
    });

    const showAlert = (message, title = "Action Failed", type = "error") => {
        setAlertModal({ open: true, title, message, type });
    };

    // ── Load data on mount ───────────────────────────────────────────────────
    useEffect(() => {
        async function load() {
            try {
                const [docs, specs, hoursData] = await Promise.all([
                    fetchDoctors(),
                    fetchSpecialties(),
                    fetchClinicHours(),
                ]);

                const localHours = hoursData.map(h => {
                    if (!h.startTime || !h.endTime) return null;
                    return {
                        dayOfWeek: h.dayOfWeek,
                        startTime: h.startTime.substring(0, 5),
                        endTime: h.endTime.substring(0, 5)
                    };
                }).filter(Boolean);

                setDoctors(docs);
                setSpecialties(specs);
                setClinicHours(localHours);
            } catch (err) {
                console.error("Failed to load doctors:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Close 3-dot menu on outside click
    useEffect(() => {
        function handleClick() {
            setOpenMenuId(null);
        }
        if (openMenuId) {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        }
    }, [openMenuId]);

    // ── Handlers ─────────────────────────────────────────────────────────────

    async function refreshDoctors() {
        try {
            const docs = await fetchDoctors();
            setDoctors(docs);
        } catch (err) {
            console.error("Failed to refresh doctors:", err);
        }
    }

    function openAddDoctor() {
        setIsAddDoctorModalOpen(true);
    }

    function openEditDoctor(doctor) {
        setOpenMenuId(null);
        setProfileModal({ open: true, editingDoctor: doctor });
    }

    async function handleProfileSave({ fullName, email, specialty, bio }) {
        try {
            if (profileModal.editingDoctor) {
                const updated = await updateDoctor(profileModal.editingDoctor.id, {
                    fullName,
                    email,
                    specialty,
                    bio,
                });
                setDoctors((prev) =>
                    prev.map((d) =>
                        d.id === updated.id ? { ...d, ...updated } : d
                    )
                );
            } else {
                const created = await addDoctor({ fullName, specialty, bio });
                setDoctors((prev) => [...prev, created]);
            }
            setProfileModal({ open: false, editingDoctor: null });
        } catch (err) {
            console.error("Save failed:", err);
            showAlert(err.message, "Save Failed", "error");
        }
    }

    async function handleToggleStatus(doctor) {
        setOpenMenuId(null);
        try {
            const nextActive = !doctor.isActive;
            const result = await toggleDoctorStatus(doctor.id, nextActive);
            const resolvedActive = result?.isActive !== undefined ? result.isActive : nextActive;
            setDoctors((prev) =>
                prev.map((d) =>
                    d.id === doctor.id ? { ...d, isActive: resolvedActive } : d
                )
            );
        } catch (err) {
            console.error("Toggle status failed:", err);
            showAlert(err.message, "Status Update Failed", "error");
        }
    }

    function handleDeleteDoctor(doctor) {
        setOpenMenuId(null);
        setDeleteModal({ open: true, doctor });
    }

    async function confirmDelete() {
        if (deleteModal.doctor) {
            try {
                await deleteDoctor(deleteModal.doctor.id);
                setDoctors((prev) => prev.filter((d) => d.id !== deleteModal.doctor.id));
            } catch (err) {
                console.error("Failed to delete doctor:", err);
                showAlert(err.message, "Delete Failed", "error");
            }
        }
        setDeleteModal({ open: false, doctor: null });
    }

    async function openScheduleModal(doctor) {
        setOpenMenuId(null);
        try {
            const schedule = await fetchDoctorSchedule(doctor.id);
            setScheduleModal({
                open: true,
                doctorId: doctor.id,
                doctorName: doctor.fullName,
                schedule,
            });
        } catch (err) {
            console.error("Failed to load schedule:", err);
        }
    }

    function handleDayToggle(dayIndex) {
        setScheduleModal((prev) => {
            const updatedSchedule = prev.schedule.map((day, di) => {
                if (di !== dayIndex) return day;

                // Get default bounds based on clinic hours
                const [year, month, dayNum] = day.isoDate.split('-');
                const dateObj = new Date(year, month - 1, dayNum);
                const javaDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
                const dayOfWeekStr = javaDays[dateObj.getDay()];
                const clinicDay = clinicHours.find(h => h.dayOfWeek === dayOfWeekStr);

                const defaultStart = clinicDay ? clinicDay.startTime.substring(0, 5) : "09:00";
                const defaultEnd = clinicDay ? clinicDay.endTime.substring(0, 5) : "17:00";

                return {
                    ...day,
                    isActive: !day.isActive,
                    startTime: !day.isActive && !day.startTime ? defaultStart : day.startTime,
                    endTime: !day.isActive && !day.endTime ? defaultEnd : day.endTime,
                };
            });
            return { ...prev, schedule: updatedSchedule };
        });
    }

    function handleTimeChange(dayIndex, field, value) {
        setScheduleModal((prev) => {
            const updatedSchedule = prev.schedule.map((day, di) => {
                if (di !== dayIndex) return day;
                return { ...day, [field]: value };
            });
            return { ...prev, schedule: updatedSchedule };
        });
    }

    async function handleScheduleSave() {
        try {
            const savePromises = scheduleModal.schedule.map(day => {
                const specificDateStr = day.isoDate;

                if (day.isActive && day.startTime && day.endTime) {
                    // Append :00 to match LocalTime expected format
                    const startTimeStr = day.startTime.length === 5 ? `${day.startTime}:00` : day.startTime;
                    const endTimeStr = day.endTime.length === 5 ? `${day.endTime}:00` : day.endTime;
                    return saveDoctorSchedule(scheduleModal.doctorId, specificDateStr, startTimeStr, endTimeStr);
                } else {
                    // Delete the schedule for this day if it's marked inactive
                    // Catch errors in case it doesn't exist on the backend yet
                    return deleteDoctorScheduleDate(scheduleModal.doctorId, specificDateStr, day.startTime, day.endTime).catch(() => { });
                }
            });

            await Promise.all(savePromises);
            setScheduleModal({ open: false, doctorId: null, doctorName: "", schedule: [] });
            // Optionally could show a success toast here
        } catch (err) {
            console.error("Failed to save schedule:", err);
            showAlert(err.message, "Failed to Save Schedule", "error");
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────

    const totalDoctors = doctors.length;

    return (
        <div className="p-8 lg:p-10 max-w-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-3xl lg:text-[2.2rem] font-bold text-gray-900 tracking-tight">
                        {t('clinicDoctors.title')}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {t('clinicDoctors.subtitle')}
                    </p>
                </div>
                <button
                    onClick={openAddDoctor}
                    className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-blue-900/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/30 cursor-pointer whitespace-nowrap"
                >
                    <PlusIcon />
                    {t('clinicDoctors.addNewDoctor')}
                </button>
            </div>

            {/* Doctor cards grid */}
            {loading ? (
                <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
                    {t('clinicDoctors.loading')}
                </div>
            ) : doctors.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-gray-400">
                    <p className="text-sm">{t('clinicDoctors.noDoctors')}</p>
                    <button
                        onClick={openAddDoctor}
                        className="mt-3 text-blue-600 text-sm font-medium hover:underline cursor-pointer"
                    >
                        {t('clinicDoctors.addFirst')}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {doctors.map((doc) => (
                        <DoctorCard
                            key={doc.id}
                            doctor={doc}
                            isMenuOpen={openMenuId === doc.id}
                            onToggleMenu={(e) => {
                                e.stopPropagation();
                                setOpenMenuId((prev) => (prev === doc.id ? null : doc.id));
                            }}
                            onEdit={() => openEditDoctor(doc)}
                            onManageHours={() => openScheduleModal(doc)}
                            onToggleStatus={() => handleToggleStatus(doc)}
                            onDelete={() => handleDeleteDoctor(doc)}
                        />
                    ))}
                </div>
            )}

            {/* ─── Add Doctor Modal ─── */}
            <AddDoctorModal
                isOpen={isAddDoctorModalOpen}
                onClose={() => setIsAddDoctorModalOpen(false)}
                onSuccess={refreshDoctors}
                specialties={specialties}
            />

            {/* ─── Profile Modal (Edit) ─── */}
            {profileModal.open && (
                <ProfileModal
                    doctor={profileModal.editingDoctor}
                    specialties={specialties}
                    onSave={handleProfileSave}
                    onClose={() => setProfileModal({ open: false, editingDoctor: null })}
                />
            )}

            {/* ─── Working Hours Modal ─── */}
            {scheduleModal.open && (
                <ScheduleModal
                    doctorName={scheduleModal.doctorName}
                    schedule={scheduleModal.schedule}
                    clinicHours={clinicHours}
                    onDayToggle={handleDayToggle}
                    onTimeChange={handleTimeChange}
                    onSave={handleScheduleSave}
                    onClose={() =>
                        setScheduleModal({ open: false, doctorId: null, doctorName: "", schedule: [] })
                    }
                />
            )}

            {/* ─── Delete Confirm Modal ─── */}
            {deleteModal.open && (
                <ConfirmModal
                    title={t('clinicDoctors.deleteModal.title')}
                    message={t('clinicDoctors.deleteModal.message')}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteModal({ open: false, doctor: null })}
                />
            )}

            {/* ─── Modern Alert Modal ─── */}
            <ModernAlertModal
                isOpen={alertModal.open}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
                onClose={() => setAlertModal(prev => ({ ...prev, open: false }))}
            />
        </div>
    );
}


/* ══════════════════════════════════════════════════════════════════════════════
   Sub-components
   ══════════════════════════════════════════════════════════════════════════════ */

/** ─── Doctor Card ─── */
function DoctorCard({ doctor, isMenuOpen, onToggleMenu, onEdit, onManageHours, onToggleStatus, onDelete }) {
    const { t } = useTranslation();
    const menuRef = useRef(null);

    return (
        <div className={`relative bg-white rounded-2xl border p-5 transition-all duration-300 group ${doctor.isActive
            ? "border-gray-200/80 hover:shadow-lg hover:shadow-gray-200/60"
            : "border-gray-200/60 bg-gray-50/40 hover:shadow-md"
            }`}>
            {/* Top row: avatar + name + menu */}
            <div className="flex items-start gap-3">
                <DoctorAvatar doctor={doctor} />
                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold leading-tight ${doctor.isActive ? "text-gray-900" : "text-gray-500"}`}>
                        {doctor.fullName}
                    </h3>
                    <p className="text-xs font-medium text-amber-700 mt-0.5">
                        {doctor.specialty}
                    </p>
                </div>
                {/* 3-dot menu trigger */}
                <button
                    ref={menuRef}
                    onClick={onToggleMenu}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                    <ThreeDotsIcon />
                </button>
            </div>

            {/* Bio excerpt */}
            <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                {doctor.bio}
            </p>

            {/* Status badge */}
            <div className="mt-4">
                <StatusBadge isActive={doctor.isActive} />
            </div>

            {/* Dropdown menu */}
            {isMenuOpen && (
                <div className="absolute right-4 top-14 z-20 bg-white rounded-xl shadow-xl shadow-gray-200/80 border border-gray-100 py-1.5 min-w-[180px] animate-[fadeIn_0.15s_ease-out]">
                    <DropdownItem
                        icon={<EditIcon />}
                        label={t('clinicDoctors.actions.edit')}
                        onClick={onEdit}
                    />
                    <DropdownItem
                        icon={<ClockIcon />}
                        label={t('clinicDoctors.actions.manageHours')}
                        onClick={onManageHours}
                    />
                    <div className="mx-3 my-1 border-t border-gray-100" />
                    <DropdownItem
                        icon={doctor.isActive ? <DeactivateIcon /> : <ActivateIcon />}
                        label={doctor.isActive ? t('clinicDoctors.actions.deactivate') : t('clinicDoctors.actions.activate')}
                        onClick={onToggleStatus}
                        danger={doctor.isActive}
                    />
                    <DropdownItem
                        icon={<TrashIcon />}
                        label={t('clinicDoctors.actions.delete')}
                        onClick={onDelete}
                        danger={true}
                    />
                </div>
            )}
        </div>
    );
}

/** ─── Doctor Avatar ─── */
function DoctorAvatar({ doctor, size = 44 }) {
    if (doctor.avatarUrl) {
        return (
            <img
                src={doctor.avatarUrl}
                alt={doctor.fullName}
                className="rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
                style={{ width: size, height: size }}
            />
        );
    }

    const colors = [
        "bg-blue-100 text-blue-700",
        "bg-emerald-100 text-emerald-700",
        "bg-amber-100 text-amber-700",
        "bg-violet-100 text-violet-700",
        "bg-rose-100 text-rose-700",
        "bg-cyan-100 text-cyan-700",
    ];
    const colorIndex =
        doctor.fullName.split("").reduce((s, c) => s + c.charCodeAt(0), 0) % colors.length;

    const initials = doctor.initials || doctor.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

    return (
        <div
            className={`rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colors[colorIndex]}`}
            style={{ width: size, height: size }}
        >
            {initials}
        </div>
    );
}

/** ─── Status Badge ─── */
function StatusBadge({ isActive }) {
    const { t } = useTranslation();
    return (
        <span
            className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200
                ${isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                }
            `}
        >
            <span
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${isActive ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-gray-400"
                    }`}
            />
            {isActive ? t('clinicDoctors.status.active') : t('clinicDoctors.status.inactive')}
        </span>
    );
}

/** ─── Dropdown Item ─── */
function DropdownItem({ icon, label, onClick, danger = false }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium transition-colors cursor-pointer
                ${danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                }
            `}
        >
            {icon}
            {label}
        </button>
    );
}


/* ══════════════════════════════════════════════════════════════════════════════
   Modals
   ══════════════════════════════════════════════════════════════════════════════ */

/** ─── Profile Modal (Add / Edit Doctor) ─── */
/** ─── Profile Modal (Add / Edit Doctor) ─── */
function ProfileModal({ doctor, specialties, onSave, onClose }) {
    const { t } = useTranslation();
    const isEdit = !!doctor?.fullName;
    const [fullName, setFullName] = useState(doctor?.fullName || "");
    const [email, setEmail] = useState(doctor?.email || "");

    const [selectedSpecialties, setSelectedSpecialties] = useState(() => {
        if (doctor?.specialty) {
            return doctor.specialty.split(',').map(s => s.trim()).filter(Boolean);
        }
        return [];
    });

    const [bio, setBio] = useState(doctor?.bio || "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!fullName.trim()) return;
        if (selectedSpecialties.length === 0) {
            setError(t('clinicDoctors.profileModal.selectSpecialty'));
            return;
        }

        setSaving(true);
        await onSave({ fullName: fullName.trim(), email: email.trim(), specialty: selectedSpecialties.join(', '), bio: bio.trim() });
        setSaving(false);
    }

    return (
        <ModalBackdrop onClose={onClose}>
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[16px] shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden animate-[scaleIn_0.2s_ease-out]"
            >
                {/* Header */}
                <div className="flex items-start justify-between p-7 pb-5">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
                            <UserPlus className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-bold text-slate-900">{isEdit ? t('clinicDoctors.profileModal.editTitle') : t('clinicDoctors.profileModal.addTitle')}</h2>
                            <p className="text-xs text-slate-500 mt-0.5">{t('clinicDoctors.profileModal.subtitle')}</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                        <CloseIcon />
                    </button>
                </div>

                <div className="px-7 py-2 flex flex-col gap-5">
                    {/* Full Name */}
                    <label className="block">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">{t('clinicDoctors.profileModal.fullName')} <span className="text-red-500">*</span></span>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <UserPlus className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                                placeholder="Dr. Tariq Haddad"
                                required
                            />
                        </div>
                    </label>

                    {/* Email Address */}
                    {/* Email Address */}
                    <div className="block">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">{t('clinicDoctors.profileModal.email')} <span className="text-red-500">*</span></span>
                            {!isEdit && (
                                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold">
                                    <RefreshCw className="w-3 h-3" />
                                    {t('clinicDoctors.profileModal.autoNotification')}
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-500">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-blue-200 bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder:text-slate-400"
                                placeholder="tariq.haddad@gmail.com"
                                required
                            />
                        </div>
                        {!isEdit && (
                            <div className="mt-2 text-[10px] text-blue-700/90 flex items-start gap-1.5">
                                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span className="font-medium leading-relaxed">
                                    <span className="font-bold">{t('clinicDoctors.profileModal.emailNotice')}</span> {t('clinicDoctors.profileModal.emailNoticeDesc')}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Specialty - Checkboxes as requested */}
                    <div className="block">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">{t('clinicDoctors.profileModal.specialty')} <span className="text-red-500">*</span></span>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {(specialties?.length > 0 ? specialties : ['Orthodontics', 'General Dentistry', 'Pediatric Dentistry', 'Endodontics', 'Oral Surgery']).map(spec => {
                                const isSelected = selectedSpecialties.includes(spec);
                                return (
                                    <button
                                        key={spec}
                                        type="button"
                                        onClick={() => {
                                            setSelectedSpecialties(prev =>
                                                prev.includes(spec) ? prev.filter(x => x !== spec) : [...prev, spec]
                                            );
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isSelected
                                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                            } flex items-center gap-1.5 cursor-pointer`}
                                    >
                                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-white'}`}>
                                            {isSelected && (
                                                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                            )}
                                        </div>
                                        {spec}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bio */}
                    <label className="block mb-2">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">{t('clinicDoctors.profileModal.bio')}</span>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                            placeholder="Specialist in clear aligners and orthodontic diagnostics with 7+ years of clinical practice in Amman."
                        />
                    </label>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                            <Info className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-7 pt-4 flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] text-slate-500 font-medium leading-tight max-w-[140px]">{t('clinicDoctors.profileModal.onboardingNote')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-[11px] font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            {t('clinicDoctors.profileModal.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold text-white bg-[#2563eb] rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                        >
                            <Send className="w-3.5 h-3.5" />
                            {saving ? t('clinicDoctors.profileModal.saving') : (isEdit ? t('clinicDoctors.profileModal.saveChanges') : t('clinicDoctors.profileModal.addAndSend'))}
                        </button>
                    </div>
                </div>
            </form>
        </ModalBackdrop>
    );
}


function generateTimeOptions(minTime, maxTime) {
    const options = [];
    let startHour = 0;
    let endHour = 23;

    if (minTime) {
        startHour = parseInt(minTime.split(":")[0], 10);
    }
    if (maxTime) {
        endHour = parseInt(maxTime.split(":")[0], 10);
    }

    for (let h = startHour; h <= endHour; h++) {
        const hourStr = h.toString().padStart(2, '0');
        const timeVal = `${hourStr}:00`;
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayHour = h % 12 || 12;
        const displayStr = `${displayHour.toString().padStart(2, '0')}:00 ${ampm}`;
        options.push({ value: timeVal, label: displayStr });
    }
    return options;
}

/** ─── Schedule / Working Hours Modal ─── */
function ScheduleModal({ doctorName, schedule, clinicHours, onDayToggle, onTimeChange, onSave, onClose }) {
    const { t } = useTranslation();
    return (
        <ModalBackdrop onClose={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] mx-4 p-7 animate-[scaleIn_0.2s_ease-out] flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">{t('clinicDoctors.scheduleModal.title')}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {schedule.map((day, dayIndex) => {
                        const [year, month, dayNum] = day.isoDate.split('-');
                        const dateObj = new Date(year, month - 1, dayNum);
                        const javaDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
                        const dayOfWeekStr = javaDays[dateObj.getDay()];
                        const clinicDay = clinicHours.find(h => h.dayOfWeek === dayOfWeekStr);
                        const isClinicClosed = !clinicDay;

                        const minTime = clinicDay ? clinicDay.startTime.substring(0, 5) : undefined;
                        const maxTime = clinicDay ? clinicDay.endTime.substring(0, 5) : undefined;
                        const timeOptions = generateTimeOptions(minTime, maxTime);

                        return (
                            <div
                                key={day.dayLabel}
                                className={`rounded-xl border ${day.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50/50'} p-5 transition-colors`}
                            >
                                {/* Day Header (Label + Toggle) */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-base font-bold ${day.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {day.dayLabel}
                                        {isClinicClosed && <span className="ml-2 text-xs text-red-500 font-normal">({t('clinicDoctors.scheduleModal.clinicClosed')})</span>}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-medium ${day.isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                                            {day.isActive ? t('clinicDoctors.scheduleModal.active') : t('clinicDoctors.scheduleModal.inactive')}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={isClinicClosed}
                                            onClick={() => onDayToggle(dayIndex)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 ${isClinicClosed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${day.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                                        >
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${day.isActive ? 'translate-x-5' : 'translate-x-0'}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Time Inputs */}
                                <div className="flex gap-4">
                                    {/* Start Time */}
                                    <div className="flex-1">
                                        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                                            <ClockIconSmall /> {t('clinicDoctors.scheduleModal.startTime')}
                                        </label>
                                        <div className="relative">
                                            <select
                                                disabled={!day.isActive || isClinicClosed}
                                                value={day.startTime || ""}
                                                onChange={(e) => onTimeChange(dayIndex, 'startTime', e.target.value)}
                                                className={`w-full appearance-none rounded-lg border ${day.isActive ? 'border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer' : 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'} px-3 py-2.5 text-sm transition-all outline-none`}
                                            >
                                                {!day.startTime && <option value="" disabled>{t('clinicDoctors.scheduleModal.selectTime')}</option>}
                                                {timeOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <ChevronDownIcon className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 ${day.isActive && !isClinicClosed ? 'text-gray-500' : 'text-gray-300'}`} />
                                        </div>
                                    </div>
                                    {/* End Time */}
                                    <div className="flex-1">
                                        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1.5">
                                            <ClockIconSmall /> {t('clinicDoctors.scheduleModal.endTime')}
                                        </label>
                                        <div className="relative">
                                            <select
                                                disabled={!day.isActive || isClinicClosed}
                                                value={day.endTime || ""}
                                                onChange={(e) => onTimeChange(dayIndex, 'endTime', e.target.value)}
                                                className={`w-full appearance-none rounded-lg border ${day.isActive ? 'border-gray-300 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer' : 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'} px-3 py-2.5 text-sm transition-all outline-none`}
                                            >
                                                {!day.endTime && <option value="" disabled>{t('clinicDoctors.scheduleModal.selectTime')}</option>}
                                                {timeOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <ChevronDownIcon className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 ${day.isActive && !isClinicClosed ? 'text-gray-500' : 'text-gray-300'}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onSave}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0f3460] rounded-lg hover:bg-[#1a4a85] transition-colors shadow-md cursor-pointer"
                    >
                        {t('clinicDoctors.scheduleModal.saveChanges')}
                    </button>
                </div>
            </div>
        </ModalBackdrop>
    );
}

function ClockIconSmall() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

/** ─── Delete Confirm Modal ─── */
function ConfirmModal({ title, message, onConfirm, onCancel }) {
    const { t } = useTranslation();
    return (
        <ModalBackdrop onClose={onCancel}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] mx-4 p-6 animate-[scaleIn_0.2s_ease-out]"
            >
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                        <TrashIcon />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{message}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        {t('clinicDoctors.deleteModal.cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md shadow-red-200 cursor-pointer"
                    >
                        {t('clinicDoctors.deleteModal.confirm')}
                    </button>
                </div>
            </div>
        </ModalBackdrop>
    );
}


/** ─── Modal Backdrop ─── */
function ModalBackdrop({ onClose, children }) {
    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-[2px] animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
        >
            <div className="flex min-h-full items-center justify-center p-4">
                {children}
            </div>
        </div>
    );
}


/* ══════════════════════════════════════════════════════════════════════════════
   Icons (inline SVG)
   ══════════════════════════════════════════════════════════════════════════════ */

function PlusIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function ThreeDotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function DeactivateIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    );
}

function ActivateIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function ChevronDownIcon({ className }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function PlusCircleIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    );
}
```
`src\pages\clinic\components\ClinicInsurances.jsx`:

```jsx
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ShieldCheck,
    ShieldPlus,
    Building2,
    Layers,
    Phone,
    Globe,
    Zap,
    Percent,
    Receipt,
    CheckCircle2,
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    X,
    Check
} from 'lucide-react';

import { fetchInsurances, addInsurance, updateInsurance, deleteInsurance } from '../../../api/clinicInsuranceApi';

const COLOR_PALETTES = [
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-emerald-100", text: "text-emerald-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-teal-100", text: "text-teal-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-rose-100", text: "text-rose-700" },
];

function generateCode(name) {
    if (!name) return "INS";
    const match = name.match(/\(([^)]+)\)/);
    if (match && match[1]) {
        return match[1].trim().slice(0, 4).toUpperCase();
    }
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].slice(0, 3).toUpperCase();
    }
    return words.map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

/**
 * Validates Jordanian mobile numbers:
 * Must strictly start with 078, 079, or 077 and have exactly 10 digits.
 */
function validateJordanianPhone(phoneStr) {
    if (!phoneStr || !phoneStr.trim()) {
        return { isValid: false, error: "Phone number is required" };
    }
    const cleaned = phoneStr.replace(/[\s\-()]/g, "");

    // Check if it starts with 077, 078, or 079 and is 10 digits
    const regex = /^(077|078|079)\d{7}$/;
    if (!regex.test(cleaned)) {
        return {
            isValid: false,
            error: "Phone number must start with 078, 079, or 077 (10 digits)"
        };
    }
    return { isValid: true, cleaned, error: "" };
}

/**
 * Validates Co-Pay number: must be numbers only (0-100)
 */
function validateCopayNumber(copayStr) {
    if (!copayStr || !String(copayStr).trim()) {
        return { isValid: false, error: "Co-pay percentage is required" };
    }
    const cleaned = String(copayStr).replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num) || num < 0 || num > 100) {
        return { isValid: false, error: "Co-pay must be a number between 0 and 100" };
    }
    return { isValid: true, value: num, error: "" };
}

export default function ClinicInsurances() {
    const { t } = useTranslation();
    const [insurances, setInsurances] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    React.useEffect(() => {
        loadInsurances();
    }, []);

    const loadInsurances = async () => {
        try {
            setIsLoading(true);
            const data = await fetchInsurances();
            setInsurances(data);
        } catch (error) {
            showToast("Error", "Failed to load insurances");
        } finally {
            setIsLoading(false);
        }
    };
    const [openMenuId, setOpenMenuId] = useState(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        coverageTier: "",
        copay: "",
        phone: "",
        portalUrl: "",
        instantPreApproval: false,
    });
    const [errors, setErrors] = useState({});

    // Toast State
    const [toast, setToast] = useState(null);

    const showToast = (title, message) => {
        setToast({ title, message });
        setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    const handleOpenModal = (item = null) => {
        setOpenMenuId(null);
        setErrors({});
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name || "",
                coverageTier: item.coverageTier || "",
                copay: item.copay ? String(item.copay).replace(/[^0-9.]/g, "") : "",
                phone: item.phone || "",
                portalUrl: item.portalUrl || "",
                instantPreApproval: item.instantPreApproval ?? true,
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                coverageTier: "",
                copay: "", // Starts completely empty / blank
                phone: "",
                portalUrl: "",
                instantPreApproval: false,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setErrors({});
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.name.trim()) {
            validationErrors.name = "Insurance company name is required";
        }

        if (!formData.coverageTier.trim()) {
            validationErrors.coverageTier = "Coverage tiers are required";
        }

        const copayCheck = validateCopayNumber(formData.copay);
        if (!copayCheck.isValid) {
            validationErrors.copay = copayCheck.error;
        }

        const phoneCheck = validateJordanianPhone(formData.phone);
        if (!phoneCheck.isValid) {
            validationErrors.phone = phoneCheck.error;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formattedCopay = `${copayCheck.value}% Standard`;
        const formattedPhone = phoneCheck.cleaned;

        try {
            if (editingItem) {
                // Update existing
                const updatePayload = {
                    name: formData.name.trim(),
                    coverageTier: formData.coverageTier.trim(),
                    copay: formattedCopay,
                    phone: formattedPhone,
                    portalUrl: formData.portalUrl.trim(),
                    instantPreApproval: formData.instantPreApproval,
                    directBillingType: formData.instantPreApproval ? "Instant Pre-approval" : "Online Portal",
                    network: editingItem.network,
                    code: editingItem.code,
                    badgeBg: editingItem.badgeBg,
                    badgeText: editingItem.badgeText,
                    status: editingItem.status,
                };

                await updateInsurance(editingItem.id, updatePayload);
                showToast("Insurance Updated", `"${formData.name}" has been successfully updated.`);
            } else {
                // Create new
                const paletteIndex = insurances.length % COLOR_PALETTES.length;
                const chosenPalette = COLOR_PALETTES[paletteIndex];
                const newCode = generateCode(formData.name);

                const newPayload = {
                    name: formData.name.trim(),
                    network: formData.name.includes("(") ? formData.name.split("(")[0].trim() : "Healthcare Network",
                    code: newCode,
                    badgeBg: chosenPalette.bg,
                    badgeText: chosenPalette.text,
                    coverageTier: formData.coverageTier.trim(),
                    copay: formattedCopay,
                    phone: formattedPhone,
                    portalUrl: formData.portalUrl.trim(),
                    instantPreApproval: formData.instantPreApproval,
                    directBillingType: formData.instantPreApproval ? "Instant Pre-approval" : "Online Portal",
                    status: "Active Agreement",
                };

                await addInsurance(newPayload);
                showToast("Insurance Added", `"${formData.name}" has been added successfully.`);
            }

            // Reload the list
            await loadInsurances();
            handleCloseModal();
        } catch (error) {
            setErrors({ submit: error.message });
            showToast("Error", error.message);
        }
    };

    const handleDelete = async (id) => {
        const itemToDelete = insurances.find(i => i.id === id);
        try {
            await deleteInsurance(id);
            await loadInsurances();
            setOpenMenuId(null);
            showToast("Insurance Removed", itemToDelete ? `"${itemToDelete.name}" was removed.` : "Insurance company removed.");
        } catch (error) {
            showToast("Error", "Failed to delete insurance");
        }
    };

    // Filter partners based on search query
    const filteredInsurances = useMemo(() => {
        if (!searchQuery.trim()) return insurances;
        const query = searchQuery.toLowerCase();
        return insurances.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.network?.toLowerCase().includes(query) ||
            item.coverageTier?.toLowerCase().includes(query) ||
            item.code?.toLowerCase().includes(query) ||
            item.phone?.includes(query)
        );
    }, [insurances, searchQuery]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* ─── Breadcrumb & Main Header (Cleaned up text) ─── */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-1">
                        <span>{t('clinicInsurances.breadcrumb.profile')}</span>
                        <span className="text-gray-300 font-normal">/</span>
                        <span className="text-blue-500">{t('clinicInsurances.breadcrumb.affiliations')}</span>
                    </div>
                    <h1 className="text-3xl lg:text-[2.2rem] font-bold text-gray-900 tracking-tight">
                        {t('clinicInsurances.title')}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {t('clinicInsurances.subtitle')}
                    </p>
                </div>

                {/* Right Header Actions */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder={t('clinicInsurances.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all placeholder:text-gray-400 text-gray-800"
                        />
                    </div>

                    {/* Add Insurance Company Button */}
                    <button
                        type="button"
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-blue-900/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/30 cursor-pointer whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{t('clinicInsurances.addInsurance')}</span>
                    </button>
                </div>
            </div>

            {/* ─── Top 3 Summary KPI Cards ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {/* Active Providers Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs flex items-center justify-between transition-all hover:shadow-xs">
                    <div>
                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                            {t('clinicInsurances.kpi.activeProviders')}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {insurances.length} {t('clinicInsurances.kpi.companies')}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-2 text-emerald-600 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>{t('clinicInsurances.kpi.verifiedClaims')}</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                    </div>
                </div>

                {/* Direct Billing Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs flex items-center justify-between transition-all hover:shadow-xs">
                    <div>
                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                            {t('clinicInsurances.kpi.directBilling')}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {t('clinicInsurances.kpi.enabled')}
                        </h3>
                        <p className="text-xs font-medium text-gray-400 mt-2">
                            {t('clinicInsurances.kpi.portalSynced')}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                        <Receipt className="w-6 h-6 stroke-[1.8]" />
                    </div>
                </div>

                {/* Default Co-Pay Rate Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs flex items-center justify-between transition-all hover:shadow-xs">
                    <div>
                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                            {t('clinicInsurances.kpi.copayRate')}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            10% – 20%
                        </h3>
                        <p className="text-xs font-medium text-gray-400 mt-2">
                            {t('clinicInsurances.kpi.basedOnTier')}
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <Percent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                </div>
            </div>

            {/* ─── Accepted Insurance Partners Section (Cleaned text) ─── */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">
                        {t('clinicInsurances.partners.title')}
                    </h2>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredInsurances.map((partner) => (
                        <div
                            key={partner.id}
                            className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between relative group"
                        >
                            <div>
                                {/* Card Header */}
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-11 h-11 rounded-xl ${partner.badgeBg || "bg-blue-100"} ${partner.badgeText || "text-blue-700"
                                                } flex items-center justify-center font-bold text-sm tracking-wider shrink-0 shadow-2xs`}
                                        >
                                            {partner.code || "INS"}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base leading-snug">
                                                {partner.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 font-medium">
                                                {partner.network || t('clinicInsurances.partners.healthPartner')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 3-dot Action Menu */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenuId(openMenuId === partner.id ? null : partner.id)
                                            }
                                            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                            title="More options"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>

                                        {openMenuId === partner.id && (
                                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 animate-[fadeIn_0.15s_ease-out]">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        handleOpenModal(partner);
                                                    }}
                                                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>{t('clinicInsurances.actions.edit')}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        handleDelete(partner.id);
                                                    }}
                                                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                                    <span>{t('clinicInsurances.actions.remove')}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Key-Value Details */}
                                <div className="space-y-2.5 text-xs text-gray-600 border-t border-gray-50 pt-3.5 mb-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">{t('clinicInsurances.partners.coverageTier')}</span>
                                        <span className="font-semibold text-gray-800 text-right truncate">
                                            {partner.coverageTier}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">{t('clinicInsurances.partners.copayDeductible')}</span>
                                        <span className="font-semibold text-gray-800 text-right">
                                            {partner.copay}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">{t('clinicInsurances.partners.approvalHotline')}</span>
                                        <span className="font-semibold text-gray-800 font-mono text-right">
                                            {partner.phone}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-gray-400 font-medium shrink-0">{t('clinicInsurances.partners.directBilling')}</span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            <span>
                                                {partner.directBillingType ||
                                                    (partner.instantPreApproval ? t('clinicInsurances.partners.instantPreApproval') : t('clinicInsurances.partners.onlinePortal'))}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50/90 text-emerald-600 border border-emerald-100/60">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span>{t('clinicInsurances.partners.activeAgreement')}</span>
                                </span>
                                <div className="flex items-center gap-1 text-xs font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenModal(partner)}
                                        className="text-gray-500 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                        {t('clinicInsurances.actions.edit')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(partner.id)}
                                        className="text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        {t('clinicInsurances.actions.remove')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Placeholder Add Card */}
                    <button
                        type="button"
                        onClick={() => handleOpenModal()}
                        className="border-2 border-dashed border-gray-200 hover:border-blue-400 bg-white/40 hover:bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-200 min-h-[250px] group"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-50 group-hover:bg-blue-100 text-blue-500 flex items-center justify-center mb-3 transition-colors">
                            <Plus className="w-6 h-6 stroke-[2]" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                            {t('clinicInsurances.addCard.title')}
                        </h4>
                        <p className="text-xs text-gray-400 max-w-[220px] mt-1 font-medium leading-relaxed">
                            {t('clinicInsurances.addCard.subtitle')}
                        </p>
                    </button>
                </div>
            </div>

            {/* ─── Add / Edit Insurance Modal (Clean & Minimal with Strict Validation) ─── */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 relative border border-gray-100 animate-[scaleIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                    <ShieldPlus className="w-5 h-5 stroke-[2]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                        {editingItem ? t('clinicInsurances.modal.editTitle') : t('clinicInsurances.modal.addTitle')}
                                    </h3>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSave} className="space-y-4 mt-5" noValidate>
                            {/* Company Name */}
                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                                    <span>{t('clinicInsurances.modal.companyName')}</span>
                                    <span className="text-red-500 shrink-0">*</span>
                                </label>
                                <div className="relative">
                                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder={t('clinicInsurances.modal.companyPlaceholder')}
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (errors.name) setErrors({ ...errors, name: "" });
                                        }}
                                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.name ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                            } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400`}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>
                                )}
                            </div>

                            {/* Accepted Coverage Tiers */}
                            <div>
                                <label className="flex items-center gap-1 text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                                    <span>{t('clinicInsurances.modal.coverageTiers')}</span>
                                    <span className="text-red-500 shrink-0">*</span>
                                </label>
                                <div className="relative">
                                    <Layers className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder={t('clinicInsurances.modal.coveragePlaceholder')}
                                        value={formData.coverageTier}
                                        onChange={(e) => {
                                            setFormData({ ...formData, coverageTier: e.target.value });
                                            if (errors.coverageTier) setErrors({ ...errors, coverageTier: "" });
                                        }}
                                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.coverageTier ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                            } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400`}
                                    />
                                </div>
                                {errors.coverageTier && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.coverageTier}</p>
                                )}
                            </div>

                            {/* 2-Column: Co-Pay & Pre-Approval Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
                                {/* Co-Pay (%) - Number Only, Empty by Default */}
                                <div>
                                    <label className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5 h-5 whitespace-nowrap">
                                        <span className="truncate">{t('clinicInsurances.modal.copay')}</span>
                                        <span className="text-red-500 shrink-0">*</span>
                                    </label>

                                    <div className="relative">
                                        <Percent className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder={t('clinicInsurances.modal.copayPlaceholder')}
                                            value={formData.copay}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9.]/g, '');
                                                setFormData({ ...formData, copay: val });
                                                if (errors.copay) setErrors({ ...errors, copay: "" });
                                            }}
                                            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.copay ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                                } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400`}
                                        />
                                    </div>
                                    {errors.copay && (
                                        <p className="text-xs text-red-500 mt-1 font-medium">{errors.copay}</p>
                                    )}
                                </div>

                                {/* Phone - Strictly Jordan 078 / 079 / 077 */}
                                <div>
                                    <label className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5 h-5 whitespace-nowrap">
                                        <span className="truncate">{t('clinicInsurances.modal.approvalPhone')}</span>
                                        <span className="text-red-500 shrink-0">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="tel"
                                            placeholder="078xxxxxxx"
                                            maxLength={12}
                                            value={formData.phone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                setFormData({ ...formData, phone: val });
                                                if (errors.phone) setErrors({ ...errors, phone: "" });
                                            }}
                                            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border ${errors.phone ? "border-red-400 focus:ring-red-400/20" : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                                                } rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-gray-800 placeholder:text-gray-400 font-mono`}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-xs text-red-500 mt-1 font-medium leading-tight">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Claims Portal URL */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                                    {t('clinicInsurances.modal.portalUrl')}
                                </label>
                                <div className="relative">
                                    <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="https://e-approval.jic.jo"
                                        value={formData.portalUrl}
                                        onChange={(e) => setFormData({ ...formData, portalUrl: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Feature Toggle Box */}
                            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-blue-100/70 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                                        <Zap className="w-4 h-4 fill-blue-600 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 leading-snug">
                                            {t('clinicInsurances.modal.instantPreApproval')}
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                            {t('clinicInsurances.modal.instantPreApprovalDesc')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            instantPreApproval: !formData.instantPreApproval,
                                        })
                                    }
                                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${formData.instantPreApproval ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${formData.instantPreApproval ? "translate-x-5" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    {t('clinicInsurances.modal.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                                >
                                    <Check className="w-4 h-4 stroke-[2.5]" />
                                    <span>
                                        {editingItem ? t('clinicInsurances.modal.update') : t('clinicInsurances.modal.save')}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── Interactive Toast Notification ─── */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-gray-800 animate-[scaleIn_0.2s_ease-out]">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">{toast.title}</p>
                        <p className="text-xs text-gray-300">{toast.message}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setToast(null)}
                        className="ml-2 text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    );
}

```
`src\pages\clinic\components\ClinicLayout.jsx`:

```jsx
import { Form, NavLink } from "react-router";
import { useTranslation } from "react-i18next";

/**
 * ClinicLayout – shared sidebar + content shell for every clinic page.
 *
 * Props
 * ─────
 * @param {string}       activePage   – key of the currently-active sidebar item
 * @param {function}     onNavigate   – (pageKey) => void  (wired up later when real routing lands)
 * @param {React.Node}   sidebarTopContent  - extra content injected between brand and nav
 * @param {React.Node}   sidebarBottomContent - extra content injected below nav
 */
export default function ClinicLayout({ children, sidebarTopContent }) {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const toggleLanguage = () => {
        i18n.changeLanguage(isArabic ? 'en' : 'ar');
    };

    const navItems = [
        { key: "dashboard", label: "Dashboard", icon: DashboardIcon },
        { key: "doctors", label: "Doctors", icon: DoctorsIcon },
        { key: "appointments", label: "Appointments", icon: AppointmentsIcon },
        { key: "settings", label: "Settings", icon: SettingsIcon },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* ─── Sidebar ─── */}
            <aside className="w-[200px] min-w-[200px] bg-white flex flex-col border-r border-gray-100">
                {/* Clinic branding */}
                <div className="px-5 pt-6 pb-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                        <ClinicBrandIcon />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-blue-600 leading-tight">Dr.Sna</p>
                        <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                        <p className="text-[11px] text-blue-500 leading-tight">Clinical Management</p>
                    </div>
                </div>

                {sidebarTopContent && (
                    <div className="px-3 mb-2">
                        {sidebarTopContent}
                    </div>
                )}

                {/* Navigation links */}
                <nav className="flex-1 px-3 mt-2 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.key}
                            to={`/clinic/${item.key}`}
                            className={({ isActive }) => `
                                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                                ${isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon active={isActive} />
                                    {item.label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div id="sidebar-bottom-portal" className="px-3 mt-4 mb-2">
                </div>

                {/* Bottom actions */}
                <div className="px-3 pb-6 space-y-1 border-t border-gray-100 pt-4 mt-auto">
                    <button
                        onClick={toggleLanguage}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <GlobeIcon />
                            {isArabic ? 'English' : 'العربية'}
                        </div>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
                        <SupportIcon />
                        Support
                    </button>
                    <Form method="post" action="/logout">
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                        >
                            <LogoutIcon />
                            Logout
                        </button>
                    </Form>
                </div>
            </aside>

            {/* ─── Main content ─── */}
            <main className="flex-1 overflow-y-auto flex flex-col relative">
                {children}
            </main>
        </div>
    );
}


/* ──────────────────────────────────────
   Inline SVG icon components
   ────────────────────────────────────── */

function ClinicBrandIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <path d="M12 14v-4M10 12h4" />
        </svg>
    );
}

function DashboardIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}

function DoctorsIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function AppointmentsIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function SettingsIcon({ active }) {
    const color = active ? "currentColor" : "#6B7280";
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    );
}

function SupportIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}


```
`src\pages\clinic\components\PendingApproval.jsx`:

```jsx
import React from 'react';
import { Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { logoutAction } from '../../../router/router';

export default function PendingApproval() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAction();
        navigate('/login');
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
            <div className="flex justify-center mb-6">
                <div className="bg-yellow-50 p-4 rounded-full">
                    <Clock className="w-12 h-12 text-yellow-500" />
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Pending</h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
                Your registration is currently under review by our administration team. 
                You will be notified once your clinic has been approved and you can start accepting appointments.
            </p>
            
            <button 
                onClick={handleLogout}
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
            </button>
        </div>
    );
}

```
`src\pages\clinic\components\RejectedApplication.jsx`:

```jsx
import React from 'react';
import { AlertTriangle, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { logoutAction } from '../../../router/router';

export default function RejectedApplication({ rejectionReason }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAction();
        navigate('/login');
    };

    const handleEditProfile = () => {
        navigate('/clinic/resubmit');
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-center mb-6">
                <div className="bg-red-50 p-4 rounded-full">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registration Rejected</h2>
            
            <p className="text-gray-600 mb-6 text-center leading-relaxed">
                Unfortunately, your clinic registration could not be approved at this time. 
                Please review the reason below and update your information.
            </p>
            
            {rejectionReason && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-md">
                    <h3 className="text-sm font-medium text-red-800 mb-1">Reason for Rejection:</h3>
                    <p className="text-sm text-red-700 whitespace-pre-wrap">{rejectionReason}</p>
                </div>
            )}
            
            <div className="flex flex-col space-y-3">
                <button 
                    onClick={handleEditProfile}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Modify Registration Info
                </button>
                
                <button 
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                </button>
            </div>
        </div>
    );
}

```
`src\pages\clinic\components\ResubmitApplication.jsx`:

```jsx
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Building2, FileText, Mail, MapPin, Lock, Loader2 } from 'lucide-react';
import { resubmitApplication } from '../../../api/clinicProfileApi';
import { clearAuth } from '../../../auth/authStorage';

const CITIES = [
    { value: "AMMAN", label: "Amman" },
    { value: "IRBID", label: "Irbid" },
    { value: "ZARQA", label: "Zarqa" },
    { value: "MAFRAQ", label: "Mafraq" },
    { value: "AJLOUN", label: "Ajloun" },
    { value: "JERASH", label: "Jerash" },
    { value: "MADABA", label: "Madaba" },
    { value: "BALQA", label: "Salt" },
    { value: "KARAK", label: "Karak" },
    { value: "TAFILEH", label: "Tafilah" },
    { value: "MAAN", label: "Maan" },
    { value: "AQABA", label: "Aqaba" },
];

export default function ResubmitApplication() {
    const { profile } = useOutletContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        clinicName: profile?.clinicName || '',
        clinicLicenseNumber: profile?.clinicLicenseNumber || profile?.taxRegistration || '',
        email: profile?.email || '',
        city: profile?.city || 'AMMAN',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await resubmitApplication(formData);
            if (formData.email !== profile?.email || formData.password) {
                clearAuth();
                window.location.href = '/login?message=Application+resubmitted+successfully.+Please+log+in+again.';
            } else {
                window.location.href = '/clinic'; // Redirect to dashboard root to see pending status
            }
        } catch (err) {
            setError(err.message || 'Failed to resubmit application');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-2">Resubmit Application</h2>
                    <p className="text-slate-600">Please review and update your registration details to resubmit your clinic application for approval.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Clinic Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Clinic name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Building2 className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="clinicName"
                                    value={formData.clinicName}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="Bright Smiles Dental Clinic"
                                />
                            </div>
                        </div>

                        {/* Clinic License Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Clinic license number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FileText className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="clinicLicenseNumber"
                                    value={formData.clinicLicenseNumber}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="CLN-2026-00451"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 block">City</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800 appearance-none bg-white"
                                >
                                    {CITIES.map(city => (
                                        <option key={city.value} value={city.value}>{city.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700 block">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800"
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                <span className="text-red-500">*</span> Password must be 8-12 characters long and contains at least one uppercase letter, in addition to symbols and numbers.
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700 block">Confirm password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={!formData.password}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-colors text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                                    placeholder="Re-enter your password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/clinic')}
                            className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

```
`src\pages\doctor\DoctorDashboard.jsx`:

```jsx
export default function DoctorDashboard() {
    return <h1>Doctor Dashboard</h1>;
}
```
`src\pages\patient\BookAppointment.jsx`:

```jsx
// src/pages/patient/BookAppointment.jsx
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import {
    MapPin,
    Clock,
    Phone,
    Calendar,
    Check,
    CheckCircle2,
    ArrowLeft,
    Building2,
    User,
    ShieldCheck,
    CreditCard,
    Stethoscope,
    AlertCircle,
} from 'lucide-react';
import PatientNavbar from '../../components/PatientNavbar';
import { fetchClinicDetails, fetchAvailability, bookPatientAppointment } from '../../api/patientApi';
import { getAuth } from '../../auth/authStorage';
import ModernAlertModal from '../../components/ModernAlertModal';
import { utcToLocalSpecific } from '../../utils/timezone';

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const DAY_SHORT = { MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu', FRIDAY: 'Fri', SATURDAY: 'Sat', SUNDAY: 'Sun' };

function formatTime12h(time24) {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function mergeClinicHours(clinicHours) {
    if (!clinicHours || clinicHours.length === 0) return '';
    const dayMap = {};
    for (const h of clinicHours) {
        if (h.dayOfWeek) {
            dayMap[h.dayOfWeek] = { start: h.startTime, end: h.endTime };
        }
    }

    const rows = [];
    let i = 0;
    while (i < DAY_ORDER.length) {
        const day = DAY_ORDER[i];
        const hours = dayMap[day];
        const timeStr = hours ? `${formatTime12h(hours.start)} - ${formatTime12h(hours.end)}` : 'Closed';

        let j = i + 1;
        while (j < DAY_ORDER.length) {
            const nextDay = DAY_ORDER[j];
            const nextHours = dayMap[nextDay];
            const nextTimeStr = nextHours ? `${formatTime12h(nextHours.start)} - ${formatTime12h(nextHours.end)}` : 'Closed';
            if (nextTimeStr === timeStr) {
                j++;
            } else {
                break;
            }
        }

        const startDay = DAY_SHORT[DAY_ORDER[i]];
        const endDay = DAY_SHORT[DAY_ORDER[j - 1]];
        const label = i === j - 1 ? startDay : `${startDay} - ${endDay}`;
        if (timeStr !== 'Closed') {
            rows.push(`${label}: ${timeStr}`);
        }
        i = j;
    }
    return rows.join(' | ') || 'Hours upon request';
}

function getNext7Days() {
    const days = [];
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dateNum = String(d.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${dateNum}`;

        days.push({
            dateStr,
            dayName: i === 0 ? 'Today' : (i === 1 ? 'Tomorrow' : dayNames[d.getDay()]),
            formattedDate: `${monthNames[d.getMonth()]} ${d.getDate()}`,
            fullDate: d
        });
    }
    return days;
}

export default function BookAppointment() {
    const { clinicId: paramClinicId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state || {};
    const effectiveClinicId = paramClinicId || stateData.clinicId;
    const auth = getAuth();

    // Patient Form State
    const [fullName, setFullName] = useState(auth?.fullName || auth?.name || '');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(auth?.phoneNumber || '');

    // Multiple Service Selection State (Max 2)
    const [selectedServiceIds, setSelectedServiceIds] = useState(() => {
        if (stateData.serviceId) return [stateData.serviceId];
        if (stateData.serviceIds && Array.isArray(stateData.serviceIds)) return stateData.serviceIds;
        return [];
    });

    const [selectedDoctorId, setSelectedDoctorId] = useState(stateData.doctorId || '');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');

    // Date & Time Selection
    const upcomingDays = useMemo(() => getNext7Days(), []);
    const [selectedDayObj, setSelectedDayObj] = useState(() => {
        if (stateData.selectedDate) {
            const match = upcomingDays.find(d => d.dateStr === stateData.selectedDate);
            if (match) return match;
        }
        return upcomingDays[0];
    });
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(() => {
        if (stateData.selectedTime) {
            if (/^\d{2}:\d{2}$/.test(stateData.selectedTime)) {
                const [h, m] = stateData.selectedTime.split(':').map(Number);
                const ampm = h >= 12 ? 'PM' : 'AM';
                const hour = h % 12 || 12;
                return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
            }
            return stateData.selectedTime;
        }
        return '';
    });
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Clinic Data
    const [clinic, setClinic] = useState(null);
    const [loadingClinic, setLoadingClinic] = useState(Boolean(effectiveClinicId));
    const [clinicError, setClinicError] = useState(effectiveClinicId ? null : 'No clinic selected. Please select a clinic to book an appointment.');

    // Confirmation & Alerts
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccessData, setBookingSuccessData] = useState(null);
    const [alertConfig, setAlertConfig] = useState({ open: false, title: '', message: '', type: 'info' });

    // Fetch clinic details from Backend API
    useEffect(() => {
        if (!effectiveClinicId) return;

        let isMounted = true;
        fetchClinicDetails(effectiveClinicId)
            .then(data => {
                if (!isMounted) return;
                setClinic(data);
                setClinicError(null);

                // Auto-select doctor
                if (stateData.doctorId) {
                    setSelectedDoctorId(stateData.doctorId);
                } else if (data.doctors && data.doctors.length === 1) {
                    setSelectedDoctorId(data.doctors[0].doctorId || data.doctors[0].id);
                }

                setLoadingClinic(false);
            })
            .catch(err => {
                if (!isMounted) return;
                setClinicError(err.message || 'Failed to load clinic details from server.');
                setLoadingClinic(false);
            });

        return () => {
            isMounted = false;
        };
    }, [effectiveClinicId, stateData.doctorId]);

    // List of active clinic doctors
    const activeDoctors = useMemo(() => {
        return clinic?.doctors ? clinic.doctors.filter(doc => doc.isActive !== false) : [];
    }, [clinic]);

    // Active doctor entity
    const currentDoctor = useMemo(() => {
        return activeDoctors.find(d => String(d.doctorId || d.id) === String(selectedDoctorId)) || activeDoctors[0];
    }, [activeDoctors, selectedDoctorId]);

    // All clinic services normalized
    const allClinicServices = useMemo(() => {
        if (clinic?.services && clinic.services.length > 0) {
            return clinic.services.map(s => ({
                id: s.serviceId || s.id,
                name: s.serviceName || s.name || 'General Dental Care'
            }));
        }
        if (clinic?.specialties && clinic.specialties.length > 0) {
            return clinic.specialties.map((s) => ({
                id: typeof s === 'object' ? (s.id || s.serviceId) : s,
                name: typeof s === 'object' ? (s.name || s.specialtyName) : s
            }));
        }
        return [];
    }, [clinic]);

    // Filter services dynamically to ONLY what the selected doctor offers
    const doctorServices = useMemo(() => {
        if (!currentDoctor) return allClinicServices;

        const rawSpecialty = currentDoctor.specialty || currentDoctor.specialties;
        if (!rawSpecialty) return allClinicServices;

        let specialtyNames = [];
        if (Array.isArray(rawSpecialty)) {
            specialtyNames = rawSpecialty.map(s => (typeof s === 'object' ? (s.name || s.specialtyName) : s)?.trim().toLowerCase());
        } else if (typeof rawSpecialty === 'string') {
            specialtyNames = rawSpecialty.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        }

        if (specialtyNames.length === 0) return allClinicServices;

        const filtered = allClinicServices.filter(srv =>
            specialtyNames.includes(srv.name.trim().toLowerCase())
        );

        return filtered.length > 0 ? filtered : allClinicServices;
    }, [currentDoctor, allClinicServices]);

    // Sync selected services when doctor changes
    useEffect(() => {
        if (doctorServices.length > 0) {
            setSelectedServiceIds(prev => {
                const valid = prev.filter(id => doctorServices.some(ds => String(ds.id) === String(id)));
                if (valid.length > 0) return valid;
                return [doctorServices[0].id];
            });
        }
    }, [doctorServices]);

    // Fetch availability slots strictly based on backend schedule
    useEffect(() => {
        const currentClinicId = clinic?.clinicId || clinic?.id || effectiveClinicId;
        if (!currentClinicId || selectedServiceIds.length === 0) {
            setAvailableSlots([]);
            return;
        }

        let isMounted = true;
        setLoadingSlots(true);

        fetchAvailability({
            clinicId: currentClinicId,
            date: selectedDayObj.dateStr,
            doctorId: selectedDoctorId || undefined,
            serviceIds: selectedServiceIds
        })
            .then(slots => {
                if (!isMounted) return;
                if (slots && Array.isArray(slots) && slots.length > 0) {
                    const mapped = slots.map(s => {
                        const rawTime = s.time ? (s.time.length === 5 ? `${s.time}:00` : s.time) : '09:00:00';

                        const [h, m] = rawTime.split(':').map(Number);

                        const ampm = h >= 12 ? 'PM' : 'AM';
                        const hour = h % 12 || 12;
                        return {
                            time: `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`,
                            rawTime: rawTime,
                            available: s.available !== false,
                            scheduleId: s.scheduleId
                        };
                    });

                    // Sort chronologically in local time
                    mapped.sort((a, b) => {
                        const [aH, aM] = a.time.split(/[: ]/);
                        const [bH, bM] = b.time.split(/[: ]/);
                        const aAmPm = a.time.includes('PM');
                        const bAmPm = b.time.includes('PM');

                        let aTotalMins = (parseInt(aH) % 12 + (aAmPm ? 12 : 0)) * 60 + parseInt(aM);
                        let bTotalMins = (parseInt(bH) % 12 + (bAmPm ? 12 : 0)) * 60 + parseInt(bM);
                        return aTotalMins - bTotalMins;
                    });

                    setAvailableSlots(mapped);
                } else {
                    setAvailableSlots([]);
                }
                setLoadingSlots(false);
            })
            .catch(() => {
                if (!isMounted) return;
                setAvailableSlots([]);
                setLoadingSlots(false);
            });

        return () => {
            isMounted = false;
        };
    }, [clinic?.clinicId, clinic?.id, effectiveClinicId, selectedDayObj, selectedDoctorId, selectedServiceIds]);

    // Handle Service Checkbox Toggle with a 2-Service Limit
    const handleToggleService = (serviceId) => {
        setSelectedServiceIds(prev => {
            if (prev.includes(serviceId)) {
                return prev.filter(id => id !== serviceId);
            } else {
                if (prev.length >= 2) {
                    setAlertConfig({
                        open: true,
                        title: 'Selection Limit Reached',
                        message: 'You can select a maximum of 2 services per consultation visit.',
                        type: 'warning'
                    });
                    return prev;
                }
                return [...prev, serviceId];
            }
        });
    };

    useEffect(() => {
        if (selectedTimeSlot && availableSlots.length > 0) {
            const match = availableSlots.find(s => s.time === selectedTimeSlot);
            if (!match || !match.available) {
                setSelectedTimeSlot('');
            }
        }
    }, [availableSlots, selectedTimeSlot]);

    // Formatted clinic hours
    const displayHours = clinic?.workingHours || (clinic?.clinicHours ? mergeClinicHours(clinic.clinicHours) : '09:00 AM - 05:00 PM');

    // Sequential Step Completion Logic
    const isStep1Complete = Boolean(fullName.trim() && age.toString().trim());
    const isStep2Complete = Boolean(isStep1Complete && selectedServiceIds.length > 0);
    const isStep3Complete = Boolean(isStep2Complete && selectedTimeSlot);
    const isStep4Complete = Boolean(isStep3Complete && paymentMethod);

    const currentActiveStep = bookingSuccessData
        ? 4
        : isStep3Complete
            ? 4
            : isStep2Complete
                ? 3
                : isStep1Complete
                    ? 2
                    : 1;

    const handleConfirmBooking = async (e) => {
        e?.preventDefault();

        if (!fullName.trim() || !age.toString().trim()) {
            setAlertConfig({
                open: true,
                title: 'Patient Details Required (Step 1)',
                message: 'Please provide the patient full name and age before proceeding.',
                type: 'warning'
            });
            return;
        }

        if (selectedServiceIds.length === 0) {
            setAlertConfig({
                open: true,
                title: 'Medical Service Required (Step 2)',
                message: 'Please select at least one healthcare service for your visit.',
                type: 'warning'
            });
            return;
        }

        if (!selectedTimeSlot) {
            setAlertConfig({
                open: true,
                title: 'Preferred Time Required (Step 3)',
                message: 'Please choose an available appointment time slot.',
                type: 'warning'
            });
            return;
        }

        if (paymentMethod === '') {
            setAlertConfig({
                open: true,
                title: 'Payment Method Required (Step 4)',
                message: 'Please select your preferred payment method to confirm.',
                type: 'warning'
            });
            return;
        }

        if (parseInt(age, 10) < 6) {
            setAlertConfig({
                open: true,
                title: 'Invalid Patient Age',
                message: 'The age entered is invalid. A patient must be at least 6 years old to book an appointment. Please correct the age input.',
                type: 'warning'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const clinicId = clinic?.clinicId || clinic?.id || effectiveClinicId;
            const doctorId = selectedDoctorId || (activeDoctors[0]?.doctorId || activeDoctors[0]?.id);

            if (!doctorId) {
                throw new Error("No active doctor is available for this clinic.");
            }

            const timeSlotObj = availableSlots.find(s => s.time === selectedTimeSlot);
            let rawTime = timeSlotObj?.rawTime || '09:00:00';
            if (rawTime.length === 5) rawTime = `${rawTime}:00`;

            const appointmentAt = `${selectedDayObj.dateStr}T${rawTime}`;

            const payload = {
                clinicId: clinicId,
                doctorId: doctorId,
                patientName: fullName.trim(),
                patientAge: parseInt(age, 10),
                serviceIds: selectedServiceIds,
                appointmentAt: appointmentAt,
                paymentMethod: paymentMethod.toUpperCase()
            };

            const responseData = await bookPatientAppointment(payload);

            const docObj = activeDoctors.find(d => String(d.doctorId || d.id) === String(doctorId));
            const selectedServiceNames = doctorServices
                .filter(s => selectedServiceIds.includes(s.id))
                .map(s => s.name)
                .join(', ') || 'Dental Consultation';

            const bookingResult = {
                bookingId: responseData?.appointmentId || `BK-${Date.now().toString().slice(-6)}`,
                patientName: responseData?.patientName || fullName,
                patientAge: responseData?.patientAge || age,
                patientPhone: phoneNumber,
                clinicName: clinic?.clinicName || 'Dental Clinic',
                doctorName: docObj?.fullName || 'Specialist Doctor',
                service: selectedServiceNames,
                date: `${selectedDayObj.formattedDate}, ${selectedDayObj.fullDate.getFullYear()}`,
                time: selectedTimeSlot,
                paymentMethod: paymentMethod.toUpperCase(),
                notes: notes,
                fee: clinic?.checkingFee ? `${clinic.checkingFee} JOD` : 'Standard Clinic Fee'
            };

            setBookingSuccessData(bookingResult);
        } catch (err) {
            setAlertConfig({
                open: true,
                title: 'Unable to Complete Booking',
                message: err.message || 'There was an error scheduling your appointment. Please choose a different slot or try again.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    if (clinicError && !clinic) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2>{clinicError}</h2>
            </div>
        );


    }

    if (loadingClinic) {
        return (
            <div className="bg-slate-100 min-h-screen flex flex-col font-sans text-slate-700 antialiased">
                <PatientNavbar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm font-semibold text-slate-500">Loading clinic & appointment details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col font-sans text-slate-700 antialiased">
            <PatientNavbar />

            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-6xl overflow-hidden flex flex-col min-h-[850px] relative border border-slate-100">

                    {/* Stepper Progress */}
                    <div className="pt-8 pb-6 px-8 border-b border-slate-100 bg-white">
                        <div className="max-w-3xl mx-auto flex justify-between items-center relative z-10">
                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${isStep1Complete
                                    ? 'bg-blue-600 text-white'
                                    : currentActiveStep === 1
                                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isStep1Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isStep1Complete || currentActiveStep === 1 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Details
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${isStep1Complete ? 'bg-blue-600' : 'bg-slate-200'
                                    }`} />
                            </div>

                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${isStep2Complete
                                    ? 'bg-blue-600 text-white'
                                    : currentActiveStep === 2
                                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isStep2Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isStep2Complete || currentActiveStep === 2 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Services
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${isStep2Complete ? 'bg-blue-600' : 'bg-slate-200'
                                    }`} />
                            </div>

                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${isStep3Complete
                                    ? 'bg-blue-600 text-white'
                                    : currentActiveStep === 3
                                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isStep3Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isStep3Complete || currentActiveStep === 3 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Time
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${isStep3Complete ? 'bg-blue-600' : 'bg-slate-200'
                                    }`} />
                            </div>

                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${bookingSuccessData
                                    ? 'bg-emerald-600 text-white'
                                    : isStep4Complete || currentActiveStep === 4
                                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                        : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {bookingSuccessData ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${bookingSuccessData ? 'text-emerald-600' : isStep4Complete || currentActiveStep === 4 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Confirm
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                        <main className="flex-1 overflow-y-auto p-8 lg:p-12 pb-36 lg:pb-36 bg-white lg:border-r border-slate-100">
                            <header className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer mr-1"
                                        title="Go Back"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
                                        Book an Appointment
                                    </h1>
                                </div>
                                <p className="text-slate-500 text-sm pl-9">
                                    Please provide your details to schedule a verified dental consultation with {clinic?.clinicName || 'the clinic'}.
                                </p>
                            </header>

                            <form onSubmit={handleConfirmBooking}>
                                {/* 1. Patient Information */}
                                <section className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-600" />
                                            1. Patient Information
                                        </h2>
                                        {isStep1Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> Details Completed
                                            </span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="fullName">
                                                Full Name
                                            </label>
                                            <input
                                                id="fullName"
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Enter patient full name"
                                                required
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="age">
                                                Age
                                            </label>
                                            <input
                                                id="age"
                                                type="number"
                                                min="1"
                                                max="120"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="e.g. 25"
                                                required
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phoneNumber">
                                                Phone Number (Optional)
                                            </label>
                                            <input
                                                id="phoneNumber"
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder="e.g. 0791234567"
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* 2. Doctor & Medical Services */}
                                <section className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <Stethoscope className="w-5 h-5 text-blue-600" />
                                            2. Medical Services &amp; Doctor
                                        </h2>
                                        {isStep2Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> {selectedServiceIds.length} Selected
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-5">
                                        {/* Doctor Selector */}
                                        {activeDoctors.length > 0 && (
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="doctorSelect">
                                                    Select Doctor
                                                </label>
                                                <select
                                                    id="doctorSelect"
                                                    value={selectedDoctorId}
                                                    onChange={(e) => {
                                                        setSelectedDoctorId(e.target.value);
                                                        setSelectedTimeSlot('');
                                                    }}
                                                    className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer"
                                                >
                                                    {activeDoctors.map((doc) => (
                                                        <option key={doc.doctorId || doc.id} value={doc.doctorId || doc.id}>
                                                            {doc.fullName} {doc.specialty ? `— (${doc.specialty})` : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Dynamic Doctor Services Checkboxes */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <label className="block text-sm font-semibold text-slate-700">
                                                    Select Healthcare Services (Choose up to 2)
                                                </label>
                                                <span className="text-xs text-slate-400 font-medium">
                                                    {selectedServiceIds.length} / 2 selected
                                                </span>
                                            </div>

                                            {doctorServices.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                    {doctorServices.map((srv) => {
                                                        const isChecked = selectedServiceIds.includes(srv.id);
                                                        const isLimitReached = selectedServiceIds.length >= 2 && !isChecked;

                                                        return (
                                                            <label
                                                                key={srv.id}
                                                                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all select-none shadow-2xs ${isChecked
                                                                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-blue-900 font-bold cursor-pointer'
                                                                    : isLimitReached
                                                                        ? 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                                                                        : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700 cursor-pointer'
                                                                    }`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    disabled={isLimitReached}
                                                                    checked={isChecked}
                                                                    onChange={() => handleToggleService(srv.id)}
                                                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 shrink-0"
                                                                />
                                                                <span className="text-xs leading-snug">{srv.name}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-center text-slate-400 text-xs">
                                                    No specialty services currently listed for this doctor.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* 3. Preferred Date & Time */}
                                <section className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                            3. Preferred Date &amp; Time
                                        </h2>
                                        {isStep3Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> Time Chosen
                                            </span>
                                        )}
                                    </div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                                        Select a Day
                                    </label>

                                    <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
                                        {upcomingDays.map((day) => {
                                            const isSelected = selectedDayObj.dateStr === day.dateStr;
                                            return (
                                                <button
                                                    key={day.dateStr}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDayObj(day);
                                                        setSelectedTimeSlot('');
                                                    }}
                                                    className={`shrink-0 w-20 h-16 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs ${isSelected
                                                        ? 'border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold scale-[1.03]'
                                                        : 'border border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-700'
                                                        }`}
                                                >
                                                    <span className={`text-xs font-bold mb-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-800'}`}>
                                                        {day.dayName}
                                                    </span>
                                                    <span className={`text-[10px] ${isSelected ? 'text-blue-500 font-semibold' : 'text-slate-400'}`}>
                                                        {day.formattedDate}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Available Slots for {selectedDayObj.dayName} ({selectedDayObj.formattedDate})
                                        </label>
                                        {loadingSlots && (
                                            <span className="text-xs text-blue-600 animate-pulse font-medium">
                                                Loading slots...
                                            </span>
                                        )}
                                    </div>

                                    {availableSlots.length > 0 ? (
                                        Object.entries(
                                            availableSlots.reduce((groups, slot) => {
                                                const hourPart = slot.time.split(":")[0];
                                                const amPmPart = slot.time.split(" ")[1];
                                                const hourKey = `${hourPart} ${amPmPart}`;

                                                if (!groups[hourKey]) groups[hourKey] = [];

                                                groups[hourKey].push(slot);

                                                return groups;
                                            }, {})
                                        ).map(([hourKey, slots]) => (
                                            <div key={hourKey} className="flex gap-6 mb-8">

                                                <div className="w-24 shrink-0">

                                                    <h3 className="font-bold text-slate-700">
                                                        {hourKey}
                                                    </h3>

                                                    <p className="text-xs text-slate-500">
                                                        {slots.length} Slots
                                                    </p>

                                                </div>

                                                <div className="grid grid-cols-4 gap-3 flex-1">

                                                    {slots.map((slot, index) => {

                                                        const isSelected =
                                                            selectedTimeSlot === slot.time;

                                                        const isAvailable =
                                                            slot.available !== false;

                                                        return (

                                                            <button
                                                                key={index}
                                                                type="button"
                                                                disabled={!isAvailable}
                                                                onClick={() =>
                                                                    isAvailable &&
                                                                    setSelectedTimeSlot(slot.time)
                                                                }
                                                                className={`rounded-xl p-4 border transition ${isSelected
                                                                    ? "bg-blue-600 text-white border-blue-600 cursor-default shadow-md"
                                                                    : isAvailable
                                                                        ? "bg-white hover:border-blue-500 cursor-pointer hover:shadow-sm"
                                                                        : "bg-slate-100 text-slate-400 cursor-not-allowed opacity-70"
                                                                    }`}
                                                            >

                                                                <div className="font-bold">

                                                                    {slot.time}

                                                                </div>

                                                                <div className="text-xs">

                                                                    {isAvailable
                                                                        ? "Available"
                                                                        : "Booked"}

                                                                </div>

                                                            </button>

                                                        );

                                                    })}

                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-rose-50 border rounded-xl p-6 text-center">
                                            Clinic is closed or no doctor shifts are scheduled on this date.
                                        </div>
                                    )}
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* 4. Payment Details */}
                                <section className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <CreditCard className="w-5 h-5 text-blue-600" />
                                            4. Payment Details
                                        </h2>
                                        {isStep4Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> Ready to Confirm
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="paymentMethod">
                                                Payment Method
                                            </label>
                                            <select
                                                id="paymentMethod"
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer"
                                                required
                                            >
                                                <option value="" disabled>Select payment option...</option>
                                                <option value="CASH">Pay Cash at Clinic (Upon Arrival)</option>
                                                <option value="CREDIT">Credit Card (Visa / Mastercard)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="notes">
                                                Special Notes / Symptoms (Optional)
                                            </label>
                                            <textarea
                                                id="notes"
                                                rows="2"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="e.g. routine checkup, pain in back molars..."
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none resize-none"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </main>

                        {/* Sidebar */}
                        <aside className="w-full lg:w-[340px] bg-slate-50/60 p-6 lg:p-8 flex flex-col gap-6 shrink-0 border-t lg:border-t-0 border-slate-100">
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                                <h3 className="text-base font-bold text-blue-700 flex items-center gap-2 mb-4">
                                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                                    {clinic?.clinicName || 'Clinic Information'}
                                </h3>

                                <div className="space-y-3 text-sm text-slate-600">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">
                                            {clinic?.detailedAddress || clinic?.city || 'Amman, Jordan'}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">{displayHours}</span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">
                                            {clinic?.phoneNumber || '07 9999 9999'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-xl overflow-hidden h-36 relative border border-slate-100 bg-slate-100">
                                    <img
                                        alt={clinic?.clinicName || 'Clinic Building'}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        src={clinic?.imageUrl || '/clinic-building.jpg'}
                                        onError={(e) => {
                                            e.currentTarget.src = '/clinic-building.jpg';
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                        <ShieldCheck className="w-3 h-3" />
                                        Verified Practice
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-4 h-4 text-blue-600" />
                                    Need Help?
                                </h4>
                                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                                    If you require urgent assistance or emergency care, contact clinic support directly.
                                </p>
                                <a
                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
                                    href={clinic?.phoneNumber ? `tel:${clinic.phoneNumber}` : '#'}
                                >
                                    <span>Contact Clinic / Support</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </aside>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="border-t border-slate-200/80 bg-white">
                        <div className="flex justify-end gap-3 px-8 py-4 w-full lg:w-[calc(100%-340px)] bg-slate-50/60">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shadow-2xs"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                disabled={isSubmitting}
                                className="px-7 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                type="button"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Confirming...</span>
                                    </>
                                ) : (
                                    <span>Confirm Booking</span>
                                )}
                            </button>
                        </div>

                        <footer className="px-8 py-3.5 bg-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-200/60">
                            <div className="font-bold text-blue-900 mb-2 sm:mb-0 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center p-0.5 overflow-hidden shadow-2xs">
                                    <img src="/logo.png" alt="DrSnna" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-slate-800 font-bold tracking-tight">DrSnna</span>
                            </div>
                            <div className="flex gap-4 mb-2 sm:mb-0">
                                <a className="hover:text-blue-600 transition-colors" href="#">Privacy Policy</a>
                                <a className="hover:text-blue-600 transition-colors" href="#">Terms of Service</a>
                            </div>
                            <div className="text-slate-400">© 2026 DrSnna Health</div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {bookingSuccessData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                            Appointment Confirmed!
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                            Your dental visit has been successfully registered in the system.
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2.5 mb-6 text-xs border border-slate-100">
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Booking ID:</span>
                                <span className="font-bold text-blue-600">{bookingSuccessData.bookingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Patient:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.patientName} (Age: {bookingSuccessData.patientAge})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Clinic:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.clinicName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Doctor:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.doctorName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Services:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.service}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Date & Time:</span>
                                <span className="font-bold text-emerald-600">{bookingSuccessData.date} at {bookingSuccessData.time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Payment:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.paymentMethod}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/profile')}
                                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                            >
                                View in Profile
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/20"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ModernAlertModal
                isOpen={alertConfig.open}
                onClose={() => setAlertConfig(prev => ({ ...prev, open: false }))}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
            />
        </div>
    );
}
```
`src\pages\patient\ClinicDetails.css`:

```css
/* ═══════════════════════════════════════════════
   Clinic Details Page Styles
   ═══════════════════════════════════════════════ */

/* ── Reset & Page ──────────────────────────── */
.cd-page {
    min-height: 100vh;
    background-color: #f8fafc;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1e293b;
}

/* ── Navbar ────────────────────────────────── */
.cd-navbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 12px 24px;
}

.cd-navbar-inner {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cd-navbar-brand {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}

.cd-brand-text {
    font-size: 15px;
    font-weight: 700;
    color: #97c8fb;
    letter-spacing: -0.3px;
}

.cd-navbar-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
}

.cd-navbar-avatar:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
}

/* ── Main Container ────────────────────────── */
.cd-main {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 24px 64px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    /* Reduced from 28px to remove the large space */
}

/* ── Card Base ─────────────────────────────── */
.cd-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05);
}

/* ── Section Title ─────────────────────────── */
.cd-section-title {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 16px 0;
}

/* ══════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════ */
.cd-hero {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
    padding: 24px;
}

.cd-hero-image-wrap {
    width: 110px;
    height: 110px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    border: 1px solid #e2e8f0;
}

.cd-hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cd-hero-info {
    flex: 1;
    min-width: 200px;
}

.cd-hero-name {
    font-size: 26px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
}

.cd-hero-address {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #64748b;
    margin-bottom: 12px;
    font-weight: 500;
}

.cd-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.cd-tag {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
}

.cd-hero-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    flex-shrink: 0;
}

.cd-book-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #004aad;
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    box-shadow: 0 4px 12px rgb(14 165 233 / 0.25);
}

.cd-hero-fee {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 8px 16px;
    border-radius: 8px;
}

.cd-hero-fee-label {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
}

.cd-hero-fee-value {
    font-size: 15px;
    color: #10b981;
    font-weight: 700;
}

.cd-book-btn:hover {
    background: #003b8a;
    transform: translateY(-1px);
}

.cd-book-btn:active {
    transform: translateY(0);
}

.cd-book-arrow {
    font-size: 16px;
    transition: transform 0.2s;
}

.cd-book-btn:hover .cd-book-arrow {
    transform: translateX(3px);
}

/* ══════════════════════════════════════════════
   ABOUT & CONTACT GRID
   ══════════════════════════════════════════════ */
.cd-about-contact-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr;
    gap: 32px;
    align-items: start;
}

@media (max-width: 768px) {
    .cd-about-contact-grid {
        grid-template-columns: 1fr;
        gap: 24px;
    }
}

.cd-about {
    padding: 24px;
}

.cd-about-text {
    font-size: 14px;
    line-height: 1.7;
    color: #475569;
    margin: 0;
}

/* ── Contact Info ──────────────────────────── */
.cd-contact {
    padding: 24px;
}

.cd-contact-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
}

.cd-contact-item {
    display: flex;
    align-items: center;
    gap: 14px;
}

.cd-contact-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.cd-contact-icon-phone {
    background: #f1f5f9;
    color: #3b82f6;
}

.cd-contact-icon-email {
    background: #f1f5f9;
    color: #3b82f6;
}

.cd-contact-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.cd-contact-label {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    text-transform: capitalize;
}

.cd-contact-value {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
}

/* ── Hours Table ───────────────────────────── */
.cd-hours-table {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid #e2e8f0;
    padding-top: 16px;
}

.cd-hours-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cd-hours-day {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
}

.cd-hours-time {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
}

.cd-hours-closed {
    color: #dc2626;
    font-weight: 600;
}

/* ══════════════════════════════════════════════
   DOCTORS SECTION
   ══════════════════════════════════════════════ */
.cd-doctors-section {
    display: flex;
    flex-direction: column;
}

.cd-doctors-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.cd-doctor-card {
    padding: 24px;
    transition: box-shadow 0.2s;
}

.cd-doctor-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.cd-doctor-header {
    display: flex;
    gap: 20px;
}

.cd-doctor-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
}

.cd-doctor-info {
    flex: 1;
}

.cd-doctor-name-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
}

.cd-doctor-name {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
}

.cd-doctor-rating-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #e0f2fe;
    padding: 2px 6px;
    border-radius: 4px;
}

.cd-rating-number {
    font-size: 11px;
    font-weight: 700;
    color: #0369a1;
}

.cd-doctor-specialty {
    font-size: 13px;
    font-weight: 600;
    color: #0284c7;
    display: block;
    margin-bottom: 8px;
}

.cd-doctor-desc {
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
    margin: 0;
}

/* ── Toggle Times Button ───────────────────── */
.cd-toggle-times {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    margin-left: 100px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: #0284c7;
    transition: color 0.15s;
}

.cd-toggle-times:hover {
    color: #0369a1;
}

.cd-toggle-arrow {
    font-size: 12px;
    transition: transform 0.2s;
    display: inline-block;
}

.cd-arrow-up {
    transform: rotate(180deg);
}

/* ══════════════════════════════════════════════
   NEW APPOINTMENT PICKER
   ══════════════════════════════════════════════ */

.cd-appointment-picker {
    margin-top: 18px;
    border-top: 1px solid #e2e8f0;
    padding-top: 20px;
}

/* ── Appointment Sections ─────────────────── */

.cd-appointment-section {
    margin-bottom: 22px;
}

.cd-appointment-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .6px;
    color: #64748b;
}

.cd-appointment-legend {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0;
}

.cd-appointment-legend span {
    display: flex;
    align-items: center;
    gap: 4px;
}

.cd-appointment-legend i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
}

.cd-dot-selected {
    background: #004aad;
}

.cd-dot-available {
    background: #94a3b8;
}

.cd-dot-booked {
    background: #d1d5db;
}

/* ── Treatment Buttons ───────────────────── */

.cd-treatment-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.cd-treatment-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 8px 12px;
    border: 1px solid #dbe3ec;
    border-radius: 8px;
    background: #fff;
    color: #475569;
    cursor: pointer;
    transition: all .18s ease;
}

.cd-treatment-btn:hover {
    border-color: #93c5fd;
    background: #f8fbff;
}

.cd-treatment-selected {
    border-color: #004aad;
    background: #eff6ff;
    color: #0f3d78;
    box-shadow: 0 0 0 1px rgba(0, 74, 173, .08);
}

.cd-treatment-radio {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 1.5px solid #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 900;
    flex-shrink: 0;
}

.cd-treatment-selected .cd-treatment-radio {
    border-color: #004aad;
    background: #004aad;
    color: white;
}

.cd-treatment-name {
    font-size: 12px;
    font-weight: 700;
}

.cd-treatment-duration {
    font-size: 10px;
    color: #64748b;
    white-space: nowrap;
}

.cd-treatment-limit {
    margin-top: 8px;
    font-size: 10px;
    color: #64748b;
}

/* ── Date Selector ───────────────────────── */

.cd-date-selector {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 7px;
}

.cd-date-btn {
    min-width: 0;
    padding: 9px 5px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all .18s ease;
    color: #64748b;
}

.cd-date-btn:hover {
    border-color: #93c5fd;
    background: #f8fbff;
}

.cd-date-selected {
    background: #004aad;
    border-color: #004aad;
    color: white;
    box-shadow: 0 4px 10px rgba(0, 74, 173, .18);
}

.cd-date-selected:hover {
    background: #003a8c !important;
    border-color: #003a8c !important;
    color: white !important;
}

.cd-date-top {
    font-size: 9px;
    font-weight: 700;
}

.cd-date-btn strong {
    margin-top: 2px;
    font-size: 16px;
    line-height: 20px;
}

.cd-date-month {
    font-size: 9px;
    opacity: .8;
}

.cd-date-available {
    margin-top: 3px;
    font-size: 8px;
    color: #10b981;
    font-weight: 700;
}

.cd-date-selected .cd-date-available {
    color: #dbeafe;
}

/* ── Hour Rows ────────────────────────────── */

.cd-hour-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.cd-hour-row {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 10px;
    align-items: center;
    padding: 8px;
    border: 1px solid #e2e8f0;
    border-radius: 9px;
    background: #fff;
}

.cd-hour-label {
    display: flex;
    flex-direction: column;
    padding-left: 3px;
}

.cd-hour-label strong {
    font-size: 12px;
    color: #334155;
}

.cd-hour-label span {
    margin-top: 2px;
    font-size: 8px;
    color: #64748b;
}

.cd-hour-slots {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
}

.cd-new-slot {
    min-height: 42px;
    border-radius: 7px;
    border: 1px solid #dbe3ec;
    background: #f8fafc;
    color: #64748b;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all .15s ease;
}

.cd-new-slot span {
    font-size: 11px;
    font-weight: 700;
}

.cd-new-slot small {
    margin-top: 2px;
    font-size: 7px;
    color: #94a3b8;
}

.cd-new-slot-available:hover {
    background: #eff6ff;
    border-color: #93c5fd;
    color: #0057b8;
}

.cd-new-slot-selected {
    background: #004aad;
    border-color: #004aad;
    color: white;
    box-shadow: 0 3px 8px rgba(0, 74, 173, .2);
}

.cd-new-slot-selected:hover {
    background: #003a8c !important;
    border-color: #003a8c !important;
    color: white !important;
}

.cd-new-slot-selected small {
    color: #dbeafe;
}

.cd-new-slot-booked {
    background: #f1f5f9;
    border-color: #f1f5f9;
    color: #cbd5e1;
    cursor: not-allowed;
}

.cd-new-slot-booked span {
    text-decoration: line-through;
}

.cd-new-slot-booked small {
    color: #cbd5e1;
}

.cd-slot-empty {
    min-height: 42px;
    border-radius: 7px;
    background: #fafafa;
    border: 1px solid #f1f5f9;
}

/* ── Empty / Loading ──────────────────────── */

.cd-no-slots {
    padding: 22px;
    border-radius: 9px;
    border: 1px dashed #cbd5e1;
    background: #f8fafc;
    text-align: center;
    font-size: 12px;
    color: #64748b;
}

.cd-loading-text {
    color: #0284c7;
    font-size: 10px;
    letter-spacing: 0;
    animation: cd-pulse 1.4s infinite;
}

@keyframes cd-pulse {
    0%, 100% {
        opacity: .45;
    }

    50% {
        opacity: 1;
    }
}

/* ── Appointment Summary ──────────────────── */

.cd-appointment-summary {
    display: grid;
    grid-template-columns: 42px 1fr auto auto;
    gap: 12px;
    align-items: center;
    padding: 12px;
    margin-top: 6px;
    border: 1px solid #bfdbfe;
    border-radius: 10px;
    background: #f8fbff;
}

.cd-summary-check {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #004aad;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
}

.cd-summary-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.cd-summary-info strong {
    font-size: 13px;
    color: #0f172a;
}

.cd-summary-info span {
    font-size: 9px;
    color: #64748b;
}

.cd-summary-fee {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.cd-summary-fee small {
    font-size: 8px;
    color: #64748b;
}

.cd-summary-fee strong {
    margin-top: 2px;
    font-size: 12px;
    color: #0f172a;
}

.cd-summary-book {
    min-height: 38px;
    padding: 0 15px;
    border: none;
    border-radius: 7px;
    background: #004aad;
    color: white;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all .18s ease;
}

.cd-summary-book:hover {
    background: #003b8a;
    transform: translateY(-1px);
}

.cd-summary-book span {
    font-size: 15px;
}

/* ── Mobile ───────────────────────────────── */

@media (max-width: 700px) {

    .cd-date-selector {
        grid-template-columns: repeat(4, 1fr);
    }

    .cd-hour-row {
        grid-template-columns: 65px 1fr;
    }

    .cd-hour-slots {
        grid-template-columns: repeat(2, 1fr);
    }

    .cd-appointment-summary {
        grid-template-columns: 34px 1fr;
    }

    .cd-summary-fee {
        display: none;
    }

    .cd-summary-book {
        grid-column: 1 / -1;
        justify-content: center;
    }
}

/* ══════════════════════════════════════════════
   REVIEWS SECTION
   ══════════════════════════════════════════════ */
.cd-reviews-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

@media (max-width: 768px) {
    .cd-reviews-grid {
        grid-template-columns: 1fr;
    }
}

.cd-review-card {
    padding: 24px;
    transition: box-shadow 0.2s;
}

.cd-review-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.cd-review-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 12px;
}

.cd-review-author-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.cd-review-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    flex-shrink: 0;
}

.cd-review-author-info {
    display: flex;
    flex-direction: column;
}

.cd-review-author {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
}

.cd-review-time {
    font-size: 12px;
    color: #64748b;
}

.cd-star-rating {
    display: inline-flex;
    align-items: center;
    gap: 2px;
}

.cd-review-text {
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
    margin: 0 0 16px 0;
}

/* ── Reply ─────────────────────────────────── */
.cd-review-reply {
    background: #f8fafc;
    border-radius: 8px;
    padding: 16px;
}

.cd-reply-author-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.cd-reply-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.cd-reply-author {
    font-size: 13px;
    font-weight: 600;
    color: #0284c7;
}

.cd-reply-text {
    font-size: 13px;
    line-height: 1.6;
    color: #475569;
    margin: 0;
}

/* ── Reviews Footer ────────────────────────── */
.cd-reviews-footer {
    display: flex;
    justify-content: center;
    margin-top: 24px;
}

.cd-view-all-btn {
    padding: 10px 32px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    font-size: 14px;
    font-weight: 600;
    color: #334155;
    cursor: pointer;
    transition: all 0.2s;
}

.cd-view-all-btn:hover {
    background: #f8fafc;
    border-color: #94a3b8;
    color: #0f172a;
}

/* ══════════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════════ */
@media (max-width: 640px) {
    .cd-hero {
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
    }

    .cd-book-btn {
        width: 100%;
        justify-content: center;
    }

    .cd-main {
        padding: 20px 16px 40px;
        gap: 20px;
    }

    .cd-hero-name {
        font-size: 22px;
    }

    .cd-toggle-times {
        margin-left: 0;
    }

    .cd-doctor-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .cd-slots-grid {
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    }
}
```
`src\pages\patient\ClinicDetails.jsx`:

```jsx
// src/pages/patient/ClinicDetails.jsx
import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Heart, CheckCircle2, AlertCircle } from 'lucide-react';
import PatientNavbar from '../../components/PatientNavbar';
import { utcToLocalSpecific } from '../../utils/timezone';
import {
    fetchClinicDetails,
    fetchAvailability,
    getPatientFavorites,
    addDoctorToFavorites,
    removeDoctorFromFavorites
} from '../../api/patientApi';
import { getAuth } from '../../auth/authStorage';
import './ClinicDetails.css';

// ─── Helpers ───

const DAY_ORDER = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const DAY_SHORT = { MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu', FRIDAY: 'Fri', SATURDAY: 'Sat', SUNDAY: 'Sun' };

function formatTime12h(time24) {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

/** Merge consecutive days with same hours into grouped rows */
function mergeClinicHours(clinicHours) {
    const dayMap = {};
    for (const h of clinicHours) {
        if (h.dayOfWeek) {
            dayMap[h.dayOfWeek] = { start: h.startTime, end: h.endTime };
        }
    }

    const DAY_ORDER = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const DAY_SHORT = { SUNDAY: 'Sun', MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu', FRIDAY: 'Fri', SATURDAY: 'Sat' };

    const timeGroups = {};
    for (const day of DAY_ORDER) {
        const hours = dayMap[day];
        const timeStr = hours ? `${formatTime12h(hours.start)} - ${formatTime12h(hours.end)}` : 'Closed';
        if (!timeGroups[timeStr]) timeGroups[timeStr] = [];
        timeGroups[timeStr].push(day);
    }

    const rows = [];

    for (const [timeStr, days] of Object.entries(timeGroups)) {
        let labelParts = [];
        let rangeStart = days[0];
        let prevDayIndex = DAY_ORDER.indexOf(days[0]);

        for (let i = 1; i <= days.length; i++) {
            const currentDay = days[i];
            const currentIndex = DAY_ORDER.indexOf(currentDay);

            if (currentDay && currentIndex === prevDayIndex + 1) {
                prevDayIndex = currentIndex;
            } else {
                const rangeEnd = DAY_ORDER[prevDayIndex];
                if (rangeStart === rangeEnd) {
                    labelParts.push(DAY_SHORT[rangeStart]);
                } else {
                    labelParts.push(`${DAY_SHORT[rangeStart]} - ${DAY_SHORT[rangeEnd]}`);
                }

                rangeStart = currentDay;
                prevDayIndex = currentIndex;
            }
        }

        rows.push({ day: labelParts.join(', '), time: timeStr });
    }

    const openRows = rows.filter(r => r.time !== 'Closed');
    const closedRows = rows.filter(r => r.time === 'Closed');
    return [...openRows, ...closedRows];
}

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHrs = Math.floor(diffMin / 60);
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
}

function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

const AVATAR_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899'];
function colorFromName(name) {
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Get exactly the next 7 dates, starting from today */
function getUpcomingDates() {
    const dates = [];
    const today = new Date();

    for (let offset = 0; offset < 7; offset++) {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        dates.push(d);
    }
    return dates;
}

function formatDateLabel(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function formatDateForApi(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// ─── Helper: Doctor ID Extraction ───
function getDoctorId(doc) {
    if (!doc) return '';
    return String(doc.doctorId || doc.doctor?.id || doc.doctorUserId || doc.userId || doc.id || '').trim();
}

// ─── Sub-components ───

function StarRating({ rating, size = 14 }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.3;
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        } else if (i === fullStars && hasHalf) {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1">
                    <defs>
                        <linearGradient id={`half-${i}`}>
                            <stop offset="50%" stopColor="#eab308" />
                            <stop offset="50%" stopColor="#e2e8f0" />
                        </linearGradient>
                    </defs>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${i})`} />
                </svg>
            );
        } else {
            stars.push(
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        }
    }
    return <span className="cd-star-rating">{stars}</span>;
}

function ClinicHero({ clinic }) {
    return (
        <section className="cd-hero cd-card" id="clinic-hero">
            <div className="cd-hero-image-wrap">
                <img
                    src={clinic.imageUrl || '/clinic-building.jpg'}
                    alt={clinic.clinicName}
                    className="cd-hero-image"
                    onError={(e) => {
                        e.currentTarget.src = '/clinic-building.jpg';
                    }}
                />
            </div>
            <div className="cd-hero-info">
                <h1 className="cd-hero-name" id="clinic-name">{clinic.clinicName}</h1>
                <div className="cd-hero-address">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{clinic.detailedAddress || 'No address provided'}</span>
                </div>
                <div className="cd-hero-tags">
                    {clinic.specialties?.map((tag) => (
                        <span key={tag} className="cd-tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="cd-hero-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                <div className="cd-hero-fee">
                    <span className="cd-hero-fee-label">Checking Fee:</span>
                    <span className="cd-hero-fee-value">
                        {clinic.checkingFee != null ? `${clinic.checkingFee} JOD` : 'Free'}
                    </span>
                </div>
            </div>
        </section>
    );
}

function AboutSection({ clinic, mergedHours }) {
    return (
        <section className="cd-about-contact-grid" id="about-contact-section">
            <div className="cd-about cd-card" id="about-clinic">
                <h2 className="cd-section-title">About Our Clinic</h2>
                <p className="cd-about-text">
                    {clinic.description
                        ? (clinic.description.endsWith('.') ? clinic.description : `${clinic.description}.`)
                        : 'No description available.'}
                </p>
            </div>

            <div className="cd-contact cd-card" id="contact-hours">
                <h2 className="cd-section-title">Contact & Hours</h2>
                <div className="cd-contact-items">
                    <div className="cd-contact-item">
                        <div className="cd-contact-icon cd-contact-icon-phone">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div className="cd-contact-detail">
                            <span className="cd-contact-label">Phone</span>
                            <span className="cd-contact-value">{clinic.phoneNumber || 'Not provided'}</span>
                        </div>
                    </div>

                    <div className="cd-contact-item">
                        <div className="cd-contact-icon cd-contact-icon-email">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className="cd-contact-detail">
                            <span className="cd-contact-label">Email</span>
                            <span className="cd-contact-value">{clinic.email || 'Not provided'}</span>
                        </div>
                    </div>

                    {clinic.socialLinks && (
                        <div className="cd-contact-item">
                            <div className="cd-contact-icon cd-contact-icon-email">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                            </div>
                            <div className="cd-contact-detail">
                                <span className="cd-contact-label">Social</span>
                                <div className="cd-contact-value flex flex-col gap-1">
                                    {(Array.isArray(clinic.socialLinks) ? clinic.socialLinks : [clinic.socialLinks])
                                        .filter(link => link && link.trim() !== '')
                                        .map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.startsWith('http') ? link : `https://${link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline break-all"
                                            >
                                                {link}
                                            </a>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="cd-hours-table">
                    {mergedHours.map((h) => (
                        <div key={h.day} className="cd-hours-row">
                            <span className="cd-hours-day">{h.day}</span>
                            <span className={`cd-hours-time ${h.time === 'Closed' ? 'cd-hours-closed' : ''}`}>
                                {h.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimeSlotGrid({
    clinicId,
    doctorId,
    activeDates,
    selectedAppointment,
    onSelectAppointment,
    onProceedToBooking,
    services = []
}) {
    const [slotsByDate, setSlotsByDate] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(true);

    const [selectedDate, setSelectedDate] = useState(activeDates[0]);
    const [selectedServiceIds, setSelectedServiceIds] = useState(() => {
        return selectedAppointment?.serviceIds || (
            services.length > 0
                ? [services[0].id || services[0].serviceId]
                : []
        );
    });

    const resolvedDocId = typeof doctorId === 'object'
        ? (doctorId?.doctorId || doctorId?.id || doctorId?.userId)
        : doctorId;

    /*
     * Normalize services so the component can work with:
     * serviceId / id
     * serviceName / name
     * duration / durationMinutes
     */
    const treatments = services.map((service, index) => ({
        id: service.serviceId || service.id || `service-${index}`,
        name: service.serviceName || service.name || 'Dental Consultation',
        duration: service.durationMinutes || service.duration || 30
    }));

    /*
     * Get availability for the next 7 days.
     */
    useEffect(() => {
        let cancelled = false;

        if (!selectedServiceIds.length) {
            setSlotsByDate({});
            setLoadingSlots(false);
            return;
        }

        setLoadingSlots(true);
        Promise.all(
            activeDates.map(date => {
                const dateStr = formatDateForApi(date);
                return fetchAvailability({
                    clinicId,
                    date: dateStr,
                    doctorId: resolvedDocId || undefined,
                    serviceIds: selectedServiceIds
                })
                    .then(res => {
                        const rawSlots = Array.isArray(res)
                            ? res
                            : (res?.slots || res?.availableSlots || res?.data || []);

                        return {
                            date: dateStr,
                            slots: rawSlots
                        };
                    })
                    .catch(() => ({
                        date: dateStr,
                        slots: []
                    }));
            })
        ).then(results => {
            if (cancelled) return;

            const map = {};

            results.forEach(result => {
                const convertedSlots = result.slots
                    .map(slot => {
                        const rawTime =
                            typeof slot === 'string'
                                ? slot
                                : (slot.time || slot.startTime || '');

                        if (!rawTime) return null;

                        const timeWithSec =
                            rawTime.length === 5
                                ? `${rawTime}:00`
                                : rawTime;

                        return {
                            time: timeWithSec.substring(0, 5),
                            rawTime,
                            available:
                                typeof slot === 'object'
                                    ? slot.available !== false
                                    : true,
                            date: result.date,
                            originalUtcDate: result.date,
                            scheduleId:
                                typeof slot === 'object'
                                    ? (slot.scheduleId || slot.id)
                                    : undefined
                        };
                    })
                    .filter(Boolean);

                map[result.date] = convertedSlots.sort(
                    (a, b) => a.time.localeCompare(b.time)
                );
            });

            setSlotsByDate(map);
            setLoadingSlots(false);
        });

        return () => { cancelled = true; };
    }, [clinicId, resolvedDocId, activeDates, selectedServiceIds]);

    const handleTreatmentClick = (serviceId) => {
        setSelectedServiceIds(prev => {
            if (prev.includes(serviceId)) {
                if (prev.length === 1) return prev;
                return prev.filter(id => id !== serviceId);
            }

            if (prev.length >= 2) return prev;

            return [...prev, serviceId];
        });
    };

    useEffect(() => {
        if (selectedAppointment && selectedDate) {
            const currentSlots = slotsByDate[formatDateForApi(selectedDate)] || [];
            if (currentSlots.length > 0) {
                const match = currentSlots.find(
                    slot =>
                        slot.time === selectedAppointment.time &&
                        slot.originalUtcDate === selectedAppointment.date
                );
                
                if (!match || !match.available) {
                    onSelectAppointment(null);
                }
            }
        }
    }, [slotsByDate, selectedDate, selectedAppointment, onSelectAppointment]);

    /*
     * Select a time slot.
     */
    const handleSlotClick = (slot) => {
        if (!slot.available) return;

        const dateStr = formatDateForApi(selectedDate);

        const isSameSlot =
            selectedAppointment?.doctorId === resolvedDocId &&
            selectedAppointment?.date === slot.originalUtcDate &&
            selectedAppointment?.time === slot.time;

        if (isSameSlot) {
            onSelectAppointment(null);
            return;
        }

        onSelectAppointment({
            doctorId: resolvedDocId,
            day: formatDateLabel(selectedDate),
            time: slot.time,
            date: slot.originalUtcDate,
            rawTime: slot.rawTime,
            serviceIds: selectedServiceIds
        });
    };

    /*
     * Keep appointment data synchronized when treatments change.
     */
    useEffect(() => {
        if (!selectedAppointment) return;

        onSelectAppointment({
            ...selectedAppointment,
            serviceIds: selectedServiceIds
        });
    }, [selectedServiceIds]);

    const selectedDateStr = formatDateForApi(selectedDate);

    const currentSlots =
        slotsByDate[selectedDateStr] || [];

    /*
     * Group slots by hour.
     *
     * Example:
     * 10:00
     * 10:15
     * 10:30
     * 10:45
     */
    const groupedSlots = {};

    currentSlots.forEach(slot => {
        const hour = slot.time.split(':')[0];

        if (!groupedSlots[hour]) {
            groupedSlots[hour] = [];
        }

        groupedSlots[hour].push(slot);
    });

    const selectedTreatmentNames = treatments
        .filter(t => selectedServiceIds.includes(t.id))
        .map(t => t.name);

    const selectedDuration = treatments
        .filter(t => selectedServiceIds.includes(t.id))
        .reduce((total, t) => total + Number(t.duration || 30), 0);

    const selectedSlot =
        currentSlots.find(
            slot =>
                selectedAppointment?.time === slot.time &&
                selectedAppointment?.date === slot.originalUtcDate
        );

    return (
        <div className="cd-appointment-picker">

            {/* ─────────────────────────────
                1. TREATMENT
            ───────────────────────────── */}

            <div className="cd-appointment-section">

                <div className="cd-appointment-heading">
                    <span>SELECT TREATMENT & DURATION</span>
                </div>

                <div className="cd-treatment-list">

                    {treatments.length > 0 ? (
                        treatments.map(treatment => {
                            const selected =
                                selectedServiceIds.includes(treatment.id);

                            return (
                                <button
                                    key={treatment.id}
                                    type="button"
                                    className={`cd-treatment-btn ${selected
                                        ? 'cd-treatment-selected'
                                        : ''
                                        }`}
                                    onClick={() =>
                                        handleTreatmentClick(treatment.id)
                                    }
                                >
                                    <span className="cd-treatment-radio">
                                        {selected ? '✓' : ''}
                                    </span>

                                    <span className="cd-treatment-name">
                                        {treatment.name}
                                    </span>

                                    <span className="cd-treatment-duration">
                                        {treatment.duration} min
                                    </span>
                                </button>
                            );
                        })
                    ) : (
                        <button
                            type="button"
                            className="cd-treatment-btn cd-treatment-selected"
                        >
                            <span className="cd-treatment-radio">✓</span>

                            <span className="cd-treatment-name">
                                Dental Consultation
                            </span>

                            <span className="cd-treatment-duration">
                                30 min
                            </span>
                        </button>
                    )}

                </div>

                {selectedServiceIds.length >= 2 && (
                    <div className="cd-treatment-limit">
                        Maximum of 2 treatments can be selected.
                    </div>
                )}

            </div>


            {/* ─────────────────────────────
                2. DATE SELECTOR
            ───────────────────────────── */}

            <div className="cd-appointment-section">

                <div className="cd-appointment-heading">
                    <span>SELECT DATE</span>

                    <span className="cd-appointment-legend">
                        <span>
                            <i className="cd-dot-selected"></i>
                            Selected
                        </span>

                        <span>
                            <i className="cd-dot-available"></i>
                            Available
                        </span>

                        <span>
                            <i className="cd-dot-booked"></i>
                            Booked
                        </span>
                    </span>
                </div>

                <div className="cd-date-selector">

                    {activeDates.map(date => {
                        const dateStr =
                            formatDateForApi(date);

                        const isSelected =
                            selectedDateStr === dateStr;

                        const slots =
                            slotsByDate[dateStr] || [];

                        const availableCount =
                            slots.filter(
                                s => s.available
                            ).length;

                        return (
                            <button
                                key={dateStr}
                                type="button"
                                className={`cd-date-btn ${isSelected
                                    ? 'cd-date-selected'
                                    : ''
                                    }`}
                                onClick={() => {
                                    setSelectedDate(date);

                                    if (
                                        selectedAppointment &&
                                        selectedAppointment.date !==
                                        dateStr
                                    ) {
                                        onSelectAppointment(null);
                                    }
                                }}
                            >
                                <span className="cd-date-top">
                                    {formatDateLabel(date).split(',')[0]}
                                </span>

                                <strong>
                                    {date.getDate()}
                                </strong>

                                <span className="cd-date-month">
                                    {date.toLocaleDateString(
                                        'en-US',
                                        { month: 'short' }
                                    )}
                                </span>

                                {availableCount > 0 && (
                                    <span className="cd-date-available">
                                        {availableCount} slots
                                    </span>
                                )}
                            </button>
                        );
                    })}

                </div>
            </div>


            {/* ─────────────────────────────
                3. TIME
            ───────────────────────────── */}

            <div className="cd-appointment-section">

                <div className="cd-appointment-heading">
                    <span>SELECT TIME</span>

                    {loadingSlots && (
                        <span className="cd-loading-text">
                            Loading...
                        </span>
                    )}
                </div>

                {!loadingSlots && currentSlots.length === 0 ? (

                    <div className="cd-no-slots">
                        No available appointments for this date.
                    </div>

                ) : (

                    <div className="cd-hour-list">

                        {Object.entries(groupedSlots)
                            .sort(([a], [b]) =>
                                a.localeCompare(b)
                            )
                            .map(([hour, slots]) => (

                                <div
                                    key={hour}
                                    className="cd-hour-row"
                                >

                                    <div className="cd-hour-label">
                                        <strong>
                                            {formatTime12h(
                                                `${hour}:00`
                                            )}
                                        </strong>

                                        <span>
                                            {slots.filter(
                                                s => s.available
                                            ).length} Slots Free
                                        </span>
                                    </div>

                                    <div className="cd-hour-slots">

                                        {[0, 15, 30, 45].map(
                                            minute => {

                                                const minuteString =
                                                    String(
                                                        minute
                                                    ).padStart(
                                                        2,
                                                        '0'
                                                    );

                                                const slot =
                                                    slots.find(
                                                        s =>
                                                            s.time.startsWith(
                                                                `${hour}:${minuteString}`
                                                            )
                                                    );

                                                /*
                                                 * If backend doesn't
                                                 * return this 15-min
                                                 * slot, don't create
                                                 * a fake appointment.
                                                 */
                                                if (!slot) {
                                                    return (
                                                        <div
                                                            key={minute}
                                                            className="cd-slot-empty"
                                                        />
                                                    );
                                                }

                                                const isSelected =
                                                    selectedAppointment?.doctorId ===
                                                    resolvedDocId &&
                                                    selectedAppointment?.date ===
                                                    slot.originalUtcDate &&
                                                    selectedAppointment?.time ===
                                                    slot.time;

                                                return (
                                                    <button
                                                        key={minute}
                                                        type="button"
                                                        disabled={
                                                            !slot.available
                                                        }
                                                        className={`cd-new-slot ${isSelected
                                                            ? 'cd-new-slot-selected'
                                                            : slot.available
                                                                ? 'cd-new-slot-available'
                                                                : 'cd-new-slot-booked'
                                                            }`}
                                                        onClick={() =>
                                                            handleSlotClick(
                                                                slot
                                                            )
                                                        }
                                                    >
                                                        <span>
                                                            {slot.time}
                                                        </span>

                                                        {!slot.available && (
                                                            <small>
                                                                Booked
                                                            </small>
                                                        )}

                                                        {slot.available &&
                                                            !isSelected && (
                                                                <small>
                                                                    Available
                                                                </small>
                                                            )}
                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>
                            ))}

                    </div>
                )}

            </div>


            {/* ─────────────────────────────
                4. BOTTOM SUMMARY
            ───────────────────────────── */}

            {selectedAppointment && (

                <div className="cd-appointment-summary">

                    <div className="cd-summary-check">
                        ✓
                    </div>

                    <div className="cd-summary-info">

                        <strong>
                            {selectedAppointment.time} —{' '}
                            {selectedDuration} MIN
                        </strong>

                        <span>
                            {selectedTreatmentNames.join(', ') ||
                                'Dental Consultation'}
                        </span>

                        <span>
                            {formatDateLabel(selectedDate)}
                        </span>

                    </div>

                    <div className="cd-summary-fee">

                        <small>
                            TOTAL FEE
                        </small>

                        <strong>
                            {/* The actual clinic fee remains
                                handled by your booking page */}
                            {selectedDuration} MIN
                        </strong>

                    </div>

                    <button
                        type="button"
                        className="cd-summary-book"
                        onClick={onProceedToBooking}
                    >
                        Proceed to Booking
                        <span>→</span>
                    </button>

                </div>
            )}

        </div>
    );
}
function DoctorCard({
    doctor,
    clinicId,
    selectedAppointment,
    onSelectAppointment,
    isFavorited,
    onToggleFavorite,
    services = []
}) {
    const navigate = useNavigate();
    const [showSlots, setShowSlots] = useState(false);

    const mockRating = 4.8;
    const activeDates = useMemo(() => getUpcomingDates(), []);
    const doctorId = getDoctorId(doctor);
    const isSelectedDoctor = selectedAppointment?.doctorId === doctorId;

    const handleBookClick = () => {
        navigate(`/book-appointment/${clinicId}`, {
            state: {
                clinicId,
                doctorId: doctorId,
                doctorName: doctor.fullName,
                doctorSpecialty: doctor.specialty,
                selectedDate: isSelectedDoctor ? selectedAppointment?.date : undefined,
                selectedTime: isSelectedDoctor ? selectedAppointment?.time : undefined,
                selectedDay: isSelectedDoctor ? selectedAppointment?.day : undefined
            }
        });
    };
    const handleProceedToBooking = () => {
        navigate(`/book-appointment/${clinicId}`, {
            state: {
                clinicId,
                doctorId,
                doctorName: doctor.fullName,
                doctorSpecialty: doctor.specialty,

                selectedDate: selectedAppointment?.date,
                selectedTime: selectedAppointment?.time,
                selectedDay: selectedAppointment?.day,

                serviceIds: selectedAppointment?.serviceIds || []
            }
        });
    };

    const doctorSpecialties = (doctor.specialty || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const doctorServices = doctorSpecialties.length > 0
        ? services.filter(service => {
            const sName = (service.serviceName || service.name || '').toLowerCase();
            return doctorSpecialties.includes(sName);
        })
        : services;

    const finalServices = doctorServices.length > 0 ? doctorServices : services;

    return (
        <div className="cd-doctor-card cd-card" id={`doctor-card-${doctorId}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="cd-doctor-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0, flex: 1 }}>
                    <div
                        className="cd-doctor-avatar"
                        style={{
                            backgroundColor: colorFromName(doctor.fullName),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: '24px', fontWeight: 700
                        }}
                    >
                        {getInitials(doctor.fullName)}
                    </div>
                    <div className="cd-doctor-info">
                        <div className="cd-doctor-name-row">
                            <h3 className="cd-doctor-name">{doctor.fullName}</h3>
                            <div className="cd-doctor-rating-badge">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308" stroke="none">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="cd-rating-number">{mockRating}</span>
                            </div>
                        </div>
                        <span className="cd-doctor-specialty">{doctor.specialty || 'General Dentist'}</span>
                        <p className="cd-doctor-desc">{doctor.bio || 'No bio available.'}</p>
                    </div>
                </div>

                {/* Favorite Heart & Book Appointment Buttons */}
                <div style={{ flexShrink: 0, marginLeft: '16px', marginTop: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(doctor);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '44px',
                            height: '44px',
                            borderRadius: '14px',
                            border: isFavorited ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
                            backgroundColor: isFavorited ? '#fff1f2' : '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: isFavorited ? '0 4px 12px -2px rgba(225, 29, 72, 0.3)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                        }}
                        title={isFavorited ? 'Remove from favorite doctors' : 'Add doctor to favorites'}
                    >
                        <Heart
                            size={22}
                            style={{
                                fill: isFavorited ? '#e11d48' : 'none',
                                color: isFavorited ? '#e11d48' : '#94a3b8',
                                strokeWidth: isFavorited ? 2.5 : 2,
                                transition: 'transform 0.15s ease'
                            }}
                        />
                    </button>

                </div>
            </div>

            <button
                className="cd-toggle-times"
                onClick={() => setShowSlots(!showSlots)}
                id={`toggle-times-${doctorId}`}
                style={{ marginTop: '16px' }}
            >
                {showSlots ? 'Hide' : 'View'} Available Times{' '}
                <span className={`cd-toggle-arrow ${showSlots ? 'cd-arrow-up' : ''}`}>▾</span>
            </button>

            {showSlots && (
                <TimeSlotGrid
                    clinicId={clinicId}
                    doctorId={doctor.doctorId || doctor.id}
                    activeDates={activeDates}
                    selectedAppointment={selectedAppointment}
                    onSelectAppointment={onSelectAppointment}
                    services={finalServices}
                    onProceedToBooking={handleProceedToBooking}
                />
            )}
        </div>
    );
}

function ReviewCard({ review, clinicName }) {
    return (
        <div className="cd-review-card cd-card" id={`review-${review.reviewId}`}>
            <div className="cd-review-header">
                <div className="cd-review-author-row">
                    <div
                        className="cd-review-avatar"
                        style={{ backgroundColor: colorFromName(review.patientName) }}
                    >
                        {getInitials(review.patientName)}
                    </div>
                    <div className="cd-review-author-info">
                        <span className="cd-review-author">{review.patientName}</span>
                        <span className="cd-review-time">{timeAgo(review.createdAt)}</span>
                    </div>
                </div>
                <StarRating rating={review.rating} size={13} />
            </div>
            <p className="cd-review-text">"{review.comment}"</p>
            {review.reply && (
                <div className="cd-review-reply">
                    <div className="cd-reply-author-row">
                        <div className="cd-reply-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <span className="cd-reply-author">{clinicName}</span>
                    </div>
                    <p className="cd-reply-text">{review.reply}</p>
                </div>
            )}
        </div>
    );
}

// ─── Main Page Component ───

export default function ClinicDetails() {
    const { id: clinicId } = useParams();
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(Boolean(clinicId));
    const [error, setError] = useState(clinicId ? null : 'No clinic ID provided');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);
    const [toast, setToast] = useState(null);
    const auth = getAuth();

    const fetchFavorites = () => {
        if (auth?.token) {
            getPatientFavorites()
                .then(favs => {
                    const list = Array.isArray(favs) ? favs : (favs?.favorites || favs?.data || []);
                    setFavoritesList(list);
                })
                .catch(() => { });
        }
    };

    useEffect(() => {
        if (!clinicId) return;

        fetchClinicDetails(clinicId)
            .then(data => {
                setClinic(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

        fetchFavorites();
    }, [clinicId, auth?.token]);

    const clinicHours = clinic?.clinicHours;
    const mergedHours = useMemo(() => {
        if (!clinicHours) return [];
        return mergeClinicHours(clinicHours);
    }, [clinicHours]);

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    }

    // Check if doctor matches any item in favoritesList
    const isDoctorInFavorites = (doctor) => {
        const targetId = getDoctorId(doctor).toLowerCase();
        if (!targetId) return false;

        return favoritesList.some(f => {
            const fDoctorId = String(f?.doctorId || f?.doctor?.id || f?.doctorUserId || f?.userId || f?.id || '').trim().toLowerCase();
            return fDoctorId === targetId;
        });
    };

    // Toggle favorite doctor
    async function handleToggleFavorite(doctor) {
        if (!auth?.token) {
            showToast('Please sign in to manage favorite doctors.', 'error');
            return;
        }

        const targetId = getDoctorId(doctor);
        if (!targetId) return;

        const isFav = isDoctorInFavorites(doctor);

        if (isFav) {
            // Unfavorite (DELETE)
            setFavoritesList(prev => prev.filter(f => {
                const fId = String(f?.doctorId || f?.doctor?.id || f?.doctorUserId || f?.userId || f?.id || '').trim().toLowerCase();
                return fId !== targetId.toLowerCase();
            }));

            try {
                await removeDoctorFromFavorites(targetId);
                showToast('Doctor removed from favorites', 'info');
            } catch (err) {
                console.error('Failed to remove favorite doctor:', err);
                showToast(err.message || 'Failed to remove from favorites', 'error');
                fetchFavorites();
            }
        } else {
            // Favorite (POST)
            const newFavItem = {
                doctorId: targetId,
                id: targetId,
                doctorName: doctor.fullName,
                clinicName: clinic?.clinicName
            };
            setFavoritesList(prev => [...prev, newFavItem]);

            try {
                await addDoctorToFavorites(targetId);
                showToast('Doctor added to favorites', 'success');
            } catch (err) {
                if (err.message?.includes('already in favorites') || err.message?.includes('409')) {
                    showToast('Doctor is in your favorites', 'info');
                } else {
                    console.error('Failed to add favorite doctor:', err);
                    showToast(err.message || 'Failed to add to favorites', 'error');
                    fetchFavorites();
                }
            }
        }
    }

    if (loading) {
        return (
            <div className="cd-page">
                <PatientNavbar />
                <main className="cd-main">
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b', fontSize: '16px' }}>
                        Loading clinic details...
                    </div>
                </main>
            </div>
        );
    }

    if (error || !clinic) {
        return (
            <div className="cd-page">
                <PatientNavbar />
                <main className="cd-main">
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#dc2626', fontSize: '16px' }}>
                        {error || 'Clinic not found'}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="cd-page relative">
            <PatientNavbar />

            {/* Floating Toast Notification */}
            {toast && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '28px',
                        right: '28px',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 18px',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: 700,
                        backgroundColor: toast.type === 'success' ? '#ecfdf5' : toast.type === 'info' ? '#fff1f2' : '#fef2f2',
                        color: toast.type === 'success' ? '#047857' : toast.type === 'info' ? '#e11d48' : '#b91c1c',
                        border: toast.type === 'success' ? '1px solid #a7f3d0' : toast.type === 'info' ? '1px solid #fecdd3' : '1px solid #fecaca',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        animation: 'fadeInUp 0.3s ease-out'
                    }}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : toast.type === 'info' ? (
                        <Heart size={18} className="fill-rose-600 text-rose-600" />
                    ) : (
                        <AlertCircle size={18} className="text-red-600" />
                    )}
                    <span>{toast.message}</span>
                </div>
            )}

            <main className="cd-main">
                <ClinicHero clinic={clinic} />

                <AboutSection clinic={clinic} mergedHours={mergedHours} />

                <section className="cd-doctors-section" id="our-doctors">
                    <h2 className="cd-section-title">Our Doctors</h2>
                    <div className="cd-doctors-list">
                        {clinic.doctors?.filter(doc => doc.isActive !== false).map((doc) => {
                            const isFav = isDoctorInFavorites(doc);

                            return (
                                <DoctorCard
                                    key={getDoctorId(doc)}
                                    doctor={doc}
                                    clinicId={clinicId}
                                    selectedAppointment={selectedAppointment}
                                    onSelectAppointment={setSelectedAppointment}
                                    isFavorited={isFav}
                                    onToggleFavorite={handleToggleFavorite}
                                    services={clinic.services || []}
                                />
                            );
                        })}
                        {(!clinic.doctors || clinic.doctors.length === 0) && (
                            <div className="cd-card" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                                No doctors are currently available at this clinic.
                            </div>
                        )}
                    </div>
                </section>

                <section className="cd-reviews-section" id="reviews-section">
                    <h2 className="cd-section-title">Reviews & Replies</h2>
                    {clinic.reviews?.length > 0 ? (
                        <div className="cd-reviews-grid">
                            {clinic.reviews.map((review) => (
                                <ReviewCard key={review.reviewId} review={review} clinicName={clinic.clinicName} />
                            ))}
                        </div>
                    ) : (
                        <div className="cd-card" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                            No reviews yet. Be the first to review this clinic!
                        </div>
                    )}
                    {clinic.reviews?.length > 0 && (
                        <div className="cd-reviews-footer">
                            <button className="cd-view-all-btn" id="view-all-reviews-btn">
                                View All Reviews
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
```
`src\pages\patient\UserProfile.jsx`:

```jsx
// src/pages/patient/UserProfile.jsx
import  { useState, useEffect, useMemo,useRef} from 'react';
import { useNavigate } from 'react-router';
import { getAuth } from '../../auth/authStorage';
import PatientNavbar from '../../components/PatientNavbar';
import { login } from '../../api/authApi';
import {
    getMyProfile,
    updateMyProfile,
    getPatientFavorites,
    addDoctorToFavorites,
    removeDoctorFromFavorites,
    getPatientAppointments,
    getDoctorAppointments,
    getDoctorSchedule
} from '../../api/patientApi';
import {
    Mail,
    Phone,
    MapPin,
    Edit3,
    Heart,
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft,
    X,
    Lock,
    KeyRound,
    ChevronLeft,
    ChevronRight,
    Plus,

} from 'lucide-react';
import { utcToLocalRecurring, utcToLocalSpecific } from '../../utils/timezone';

export default function UserProfile() {
    const navigate = useNavigate();
    const auth = getAuth();
    const appointmentsSectionRef = useRef(null);

    const scrollToAppointments = () => {
        appointmentsSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    // ── Profile State ──
    const [userData, setUserData] = useState({
        fullName: 'Loading...',
        role: auth?.role || 'PATIENT',
        city: 'AMMAN',
        email: '',
        phone: '',
        bio: '',
        visits: 0,
        upcoming: 0,
        favorites: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    const isDoctor = auth?.role === 'DOCTOR' || userData.role === 'DOCTOR';

    // ── Edit Profile Modal State ──

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editStep, setEditStep] = useState('verify'); // 'verify' | 'form'
    const [verifyPassword, setVerifyPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: 'AMMAN',
        newPassword: '',
        confirmPassword: ''
    });

    // ── Appointments & History State (Patient) ──
    const [historyFilter, setHistoryFilter] = useState('Past'); // 'Past' | 'Upcoming' | 'All'
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [historyList, setHistoryList] = useState([]);
    const [showAllUpcoming, setShowAllUpcoming] = useState(false);

    // ── Appointments & History State (Doctor) ──
    const [docHistoryFilter, setDocHistoryFilter] = useState('Past'); // 'Past' | 'Upcoming' | 'All'
    const [doctorAppointments, setDoctorAppointments] = useState([]);
    const [doctorSchedules, setDoctorSchedules] = useState([]);
    const [showAllDocUpcoming, setShowAllDocUpcoming] = useState(false);

    // ── Doctor Calendar & Weekly View State ──
    const [calendarTab, setCalendarTab] = useState('Month'); // 'Month' | 'Week' | 'Day'
    const [currentCalDate, setCurrentCalDate] = useState(new Date());

    // ── Favorites State ──
    const [favoritesList, setFavoritesList] = useState([]);

    // ── Initial Data Fetching ──
    useEffect(() => {
        loadInitialData();
    }, []);

    // ── Reload Patient Appointments When Filter Changes ──
    useEffect(() => {
        if (!isDoctor) {
            loadPatientAppointments(historyFilter.toLowerCase());
        }
    }, [historyFilter, isDoctor]);

    async function loadInitialData() {
        setIsLoading(true);
        try {
            // 1. Fetch Profile Info
            const profile = await getMyProfile();
            setUserData(prev => ({
                ...prev,
                fullName: profile.fullName || '',
                role: profile.role || 'PATIENT',
                city: profile.city || 'AMMAN',
                email: profile.email || '',
                phone: profile.phone || '07 XXXX XXXX',
                bio: profile.bio || '',
            }));

            // 2. Fetch Appointments & Schedules
            if (profile.role === 'DOCTOR') {
                const [docApts, docSched] = await Promise.all([
                    getDoctorAppointments(null, 'all'),
                    getDoctorSchedule()
                ]);
                const aptsList = docApts || [];
                setDoctorAppointments(aptsList);
                setDoctorSchedules(docSched || []);

                const now = new Date();
                const upcomingCount = aptsList.filter(a => new Date(a.appointmentAt) > now && a.status !== 'CANCELLED').length;
                setUserData(prev => ({
                    ...prev,
                    upcoming: upcomingCount
                }));
            } else {
                const [favs, upcomingRes] = await Promise.all([
                    getPatientFavorites(),
                    getPatientAppointments('upcoming')
                ]);
                setFavoritesList(favs || []);
                setUpcomingAppointments(upcomingRes?.appointments || []);
                setUserData(prev => ({
                    ...prev,
                    favorites: favs?.length || 0,
                    upcoming: upcomingRes?.count || upcomingRes?.appointments?.length || 0
                }));
            }
        } catch (err) {
            console.error('Failed to load profile data:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadPatientAppointments(scope) {
        try {
            const res = await getPatientAppointments(scope === 'past' ? 'all' : scope);
            setHistoryList(res?.appointments || []);
        } catch (err) {
            console.error('Failed to load scoped appointments:', err);
        }
    }

    // ── Filter Patient Appointments ──
    const filteredHistoryList = useMemo(() => {
        const now = new Date();

        return historyList.filter((item) => {
            if (!item.appointmentAt) return false;
            const itemDate = new Date(item.appointmentAt);
            const hasPassed = itemDate <= now;

            if (historyFilter === 'Past') return hasPassed;
            if (historyFilter === 'Upcoming') return !hasPassed && item.status !== 'CANCELLED';
            return true;
        });
    }, [historyList, historyFilter]);

    // Number of visits = number of appointments currently in Appointment History
    const visitsCount = useMemo(() => {
        return filteredHistoryList.length;
    }, [filteredHistoryList]);

    // ── Filter Doctor Appointments: 1. Upcoming ──
    const upcomingDoctorAppointments = useMemo(() => {
        const now = new Date();
        return doctorAppointments.filter((item) => {
            if (!item.appointmentAt) return false;
            const itemDate = new Date(item.appointmentAt);
            return itemDate > now && item.status !== 'CANCELLED';
        });
    }, [doctorAppointments]);

    // ── Filter Doctor Appointments: 2. History ──
    const filteredDoctorHistoryList = useMemo(() => {
        const now = new Date();

        return doctorAppointments.filter((item) => {
            if (!item.appointmentAt) return false;
            const itemDate = new Date(item.appointmentAt);
            const hasPassed = itemDate <= now;

            if (docHistoryFilter === 'Past') return hasPassed;
            if (docHistoryFilter === 'Upcoming') return !hasPassed && item.status !== 'CANCELLED';
            return true;
        });
    }, [doctorAppointments, docHistoryFilter]);

// Patient: Show first 3 by default, or all when expanded
    const displayedPatientUpcoming = useMemo(() => {
        return showAllUpcoming ? upcomingAppointments : upcomingAppointments.slice(0, 3);
    }, [upcomingAppointments, showAllUpcoming]);

    // Doctor: Show first 3 by default, or all when expanded
    const displayedDoctorUpcoming = useMemo(() => {
        return showAllDocUpcoming ? upcomingDoctorAppointments : upcomingDoctorAppointments.slice(0, 3);
    }, [upcomingDoctorAppointments, showAllDocUpcoming]);

    // ── Calendar Grid Computation ──
    const calendarDays = useMemo(() => {
        const year = currentCalDate.getFullYear();
        const month = currentCalDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        // Convert Sunday (0) to 7 for Mon (1) -> Sun (7) layout
        let startDay = firstDayOfMonth.getDay();
        startDay = startDay === 0 ? 6 : startDay - 1;

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const totalDays = lastDayOfMonth.getDate();

        const days = [];

        // Previous Month Overflow
        for (let i = startDay - 1; i >= 0; i--) {
            const dayNum = prevMonthLastDay - i;
            days.push({
                dayNumber: dayNum,
                isCurrentMonth: false,
                dateStr: `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
            });
        }

        // Current Month Days
        for (let i = 1; i <= totalDays; i++) {
            days.push({
                dayNumber: i,
                isCurrentMonth: true,
                dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
            });
        }

        // Next Month Overflow to make complete weeks (multiples of 7)
        const remaining = 7 - (days.length % 7);
        if (remaining < 7) {
            for (let i = 1; i <= remaining; i++) {
                days.push({
                    dayNumber: i,
                    isCurrentMonth: false,
                    dateStr: `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
                });
            }
        }

        return days;
    }, [currentCalDate]);

    function prevMonth() {
        setCurrentCalDate(new Date(currentCalDate.getFullYear(), currentCalDate.getMonth() - 1, 1));
    }

    function nextMonth() {
        setCurrentCalDate(new Date(currentCalDate.getFullYear(), currentCalDate.getMonth() + 1, 1));
    }

    // ── Toggle Favorite Doctor ──
    async function toggleFavorite(doctor) {
        const isFav = favoritesList.some(f => f.id === doctor.id || f.doctorId === doctor.id);
        const doctorId = doctor.id || doctor.doctorId;

        try {
            if (isFav) {
                await removeDoctorFromFavorites(doctorId);
                setFavoritesList(prev => prev.filter(f => (f.id || f.doctorId) !== doctorId));
                setUserData(prev => ({ ...prev, favorites: Math.max(0, prev.favorites - 1) }));
            } else {
                await addDoctorToFavorites(doctorId);
                setFavoritesList(prev => [...prev, doctor]);
                setUserData(prev => ({ ...prev, favorites: prev.favorites + 1 }));
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    }

    // ── Edit Profile Modal Handlers ──
    function handleOpenEditModal() {
        setEditStep('verify');
        setVerifyPassword("");
        setPasswordError("");
        setEditForm({
            fullName: userData.fullName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            city: userData.city || 'AMMAN',
            newPassword: '',
            confirmPassword: ''
        });
        setIsEditModalOpen(true);
    }

    async function handleVerifyPassword(e) {
        e.preventDefault();
        setPasswordError("");

        if (!verifyPassword.trim()) {
            setPasswordError("Please enter your current password to continue.");
            return;
        }

        setIsVerifying(true);
        try {
            // Verify current password against backend credentials
            await login({
                email: userData.email,
                password: verifyPassword
            });

            // Password is correct; unlock the edit form
            setEditStep('form');
            setPasswordError("");
        } catch (err) {
            setPasswordError("Incorrect password. Please enter your valid account password.");
        } finally {
            setIsVerifying(false);
        }
    }

    async function handleSaveProfile(e) {
        e.preventDefault();
        setPasswordError("");

        if (editForm.newPassword) {
            if (editForm.newPassword === verifyPassword) {
                setPasswordError("New password cannot be the same as your current password.");
                return;
            }
            if (editForm.newPassword.length < 8) {
                setPasswordError("New password must be at least 8 characters long.");
                return;
            }
            if (!editForm.confirmPassword) {
                setPasswordError("Please re-type your new password to confirm.");
                return;
            }
            if (editForm.newPassword !== editForm.confirmPassword) {
                setPasswordError("New password and confirm password do not match.");
                return;
            }
        }

        try {
            // Only send password fields if a new password was explicitly set
            const payload = {
                fullName: editForm.fullName,
                email: editForm.email,
                city: editForm.city,
                password: editForm.newPassword ? editForm.newPassword : null,
                confirmPassword: editForm.newPassword ? editForm.confirmPassword : null
            };

            const updated = await updateMyProfile(payload);

            setUserData(prev => ({
                ...prev,
                fullName: updated.fullName,
                email: updated.email,
                city: updated.city,
            }));

            setIsEditModalOpen(false);
            setPasswordError("");
            setVerifyPassword("");
        } catch (err) {
            setPasswordError(err.message || "Failed to update profile.");
        }
    }

    function formatDateTime(isoString) {
        if (!isoString) return 'Date not set';
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const userInitials = userData.fullName
        ? userData.fullName
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'U';

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
                <PatientNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <PatientNavbar />

            <main className="max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6">


                {/* ── 1. EDIT INFO SECTION ── */}

                <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[26px] font-bold text-slate-900">Profile</h2>                        <div className="flex items-center gap-2 mb-6">
                        <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
                            <button className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white text-blue-600 shadow-xs">
                                Profile
                            </button>
                            <button
                                onClick={scrollToAppointments}
                                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
                            >
                                Appointments
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
                            >
                                Book
                            </button>
                        </div>
                    </div>

                        <button
                            onClick={handleOpenEditModal}
                            className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit info"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-indigo-500 text-white font-bold text-xl flex items-center justify-center shadow-inner">
                                {userInitials}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                {userData.fullName}
                            </h3>

                            <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[11px] font-medium mt-1.5">
                                <MapPin className="w-3 h-3 text-indigo-500" />
                                {userData.city}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2.5 mb-6">
                        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 block font-medium">Email</span>
                                <span className="text-xs font-semibold text-slate-800">{userData.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 block font-medium">Phone</span>
                                <span className="text-xs font-semibold text-slate-800">{userData.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats counters */}
                    <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-slate-100 text-center">
                        <div>
                            <span className="text-xl font-extrabold text-slate-900 block">{String(isDoctor ? userData.visits : visitsCount).padStart(2, '0')}</span>
                            <span className="text-[11px] text-slate-400 font-medium">Visits</span>
                        </div>
                        <div className="border-x border-slate-100">
                            <span className="text-xl font-extrabold text-slate-900 block">
                                {String(userData.upcoming).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">Upcoming</span>
                        </div>
                        <div>
                            <span className="text-xl font-extrabold text-slate-900 block">
                                {String(userData.favorites).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">Favorites</span>
                        </div>
                    </div>
                </section>

                {/* ── 2. UPCOMING APPOINTMENTS SECTION (PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section
                        ref={appointmentsSectionRef}
                        className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 scroll-mt-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-slate-900">Upcoming Appointments</h2>
                            {upcomingAppointments.length > 3 && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllUpcoming(prev => !prev)}
                                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                                >
                                    {showAllUpcoming ? 'Show less' : `View all (${upcomingAppointments.length})`}
                                </button>
                            )}
                        </div>

                        {upcomingAppointments.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">No upcoming appointments booked.</p>
                        ) : (
                            <div className="space-y-3">
                                {displayedPatientUpcoming.map((apt) => (
                                    <div
                                        key={apt.appointmentId}
                                        className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                {apt.doctorName ? apt.doctorName.slice(0, 2).toUpperCase() : 'DR'}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">{apt.doctorName || 'Doctor Appointment'}</h4>
                                                <p className="text-[11px] text-slate-400">
                                                    {apt.serviceName || apt.serviceNames?.join(', ') || 'Dental Service'} · {formatDateTime(apt.appointmentAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                            {apt.status}
                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* ── 3. HISTORY APPOINTMENT SECTION (PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-slate-900">Appointment History</h2>

                            <p value="Past">Past Appointments list</p>


                        </div>

                        {filteredHistoryList.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">
                                No {historyFilter.toLowerCase()} appointments found.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {filteredHistoryList.map((item) => {
                                    const isCancelled = item.status === 'CANCELLED';
                                    const statusLabel = isCancelled ? 'CANCELLED' : 'FINISHED';

                                    return (
                                        <div
                                            key={item.appointmentId}
                                            className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-white"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                    {item.clinicName ? item.clinicName.slice(0, 2).toUpperCase() : 'CL'}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-900">{item.doctorName || item.clinicName}</h4>
                                                    <p className="text-[11px] text-slate-400">
                                                        {item.serviceNames?.join(', ') || item.serviceName || 'Dental Care'} · {formatDateTime(item.appointmentAt)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status Badge: Defaults to FINISHED unless explicitly CANCELLED */}
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isCancelled
                                                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                            }`}>
                                                {statusLabel}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                )}

                {/* ── 4. WALLET SECTION (STATIC - PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-slate-900">Wallet</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                Active
                            </span>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 p-5 text-white shadow-lg shadow-blue-500/20">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[11px] font-extrabold tracking-widest uppercase opacity-90">
                                    DENTACARE
                                </span>
                                <div className="w-8 h-6 rounded-md bg-white/20 backdrop-blur-xs flex items-center justify-center">
                                    <CreditCard className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <span className="text-[10px] uppercase font-medium opacity-80 block">Available balance</span>
                            <div className="text-2xl font-black tracking-tight mt-0.5 mb-6">
                                JOD 0.00
                            </div>

                            <div className="flex justify-between items-center text-xs font-mono opacity-80">
                                <span>•••• •••• 4832</span>
                                <span>09/26</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer">
                                <ArrowDownLeft className="w-3.5 h-3.5" />
                                Top up
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                                Send
                            </button>
                        </div>
                    </section>
                )}

                {/* ── 5. FAVORITE DOCTORS SECTION (PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                        <h2 className="text-base font-bold text-slate-900 mb-4">Favorite Doctors</h2>
                        {favoritesList.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">No favorited doctors added yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {favoritesList.map((fav) => (
                                    <div
                                        key={fav.id || fav.doctorId}
                                        className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                {fav.doctorName ? fav.doctorName.slice(0, 2).toUpperCase() : 'DR'}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">{fav.doctorName}</h4>
                                                <p className="text-[11px] text-slate-400">{fav.clinicName} · {fav.specialties || fav.city}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleFavorite(fav)}
                                            className="p-2 rounded-xl border bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100 transition-colors cursor-pointer"
                                            title="Remove favorite"
                                        >
                                            <Heart className="w-4 h-4 fill-rose-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* ── 6. DOCTOR PORTAL SECTIONS (DOCTOR ROLE ONLY) ── */}
                {isDoctor && (
                    <div className="space-y-6">

                        {/* 1. Doctor Upcoming Appointments */}
                        <section
                            ref={appointmentsSectionRef}
                            className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 scroll-mt-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-slate-900">Upcoming Appointments</h2>
                                {upcomingDoctorAppointments.length > 3 && (
                                    <button
                                        type="button"
                                        onClick={() => setShowAllDocUpcoming(prev => !prev)}
                                        className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                                    >
                                        {showAllDocUpcoming ? 'Show less' : `View all (${upcomingDoctorAppointments.length})`}
                                    </button>
                                )}
                            </div>

                            {upcomingDoctorAppointments.length === 0 ? (
                                <p className="text-xs text-slate-400 py-4 text-center">No upcoming appointments booked.</p>
                            ) : (
                                <div className="space-y-3">
                                    {displayedDoctorUpcoming.map((item) => (
                                        <div
                                            key={item.appointmentId}
                                            className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                    {item.patientName ? item.patientName.slice(0, 2).toUpperCase() : (item.formPatientName ? item.formPatientName.slice(0, 2).toUpperCase() : 'PT')}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-900">
                                                        {item.patientName || item.formPatientName || 'Patient'}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400">
                                                        {item.serviceNames?.join(', ') || item.serviceName || 'Dental Care'} · {formatDateTime(item.appointmentAt)}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        {item.status}
                    </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                        {/* 2. Doctor Appointment History */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-slate-900">Appointment History</h2>
                                <p value="Past">Past Appointments list</p>


                            </div>

                            {filteredDoctorHistoryList.length === 0 ? (
                                <p className="text-xs text-slate-400 py-4 text-center">
                                    No {docHistoryFilter.toLowerCase()} appointments found.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {filteredDoctorHistoryList.map((item) => {
                                        const isCancelled = item.status === 'CANCELLED';
                                        const statusLabel = isCancelled ? 'CANCELLED' : 'FINISHED';

                                        return (
                                            <div
                                                key={item.appointmentId}
                                                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                        {item.patientName ? item.patientName.slice(0, 2).toUpperCase() : 'PT'}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-slate-900">
                                                            {item.patientName || item.formPatientName || 'Patient'}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-400">
                                                            {item.serviceNames?.join(', ') || item.serviceName || 'Dental Care'} · {formatDateTime(item.appointmentAt)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isCancelled
                                                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                                }`}>
                                                    {statusLabel}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* 3. Weekly Schedule (Connected to backend doctorSchedules) */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-base font-bold text-slate-900">Weekly Schedule</h2>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
                                    This week
                                </span>
                            </div>

                            {doctorSchedules.length === 0 ? (
                                <p className="text-xs text-slate-400 py-4 text-center">No shifts or schedules registered for this week.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                        <tr className="text-slate-400 border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
                                            <th className="py-3 px-2">ID</th>
                                            <th className="py-3 px-2">SCHEDULE / SHIFT</th>
                                            <th className="py-3 px-2">TIME &amp; DATE</th>
                                            <th className="py-3 px-2">DOCTOR</th>
                                            <th className="py-3 px-2 text-right">STATUS</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                        {doctorSchedules.map((row) => {
                                            // Convert UTC schedule to Local Time
                                            let localDateStr = row.specificDate;
                                            let localDayStr = row.dayOfWeek;
                                            let localStart = row.startTime ? row.startTime.substring(0, 5) : "";
                                            let localEnd = row.endTime ? row.endTime.substring(0, 5) : "";

                                            if (row.specificDate) {
                                                const start = utcToLocalSpecific(row.specificDate, localStart || "00:00");
                                                const end = utcToLocalSpecific(row.specificDate, localEnd || "00:00");
                                                localDateStr = start.localDate;
                                                localStart = row.startTime ? start.localTime : "";
                                                localEnd = row.endTime ? end.localTime : "";
                                            } else if (row.dayOfWeek) {
                                                const start = utcToLocalRecurring(row.dayOfWeek, localStart || "00:00");
                                                const end = utcToLocalRecurring(row.dayOfWeek, localEnd || "00:00");
                                                localDayStr = start.localDayOfWeek;
                                                localStart = row.startTime ? start.localTime : "";
                                                localEnd = row.endTime ? end.localTime : "";
                                            }

                                            return (
                                                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-3.5 px-2 font-semibold text-slate-400">
                                                        #{row.id}
                                                    </td>
                                                    <td className="py-3.5 px-2">
                                                            <span className="font-bold text-slate-900 block leading-tight">
                                                                {row.type === 'DOCTOR_SHIFT' ? 'Doctor Shift Consultation' : row.type}
                                                            </span>
                                                    </td>
                                                    <td className="py-3.5 px-2 text-slate-600 whitespace-nowrap">
                                                        {localDateStr || localDayStr || 'Recurring'}
                                                        <span className="block text-[10px] text-slate-400">{localStart} - {localEnd}</span>
                                                    </td>
                                                    <td className="py-3.5 px-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                                                                {userInitials}
                                                            </div>
                                                            <span className="font-medium text-slate-800 text-[11px] truncate max-w-[100px]">
                                                                    {userData.fullName.split(' ')[0]}
                                                                </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 px-2 text-right">
                                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                                Approved
                                                            </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        {/* 4. Schedule Calendar (Month/Week/Day layout with dynamic event pills) */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <h2 className="text-base font-bold text-slate-900 mb-4">Schedule Calendar</h2>

                            {/* View Switcher: Month | Week | Day */}
                            <div className="flex bg-slate-100/80 p-1 rounded-2xl w-fit mb-5">
                                {['Month', 'Week', 'Day'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setCalendarTab(tab)}
                                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${calendarTab === tab
                                            ? 'bg-white text-blue-600 shadow-xs'
                                            : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Month Header Navigation & Add Event Button */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevMonth}
                                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="font-extrabold text-slate-900 text-sm sm:text-base min-w-[130px] text-center">
                                        {monthNames[currentCalDate.getMonth()]} {currentCalDate.getFullYear()}
                                    </span>
                                    <button
                                        onClick={nextMonth}
                                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => alert("Shift management is available via Clinic Administration")}
                                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                                >
                                    <Plus className="w-4 h-4 stroke-[3]" />
                                    <span>Add Event</span>
                                </button>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 mb-2 uppercase tracking-wider">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span className="text-rose-500">Sat</span>
                                <span className="text-rose-500">Sun</span>
                            </div>

                            {/* Calendar Days Matrix */}
                            <div className="grid grid-cols-7 gap-1.5">
                                {calendarDays.map((cell, idx) => {
                                    const hasShift = doctorSchedules.some(s => s.specificDate === cell.dateStr);
                                    const hasAppointments = doctorAppointments.filter(a => a.appointmentAt?.startsWith(cell.dateStr));
                                    const todayObj = new Date();
                                    const localIsoDate = new Date(todayObj.getTime() - (todayObj.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                                    const isToday = localIsoDate === cell.dateStr;

                                    return (
                                        <div
                                            key={idx}
                                            className={`min-h-[75px] rounded-2xl p-1.5 flex flex-col justify-between border transition-all ${cell.isCurrentMonth
                                                ? isToday
                                                    ? 'bg-blue-50/50 border-blue-200'
                                                    : 'bg-white border-slate-100 hover:border-slate-200'
                                                : 'bg-slate-50/40 border-transparent opacity-40'
                                            }`}
                                        >
                                            <span
                                                className={`text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday
                                                    ? 'bg-blue-600 text-white shadow-xs'
                                                    : cell.isCurrentMonth
                                                        ? (idx % 7 === 5 || idx % 7 === 6) ? 'text-rose-500' : 'text-slate-800'
                                                        : 'text-slate-400'
                                                }`}
                                            >
                                                {cell.dayNumber}
                                            </span>

                                            <div className="space-y-1 mt-1">
                                                {hasShift && (
                                                    <div className="text-[8px] font-bold bg-purple-600 text-white px-1.5 py-0.5 rounded-md truncate text-center shadow-xs">
                                                        Staff Shift
                                                    </div>
                                                )}
                                                {hasAppointments.length > 0 && (
                                                    <div className="text-[8px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-md truncate text-center shadow-xs">
                                                        {hasAppointments.length} Visit{hasAppointments.length > 1 ? 's' : ''}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                    </div>
                )}

            </main>

            {/* ── EDIT PROFILE MODAL (2-STEP GATE) ── */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 my-8">
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    {editStep === 'verify' ? 'Security Verification' : 'Edit Profile Information'}
                                </h3>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                    {editStep === 'verify'
                                        ? 'Enter your current password to unlock profile editing'
                                        : 'Update your personal details and credentials'}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setPasswordError("");
                                    setVerifyPassword("");
                                }}
                                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* ── STEP 1: PASSWORD VERIFICATION GATE ── */}
                        {editStep === 'verify' ? (
                            <form onSubmit={handleVerifyPassword} className="space-y-4">
                                <div className="flex flex-col items-center text-center py-2">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <p className="text-xs text-slate-500 max-w-[280px]">
                                        To protect your account security, please confirm your current password before editing.
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        autoFocus
                                        value={verifyPassword}
                                        onChange={(e) => setVerifyPassword(e.target.value)}
                                        placeholder="Enter your current password"
                                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>

                                {passwordError && (
                                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 flex items-center gap-2">
                                        <span>⚠️</span>
                                        <span>{passwordError}</span>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditModalOpen(false);
                                            setPasswordError("");
                                            setVerifyPassword("");
                                        }}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200 transition-all cursor-pointer"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* ── STEP 2: PROFILE FORM (UNLOCKED) ── */
                            <form onSubmit={handleSaveProfile} className="space-y-4" autoComplete="off">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={editForm.fullName || ""}
                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editForm.email || ""}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            value={editForm.phone || ""}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-700 block mb-1">City / Location</label>
                                        <select
                                            value={editForm.city || "AMMAN"}
                                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                                            className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="AMMAN">Amman</option>
                                            <option value="IRBID">Irbid</option>
                                            <option value="ZARQA">Zarqa</option>
                                            <option value="AQABA">Aqaba</option>
                                            <option value="SALT">Salt</option>
                                            <option value="MADABA">Madaba</option>
                                            <option value="JERASH">Jerash</option>
                                            <option value="AJLOUN">Ajloun</option>
                                            <option value="KARAK">Karak</option>
                                            <option value="TAFILAH">Tafilah</option>
                                            <option value="MAAN">Ma'an</option>
                                            <option value="MAFRAQ">Mafraq</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ── Password Update Section ── */}
                                <div className="pt-3 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                                            Change Password
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium">(Optional)</span>
                                    </div>

                                    <div className="space-y-2.5 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                                        <div>
                                            <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="At least 8 characters"
                                                autoComplete="new-password"
                                                value={editForm.newPassword || ""}
                                                onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                                                className="w-full text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                                                Re-type New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Re-type new password to confirm"
                                                autoComplete="new-password"
                                                value={editForm.confirmPassword || ""}
                                                onChange={(e) => setEditForm({ ...editForm, confirmPassword: e.target.value })}
                                                className="w-full text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {passwordError && (
                                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 flex items-center gap-2">
                                        <span>⚠️</span>
                                        <span>{passwordError}</span>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditModalOpen(false);
                                            setPasswordError("");
                                            setVerifyPassword("");
                                        }}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200 transition-all cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
```
`src\router\router.jsx`:

```jsx
import {
    createBrowserRouter,
    redirect,
} from "react-router";

import {
    login,
    registerPatient,
    registerClinic,
    logout,
} from "../api/authApi";
import { clearAuth, getAuth, saveAuth } from "../auth/authStorage";
import { getRoleRedirect } from "../auth/roleRedirect";
import {
    requireGuest,
    requireRole,
    requireInactiveAdmin,
} from "../auth/routeGuards.js";
import Login from "../pages/Login";
import Register from "../pages/Register.jsx";
import PatientHomePage from "../pages/PatientHomePage.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ClinicDashboard from "../pages/clinic/ClinicDashboard.jsx";
import ClinicOverview from "../pages/clinic/ClinicOverview";
import ClinicProfileSettings from "../pages/clinic/ClinicProfileSettings.jsx";
import ClinicAppointments from "../pages/clinic/components/ClinicAppointments.jsx";
import ClinicDoctors from "../pages/clinic/components/ClinicDoctors.jsx";
import ClinicInsurances from "../pages/clinic/components/ClinicInsurances.jsx";
import ResubmitApplication from "../pages/clinic/components/ResubmitApplication.jsx";
import DoctorDashboard from "../pages/doctor/DoctorDashboard.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import ClinicDetails from "../pages/patient/ClinicDetails.jsx";
import UserProfile from "../pages/patient/UserProfile.jsx";
import BookAppointment from "../pages/patient/BookAppointment.jsx";
import AdminChangePassword from "../pages/admin/AdminChangePassword.jsx";

async function loginAction({ request }) {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const authData = await login({
            email,
            password,
        });

        saveAuth(authData);

        if (
            authData.role === "ADMIN" &&
            authData.isActive === false
        ) {
            return redirect("/admin/change-password");
        }

        return redirect(
            getRoleRedirect(authData.role)
        );
    } catch (error) {
        return {
            error: error.message,
        };
    }
}

async function registerAction({ request }) {
    const formData = await request.formData();

    const mode = formData.get("mode");

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
        return {
            error: "Passwords do not match",
        };
    }

    try {
        if (mode === "PATIENT") {
            await registerPatient({
                fullName: formData.get("fullName"),
                email: formData.get("email"),
                city: formData.get("city"),
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword"),
            });
        } else if (mode === "CLINIC") {
            await registerClinic({
                clinicName: formData.get("clinicName"),
                email: formData.get("email"),
                city: formData.get("city"),
                clinicLicenseNumber: formData.get(
                    "clinicLicenseNumber"
                ),
                password: formData.get("password"),
                confirmPassword: formData.get(
                    "confirmPassword"
                ),
            });
        } else {
            return {
                error: "Invalid registration type",
            };
        }
    } catch (error) {
        return {
            error: error.message,
        };
    }

    try {
        const authData = await login({
            email,
            password,
        });

        saveAuth(authData);

        return redirect(
            getRoleRedirect(authData.role)
        );
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return redirect(`/login?registered=true`)
    }
}

export async function logoutAction() {
    const auth = getAuth();

    if (!auth) {
        return redirect("/login");
    }

    try {
        await logout(auth.token);
    } catch (error) {
        console.error("Logout failed:", error);
    }

    clearAuth();

    return redirect("/login");
}


export const router = createBrowserRouter([
    {
        path: "/profile",
        element: <UserProfile />,
        loader: () => {
            const auth = getAuth();
            if (!auth) return redirect("/login");
            if (auth.role !== "PATIENT" && auth.role !== "DOCTOR") {
                return redirect("/unauthorized");
            }
            return auth;
        },
    },
    {
        path: "/",
        element: <PatientHomePage />,
        loader: () => {
            const auth = getAuth();
            if (auth?.role === "CLINIC") return redirect("/clinic");
            if (auth?.role === "DOCTOR") return redirect("/doctor");
            return requireRole("PATIENT");
        }
    },
    {
        path: "/login",
        element: <Login />,
        action: loginAction,
        loader: requireGuest,
    },
    {
        path: "/register",
        element: <Register />,
        action: registerAction,
        loader: requireGuest,
    },
    {
        path: "/admin/change-password",
        element: <AdminChangePassword />,
        loader: requireInactiveAdmin,
    },
    {
        path: "/admin",
        element: <AdminDashboard />,
        loader: () => requireRole("ADMIN"),
    },
    {
        path: "/clinic",
        element: <ClinicDashboard />,
        loader: () => requireRole("CLINIC"),
        children: [
            {
                index: true,
                element: <ClinicOverview />,
            },
            {
                path: "doctors",
                element: <ClinicDoctors />,
            },
            {
                path: "appointments",
                element: <ClinicAppointments />,
            },
            {
                path: "insurances",
                element: <ClinicInsurances />,
            },
            {
                path: "insurance",
                element: <ClinicInsurances />,
            },
            {
                path: "settings",
                element: <ClinicProfileSettings />,
            },
            {
                path: "resubmit",
                element: <ResubmitApplication />,
            },
        ],
    },
    {
        path: "/doctor",
        element: <DoctorDashboard />,
        loader: () => requireRole("DOCTOR"),
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "/clinic-details",
        element: <ClinicDetails />,
        loader: () => requireRole("PATIENT"),
    },
    {
        path: "/clinic-details/:id",
        element: <ClinicDetails />,
        loader: () => requireRole("PATIENT"),
    },
    {
        path: "/book-appointment",
        element: <BookAppointment />,
        loader: () => requireRole("PATIENT"),
    },
    {
        path: "/book-appointment/:clinicId",
        element: <BookAppointment />,
        loader: () => requireRole("PATIENT"),
    },
    {
        path: "/logout",
        action: logoutAction,
    },
]);

```
`src\styles\index.css`:

```css
@import "tailwindcss";

/* ── Custom animation keyframes for clinic modals ── */
@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(8px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-12px);
        max-height: 0;
    }
    to {
        opacity: 1;
        transform: translateY(0);
        max-height: 200px;
    }
}
```
`src\utils\timezone.js`:

```js
// src/utils/timezone.js

// Reference dates for each day of the week (using a known week, e.g. Sept 6 (Sun) to Sept 12 (Sat) 2026)
// 0: Sunday, 1: Monday, ... 6: Saturday
const REF_DATES = {
    0: 6, 1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 12
};
const DAYS_ARRAY = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

/**
 * Converts a local day and time to UTC.
 * @param {string} dayName "MONDAY"
 * @param {string} timeString "09:00"
 * @returns {{ utcDayOfWeek: string, utcTime: string }}
 */
export function localToUtcRecurring(dayName, timeString) {
    if (!dayName || !timeString) return { utcDayOfWeek: dayName, utcTime: timeString };
    const dayIndex = DAYS_ARRAY.indexOf(dayName.toUpperCase());
    if (dayIndex === -1) return { utcDayOfWeek: dayName, utcTime: timeString };
    
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Create local date
    const d = new Date(2026, 8, REF_DATES[dayIndex], hours, minutes, 0);
    
    const utcDayIndex = d.getUTCDay();
    const utcHours = d.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = d.getUTCMinutes().toString().padStart(2, '0');
    
    return {
        utcDayOfWeek: DAYS_ARRAY[utcDayIndex],
        utcTime: `${utcHours}:${utcMinutes}:00`
    };
}

/**
 * Converts a UTC day and time to local browser time.
 * @param {string} utcDayName "MONDAY"
 * @param {string} utcTimeString "06:00:00"
 * @returns {{ localDayOfWeek: string, localTime: string }}
 */
export function utcToLocalRecurring(utcDayName, utcTimeString) {
    if (!utcDayName || !utcTimeString) return { localDayOfWeek: utcDayName, localTime: utcTimeString };
    const dayIndex = DAYS_ARRAY.indexOf(utcDayName.toUpperCase());
    if (dayIndex === -1) return { localDayOfWeek: utcDayName, localTime: utcTimeString };
    
    const [hours, minutes] = utcTimeString.split(':').map(Number);
    
    // Create UTC date
    const d = new Date(Date.UTC(2026, 8, REF_DATES[dayIndex], hours, minutes, 0));
    
    const localDayIndex = d.getDay();
    const localHours = d.getHours().toString().padStart(2, '0');
    const localMinutes = d.getMinutes().toString().padStart(2, '0');
    
    return {
        localDayOfWeek: DAYS_ARRAY[localDayIndex],
        localTime: `${localHours}:${localMinutes}`
    };
}

/**
 * Converts a local specific date and time to UTC.
 * @param {string} dateString "2026-09-05"
 * @param {string} timeString "09:00"
 * @returns {{ utcDate: string, utcTime: string }}
 */
export function localToUtcSpecific(dateString, timeString) {
    if (!dateString || !timeString) return { utcDate: dateString, utcTime: timeString };
    const [year, month, day] = dateString.split('-').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const d = new Date(year, month - 1, day, hours, minutes, 0);
    
    const utcYear = d.getUTCFullYear();
    const utcMonth = (d.getUTCMonth() + 1).toString().padStart(2, '0');
    const utcDay = d.getUTCDate().toString().padStart(2, '0');
    const utcHours = d.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = d.getUTCMinutes().toString().padStart(2, '0');
    
    return {
        utcDate: `${utcYear}-${utcMonth}-${utcDay}`,
        utcTime: `${utcHours}:${utcMinutes}:00`
    };
}

/**
 * Converts a UTC specific date and time to local time.
 * @param {string} utcDateString "2026-09-05"
 * @param {string} utcTimeString "06:00:00"
 * @returns {{ localDate: string, localTime: string }}
 */
export function utcToLocalSpecific(utcDateString, utcTimeString) {
    if (!utcDateString || !utcTimeString) return { localDate: utcDateString, localTime: utcTimeString };
    const [year, month, day] = utcDateString.split('-').map(Number);
    const [hours, minutes] = utcTimeString.split(':').map(Number);
    
    const d = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    
    const localYear = d.getFullYear();
    const localMonth = (d.getMonth() + 1).toString().padStart(2, '0');
    const localDay = d.getDate().toString().padStart(2, '0');
    const localHours = d.getHours().toString().padStart(2, '0');
    const localMinutes = d.getMinutes().toString().padStart(2, '0');
    
    return {
        localDate: `${localYear}-${localMonth}-${localDay}`,
        localTime: `${localHours}:${localMinutes}`
    };
}

```
`vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```