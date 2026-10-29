# AMAX CRM // Site Oficial Multi-Page

> **Direção de Arte:** Avant-Garde / Executive Light Tech  
> **Paleta:** Fundo Branco Puro (`#FFFFFF`), Azul Marinho Deep (`#0A192F`), Azul Royal (`#1D4ED8`) e Âmbar Laser (`#FFB000`).  
> **Tipografia:** Bricolage Grotesque (Headings), DM Sans (Body) e JetBrains Mono (Tech/Métricas).  
> **Auditoria:** 0 Anti-Patterns detectados (`impeccable` & `ui-ux-pro-max`).

---

## 🚀 Estrutura de Páginas

| Rota | Arquivo | Propósito Comercial |
|---|---|---|
| `/` | `index.html` | Hero com 3D WebGL Three.js, Prova Social, Alternador de Telas Reais do CRM, FAQ e Calculadora de ROI |
| `/recursos` | `recursos.html` | Ficha técnica detalhada (Cadência 4 etapas, Acionamento 1-click, Cockpit multi-tenant) |
| `/comparativo` | `comparativo.html` | Matriz de paridade direta: AMAX vs HubSpot, RD Station e Pipedrive |
| `/precos` | `precos.html` | Planos Starter, Pro e Enterprise com Calculadora Dinâmica de ROI e Payback |
| `/seguranca` | `seguranca.html` | Arquitetura técnica, isolamento tenant, LGPD e criptografia de ponta a ponta |
| `/contato` | `contato.html` | Formulário direto para agendamento de demonstração e integração WhatsApp |

---

## ⚡ Recursos e Diferenciais Técnicos

- **WebGL 3D Holographic Core:** Esfera wireframe interactiva renderizada com Three.js, partículas orbitais e rotação sensível ao scroll/mouse.
- **ROI & Payback Calculator:** Algoritmo dinâmico que projeta faturamento recuperado no WhatsApp em tempo real com base no número de vendedores e ticket médio.
- **Real Frame Switcher:** Demonstração visual interativa alternando capturas de alta definição reais do cockpit do CRM (Cockpit Geral, Kanban 4 Etapas, Painel Multi-Empresas, Mobile).
- **SEO & GEO Otimizado:** Marcação estruturada `Schema.org` (SoftwareApplication, Organization, WebSite, FAQPage, AggregateRating) pronta para indexação no Google e mecanismos de IA (Perplexity, ChatGPT, Claude).

---

## 🛠️ Como Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/renanvfranco/site-amex.git
cd site-amex

# Inicie o servidor estático local
npx serve -l 3001 .
```

Acesse em: `http://localhost:3001`

---

## ☁️ Deploy em 1 Clique

### Vercel
O projeto já conta com o arquivo `vercel.json` configurado para URLs limpas (`cleanUrls: true`) e headers de segurança HTTP.
1. Conecte este repositório no [Vercel](https://vercel.com).
2. O framework preset é **Other**.
3. Clique em **Deploy**.

### Cloudflare Pages / Netlify / GitHub Pages
Compatível nativamente como site estático multi-page.
