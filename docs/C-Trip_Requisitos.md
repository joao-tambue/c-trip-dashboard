# C-Trip — Requisitos Funcionais e Não Funcionais
**Versão 1.0 · Baseado no Documento de Produto C-Trip (Jun/2026)**
**Fase actual do desafio:** Protótipo de UI/UX (sem código)

---

## 1. Requisitos Funcionais (RF)

### 1.1 Passageiro
- **RF01** — O sistema deve permitir pesquisar viagens por origem, destino e data.
- **RF02** — O sistema deve permitir filtrar resultados por hora, preço e lugares disponíveis.
- **RF03** — O sistema deve exibir todas as empresas que operam a rota pesquisada, lado a lado.
- **RF04** — O sistema deve exibir um mapa visual de lugares do autocarro (livre / ocupado).
- **RF05** — O sistema deve permitir seleccionar um ou mais lugares.
- **RF06** — O sistema deve aplicar um *hold* automático de 10 minutos sobre o(s) lugar(es) seleccionado(s), com temporizador visível.
- **RF07** — O sistema deve liberar automaticamente o *hold* se o checkout não for concluído no prazo.
- **RF08** — O sistema deve permitir preencher dados do passageiro por lugar e confirmar a compra.
- **RF09** — O sistema deve gerar um bilhete digital com QR code único por lugar comprado.
- **RF10** — O sistema deve permitir consultar reservas (futuras e passadas), incluindo estado do reembolso.
- **RF11** — O sistema deve permitir exibir o bilhete/QR **offline** (sem internet).
- **RF12** — O sistema deve permitir cancelar uma reserva e solicitar reembolso.

### 1.2 Operador de bilhética
- **RF13** — O sistema deve permitir escanear o QR code do passageiro e validar em tempo real.
- **RF14** — O sistema deve devolver um de três resultados no scan: PERMITIDO, JÁ EMBARCOU, INVÁLIDO.
- **RF15** — O sistema deve exibir o manifesto completo de passageiros da viagem (embarcados / por embarcar).
- **RF16** — O sistema deve permitir emitir uma passagem *walk-in* (venda no local), com selecção de lugar livre.
- **RF17** — O sistema deve exibir o painel de viagens do dia, com estado em tempo real (a iniciar, em rota, chegou, cancelado).
- **RF18** — O sistema deve permitir consultar viagens por calendário (dias/meses).
- **RF19** — O sistema deve exibir tarefas atribuídas ao operador/motorista.

### 1.3 Publicador de rotas
- **RF20** — O sistema deve permitir criar/editar/desactivar rotas (origem, destino, paragens intermédias).
- **RF21** — O sistema deve permitir definir preço por segmento/paragem dentro da mesma rota.
- **RF22** — O sistema deve permitir publicar horários (data, hora, autocarro, motorista atribuído).
- **RF23** — O sistema deve permitir enviar mensagens aos passageiros de um horário específico.
- **RF24** — O sistema deve exibir analytics por rota (ocupação, receita, tendências de procura).

### 1.4 Gestor de frota e equipa
- **RF25** — O sistema deve permitir registar autocarros (modelo, matrícula, configuração de lugares).
- **RF26** — O sistema deve permitir marcar autocarros como indisponíveis (manutenção) sem cancelar rotas.
- **RF27** — O sistema deve permitir registar motoristas e consultar disponibilidade.
- **RF28** — O sistema deve permitir criar subcontas de equipa com papéis distintos (motorista, operador, gestor de rota).
- **RF29** — O sistema deve registar check-in diário de presença por funcionário.
- **RF30** — O sistema deve permitir criar e atribuir tarefas a funcionários, e acompanhar o estado.

### 1.5 Administrador C-Trip
- **RF31** — O sistema deve permitir analisar e aprovar/recusar o registo de novas empresas.
- **RF32** — O sistema deve permitir supervisionar empresas activas (rotas, vendas, reclamações).
- **RF33** — O sistema deve permitir consultar contas de passageiro para suporte.
- **RF34** — O sistema deve permitir aprovar/recusar pedidos de reembolso.
- **RF35** — O sistema deve exibir um dashboard global (reservas, empresas activas, receita, tendências).
- **RF36** — O sistema deve manter logs de auditoria de acções relevantes (embarques, cancelamentos, reembolsos, logins).
- **RF37** — O sistema deve permitir gerir a lista de cidades disponíveis na plataforma.

### 1.6 Transversais / Marketplace
- **RF38** — O sistema deve suportar múltiplas empresas operando a mesma rota, mantendo preços e operação independentes.
- **RF39** — O sistema deve suportar múltiplos idiomas (PT como padrão, EN como opção).

---

## 2. Requisitos Não Funcionais (RNF)

| Categoria | Requisito |
|---|---|
| **Desempenho** | Validação de QR deve responder em **< 2 segundos** |
| **Concorrência** | Hold de lugar com TTL de 600s deve evitar dupla reserva sob acesso concorrente |
| **Disponibilidade offline** | Bilhetes/reservas devem ficar acessíveis no mobile sem conexão à internet |
| **Segurança** | QR code deve ser único, não duplicável, não transferível, validado contra a BD em tempo real |
| **Auditabilidade** | Todas as acções sensíveis (embarques, cancelamentos, reembolsos, logins) devem ser registadas em log |
| **Usabilidade** | Interface do scan de embarque deve ser legível sob luz solar directa (alto contraste, texto grande) |
| **Acessibilidade** | Estados do mapa de lugares (livre/ocupado/hold) não devem depender só de cor |
| **Internacionalização** | Toda a interface deve suportar PT/EN, com PT como padrão |
| **Escalabilidade** | Arquitectura deve suportar expansão a novas províncias/cidades sem redesenho |
| **Confiabilidade de rede** | Sistema deve ser tolerante a conectividade instável (realidade angolana) — validações críticas devem ser optimizadas para o mínimo de dados |
| **Segurança de infraestrutura** *(Fase 1 — futuro)* | SSL, firewall entre servidores, backups automáticos |
| **Pagamentos** *(Fase 1 — futuro)* | Módulo de pagamento deve suportar múltiplos métodos (Multicaixa Express, cartão local) sem alterar o resto do sistema |

---

## 3. Nota de escopo (fase actual)
Este desafio está na fase de **protótipo de UI/UX**, sem implementação de código. O recorte de telas priorizado cobre os fluxos de **Passageiro** e **Operador de bilhética**, por serem os de maior impacto visual e por representarem a "cara" do marketplace (RF01–RF19). Os módulos de Publicador, Gestor e Admin (RF20–RF37) são majoritariamente CRUD/tabelas e já constam como "Prontos" no PoC actual, sendo secundários para esta entrega.
