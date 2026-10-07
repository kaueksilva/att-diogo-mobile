# 📋 Task Manager — Gerenciador de Tarefas Pessoais

Aplicativo móvel desenvolvido em **React Native + Expo** para organizar tarefas pessoais, com autenticação, CRUD completo, foto anexada pela câmera, localização por GPS, clima do local da tarefa e funcionamento offline.

> **Conta de teste:** `teste@teste.com` / `123456` (há um atalho "Usar conta de teste" na tela de login).

---

## ▶️ Como executar

### Expo Snack (sem instalar nada)
1. Acesse [snack.expo.dev](https://snack.expo.dev) e importe este repositório do GitHub.
2. Escaneie o QR Code com o app **Expo Go** (Android/iOS) ou use o preview Web.

> Recursos de câmera e GPS funcionam melhor no celular pelo Expo Go.

### Localmente
```bash
npm install
npx expo start
```

---

## ✅ Atendimento aos requisitos

| Requisito | Como foi atendido |
|---|---|
| **Plataformas iOS/Android** | Expo SDK 51, roda em ambos (e também na Web). |
| **5+ telas com navegação** | Login, Cadastro, Lista de Tarefas, Criar/Editar Tarefa e Perfil (React Navigation Stack). |
| **Persistência de dados** | AsyncStorage (contas, sessão e tarefas por usuário) + FileSystem (fotos). |
| **Design responsivo** | Conteúdo limitado a 600px e centralizado em tablets/web, áreas seguras (notch) respeitadas, layouts flexíveis. |
| **Autenticação** | Cadastro e login com validação, sessão persistente, logout e edição de nome. |
| **CRUD completo** | Tarefas: criar, listar/buscar/filtrar, editar, concluir e excluir. |
| **API externa** | [DummyJSON Quotes](https://dummyjson.com/docs/quotes) (frase do dia) e [Open-Meteo](https://open-meteo.com) (clima no local da tarefa). |
| **Recursos do dispositivo** | 📷 Câmera/galeria (`expo-image-picker`), 📍 GPS + endereço (`expo-location`), 💾 armazenamento de arquivos (`expo-file-system`). |
| **Desempenho** | Operações locais instantâneas, atualização otimista ao concluir tarefas, `memo`/`useMemo` na lista, timeout de 8s nas APIs. |
| **Segurança** | Senhas salvas apenas como **hash SHA-256 com salt** único por usuário (`expo-crypto`); a sessão nunca guarda senha; contas antigas são migradas automaticamente. |
| **Funcionamento offline** | Todo o CRUD é local. Sem internet, a frase do dia usa uma lista local e o clima mostra aviso amigável. |
| **Tratamento de erros** | `try/catch` em todas as operações de disco, rede e permissões, com mensagens claras ao usuário. |
| **Documentação** | Este README + JSDoc nos serviços, componentes e telas. |

---

## ✨ Funcionalidades

- **Login / Cadastro** com validação em tempo real, mostrar/ocultar senha, confirmação de senha e bloqueio de e-mail duplicado.
- **Painel inicial** com saudação, data, barra de progresso das tarefas concluídas.
- **Busca** por título/descrição e **filtros** (Todas / Pendentes / Concluídas) com contadores.
- **Prioridade** (Alta, Média, Baixa) com cores; lista ordenada por status → prioridade → data.
- **Concluir tarefa** com um toque no círculo do card.
- **Foto** pela câmera ou galeria, salva permanentemente no armazenamento do app.
- **Localização** por GPS com endereço aproximado, link "Abrir no mapa" e **clima atual** no local.
- **Perfil** com estatísticas, edição do nome, frase motivacional e "Limpar concluídas".
- Diálogos de confirmação que funcionam também no preview Web do Snack.

---

## 🗂️ Arquitetura

```
App.js                     # Providers + navegação (telas públicas x autenticadas)
src/
├── context/
│   └── AuthContext.js     # Sessão, login, cadastro, perfil, logout
├── services/
│   ├── taskService.js     # Repositório de tarefas (CRUD, ordenação, estatísticas)
│   ├── fileService.js     # Armazenamento permanente de fotos
│   └── apiService.js      # APIs externas com timeout e fallback offline
├── screens/               # Login, Register, Home, TaskDetail, Profile
├── components/            # FormInput, PrimaryButton, ScreenHeader, TaskCard, EmptyState
├── styles/                # Estilos separados por tela/componente
├── theme/theme.js         # Cores, prioridades, sombras (design tokens)
└── utils/
    ├── alert.js           # Alertas/confirmações multiplataforma
    ├── validation.js      # Validação de formulários
    └── security.js        # Hash de senha
```

**Decisões principais**
- **Separação de camadas:** telas cuidam apenas da interface; regras de dados ficam nos *services*, facilitando trocar o AsyncStorage por um backend (ex: Firebase) no futuro.
- **Componentes reutilizáveis** padronizam inputs, botões e cabeçalhos em todo o app.
- **Design tokens** centralizados em `theme.js` garantem consistência visual.

---

## 🧰 Tecnologias

React Native 0.74 · Expo SDK 51 · React Navigation 6 · AsyncStorage · expo-location · expo-image-picker · expo-file-system · expo-crypto · @expo/vector-icons
